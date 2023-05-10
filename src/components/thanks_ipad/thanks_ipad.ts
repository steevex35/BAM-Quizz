import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import internal from 'stream';
@autoinject


export class ThanksIpad{
 
  private interval:any
  private countdown= 10

  constructor(private router:Router){
   this.backTogamePage()
  }

  backHome(){
    this.router.navigateToRoute('home')
    window.location.reload();
  }

  backTogamePage(){
  
    this.interval=setInterval(()=>{
      if(this.countdown == 0){
        clearInterval(this.interval);
        this.router.navigateToRoute('home')
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
