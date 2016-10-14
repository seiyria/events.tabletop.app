import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConventionEventsDetail } from './event/event';
import { Convention as ConventionModel } from '../../../app/models/convention';

@Component({
  selector: 'page-convention-events',
  templateUrl: 'events.html'
})
export class ConventionEvents {
  @Input() convention: ConventionModel | any;

  constructor(
    public navCtrl: NavController
  ) {}

  open(id) {
    this.navCtrl.push(ConventionEventsDetail, { id });
  }

  setReminder(event) {
    console.log(event, event.name, event.start_date);
    alert('Not yet implemented.');
  }
}
