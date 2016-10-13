import _ from 'lodash';

import { Component } from '@angular/core';

import { Convention as ConventionModel, fixConvention, RELATED_MODELS } from '../../app/models/convention';
import { PagingInfo } from '../../app/models/paging-info';
import { Convention } from '../convention/convention';

import { AlertController, LoadingController, NavController, ActionSheetController } from 'ionic-angular';
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
  _currentPage: number;
  hasAllItems: boolean;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
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

  private searchResults(data) {
    const { paging, items } = data.result;

    _.each(items, fixConvention);

    this.pagingInfo = paging;
    this._currentPage = +paging.page_number;

    if(this._currentPage === 1) {
      this.conventions = items;
    } else {
      this.conventions.push(...items);
    }

    this.hasAllItems = this._currentPage >= paging.total_pages;
  }

  refreshSearch(refresher?: any) {
    this.API.allConventions(this.filterCriteria)
      .subscribe(data => {
        this.searchResults(data);

        if(refresher) refresher.complete();
      });
  }

  refreshInfinite(infinite?: any) {
    if(this.hasAllItems) {
      infinite.enable(false);
      return;
    }
    this.filterCriteria._page_number = this._currentPage + 1;
    this.API.allConventions(this.filterCriteria)
      .subscribe(data => {
        this.searchResults(data);

        if(infinite) infinite.complete();
        if(this.hasAllItems) infinite.enable(false);
      });
  }

  search() {
    const loader = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loader.present();

    this.API.allConventions(this.filterCriteria)
      .subscribe(data => {
        this.searchResults(data);
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
      })
      .catch(() => {
        loader.dismissAll();
      });
  }

  itemTapped(event, item) {
    this.loadConvention(item.id)
      .then(() => {
        this.navCtrl.setRoot(Convention, {
          id: item.id
        });
      })
      .catch(e => {
        console.error(e);
        const alert = this.alertCtrl.create({
          title: 'Error Loading Data',
          subTitle: `${e.message}`,
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
