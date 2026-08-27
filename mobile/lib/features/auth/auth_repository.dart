import 'package:dio/dio.dart';
import '../../core/auth/auth_session.dart';
import '../../core/network/api_client.dart';
import '../../core/storage/secure_token_storage.dart';
import '../../models/user.dart';

class AuthRepository {
  AuthRepository({SecureTokenStorage? storage})
      : _storage = storage ?? SecureTokenStorage(),
        _dio = ApiClient.instance.dio;

  final SecureTokenStorage _storage;
  final Dio _dio;

  /// Called once on app start, before showing any screen. Tries to turn a
  /// stored refresh token into a live access token. Returns the restored
  /// user, or null if there was no session / it's no longer valid — in
  /// either case the caller should route to the login screen.
  Future<User?> restoreSession() async {
    final refreshToken = await _storage.readRefreshToken();
    if (refreshToken == null) return null;

    try {
      final response = await _dio.post(
        '/auth/refresh',
        data: {'refreshToken': refreshToken},
      );
      return _applySession(response.data);
    } on DioException {
      // Refresh token expired, was revoked, or the device is offline.
      // Offline is arguably worth a retry-later UX, but for a first pass
      // we fail closed and let the person sign in again.
      await _storage.clear();
      return null;
    }
  }

  Future<User> login({required String email, required String password}) async {
    final response = await _dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });
    return _applySession(response.data);
  }

  Future<User> register({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
  }) async {
    final response = await _dio.post('/auth/register', data: {
      'email': email,
      'password': password,
      'firstName': firstName,
      'lastName': lastName,
    });
    return _applySession(response.data);
  }

  Future<void> logout() async {
    final refreshToken = await _storage.readRefreshToken();
    try {
      await _dio.post('/auth/logout', data: {'refreshToken': refreshToken});
    } on DioException {
      // Best-effort server-side revocation — proceed with local cleanup
      // regardless, so a flaky network never traps someone in a signed-in UI.
    }
    AuthSession.instance.clear();
    await _storage.clear();
  }

  User _applySession(Map<String, dynamic> data) {
    final user = User.fromJson(data['user'] as Map<String, dynamic>);
    AuthSession.instance.update(accessToken: data['accessToken'] as String, user: user);
    // Fire-and-forget is intentional here — Riverpod/caller already has what
    // it needs from AuthSession; storage is just for the next cold start.
    _storage.saveRefreshToken(data['refreshToken'] as String);
    return user;
  }
}
