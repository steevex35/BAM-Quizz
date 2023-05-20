import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ObjQuestion } from 'question';
import { User } from 'user';
import {I18N} from 'aurelia-i18n';
import { HttpClient } from '@aurelia/fetch-client';
@autoinject

export class Game2{


  private currentGamer: User=null;


  private interval:any;
  

  private red:any;
  private yellow:any;
  private green:any;
  private blue:any;



  constructor(private router:Router, private i18n:I18N){
    this.i18n.setLocale(window.localStorage.getItem('lng_sesison'));
    this.currentGamer = JSON.parse(localStorage.getItem('currentGamer')) || null;
    
  }


  /**
   * Save gamer info
   */
  async saveGamer(){
    localStorage.setItem('currentGamer', JSON.stringify(this.currentGamer));
    this.postGamer()
    this.router.navigateToRoute('thanks')
  }

  /** On page activate */
  /**
   * LifeCycle order:
   * constructor, attach, activate, bind
   * Destruction
   * destroy(), detached, deactivated, unbind;
   */
  activate() {
    window.addEventListener('keypress', this.handleKeyInput, false);
  }

  deactivate() {
   window.removeEventListener('keypress', this.handleKeyInput);
  }

  detached() {
    clearInterval(this.interval);
  }

  /** Buzze 
   * Bleu 1
   * Rouge 2
   * Jaune 3
   * Vert 4
  */
  checkValidQuestion(value1:string,value2:string){
    this.currentGamer.question1=this.currentGamer.question1Obj.description;
    this.currentGamer.question2=this.currentGamer.question2Obj.description;
    this.currentGamer.question3=this.currentGamer.question3Obj.description;
    this.currentGamer.question4=this.currentGamer.question4Obj.description;
    if(value1 === value2){
      console.log("GG")
      this.currentGamer.question_answer4=value1;
      this.currentGamer.response=this.currentGamer.response + 10;
      this.saveGamer();
    }else{
      console.log("Looser")
      this.currentGamer.question_answer4=value1;
      this.currentGamer.response=this.currentGamer.response + 0;
      this.saveGamer();
    }
  }

  handleKeyInput = (event) => {
    if(event.key == 1){
      //this.tapeBuzzer()
      //console.log("Buzzer Bleu pushed")
      //console.log(this.blue)
      this.checkValidQuestion(this.blue,this.currentGamer.question4Obj.valid)
    }
    if((event.key == 2)){
      //console.log("Buzzer Rouge pushed")
      //console.log(this.red)
      this.checkValidQuestion(this.red,this.currentGamer.question4Obj.valid)
    }
    if((event.key == 3)){
      //this.stopCountdown()
      //this.countTapeBuzz=0
      //console.log("Buzzer Jaune pushed")
      //console.log(this.yellow)
      this.checkValidQuestion(this.yellow,this.currentGamer.question4Obj.valid)
    }
    if((event.key == 4)){
      //console.log("Buzzer Vert pushed")
      //console.log(this.green)
      this.checkValidQuestion(this.green,this.currentGamer.question4Obj.valid)
    }
  }

    /**
   * Send info to backend
   */
    async postGamer(){
      const url="http://192.168.129.10/php-api/api/create.php"
      //const url="http://192.168.0.3/php-api/api/create.php"
      const http = new HttpClient();
      await http.fetch(url,{
        method: "POST",
        body: JSON.stringify(this.currentGamer),
        headers:{
          
        }
      })
      .then(response => response)
      .then(async data => {
         console.log(data.text());
         if(data.status == 200){
          const sleep = (ms) => new Promise(r => setTimeout(r, ms));
          await sleep(2000);
          
          this.router.navigateToRoute('thanks')
         }
        })
        .catch(error => {
          console.log(error)
        })
  
    }


}
