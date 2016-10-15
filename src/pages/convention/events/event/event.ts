import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Event as EventModel, fixEvent } from '../../../../app/models/event';

import { NavParams, LoadingController } from 'ionic-angular';
import { API } from '../../../../app/services/api';

@Component({
  selector: 'page-convention-events-detail',
  templateUrl: 'event.html'
})
export class ConventionEventsDetail {
  event: EventModel | any;
  eventId: string;

  constructor(
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public domSanitizer: DomSanitizer,
    private API: API) {

    this.event = { user: {}, type: {}, _options: { _age_range: {} } };
    this.eventId = this.navParams.get('id');
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loader.present();

    this.API.singleConventionEventDetails(this.eventId)
      .toPromise()
      .then(event => {
        this.event = event.result;
        this.event._long_description_html = this.domSanitizer.bypassSecurityTrustHtml(this.event.long_description_html);
        fixEvent(this.event);
        loader.dismissAll();
      })
      .catch(() => {
        loader.dismissAll();
      });
  }
}
