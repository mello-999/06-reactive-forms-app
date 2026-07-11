import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe, ReactiveFormsModule
  ],
  templateUrl: './basic-page.html',
})
export class BasicPage {

   private fb = inject(FormBuilder);

   myForm: FormGroup = this.fb.group({
     name: ['', [Validators.required, Validators.minLength(3)]],
     price: [0, [Validators.required, Validators.min(10)]],
     inStorage: [0, [Validators.required, Validators.min(0)] ],
   });


//  myForm = new FormGroup({
//     name: new FormControl(''),
//     price: new FormControl(0),
//     inStorage: new FormControl(0),

isValidField( FieldName: string ): boolean | null {
   return  (this.myForm.controls[FieldName].errors &&
            this.myForm.controls[FieldName].touched
          );
}

getFieldError( FieldName: string): string | null {

 if ( !this.myForm.controls[FieldName] ) return null;
      
 const errors = this.myForm.controls[FieldName].errors ?? {};

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
onSave() {
  if (this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }

  console.log(this.myForm.value);
  
  this.myForm.reset({
    price: 0,
    inStorage: 0,
  });
  
  
  }

}
