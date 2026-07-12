import { Form, FormGroup } from "@angular/forms";



export class FormUtils {

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



}