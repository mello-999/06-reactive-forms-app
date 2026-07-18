import { Form, FormArray, FormGroup, ValidationErrors } from "@angular/forms";



export class FormUtils {

static getTextError(errors: ValidationErrors) {
  for( const key of Object.keys(errors) ) {
   switch(key) {
    case 'required':
      return 'este campo es requerido';

      case 'minlength':
        return `Minimo de ${ errors['minlength'].requiredLength } caracteres.`

      case 'min':
        return `valor minimo de ${ errors['min'].min }`
   }
  }
  return null;
}

   static isValidField( form: FormGroup, FieldName: string ): boolean | null {
     return (
         // Exprsiones regulares
         !! form.controls[FieldName].errors &&
               form.controls[FieldName].touched
      );
 }


  static getFieldError( form: FormGroup, FieldName: string): string | null {

    if ( !form.controls[FieldName] ) return null;
      
 const errors = form.controls[FieldName].errors ?? {};

  return FormUtils.getTextError(errors);
}

     static isValidFieldInArray( formArray: FormArray, index: number ) {
  return (
    formArray.controls[index].errors && formArray.controls[index].touched
  );  
}

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {

      const control = formArray.at(index);

      if (!control) return null;

      const errors = control.errors ?? {};

      return FormUtils.getTextError(errors)

 } 
}