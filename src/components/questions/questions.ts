import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {ObjQuestion} from 'question';
import { User } from 'user';
import { Peer } from "peerjs";
import {I18N} from 'aurelia-i18n';
@autoinject

export class Questions{
  private listQuestions:Array<ObjQuestion>;
  private q1:ObjQuestion;
  private q2:ObjQuestion;
  private q3:ObjQuestion;
  private q4:ObjQuestion;
  private q5:ObjQuestion;
  private q6:ObjQuestion;

  private listQuestionsNl:Array<ObjQuestion>;
  private q1Nl:ObjQuestion;
  private q2Nl:ObjQuestion;
  private q3Nl:ObjQuestion;
  private q4Nl:ObjQuestion;
  private q5Nl:ObjQuestion;

  private currentUser: User;

  private peer = new Peer("sender",{host:"localhost",port:9000});

  constructor(private router:Router, private i18n:I18N){
    //let test=this.i18n.tr("q1");
  

    this.q1={description:this.i18n.tr("q1"),answer:2385925,max:3000000};  //max:   min:
    this.q2={description:this.i18n.tr("q2"),answer:787, max:10000}
    this.q3={description:this.i18n.tr("q3"),answer:73694987, max:100000000}
    this.q4={description:this.i18n.tr("q4"),answer:30614,max:40000}
    this.q5={description:this.i18n.tr("q5"),answer:1858,max:8000}
    this.q6={description:this.i18n.tr("q6"),answer:1858,max:6000}
    this.listQuestions=[this.q1,this.q2,this.q3,this.q4,this.q5];
    
    //console.log(this.listQuestions);
  }

  selectQuestion(question){
    this.getCurrentUser()
    this.currentUser.question = question.description;
    this.currentUser.question_awnser = question.answer;
    this.currentUser.max = question.max;
    this.currentUser.question_base = this.q6.description;
    this.currentUser.question_base_max = this.q6.max;
    this.currentUser.question_base_awnser = this.q6.answer;
    console.log(this.currentUser)

    this.toGamePage()
  }

  getCurrentUser(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  toGamePage(){
      /**
     * Todo: send data to PeerJs and Start Game
     */
       const conn = this.peer.connect("receiver");
       conn.on("open", () => {
         conn.send(this.currentUser);
        this.router.navigateToRoute('thanks_ipad')
       });
    //console.log("send signal via peerJS to game page")
    
  }



  
}
