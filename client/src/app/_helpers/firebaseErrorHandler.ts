
export class FirebaseErrorHandler {

  static signInErrorHandler (code) {
    switch (code) {
      case 'auth/invalid-email':
        return 'El email no es válido.';
      case 'auth/user-disabled':
        return 'Este usuario ha sido desabilitado.';
      case 'auth/user-not-found':
        return 'No hay ningún usuario registrado con este email.';
      case 'auth/wrong-password':
        return 'La contraseña no es válida o el usuario no tiene una contraseña.';
      default:
        return 'Ocurrió un error al tratar de iniciar sesión';
    }
  }

  static signUpErrorHandler (code) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El email ya está en uso por otro usuario.';
      case 'auth/invalid-email':
        return 'El email no es válido.';
      case 'auth/weak-password':
        return 'La contraseña no es lo suficientemente fuerte.';
      default:
        return 'Ocurrió un error al tratar de registrarte'
    }
  }
}
