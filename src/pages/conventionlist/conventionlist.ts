import _ from 'lodash';

import { Component } from '@angular/core';

import { Convention as ConventionModel, fixConvention, RELATED_MODELS } from '../../app/models/convention';
import { PagingInfo } from '../../app/models/paging-info';
import { Convention } from '../convention/convention';

import { LoadingController, NavController, ActionSheetController, NavParams } from 'ionic-angular';
import { API } from '../../app/services/api';
import { AppState } from '../../app/services/appstate';

@Component({
  selector: 'page-conventionlist',
  templateUrl: 'conventionlist.html'
})
export class ConventionList {
  conventions: ConventionModel[];
  pagingInfo: PagingInfo;
  filterCriteria: any;
  searchVisible: boolean;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private appState: AppState,
    private API: API) {

    appState.currentConvention.next({});
    appState.currentConventionView.next('Overview');
    this.filterCriteria = { _sort_order: 'asc', _order_by: 'start_date', _include_related_objects: RELATED_MODELS };
    this.search();
  }

  private updateCriteria(key, val, doSearch = true) {
    this.filterCriteria[key] = val;
    if(doSearch) this.search();
  }

  openSorts() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Sort/Filter Conventions',
      buttons: [
        { text: 'A-Z Ascending',  handler: () => this.updateCriteria('_sort_order', 'asc') },
        { text: 'Z-A Descending', handler: () => this.updateCriteria('_sort_order', 'desc') },
        { text: 'Upcoming',       handler: () => {
          this.updateCriteria('_sort_order', 'asc', false);
          this.updateCriteria('_order_by',   'start_date');
        } }
      ]
    });

    actionSheet.present();
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }

  cancelSearch() {
    this.searchVisible = false;
    this.filterCriteria.query = '';
  }

  updateSearch() {
    this.refreshSearch();
  }

  private searchReults(data) {
    const { paging, items } = data.result;

    _.each(items, fixConvention);

    this.pagingInfo = paging;
    this.conventions = items;
  }

  refreshSearch(refresher?: any) {
    this.API.allConventions(this.filterCriteria)
      .subscribe(data => {
        this.searchReults(data);

        if(refresher) refresher.complete();
      });
  }

  search() {
    const loader = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loader.present();

    this.API.allConventions(this.filterCriteria)
      .subscribe(data => {
        this.searchReults(data);
        loader.dismissAll();
      });
  }

  private loadConvention(conventionId) {
    const loader = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loader.present();

    return this.API.singleConventionAll(conventionId, this.filterCriteria)
      .then(data => {
        this.appState.currentConvention.next(data);
        loader.dismissAll();
      });
  }

  itemTapped(event, item) {
    this.loadConvention(item.id)
      .then(() => {
        this.navCtrl.setRoot(Convention, {
          id: item.id
        });
      });
  }
}
