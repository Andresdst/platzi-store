import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms'
import { AngularFireStorage } from '@angular/fire/storage'
import {Router} from '@angular/router'
import { finalize } from 'rxjs/operators'
import {Myvalidatos} from '../../../utils/myvalidatos'

import {ProductsService} from '../../../core/services/products/products.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form!: FormGroup
  imageURL$: Observable<any>

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private angularFireStorage:AngularFireStorage,
    private productsService:ProductsService) { 
    this.buildForm()
  }

  ngOnInit(): void {
  }

  uploadFile(event){
    const file = event.target.files[0]
    console.log(file)
    const name = 'images' //se puede sacar el nombre del event
    const fileRef = this.angularFireStorage.ref(name) //referencia
    const task = this.angularFireStorage.upload(name,file) //subir archivo. tarea es un observable
    //saber cuando finaliza. devuelve un obervable
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.imageURL$ = fileRef.getDownloadURL()
          this.imageURL$.subscribe(url => this.form.get('image').setValue(url))
        })
      )
      .subscribe()
  }

  //grupo de controladores
  private buildForm(){
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: [0, [Validators.required,Myvalidatos.isPriceValid]],
      image: [''],
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
  //getter nativo se puede usar en ngIf validador
  // get priceField(){
  //   return this.form.get('price')
  // }
}
