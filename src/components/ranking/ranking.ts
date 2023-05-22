import { HttpClient } from '@aurelia/fetch-client';
import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';
import internal from 'stream';
import { User } from 'user';
import { bindable } from 'aurelia-framework';
@autoinject


export class ranking{


  private currentUser: User;
  private listOfGamers = [];
  private intervalId;

  constructor(private router:Router, private i18n:I18N){
    this.i18n.setLocale('fr');
    this.fetchGamer()
    this.intervalId= setInterval(() => {
      // window.location.reload();
      this.fetchGamer()
       }, 30000);
  }


  attached() {
  
  }

  async fetchGamer(){
    const url="http://192.168.129.10/php-api/api/getUser.php"
    const http = new HttpClient();
    await http.fetch(url,{
      method: "POST",
      headers: {
    }
    })
    .then(response => response.json())
    .then(async data => {
       this.listOfGamers=data
       //console.log("we get datas : "+data)
      })
      .catch(error => {
        console.log(error)
      })
  }

 
  
}
