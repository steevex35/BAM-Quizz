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
      { route: ['game1'],name: 'game1',moduleId: PLATFORM.moduleName("./components/game1/game1"), title:'game1' },
      { route: ['game2'],name: 'game2',moduleId: PLATFORM.moduleName("./components/game2/game2"), title:'game2' },
      { route: ['game3'],name: 'game3',moduleId: PLATFORM.moduleName("./components/game3/game3"), title:'game3' },
      { route: ['thanks'],name: 'thanks',moduleId: PLATFORM.moduleName("./components/thanks/thanks"), title:'thanks' },
      { route: ['ranking'],name: 'ranking',moduleId: PLATFORM.moduleName("./components/ranking/ranking"), title:'ranking' },
    ]);
  }

}
