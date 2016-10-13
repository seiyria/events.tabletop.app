import { Component } from '@angular/core';

import { Convention as ConventionModel, RELATED_MODELS } from '../../app/models/convention';

import { NavParams } from 'ionic-angular';
import { API } from '../../app/services/api';
import { AppState } from '../../app/services/appstate';

@Component({
  selector: 'page-convention',
  templateUrl: 'convention.html'
})
export class Convention {
  conventionId: string;
  convention: ConventionModel | any;
  filterCriteria: any;
  conViewSub: any;
  conView: string;

  constructor(
    public navParams: NavParams,
    private appState: AppState,
    private API: API) {

    this.convention = {};
    this.conventionId = this.navParams.get('id');
    this.filterCriteria = { _include_related_objects: RELATED_MODELS };
  }

  ngOnInit() {
    this.convention = this.appState.currentConvention.getValue();
    this.conViewSub = this.appState.currentConventionView.subscribe(view => {
      this.conView = view;
    });
  }

  refreshConvention(refresher) {
    this.API.singleConventionAll(this.conventionId, this.filterCriteria)
      .then(data => {
        this.setConventionData(data);
        refresher.complete();
      });
  }

  private setConventionData(result) {
    this.convention = result;

    this.appState.currentConvention.next(result);
  }
}
