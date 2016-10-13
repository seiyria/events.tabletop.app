import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular';

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
  conPages: Array<{title: string, show?: (ConventionModel) => boolean|number, badge?: (ConventionModel) => number}>;

  constructor(
    public platform: Platform,
    public push: Push,
    public alertCtrl: AlertController,
    private appState: AppState) {

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
      if(!window.cordova) return;

      this.platform.registerBackButtonAction(() => {
        if(!this.nav.canGoBack()) return;
        this.nav.pop();
      }, 500);

      StatusBar.styleDefault();

      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      });

      this.push.rx.notification()
        .subscribe((msg) => {
          const alert = this.alertCtrl.create({
            title: msg.title,
            subTitle: msg.text,
            buttons: ['OK']
          });
          alert.present();
        });

    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  changeConPage(newPage) {
    this.appState.currentConventionView.next(newPage);
  }
}
