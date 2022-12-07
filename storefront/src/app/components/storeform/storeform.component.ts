import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/data/services/store.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from 'src/app/data/models/store';
import { StoreForm } from 'src/app/data/models/storeform';


@Component({
  selector: 'app-storeform',
  templateUrl: './storeform.component.html',
  styleUrls: ['./storeform.component.scss'],
  providers: [DatePipe]
})
export class StoreformComponent implements OnInit {
  exampleForm: FormGroup
  stores: Store []
  storeForm: StoreForm
  installments = [1,2,3,4,5]
  constructor(private storeService: StoreService,
             private fb: FormBuilder,
             private datePipe: DatePipe) { }

  ngOnInit(): void {
      this.storeService.getStoreName().subscribe((data) => {
      
       this.stores = data
    })
    this.composeForm()
  }

  composeForm(): void {
    console.log('composeForm - ENTER')
    this.exampleForm = this.fb.group({
      storeName: this.fb.control('',Validators.required),
      address: this.fb.control({value: '', disabled: true}),
      phoneNumber: this.fb.control({value: '', disabled: true}),
      todayDate: this.fb.control({value: new Date(), disabled: true}, Validators.required),
      servedBy: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      sportPackage: this.fb.control('', Validators.required),
      band: this.fb.control('', Validators.required),
      tvPackage: this.fb.control('', Validators.required),
      monthlyCharge: this.fb.control('', Validators.required),
      upfrontFee: this.fb.control('', [Validators.required, Validators.min(5), Validators.max(100)]),
      installments: this.fb.control('', Validators.required),
      otherInformation: this.fb.control('', [Validators.required, Validators.max(45)])
    })

  }

  fillAditionalFormFields(value: string): void {
    let extracted = this.stores.filter(x => x.name === value)

    if (extracted) {
      this.exampleForm.patchValue({
        address: extracted[0].address,
        phoneNumber: extracted[0].phoneNumber
      })
    }
  }
  
  onReset(): void {
    this.exampleForm.reset()
    this.exampleForm.patchValue({
      todayDate: this.datePipe.transform(new Date, 'dd.MM.yyyy')
    })
  }

  onSubmit(): void {
    console.log(this.exampleForm.getRawValue())
    this.exampleForm.removeControl('address')
    this.exampleForm.removeControl('phoneNumber')
    
    this.storeService.postStoreInformation(this.exampleForm.getRawValue()).subscribe({
      next: (data) => {
        console.log(data)
      }, error: (err) => {
        alert('Something went wrong when inserting data to DB')
      }
    })
  }
 

}
