import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from 'user';
import {I18N} from 'aurelia-i18n';
import { DialogService } from 'aurelia-dialog';
import { Reglement } from 'components/reglement/reglement';
@autoinject

export class Form{

  private errorMessage:string;
  private prenom:string = null;
  private nom:string = null;
  private sex: string = null;
  private entreprise:string = null;
  private email:string =null;
  private reglement:boolean =null;
  private newsletter:boolean = null;
  private expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  private currentUser: User;
  private userLng;


  constructor(private router:Router,private i18n:I18N,private dialogService:DialogService){
    this.userLng =  this.i18n.getLocale();
    console.log(this.userLng)
    this.dialogService = dialogService
    
  }

  clickReglement(){
    this.dialogService.open({viewModel:Reglement}).whenClosed(response => {
      console.log(response.output);
    });
  }

  validate(){
    if(this.isEmpty(this.prenom) || this.isEmpty(this.nom) || this.isEmpty(this.sex) || this.isEmpty(this.entreprise) || this.isEmpty(this.reglement)){
      this.errorMessage="Please complete all fields";
      console.log(this.errorMessage)
    }else if(this.validEmail(this.email)){
      this.errorMessage="Please verify your email";
      console.log(this.errorMessage)
    }
    else{
      this.setUser();
      this.errorMessage=null;
      console.log(this.currentUser)
      this.router.navigateToRoute('questions')
    }
  }

  setUser(){
    switch (this.sex) {
      case '1':
        this.sex = 'F';
        break;
      case '2':
        this.sex = 'M';
        break;
      case '3':
        this.sex = 'X';
        break;
      default:
        break;
    }
     //build User 
     this.currentUser={
      prenom:this.prenom,
      nom:this.nom,
      sex:this.sex,
      entreprise:this.entreprise,
      email: this.email,
      reglement: this.reglement,
      newsletter: this.newsletter,
      question:"",
      question_awnser:0,
      response:0,
      question_base:"",
      question_base_max:0,
      response_question_base:0,
      question_base_awnser:0,
      lng: this.userLng
    }
    //set User in the Local Storage
    this.setUserInLocalStorage(this.currentUser);
  }

  setUserInLocalStorage(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
  }


   isEmpty(input): boolean{
    if(input ==null || input=='')
     return true
    else
      return false
  }

  validEmail(email): boolean{
    const result: boolean = this.expression.test(email); 
    //console.log('e-mail is ' + (result ? 'correct' : 'incorrect'));
    if(result)
      return false 
    else
      return true
  }


  retour(){
    this.router.navigateToRoute('home')
    window.location.reload()
  }

  

  


  
}
