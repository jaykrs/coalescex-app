import '../../models/user.dart';

/// Holds the access token and current user purely in memory for the life of
/// the app process. Never serialized to disk — see the note in
/// [SecureTokenStorage] for why the access token specifically stays out of
/// persistent storage.
class AuthSession {
  AuthSession._();
  static final AuthSession instance = AuthSession._();

  String? _accessToken;
  User? _currentUser;

  String? get accessToken => _accessToken;
  User? get currentUser => _currentUser;
  bool get isAuthenticated => _accessToken != null;

  void update({required String accessToken, required User user}) {
    _accessToken = accessToken;
    _currentUser = user;
  }

  void updateAccessToken(String accessToken) {
    _accessToken = accessToken;
  }

  void clear() {
    _accessToken = null;
    _currentUser = null;
  }
}
