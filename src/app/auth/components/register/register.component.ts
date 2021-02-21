import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms'
import {Router} from '@angular/router'

import { AuthService } from '../../../core/services/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private router: Router) {
      this.buildForm()
     }

  ngOnInit(): void {
  }

  //grupo de controladores
  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  register(event: Event){
    // como buena practica, se captura el evento y se previene comportamiento por defecto.
    event.preventDefault()
    //contra validacion por buena practica
    if(this.form.valid){
      const value = this.form.value
      console.log(value)

      this.authService.createUser(value.email,value.password)
        .then(()=>{
          this.router.navigate(['./auth/login'])

        })


    }
  }

}
