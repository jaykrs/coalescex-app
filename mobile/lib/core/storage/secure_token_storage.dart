import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Wraps [FlutterSecureStorage] for exactly the two things we persist across
/// app restarts: the refresh token and (optionally) a cached user snapshot
/// for instant-paint on cold start.
///
/// Deliberately NOT stored here: the access token. It lives in memory only
/// (see [AuthSession]) — it's short-lived (~15 min) and re-derived from the
/// refresh token on cold start, so there's no reason to persist it and widen
/// the window an attacker with disk/backup access has to use it.
class SecureTokenStorage {
  SecureTokenStorage()
      : _storage = const FlutterSecureStorage(
          // Android: force EncryptedSharedPreferences (AES-256-GCM under the hood,
          // key held in the Android Keystore) rather than the older, weaker default.
          aOptions: AndroidOptions(
            encryptedSharedPreferences: true,
          ),
          // iOS: `first_unlock_this_device` — readable only after the user has
          // unlocked the device at least once since boot, and never migrates to
          // a different device via iCloud/iTunes backup restore. That's the right
          // tradeoff for a refresh token: available to background refresh calls,
          // but it doesn't silently reappear on a new device.
          iOptions: IOSOptions(
            accessibility: KeychainAccessibility.first_unlock_this_device,
          ),
        );

  final FlutterSecureStorage _storage;

  static const _refreshTokenKey = 'refresh_token';

  Future<void> saveRefreshToken(String token) =>
      _storage.write(key: _refreshTokenKey, value: token);

  Future<String?> readRefreshToken() => _storage.read(key: _refreshTokenKey);

  Future<void> clear() => _storage.delete(key: _refreshTokenKey);
}
