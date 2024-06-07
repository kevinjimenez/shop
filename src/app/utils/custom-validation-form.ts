const errorMessage: Record<string, string> = {
  required: 'El campo {{label}} es requerido',
  email: 'El campo {{label}} no es un correo valido',
};

export class CustomValiationForm {
  static message(
    errors: Record<string, string>,
    label?: string
  ): string | null {
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors!, key)) {
        const msg = errorMessage[key];
        if (label) return msg.replace('{{label}}', label);
        return msg.replace('{{label}}', '');
      }
    }
    return null;
  }
}
