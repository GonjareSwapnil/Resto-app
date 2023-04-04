import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // now here i will define post get put delete ..
  // Create Restorent Using Post Method......
  postRestaurant(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  // Get Restorent Data Using Get Method......
  getRestaurant(){
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }
  // Update Restorent Data Using put Method
  updateRestaurant(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  // Delete Restorent Data Using Delete Method
  deleteRestaurant(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
}
}
