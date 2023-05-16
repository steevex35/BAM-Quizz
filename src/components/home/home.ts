import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import { HttpClient } from '@aurelia/fetch-client';
@autoinject
export class Home{
  constructor(private router:Router, private i18n:I18N){
   
  }

  setLngAndRoute(lng:string){
    this.i18n.setLocale(lng);
    window.localStorage.setItem("lng_sesison", lng);
    this.router.navigateToRoute('form')
  }
  
  attached() {     // set a random interval for the first call
  }
  
}
