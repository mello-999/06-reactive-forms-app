import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  myForm: FormGroup;

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {

    const password = control.get('password')?.value;
    const password2 = control.get('password2')?.value;

    if(!password || !password2) {
      return null;
    }

    if (password !== password2) {
      return {
        passwordMismatch: true
      };
    }
    return null;
  }

 usernameNoStrider(control: AbstractControl): ValidationErrors | null {

  const username = control.value?.toLowerCase();

  if (username === 'strider') {
    return {
      noStrider: true
    };
  }
  return null;
 }


  onSubmit() {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

  }

  constructor(
    private fb: FormBuilder
  ) {

    this.myForm = this.fb.group({
      name:['', [ 
        Validators.required,
      ]],
      email:['', [
        Validators.required,
        Validators.email
        ]],
      username:['', [
        Validators.required,
        Validators.minLength(6),
        this.usernameNoStrider.bind(this)
      ]],
      password:['',[
        Validators.required,
        Validators.minLength(6),
      ]],

      password2:['',  Validators.required ],

    },
    {
       validators: this.passwordMatchValidator
    });

  }
 


}  
    



// Formulario
//  name => obligatorio
//  email => obligatorio y un mail (Validators.email?)
//  username => obligatorio, minLength 6
//  passwword => obligatorio, minLength 6
//  passwword 2 => obligatorio (confirmaPassword seria un mejor nombre)


