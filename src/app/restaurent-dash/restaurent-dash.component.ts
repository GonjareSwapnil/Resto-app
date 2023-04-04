import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestorentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formvalue!: FormGroup
  formValue: any;
  restaurentModelObj :RestorentData = new RestorentData;
  allRestaurentData:any;
  showAdd!:boolean;
  showbtn!:boolean;


  constructor(private formbuilder: FormBuilder,private api: ApiService) { }


  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData();
   }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }
   // Now Subscribing Our Data Which is maped Via Services
  addRestaurent(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurentModelObj).subscribe((res:any)=>{
      console.log(res);
      alert("Restaurent Recoed Added Successfully");

      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    }),
    
   ((err:any)=>{
      alert( "Somthing Went Wrong");
   })
  }
  getAllData(){
    this.api.getRestaurant().subscribe((res:any)=>{
      this.allRestaurentData = res;
    })
  }
  // Delet record
  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
     alert("Restaurant Record Deleted");
      this.getAllData();
     }) 
  }
  onEditResto(data:any){
    this.showAdd = false;
    this.showbtn = true;
    this.restaurentModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id)
    .subscribe((res:any)=>{
      alert("Restoarent Recored Updated");
    })
  }
}
