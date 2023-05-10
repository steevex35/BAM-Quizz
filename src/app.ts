import { PLATFORM } from 'aurelia-pal';
import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
  router: Router;
   
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'BAM-Game';

    config.map([
      { route: ['','home'],name: 'home',moduleId: PLATFORM.moduleName("./components/home/home"), title:'Home' },
      { route: ['form'],name: 'form',moduleId: PLATFORM.moduleName("./components/form/form"), title:'form' },
      { route: ['reglement'],name: 'reglement',moduleId: PLATFORM.moduleName("./components/reglement/reglement"), title:'reglement' },
      { route: ['questions'],name: 'questions',moduleId: PLATFORM.moduleName("./components/questions/questions"), title:'questions' },
      { route: ['thanks_ipad'],name: 'thanks_ipad',moduleId: PLATFORM.moduleName("./components/thanks_ipad/thanks_ipad"), title:'thanks_ipad' },
      { route: ['game'],name: 'game',moduleId: PLATFORM.moduleName("./components/game/game"), title:'game' },
      { route: ['question_base'],name: 'question_base',moduleId: PLATFORM.moduleName("./components/question_base/question_base"), title:'question_base' },
      { route: ['thanks'],name: 'thanks',moduleId: PLATFORM.moduleName("./components/thanks/thanks"), title:'thanks' },
      { route: ['screen_video'],name: 'screen_video',moduleId: PLATFORM.moduleName("./components/screen_video/screen_video"), title:'screen_video' },
    
    ]);
  }

}
