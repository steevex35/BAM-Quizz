import { HttpClient } from '@aurelia/fetch-client';
import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';
import internal from 'stream';
import { User } from 'user';
@autoinject


export class Thanks{

  private interval:any
  private countdown= 3

  private currentGamer: User=null;

  private final_score:number
 

  constructor(private router:Router, private i18n:I18N){
    this.i18n.setLocale(window.localStorage.getItem('lng_sesison'));
    this.currentGamer = JSON.parse(localStorage.getItem('currentGamer')) || null;
    this.final_score = this.currentGamer.question_awnser1 + this.currentGamer.question_awnser2 + this.currentGamer.question_awnser3 + this.currentGamer.question_awnser4 
    this.backTogamePage()
  }

  backTogamePage(){
  
    this.interval=setInterval(()=>{
      if(this.countdown == 0){
        clearInterval(this.interval);
        this.currentGamer=null
          localStorage.setItem('currentGamer', JSON.stringify(this.currentGamer));
        this.router.navigateToRoute('game')
        window.location.reload();
      }
      if(this.countdown > 0){
        this.countdown --;
      }
    }, 1000);
  }

  detached() {
    clearInterval(this.interval);
  }
  
}
