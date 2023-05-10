import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ObjQuestion } from 'question';
import { User } from 'user';
import { Peer } from "peerjs";
import {I18N} from 'aurelia-i18n';
import { HttpClient } from '@aurelia/fetch-client';

@autoinject
export class QuestionBase{
  private listQuestions:Array<ObjQuestion>;
  private q1:ObjQuestion;
  private q2:ObjQuestion;
  private q3:ObjQuestion;
  private q4:ObjQuestion;
  private q5:ObjQuestion;
  private q6:ObjQuestion;

  private buzzer=false;

  private currentGamer: User=null;



  private countdown:number;
  private interval:any;
  private countTapeBuzz: number;

  constructor(private router:Router, private i18n:I18N){
    this.countTapeBuzz =0;
    
    //this.startGame()
    //this.listenPeerJs()
   
  }


  startGame(){
    this.currentGamer = JSON.parse(localStorage.getItem('currentGamer')) || null;
    if(this.currentGamer == null){
    console.log("current gamer is null")
    }else{
      console.log("current gamer is not null")
      this.i18n.setLocale(this.currentGamer.lng);
      this.countdown = 0 
      this.startCountUp()
    }
  }

  tapeBuzzer(){
    this.countTapeBuzz++;
    console.log(this.countTapeBuzz);
  }


  stopCountdown(){
    this.buzzer = true;
  }



  startCountUp(){
    const time= 15;
    const fps = 99;
    const interval = Math.floor((this.currentGamer.question_base_max/time)/fps)
    
    this.interval=setInterval(()=>{
      console.log(this.buzzer)

      if(!this.buzzer){
        if(this.countdown == this.currentGamer.question_base_max){
          this.saveGamer()
          console.log("End of the game 1")
          console.log(this.countdown);
          clearInterval(this.interval);
          this.countTapeBuzz =0;
        }
        if(this.countdown < this.currentGamer.question_base_max){
          this.countdown +=interval;
        }
        if(this.countdown > this.currentGamer.question_base_max){
          this.countdown = this.currentGamer.question_base_max
          this.saveGamer()
          clearInterval(this.interval);
          console.log("End of the game 2");
          this.countTapeBuzz =0;
        }
     }else{
      this.saveGamer()
      console.log("End of the game 3")
      console.log(this.countdown);
      clearInterval(this.interval);
      this.countTapeBuzz=0;
     }
    },1000/fps);
  }


  /**
   * Save gamer info
   */
  async saveGamer(){
    this.currentGamer.response_question_base = this.countdown
    localStorage.setItem('currentGamer', JSON.stringify(this.currentGamer));
    //post 
    this.postGamer()
  }

  /**
   * Send info to backend
   */
  async postGamer(){
    //const url="http://192.168.129.10/php-api/api/create.php"
    const url="http://192.168.0.3/php-api/api/create.php"
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
        this.currentGamer=null
        localStorage.setItem('currentGamer', JSON.stringify(this.currentGamer));
        this.router.navigateToRoute('thanks')
       }
      })
      .catch(error => {
        console.log(error)
      })


    /*try {
      const httpResponse = await fetch(
        url,
        {
          method: "POST",
          body:JSON.stringify(this.currentGamer),
        }
      );
      const bodyResponse = await httpResponse.json()
      return true;
    }catch (error) {
      console.log(error);
      return false;
    }*/
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

  /** On keyboard pressed */
  handleKeyInput = (event) => {
    if(event.key == "y"){
      this.tapeBuzzer()
    }
    if((event.key == "y")&&(this.countTapeBuzz==1))
      this.startGame()
    if((event.key == "y")&&(this.countTapeBuzz==2)){
      this.stopCountdown()
      this.countTapeBuzz=0
    }
     
  }
}
