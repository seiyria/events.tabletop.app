
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Convention as ConventionModel} from '../models/convention';

@Injectable()
export class AppState {

  public currentConvention: BehaviorSubject<ConventionModel | any>;
  public currentConventionView: BehaviorSubject<string>;

  constructor() {
    this.currentConvention = new BehaviorSubject({});
    this.currentConventionView = new BehaviorSubject('News');
  }
}
