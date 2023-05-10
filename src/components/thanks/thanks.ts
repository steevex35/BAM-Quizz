import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import internal from 'stream';
@autoinject


export class Thanks{

  private interval:any
  private countdown= 8
 

  constructor(private router:Router){
    this.backTogamePage()
  }

  backTogamePage(){
  
    this.interval=setInterval(()=>{
      if(this.countdown == 0){
        clearInterval(this.interval);
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
