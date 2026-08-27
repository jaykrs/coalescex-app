import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/network/api_client.dart';
import 'features/auth/auth_provider.dart';

void main() {
  runApp(const ProviderScope(child: NorthfieldApp()));
}

class NorthfieldApp extends ConsumerStatefulWidget {
  const NorthfieldApp({super.key});
  @override
  ConsumerState<NorthfieldApp> createState() => _NorthfieldAppState();
}

class _NorthfieldAppState extends ConsumerState<NorthfieldApp> {
  @override
  void initState() {
    super.initState();
    // A 401 anywhere in the app (refresh token expired/revoked mid-session)
    // routes straight back to sign-in, regardless of which screen triggered it.
    sessionEndedController.stream.listen((_) {
      ref.read(authProvider.notifier).forceSignedOut();
    });
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);

    return MaterialApp(
      title: 'Northfield',
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: const Color(0xFF1E4A3D)),
      home: switch (authState.status) {
        AuthStatus.unknown => const _SplashScreen(),
        AuthStatus.unauthenticated => const _LoginPlaceholder(),
        AuthStatus.authenticated => const _HomePlaceholder(),
      },
    );
  }
}

class _SplashScreen extends StatelessWidget {
  const _SplashScreen();
  @override
  Widget build(BuildContext context) =>
      const Scaffold(body: Center(child: CircularProgressIndicator()));
}

// Placeholders — real screens (course catalog, dashboard, etc.) follow the
// same structure as the Next.js pages already built, calling the same API
// endpoints through ApiClient.instance.dio.
class _LoginPlaceholder extends StatelessWidget {
  const _LoginPlaceholder();
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Sign in')));
}

class _HomePlaceholder extends StatelessWidget {
  const _HomePlaceholder();
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Course catalog')));
}
