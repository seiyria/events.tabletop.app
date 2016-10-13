import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';

import { Convention } from '../pages/convention/convention';
import { ConventionList } from '../pages/conventionlist/conventionlist';

import { ConventionOverview } from '../pages/convention/overview/overview';
import { ConventionBadges } from '../pages/convention/badges/badges';
import { ConventionExhibitors } from '../pages/convention/exhibitors/exhibitors';
import { ConventionPrototypes } from '../pages/convention/prototypes/prototypes';
import { ConventionPrototypesDetail } from '../pages/convention/prototypes/prototype/prototype';
import { ConventionEvents } from '../pages/convention/events/events';
import { ConventionContact } from '../pages/convention/contact/contact';
import { ConventionDescription } from '../pages/convention/description/description';
import { ConventionNews } from '../pages/convention/news/news';
import { ConventionVenue } from '../pages/convention/venue/venue';

import { API } from './services/api';
import { AppState } from './services/appstate';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'fb7ca863',
  },
  'push': {
    'sender_id': '296816125466',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    Convention,
    ConventionList,
    ConventionOverview,
    ConventionBadges,
    ConventionExhibitors,
    ConventionPrototypes,
    ConventionPrototypesDetail,
    ConventionEvents,
    ConventionContact,
    ConventionDescription,
    ConventionNews,
    ConventionVenue
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Convention,
    ConventionList,
    ConventionPrototypesDetail
  ],
  providers: [
    API,
    AppState
  ]
})
export class AppModule {}
