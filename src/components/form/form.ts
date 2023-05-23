import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from 'user';
import {I18N} from 'aurelia-i18n';
import { DialogService } from 'aurelia-dialog';
import { Reglement } from 'components/reglement/reglement';
import { Peer } from "peerjs";
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

  private peer = new Peer("sender",{host:"localhost",port:9000});
  //private peer = new Peer("sender",{host:"192.168.0.1",port:9000});


  constructor(private router:Router,private i18n:I18N,private dialogService:DialogService){
    this.userLng = this.i18n.getLocale();
    this.i18n.setLocale(window.localStorage.getItem('lng_sesison'));
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
      this.toGamePage()
      this.router.navigateToRoute('thanks_ipad')
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
      response:0,
      lng: window.localStorage.getItem('lng_sesison')
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

  toGamePage(){
      /**
     * Todo: send data to PeerJs and Start Game
     */
       const conn = this.peer.connect("receiver");
       conn.on("open", () => {
         conn.send(this.currentUser);
       });
    //console.log("send signal via peerJS to game page")
    
  }

  

  


  
}
