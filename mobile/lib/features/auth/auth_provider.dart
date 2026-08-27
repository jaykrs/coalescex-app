import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../models/user.dart';
import 'auth_repository.dart';

enum AuthStatus { unknown, authenticated, unauthenticated }

class AuthState {
  final AuthStatus status;
  final User? user;
  const AuthState({required this.status, this.user});

  const AuthState.unknown() : this(status: AuthStatus.unknown);
  const AuthState.unauthenticated() : this(status: AuthStatus.unauthenticated);
  const AuthState.authenticated(User user) : this(status: AuthStatus.authenticated, user: user);
}

final authRepositoryProvider = Provider((ref) => AuthRepository());

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier(this._repo) : super(const AuthState.unknown()) {
    _restore();
  }

  final AuthRepository _repo;

  Future<void> _restore() async {
    final user = await _repo.restoreSession();
    state = user != null ? AuthState.authenticated(user) : const AuthState.unauthenticated();
  }

  Future<void> login(String email, String password) async {
    final user = await _repo.login(email: email, password: password);
    state = AuthState.authenticated(user);
  }

  Future<void> register({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
  }) async {
    final user = await _repo.register(
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    );
    state = AuthState.authenticated(user);
  }

  /// Called both for a user-initiated logout and when the API client
  /// reports the refresh token is no longer valid (see [sessionEndedController]
  /// in api_client.dart) — same end state either way.
  Future<void> logout() async {
    await _repo.logout();
    state = const AuthState.unauthenticated();
  }

  void forceSignedOut() {
    state = const AuthState.unauthenticated();
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>(
  (ref) => AuthNotifier(ref.watch(authRepositoryProvider)),
);
