import { Component } from '@angular/core';

import { Prototype as PrototypeModel } from '../../../../app/models/prototype';

import { NavParams, LoadingController } from 'ionic-angular';
import { API } from '../../../../app/services/api';

@Component({
  selector: 'page-convention-prototypes-detail',
  templateUrl: 'prototype.html'
})
export class ConventionPrototypesDetail {
  prototype: PrototypeModel | any;
  prototypeId: string;

  imageSliderOptions: any;

  constructor(
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private API: API) {

    this.prototype = { user: {}, _images: [] };
    this.prototypeId = this.navParams.get('id');
    this.imageSliderOptions = {
      pager: true
    };
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loader.present();

    this.API.singleConventionPrototypeDetails(this.prototypeId)
      .then(prototype => {
        this.prototype = prototype;
        loader.dismissAll();
      })
      .catch(() => {
        loader.dismissAll();
      });
  }
}
