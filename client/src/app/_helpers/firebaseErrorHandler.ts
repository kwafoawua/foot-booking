
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
    }
  }
}
