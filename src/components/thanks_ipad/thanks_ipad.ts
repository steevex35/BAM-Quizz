import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';
import internal from 'stream';
@autoinject


export class ThanksIpad{
 
  private interval:any
  private countdown= 3

  constructor(private router:Router,private i18n:I18N){
    this.i18n.setLocale(window.localStorage.getItem('lng_sesison'));
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
