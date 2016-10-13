import { Component, Input } from '@angular/core';

import { Prototype as PrototypeModel, fixPrototype } from '../../../../app/models/prototype';

import { NavParams, LoadingController } from 'ionic-angular';
import { API } from '../../../../app/services/api';

@Component({
  selector: 'page-convention-prototypes-detail',
  templateUrl: 'prototype.html'
})
export class ConventionPrototypesDetail {
  prototype: PrototypeModel | any;
  prototypeId: string;

  constructor(
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private API: API) {

    this.prototype = { user: {} };
    this.prototypeId = this.navParams.get('id');
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loader.present();

    this.API.singleConventionPrototypeDetails(this.prototypeId)
      .toPromise()
      .then(prototype => {
        this.prototype = prototype.result;
        fixPrototype(this.prototype);
        loader.dismissAll();
      })
      .catch(() => {
        loader.dismissAll();
      });
  }
}
