import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConventionPrototypesDetail } from './prototype/prototype';

import { Convention as ConventionModel } from '../../../app/models/convention';

@Component({
  selector: 'page-convention-prototypes',
  templateUrl: 'prototypes.html'
})
export class ConventionPrototypes {
  @Input() convention: ConventionModel | any;

  constructor(
    public navCtrl: NavController
  ) {}

  open(id) {
    this.navCtrl.push(ConventionPrototypesDetail, { id });
  }
}
