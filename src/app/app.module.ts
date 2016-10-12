import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Convention } from '../pages/convention/convention';
import { ConventionList } from '../pages/conventionlist/conventionlist';

import { ConventionOverview } from '../pages/convention/overview/overview';
import { ConventionBadges } from '../pages/convention/badges/badges';
import { ConventionContact } from '../pages/convention/contact/contact';
import { ConventionDescription } from '../pages/convention/description/description';
import { ConventionNews } from '../pages/convention/news/news';
import { ConventionVenue } from '../pages/convention/venue/venue';

import { API } from './services/api';
import { AppState } from './services/appstate';

@NgModule({
  declarations: [
    MyApp,
    Convention,
    ConventionList,
    ConventionOverview,
    ConventionBadges,
    ConventionContact,
    ConventionDescription,
    ConventionNews,
    ConventionVenue
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Convention,
    ConventionList
  ],
  providers: [
    API,
    AppState
  ]
})
export class AppModule {}
