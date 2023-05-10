import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import { HttpClient } from '@aurelia/fetch-client';
@autoinject

export class Home{
 
  private httpClient: HttpClient;
  constructor(private router:Router, private i18n:I18N){
    this.httpClient = new HttpClient();
    setTimeout(() => {
      this.makeApiCalls();
      this.setRandomTimeout();
    }, this.getRandomInterval());
  }

  setLngAndRoute(lng:string){
    this.i18n.setLocale(lng);
    //console.log(this.i18n.getLocale())
    this.router.navigateToRoute('form')
  }

  attached() {
    this.makeApiCalls(); // Call once immediately on load

     // set a random interval for the first call
  }

  setRandomTimeout() {
    setTimeout(() => {
      this.makeApiCalls();
      this.setRandomTimeout();
    }, this.getRandomInterval()); // set a random interval for subsequent calls
  }

  async makeApiCalls() {
    const response1 = await this.httpClient.fetch('http://192.168.64.4:8182/logging');
    const data1 = await response1.json();
    
    const response2 = await this.httpClient.fetch('http://192.168.64.4:8182/date');
    const data2 = await response2.json();

    console.log(data1, data2); // or do whatever you want with the data
  }

  getRandomInterval(): number {
    // return a random interval between 10 seconds and 2 minutes (in milliseconds)
    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
  }
  
}
