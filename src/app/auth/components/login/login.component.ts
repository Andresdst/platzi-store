import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { 
    this.buildForm()
  }

  ngOnInit(): void {
  }

  //grupo de controladores
  private buildForm(){
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login(event: Event){
    // como buena practica, se captura el evento y se previene comportamiento por defecto.
    event.preventDefault()
    //contra validacion por buena practica
    if(this.form.valid){
      console.log(this.form.value)
      this.router.navigate(['./home'])

    }
  }
}