import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ObjQuestion } from 'question';
import { User } from 'user';
import { Peer } from "peerjs";
import {I18N} from 'aurelia-i18n';
import { HttpClient } from '@aurelia/fetch-client';
@autoinject

export class Game{
  private listQuestionsFR:Array<ObjQuestion>=[];
  
  private listQuestionsNL:Array<ObjQuestion>=[];





  private buzzer=false;

  private currentGamer: User=null;

  private peer = new Peer("receiver",{host:"localhost",port:9000});
  // private peer = new Peer("receiver",{host:"192.168.0.1",port:9000});

  private countdown=0;
  private interval:any;
  
  private countdownGame=0;
  private intervalUp:any;

  private isAnime1 = false
  private isAnime2 = false

  private questionsAleatoires: Array<ObjQuestion> = [];
  private red:any;
  private yellow:any;
  private green:any;
  private blue:any;

  private reward_win;
  private reward_loose;
  private game_done = false;

  private counter: { min: number, sec: number }//new
  private clock;//new

  private getReady=true;
  private getReadyCounter=10;

  private goodAnswer;//new
  



  constructor(private router:Router, private i18n:I18N){
    this.i18n.setLocale(window.localStorage.getItem('lng_sesison'));
    //console.log(this.listQuestions);
    this.countdownGetready()
    this.startGame()
  }

  bind() {
    this.startTimeNoGamer()
    this.listenPeerJs()
  }
 

  startTimeNoGamer(){
    this.interval=setInterval(()=>{
      if(this.countdown == 0){
        this.isAnime1 = !this.isAnime1;
      
      }
      if(this.countdown == 5){
        this.isAnime1 = !this.isAnime1;
        this.isAnime2 = !this.isAnime2;
      
      }
      if(this.countdown == 10){
        this.isAnime2 = !this.isAnime2;
        this.isAnime1 = !this.isAnime1;
        this.countdown=0
      }
      this.countdown++
      //console.log(this.countdown)
    }, 1000);
  }

  
  listenPeerJs(){
    this.peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        localStorage.setItem('currentGamer', JSON.stringify(data));
        window.location.reload();
        console.log("data received"+data);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });
  }

  startGame(){
    this.currentGamer = JSON.parse(localStorage.getItem('currentGamer')) || null;
    if(this.currentGamer == null){
    console.log("current gamer is null")
    console.log("Stay here")
    }else{
      this.i18n.setLocale(this.currentGamer.lng)
      //this.startTimer()
      console.log("current gamer is not null")
      console.log("Go first question")
      this.initQuestion()
      if(this.currentGamer.lng==="fr"){
        this.choisirQuestionsAleatoires(this.listQuestionsFR,4)
        this.addQuestionCurrentGamer(this.currentGamer)
      }else{
        this.choisirQuestionsAleatoires(this.listQuestionsNL,4)
        this.addQuestionCurrentGamer(this.currentGamer)
      }
     
     
  
    }
  }

  choisirQuestionsAleatoires(questions: Array<ObjQuestion>, nombreQuestions: number): Array<ObjQuestion> {
    // Vérifier si le nombre demandé est supérieur ou égal à la taille de la liste
    if (nombreQuestions >= questions.length) {
      return questions;
    }
  
    while (this.questionsAleatoires.length < nombreQuestions) {
      const indexAleatoire = Math.floor(Math.random() * questions.length);
      const questionAleatoire = questions[indexAleatoire];
  
      // Vérifier si la question aléatoire est déjà présente dans la liste des questions sélectionnées
      if (!this.questionsAleatoires.includes(questionAleatoire)) {
        this.questionsAleatoires.push(questionAleatoire);
      }
    }
  
    return this.questionsAleatoires;
  }


  addQuestionCurrentGamer(g:User){
    //console.log(random, this.listQuestions[random]);
   g.question1Obj=this.questionsAleatoires[0]
   g.question2Obj=this.questionsAleatoires[1]
   g.question3Obj=this.questionsAleatoires[2]
   g.question4Obj=this.questionsAleatoires[3]

    console.log(g)
  }

  initQuestion(){
    this.listQuestionsFR.push(
      {description:"Combien y a-t-il de téléchargements de l'app Carrefour au 07/05?",answer1:"725.980",answer2:"1.052.000",answer3:"1.236.000",answer4:"1.890.500",valid:"1.236.000"},
      {description:"Combien y a-t-il eu d'utilisateurs uniques de l'app Carrefour au mois d'avril 2023?",answer1:"75.258",answer2:"112.580",answer3:"195.880",answer4:"215.302",valid:"215.302"},
      {description:"Complétez: Sur le site e-commerce de Carrefour Belgique, 33% des ajouts aux paniers proviennent en 2022:  ",answer1:"via les pages catégories",answer2:"via la recherche directe",answer3:"via la page folder",answer4:"via un banner sur la homepage",valid:"via les pages catégories"},
      {description:"Quel est le taux de completion moyen d'une story dans l'app Carrefour et sur la home page du site carrefour.be sur les 4 premiers mois de 2023? Information : Le taux de completion correspond au % de cartes vues par rapport au nombre total de cartes contenues dans la story.",answer1:"58%",answer2:"62%",answer3:"68%",answer4:"68%",valid:"62%"},
      {description:"Dans quel package proposé par Carrefour Links peut-on retrouver la story?",answer1:"Pack Innovation Classic",answer2:"Pack Innovation Plus",answer3:"Pack Thématique",answer4:"Pack Innovation Instore",valid:"Pack Innovation Classic"},
      {description:"Quelle est la page catégorie la plus visitée sur le site e-commerce de Carrefour Belgique en avril 2023?",answer1:"Epicerie",answer2:"Non-alimentaire",answer3:"Boissons",answer4:"Produit Frais",valid:"Produit Frais"},
      {description:"En 2022, quel est le pourcentage de commande réalisée sur le site Carrefour.be avec une Carrefour Bonus Card par rapport au nombre total de commandes effectuées ?",answer1:"55%",answer2:"68%",answer3:"75%",answer4:"92%",valid:"92%"},
      {description:"En 2022, quelle est la répartition des tickets de caisses émis avec utilisation d'une Carrefour Bonus Card par rapport au nombre total de tickets émis (sur base du CA)?",answer1:"51,56%",answer2:"56,03%",answer3:"58,47%",answer4:"61,55%",valid:"56,03%"},
      {description:"Complétez : En 2022 en Hypermarché Carrefour, les détenteurs de la Carrefour Bonus Card ont généré .... % du chiffre d'affaires total Hypermarché",answer1:"52,85%",answer2:"65,12%",answer3:"70,91%",answer4:"77,45%",valid:"70,91%"},
      {description:"Combien y a t-il de ménages détenteurs d'une Carrefour Bonus Card en Belgique en 2022?",answer1:"1.254.544 ménages",answer2:"2.124.312 ménages",answer3:"2.307.414 ménages",answer4:"2.553.897 ménages",valid:"2.307.414 ménages"},
      {description:"Combien de clients sont membres de Bonusland (plateforme qui regroupe toutes les activations promotionnelles des marques et de Carrefour) au 06/05/2023?",answer1:"128.587",answer2:"287.257",answer3:"395.496",answer4:"478.946",valid:"478.946"},
      {description:"Quel est le temps moyen d'engagement entre le client et une marque via un jeu sur Bonusland (plateforme qui regroupe toutes les activations promotionnelles des marques et de Carrefour) en 2022?",answer1:"moins de 1 minute",answer2:"entre 1 et 2 minutes",answer3:"entre 2 et 3 minutes",answer4:"entre 3 et 4 minutes",valid:"entre 2 et 3 minutes"},
      {description:"Combien y-a-til eu de participations au total depuis 2020 et jusqu'au 06/05/2023 aux actions sur Bonusland (plateforme qui regroupe toutes les activations promotionnelles des marques et de Carrefour)?",answer1:"458.965",answer2:"875.964",answer3:"1.058.741",answer4:"1.228.743",valid:"1.228.743"},
      {description:"Quel type d'activations promotionnelles retrouve-t-on sur Bonsuland (plateforme qui regroupe toutes les activations promotionnelles des marques et de Carrefour)?",answer1:"jeu - épargne - concours - cashback",answer2:"couponning",answer3:"folder",answer4:"sondage",valid:"jeu - épargne - concours - cashback"},
      {description:"Combien y a-t-il de magasins Carrefour en Belgique (franchisés et intégrés) au 30/04/2023?",answer1:"548",answer2:"704",answer3:"789",answer4:"925",valid:"704"},
      {description:"Combien de 'promo bas de tickets de caisse' ont été émis en 2022?",answer1:"125.457.821",answer2:"228.862.454",answer3:"305.248.367",answer4:"415.228.728",valid:"228.862.454"},
      {description:"D'après l'étude 'Carrefour Food magazine Custometer Final report' de septembre 2021, le Carrefour food magazine est lu entièrement par:",answer1:"36% des lecteurs",answer2:"58% des lecteurs",answer3:"64% des lecteurs",answer4:"72% des lecteurs",valid:"64% des lecteurs"},
      {description:"Dans quel packages proposés par Carrefour Links peut-on retrouver la Box Client?",answer1:"Packs Summer et Back to school",answer2:"Pack Innovation Instore",answer3:"Pack Innovation Plus",answer4:"Pack Innovation Classic",valid:"Packs Summer et Back to school"},
      {description:"Complétez : Un consommateur a été exposé à ....... promos folders alimentaire des principales enseignes de la grande distribution en Belgique, sur les 12 premières semaines de 2023(étude réalisée par Carrefour)",answer1:"1.000 promos par mois",answer2:"2.000 promos par mois",answer3:"3.000 promos par mois",answer4:"4.000 promos par mois",valid:"3.000 promos par mois"},
      {description:"Complétez : ... % des consommateurs déclarent que la personnalisation joue un rôle important dans leur décision d'achat (étude réalisée par infoys studies)",answer1:"75%",answer2:"82%",answer3:"86%",answer4:"91%",valid:"86%"},
      {description:"Complétez : .... % des consommateurs ont déclaré avoir déjà acheté un produit après l'avoir découvert via un sampling ou un échantillon gratuit (étude realisée par CSA)",answer1:"75%",answer2:"84%",answer3:"89%",answer4:"89%",valid:"84%"},
    );  
    // list NL
    this.listQuestionsNL.push(
      {description:"Hoeveel downloads van de Carrefour-app zijn er op 07/05/2023?",answer1:"725.980",answer2:"1.052.000",answer3:"1.236.000",answer4:"1.890.500",valid:"1.236.000"},
      {description:"Hoeveel unieke gebruikers van de Carrefour-app waren er in april 2023?",answer1:"75.258",answer2:"112.580",answer3:"195.880",answer4:"215.302",valid:"215.302"},
      {description:"Vervolledig: Op de e-commercesite van Carrefour Belgium is 33% van de toevoegingen aan het winkelmandje in 2022 afkomstig van …",answer1:"de categorie pagina's",answer2:"direct zoeken",answer3:"de folder pagina",answer4:"een banner op de home pagina",valid:"de categorie pagina's"},
      {description:"Wat is het gemiddelde voltooiingspercentage van een story in de Carrefour-app en op de startpagina van carrefour.be over de eerste 4 maanden van 2023? Informatie: het voltooiingspercentage komt overeen met het % kaarten dat is gezien in vergelijking met het totale aantal kaarten in het verhaal. ",answer1:"58%",answer2:"62%",answer3:"68%",answer4:"75%",valid:"62%"},
      {description:"In welk pack van Carrefour Links is de story terug te vinden?",answer1:"Innovation Classic Pack",answer2:"Innovation Plus Pack",answer3:"Thematisch Pack",answer4:"Innovation Instore Pack",valid:"Innovation Classic Pack"},
      {description:"Wat is de meest bezochte categoriepagina op de e-commercesite van Carrefour Belgium in april 2023?",answer1:"Kruidenierswaren",answer2:"Niet-voeding",answer3:"Dranken",answer4:"Verse producten",valid:"Verse producten"},
      {description:"Wat is in 2022 het percentage bestellingen op de Carrefour.be-site met een Carrefour Bonus Card in vergelijking met het totale aantal bestellingen?",answer1:"55%",answer2:"68%",answer3:"75%",answer4:"92%",valid:"92%"},
      {description:"Wat is in 2022 het aandeel van de kassatickets uitgegeven met het gebruik van een Carrefour Bonus Card in vergelijking met het totale aantal uitgegeven tickets (op basis van omzet)?",answer1:"51,56%",answer2:"56,03%",answer3:"58,47%",answer4:"61,55%",valid:"56,03%"},
      {description:"Vervolledig: In 2022 genereerden houders van de Carrefour Bonus Card in de hypermarkten Carrefour ....% van de totale omzet van de hypermarkten Carrefour",answer1:"52,85%",answer2:"65,12%",answer3:"70,91%",answer4:"77,45%",valid:"70,91%"},
      {description:"Hoeveel huishoudens hebben in 2022 een Carrefour Bonus Card in België?",answer1:"1.254.544 huishoudens",answer2:"1.254.544 huishoudens",answer3:"2.307.414 huishoudens",answer4:"2.553.897 huishoudens",valid:"2.307.414 huishoudens"},
      {description:"Hoeveel klanten zijn lid van Bonusland (platform waarop u alle promotionele activaties van de merken en van Carrefour vindt) op 06/05/2023?",answer1:"128.587",answer2:"287.257",answer3:"395.496",answer4:"478.946",valid:"478.946"},
      {description:"Wat is de gemiddelde engagementtijd tussen de klant en een merk via een spel op Bonusland (platform waarop u alle promotionele activaties van de merken en van Carrefour vindt) in 2022?",answer1:"minder dan 1 minuut",answer2:"tussen 1 en 2 minuten",answer3:"tussen 2 en 3 minuten",answer4:"tussen 3 en 4 minuten",valid:"tussen 2 en 3 minuten"},
      {description:"Hoeveel deelnames waren er in totaal sinds 2020 en tot 06/05/2023 aan acties op Bonusland (platform waarop u alle promotionele activaties van de merken en van Carrefour vindt)?",answer1:"458.965",answer2:"875.964",answer3:"1.058.741",answer4:"1.228.743",valid:"1.228.743"},
      {description:"Welke promotionele activaties zijn er te vinden op Bonsuland (platform waarop u alle promotionele activaties van de merken en van Carrefour vindt)?",answer1:"spel - spaaractie - wedstrijd - cashback",answer2:"couponning",answer3:"folder",answer4:"peiling",valid:"spel - spaaractie - wedstrijd - cashback"},
      {description:"Hoeveel Carrefour-winkels zijn er in België (franchis en geïntegreerd) op 30/04/2023?",answer1:"548",answer2:"704",answer3:"789",answer4:"925",valid:"704"},
      {description:"Hoeveel promoties onderaan het kassaticket zijn er in 2022 uitgegeven?",answer1:"125.457.821",answer2:"228.862.454",answer3:"305.248.367",answer4:"415.228.728",valid:"228.862.454"},
      {description:"Volgens de studie 'Carrefour Food magazine Custometer Final report' van september 2021 wordt het Carrefour food magazine volledig gelezen door:",answer1:"36% van de lezers",answer2:"58% van de lezers",answer3:"64% van de lezers",answer4:"72% van de lezers",valid:"64% van de lezers"},
      {description:"In welk pack aangeboden door Carrefour Links is de Customer Box terug te vinden?",answer1:"Packs Summer en Back to school",answer2:"Innovation Instore Pack",answer3:"Innovation Plus Pack",answer4:"Innovation Classic Pack",valid:"Packs Summer en Back to school"},
      {description:"Vervolledig: Een consument werd gedurende de eerste 12 weken van 2023 blootgesteld aan .... Voedingspromoties in de folders van de belangrijkste supermarktketens in België (studie uitgevoerd door Carrefour) ",answer1:"1.000 promoties per maand",answer2:"2.000 promoties per maand",answer3:"3.000 promoties per maand",answer4:"4.000 promoties per maand",valid:"3.000 promoties per maand"},
      {description:"Vervolledig: ...% van de consumenten zegt dat personalisatie een belangrijke rol speelt bij hun aankoopbeslissing (studie door infoys studies)" ,answer1:"75%",answer2:"82%",answer3:"86%",answer4:"91%",valid:"86%"},
      {description:"Vervolledig: ....% van de consumenten zei dat ze al een product hadden gekocht na het ontdekt te hebben via een sampling of een gratis staal (onderzoek uitgevoerd door CSA)",answer1:"75%",answer2:"84%",answer3:"89%",answer4:"89%",valid:"84%"},
    );  //max:   min: this.listQuestionsFR.push()
  
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


  countdownGetready() {
    const interval = setInterval(() => {
      this.getReadyCounter--;
      if (this.getReadyCounter < 0) {
        clearInterval(interval);
        console.log("Countdown terminé !");
        this.getReady=false;
        this.startTimer()//new
      }
    }, 1000); // 1000 ms = 1 seconde
  }

  /**
   * Save gamer info
   */
  async saveGamer(){
    localStorage.setItem('currentGamer', JSON.stringify(this.currentGamer));
    this.router.navigateToRoute('game1')
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
      this.currentGamer.question_answer1=value1;
      this.currentGamer.response=10*this.counter.sec;//new
      await delay(2000);
      this.saveGamer();
    }else{
      //console.log("Looser")
      this.game_done=true
      this.reward_loose.classList.add("display_reward")
      this.currentGamer.question_answer1=value1;
      this.currentGamer.response=0*this.counter.sec//new
      //console.log(value2)
      this.goodAnswer=value2
      await delay(2000);
      
      this.saveGamer();
    }
  }

  handleKeyInput = (event) => {
    if(event.key == 1){
      //this.tapeBuzzer()
      //console.log("Buzzer Bleu pushed")
      this.checkValidQuestion(this.currentGamer.question1Obj.answer1,this.currentGamer.question1Obj.valid)
    }
    if((event.key == 2)){
      //console.log("Buzzer Rouge pushed")
      //console.log(this.red)
      this.checkValidQuestion(this.currentGamer.question1Obj.answer2,this.currentGamer.question1Obj.valid)
    }
    if((event.key == 3)){
      //this.stopCountdown()
      //this.countTapeBuzz=0
      //console.log("Buzzer Jaune pushed")
      //console.log(this.yellow)
      this.checkValidQuestion(this.currentGamer.question1Obj.answer3,this.currentGamer.question1Obj.valid)
    }
    if((event.key == 4)){
      //console.log("Buzzer Vert pushed")
      //console.log(this.green)
      this.checkValidQuestion(this.currentGamer.question1Obj.answer4,this.currentGamer.question1Obj.valid)
    }
     
  }
}
