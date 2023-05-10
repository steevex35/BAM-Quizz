import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {DialogController} from 'aurelia-dialog';
@autoinject

export class Reglement{
  constructor(private router:Router, private dialogController: DialogController){

    this.dialogController = dialogController
    
  }
  
  
}
