import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Convention as ConventionModel } from './models/convention';
import { ConventionList } from '../pages/conventionlist/conventionlist';

import { AppState } from './services/appstate';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ConventionList;
  conSub: any;
  conMenu: ConventionModel | any;

  pages: Array<{title: string, component: any}>;
  conPages: Array<{title: string}>;

  constructor(public platform: Platform, private appState: AppState) {
    this.initializeApp();

    this.pages = [
      { title: 'Convention List', component: ConventionList }
    ];

    this.conPages = [
      { title: 'Overview' },
      { title: 'News', badge: (con) => con.updates_count },
      { title: 'Contact' },
      { title: 'Registration', show: (con) => con._badgetypes.length },
      { title: 'Exhibitors', badge: (con) => con._exhibitors.length, show: (con) => con._exhibitors.length },
      { title: 'Prototypes', badge: (con) => con._prototypes.length, show: (con) => con._prototypes.length },
      { title: 'Events', badge: (con) => con._events.length, show: (con) => con._events.length },
      { title: 'Venue' }
    ];

    this.conMenu = {};
  }

  ngOnInit() {
    this.conSub = this.appState.currentConvention.subscribe(convention => {
      this.conMenu = convention;
    });
  }

  ngOnDestroy() {
    this.conSub.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  changeConPage(newPage) {
    this.appState.currentConventionView.next(newPage);
  }
}
