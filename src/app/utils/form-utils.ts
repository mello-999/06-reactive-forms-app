import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
   return new Promise( resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2500);
   })
}

export class FormUtils {

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return(formGroup: AbstractControl) => {

      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

        return field1Value === field2Value ? null : { passwordsnotEqual: true };
    };
  }


  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';


static getTextError(errors: ValidationErrors) {
  for( const key of Object.keys(errors) ) {
   switch(key) {

    case 'required':
      return 'este campo es requerido';
      
      case 'email':
        return 'El email no tiene un formato válido';

      case 'emailTaken':
        return 'El correo electronico ya esta siendo usado por otro usuario';

      case 'minlength':
        return `Minimo de ${ errors['minlength'].requiredLength } caracteres.`;

      case 'min':
        return `valor minimo de ${ errors['min'].min }`;

      case 'noStrider':
        return 'El username no puede ser Strider cambialo por f viejita';

      case 'pattern':
        if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
          
          return 'El correo electronico no es permitido';
        }
        
        return 'Error de patron contra expresion angular';
          

      default:
        return `Error no controlado: ${key}`;

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
 
   static async checkingServerResponse(control: AbstractControl):Promise<ValidationErrors | null> {
     console.log('Validando contra servidor');
    await sleep();

    const formValue = control.value;  

    if ( formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
   } 

   static noStrider (control: AbstractControl): ValidationErrors | null {

    const username = control.value?.toLowerCase();

    if (username === 'strider') {
      return {
        noStrider: true
      }
    }
    
    return null;

   }
}