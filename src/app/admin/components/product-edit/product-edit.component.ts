import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute, Params } from '@angular/router';

import { Myvalidatos } from 'src/app/utils/myvalidatos';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form!: FormGroup
  id!:string

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productsService:ProductsService,
    private activatedRoute: ActivatedRoute,
    ) { 
    this.buildForm()
  }

  ngOnInit(): void {
    //leer id de la ruta
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.id = params.id
      this.productsService.getProduct(this.id)
      .subscribe(product=>{
        //se llena el formulario con los datos del producto obtenido
        this.form.patchValue(product)
      })
    })
  }

  //grupo de controladores
  private buildForm(){
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: [0, [Validators.required,Myvalidatos.isPriceValid]],
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
      this.productsService.updateProduct(this.id,newProduct)
      .subscribe(res=>{
        console.log(res)
        this.router.navigate(['./admin/products'])
      })
    }
    // console.log(this.form.value)
  }
  //getter nativo se puede usar en ngIf validador
  // get priceField(){
  //   return this.form.get('price')
  // }
}
