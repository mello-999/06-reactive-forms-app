import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  FormUtils = FormUtils;

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
        Validators.pattern(FormUtils.namePattern),
      ]],
      email:['', 
        [
        Validators.required,
        Validators.email,
        Validators.pattern(FormUtils.emailPattern)       
        ],
        [
          FormUtils.checkingServerResponse
        ]
      ],
      username:['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(FormUtils.notOnlySpacesPattern),
        this.usernameNoStrider.bind(this)
      ]],
      password:['',[
        Validators.required,
        Validators.minLength(6),
      ]],

      password2:['',  Validators.required ],

    }, 
    {
       validators: FormUtils.isFieldOneEqualFieldTwo('password', 'password2')
    });

  }
 


}  
    





