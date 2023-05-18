import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {ObjQuestion} from 'question';
import { User } from 'user';
import { Peer } from "peerjs";
import {I18N} from 'aurelia-i18n';
@autoinject

export class Questions{
  private currentUser: User;

  private peer = new Peer("sender",{host:"localhost",port:9000});

  constructor(private router:Router, private i18n:I18N){
    //let test=this.i18n.tr("q1");  
    //console.log(this.listQuestions);
  }

  selectQuestion(question){
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
