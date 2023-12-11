import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { iEdit } from '../tab1/tab1.page';
import { productEdit } from '../tab1/tab1.page';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage {

  public productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private productService: ProductService, 
    private toastController: ToastController, 
    private router: Router) {
      this.productForm = this.formBuilder.group({
        id: [productEdit.id],
        name: [productEdit.name, Validators.required],
        price: [productEdit.price, Validators.required],
        description: [productEdit.description],
        photo: [  productEdit.photo],
        type: [productEdit.type, Validators.required]
      });
     }

     async updateProduct(){
      const product = this.productForm.value;
      this.productService.editProduct(product);
  
      const toast = await this.toastController.create({
        message: 'Producto actualizado',
        duration: 2000,
        position: 'bottom'
      });
      
      
      toast.present();
      this.router.navigate(['/tabs/tab1']);
    }

}
