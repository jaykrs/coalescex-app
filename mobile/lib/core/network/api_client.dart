import 'dart:async';
import 'package:dio/dio.dart';
import '../auth/auth_session.dart';
import '../storage/secure_token_storage.dart';
import '../../models/user.dart';

const String apiBaseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://10.0.2.2:4000/api', // 10.0.2.2 = host loopback from the Android emulator
);

/// Fired when a session ends unrecoverably (refresh token invalid/expired,
/// or the user logged out). The app's root widget listens to this to pop
/// back to the login screen, regardless of which screen triggered it.
final sessionEndedController = StreamController<void>.broadcast();

class ApiClient {
  ApiClient._internal() {
    _dio = Dio(
      BaseOptions(
        baseUrl: apiBaseUrl,
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
        headers: {
          // Tells the backend to use the mobile auth flow: return the refresh
          // token in the JSON body instead of an httpOnly cookie (see
          // backend/src/modules/auth/auth.routes.ts for the server-side half
          // of this contract).
          'X-Client-Type': 'mobile',
        },
      ),
    );

    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          final token = AuthSession.instance.accessToken;
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          handler.next(options);
        },
        onError: (error, handler) async {
          final isAuthEndpoint = error.requestOptions.path.contains('/auth/');
          final is401 = error.response?.statusCode == 401;

          if (is401 && !isAuthEndpoint && error.requestOptions.extra['retried'] != true) {
            try {
              await _refreshSession();
              // Retry the original request once, with the new access token.
              final retryOptions = error.requestOptions;
              retryOptions.extra['retried'] = true;
              retryOptions.headers['Authorization'] = 'Bearer ${AuthSession.instance.accessToken}';
              final response = await _dio.fetch(retryOptions);
              return handler.resolve(response);
            } catch (_) {
              await _handleSessionExpired();
              return handler.next(error);
            }
          }
          handler.next(error);
        },
      ),
    );
  }

  static final ApiClient instance = ApiClient._internal();
  late final Dio _dio;
  final _storage = SecureTokenStorage();

  Dio get dio => _dio;

  // Ensures concurrent 401s only trigger one network refresh call, not one per
  // in-flight request — everyone else just awaits the same Future.
  Future<void>? _refreshInFlight;

  Future<void> _refreshSession() {
    return _refreshInFlight ??= _doRefresh().whenComplete(() => _refreshInFlight = null);
  }

  Future<void> _doRefresh() async {
    final refreshToken = await _storage.readRefreshToken();
    if (refreshToken == null) throw StateError('No refresh token available');

    // Bare Dio call (not `_dio`) so this request is never itself intercepted
    // into a refresh loop.
    final response = await Dio(BaseOptions(baseUrl: apiBaseUrl)).post(
      '/auth/refresh',
      data: {'refreshToken': refreshToken},
      options: Options(headers: {'X-Client-Type': 'mobile'}),
    );

    final newAccessToken = response.data['accessToken'] as String;
    final newRefreshToken = response.data['refreshToken'] as String;
    final user = User.fromJson(response.data['user'] as Map<String, dynamic>);

    AuthSession.instance.update(accessToken: newAccessToken, user: user);
    await _storage.saveRefreshToken(newRefreshToken); // refresh tokens rotate on every use
  }

  Future<void> _handleSessionExpired() async {
    AuthSession.instance.clear();
    await _storage.clear();
    sessionEndedController.add(null);
  }
}
