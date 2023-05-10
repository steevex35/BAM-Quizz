import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ObjQuestion } from 'question';
import internal from 'stream';
@autoinject


export class ScreenVideo{

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

  private interval:any
  private countdown=10;
  private switchlng=false;
  private bVideo=true;
  private currentGamer;

 

  constructor(private router:Router){

    this.q1={description:"Combien de ménages faisaient  partie de la database Carrefour en 2021?",answer:2385925,max:3000000};  //max:   min:
    this.q2={description:"Combien y a-t-il de magasins Carrefour en Belgique, tous formats confondus (hypermarchés, supermarchés market, magasins de proximité express), à date du 14/11/2022 ?",answer:787, max:10000}
    this.q3={description:"Combien de transactions ont été réalisées en 2021 dans tous les magasins Carrefour de Belgique ?",answer:73694987, max:100000000}
    this.q4={description:"Combien de produits différents compte en moyenne un hypermarché Carrefour en Belgique ?",answer:30614,max:40000}
    this.q5={description:"Combien de campagnes médiatiques ont été menées par Carrefour Links Belgium pour des annonceurs en 2021 ?",answer:1858,max:5000}
    this.listQuestions=[this.q1,this.q2,this.q3,this.q4,this.q5];

    this.q1Nl={description:"Hoeveel huishoudens zaten er in de Carrefour-database in 2021?",answer:2385925,max:3000000};  //max:   min:
    this.q2Nl={description:"Hoeveel Carrefour-winkels zijn er in België (hypermarkten, market supermarkten en express-buurtwinkels samen), te tellen vanaf 14/11/2022?",answer:787, max:10000}
    this.q3Nl={description:"Hoeveel kassatransacties vonden in 2021 plaats in alle Carrefour-winkels in België samen?",answer:73694987, max:100000000}
    this.q4Nl={description:"Hoeveel verschillende producten kan je gemiddeld terugvinden in een Carrefour hypermarkt in België?",answer:30614,max:40000}
    this.q5Nl={description:"Hoeveel mediacampagnes werden door Carrefour Links Belgium uitgevoerd in 2021, op vraag van adverteerders?",answer:1858,max:5000}
   
    this.listQuestionsNl=[this.q1Nl,this.q2Nl,this.q3Nl,this.q4Nl,this.q5Nl];

    //this.intervalSwitch();
   
  }

  displayVideo(){
    this.currentGamer = JSON.parse(localStorage.getItem('currentGamer')) || null;
    if(this.currentGamer == null){
      this.bVideo = false
      
    }else{
      this.bVideo = true
      //clearInterval(this.interval);
    }
  }


  intervalSwitch(){
    this.interval=setInterval(()=>{
      if(this.countdown == 0){
        this.switchlng = !this.switchlng;
        //console.log(this.countdown);
        //console.log(this.switchlng);
        this.countdown = 10;
      }
      if(this.countdown > 0){
        this.countdown --;
        this.displayVideo()
        //console.log(this.bVideo);
      }
    }, 1000);
  }

  detached() {
    clearInterval(this.interval);
  }



  

  
}
