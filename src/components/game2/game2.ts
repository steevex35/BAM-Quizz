import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ObjQuestion } from 'question';
import { User } from 'user';
import {I18N} from 'aurelia-i18n';
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
    this.router.navigateToRoute('game3')
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
    if(value1 === value2){
      console.log("GG")
      this.currentGamer.question_awnser3=10;
      this.saveGamer();
    }else{
      console.log("Looser")
      this.currentGamer.question_awnser3=0
      this.saveGamer();
    }
  }

  handleKeyInput = (event) => {
    if(event.key == 1){
      //this.tapeBuzzer()
      //console.log("Buzzer Bleu pushed")
      //console.log(this.blue)
      this.checkValidQuestion(this.blue,this.currentGamer.question3.valid)
    }
    if((event.key == 2)){
      //console.log("Buzzer Rouge pushed")
      //console.log(this.red)
      this.checkValidQuestion(this.red,this.currentGamer.question3.valid)
    }
    if((event.key == 3)){
      //this.stopCountdown()
      //this.countTapeBuzz=0
      //console.log("Buzzer Jaune pushed")
      //console.log(this.yellow)
      this.checkValidQuestion(this.yellow,this.currentGamer.question3.valid)
    }
    if((event.key == 4)){
      //console.log("Buzzer Vert pushed")
      //console.log(this.green)
      this.checkValidQuestion(this.green,this.currentGamer.question3.valid)
    }
     
  }
}