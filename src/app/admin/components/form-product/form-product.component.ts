import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms'
import {Router} from '@angular/router'

import {ProductsService} from '../../../core/services/products/products.service'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form!: FormGroup  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productsService:ProductsService) { 
    this.buildForm()
  }

  ngOnInit(): void {
  }

  //grupo de controladores
  private buildForm(){
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: [0, [Validators.required]],
      image: '',
      description: ['', [Validators.required]],
    })
  }
  
  saveProduct(event: Event){
    // como buena practica, se captura el evento y se previene comportamiento por defecto.
    event.preventDefault()
    //contra validacion por buena practica
    if(this.form.valid){
      const newProduct = this.form.value
      this.productsService.postProduct(newProduct)
      .subscribe(res=>{
        console.log(res)
        this.router.navigate(['./admin/products'])
      })
    }
    // console.log(this.form.value)
  }
}
