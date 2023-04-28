import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalHelper {
  constructor(private location: Location) { }

 
  goBack() {
    this.location.back();
  }
}