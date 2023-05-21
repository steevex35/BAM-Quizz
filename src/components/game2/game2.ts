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

  private reward_win;
  private reward_loose;
  private game_done = false;

  private counter: { min: number, sec: number }//new
  private clock;//new



  constructor(private router:Router, private i18n:I18N){
    this.i18n.setLocale(window.localStorage.getItem('lng_sesison'));
    this.currentGamer = JSON.parse(localStorage.getItem('currentGamer')) || null;
    this.startTimer()//new
  }

   //new
   stopTimer(){
    clearInterval(this.clock);
  }
  
//new
  startTimer() {
    this.counter = { min: 0, sec: 20 } // choose whatever you want
    this.clock = setInterval(() => {
      if(this.counter.sec != 0)
        this.counter.sec --;
      if (this.counter.min === 0 && this.counter.sec == 0) {
        this.checkValidQuestion('time over',this.currentGamer.question1Obj.valid)
        this.stopTimer()
      }
    }, 1000)
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
    clearInterval(this.clock); //new
  }

  /** Buzze 
   * Bleu 1
   * Rouge 2
   * Jaune 3
   * Vert 4
  */
  async checkValidQuestion(value1:string,value2:string){
    const delay = ms => new Promise(res => setTimeout(res, ms));
    this.stopTimer();
    if(value1 === value2){
      //console.log("GG")
      this.game_done=true
      this.reward_win.classList.add("display_reward")
      this.currentGamer.question_answer3=value1;
      this.currentGamer.response=this.currentGamer.response + 10*this.counter.sec;
      await delay(2000);
      this.saveGamer();
    }else{
      //console.log("Looser")
      this.game_done=true
      this.reward_loose.classList.add("display_reward")
      this.currentGamer.question_answer3=value1;
      this.currentGamer.response=this.currentGamer.response + 0*this.counter.sec;
      await delay(2000);
      this.saveGamer();
    }
  }

  handleKeyInput = (event) => {
    if(event.key == 1){
      //this.tapeBuzzer()
      //console.log("Buzzer Bleu pushed")
      //console.log(this.blue)
      this.checkValidQuestion(this.blue,this.currentGamer.question3Obj.valid)
    }
    if((event.key == 2)){
      //console.log("Buzzer Rouge pushed")
      //console.log(this.red)
      this.checkValidQuestion(this.red,this.currentGamer.question3Obj.valid)
    }
    if((event.key == 3)){
      //this.stopCountdown()
      //this.countTapeBuzz=0
      //console.log("Buzzer Jaune pushed")
      //console.log(this.yellow)
      this.checkValidQuestion(this.yellow,this.currentGamer.question3Obj.valid)
    }
    if((event.key == 4)){
      //console.log("Buzzer Vert pushed")
      //console.log(this.green)
      this.checkValidQuestion(this.green,this.currentGamer.question3Obj.valid)
    }
     
  }
}
