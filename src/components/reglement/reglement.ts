import { autoinject,DOM } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {DialogController} from 'aurelia-dialog';
import { I18N } from 'aurelia-i18n';
@autoinject


export class Reglement{
  private userLng;
  private displayR;
  constructor(private router:Router,private i18n:I18N, private dialogController: DialogController, private element:Element){
    this.i18n.setLocale(window.localStorage.getItem('lng_sesison'));
    this.dialogController = dialogController

  }
  
}
