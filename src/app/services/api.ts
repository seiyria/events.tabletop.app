
import _ from 'lodash';

import { fixConvention } from '../models/convention';

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class API {
  private baseUrl = 'https://tabletop.events/api';

  constructor(private http: Http) {}

  allConventions(opts: any) : Observable {
    const params = new URLSearchParams();
    _.each(opts, (val, key) => {
      if(_.isArray(val)) {
        _.each(val, subVal => params.append(key, subVal));
        return;
      }
      params.set(key, val);
    });
    return this.http.get(`${this.baseUrl}/convention`, { search: params })
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionAll(id: string, opts: any) : Promise {
    return this.singleConvention(id, opts)
      .toPromise()
      .then(data => {

        const con = data.result;

        const news =    this.singleConventionNews(id).toPromise();
        const badges =  this.singleConventionBadges(id).toPromise();
        const venue =   this.singleConventionVenue(con.venue_id).toPromise();

        return Promise.all([news, badges, venue])
          .then(allConData => {
            const [newsData, badgesData, venueData] = allConData;
            con._news =       _.sortBy(newsData.result.items, 'update_number').reverse();
            con._badgetypes = _.sortBy(badgesData.result.items, 'name');
            con._venue =      venueData.result;

            fixConvention(con);
            return con;
          });
      });
  }

  singleConvention(id: string, opts: any) : Observable {
    const params = new URLSearchParams();
    _.each(opts, (val, key) => {
      if(_.isArray(val)) return;
      params.set(key, val);
    });
    return this.http.get(`${this.baseUrl}/convention/${id}`, { search: params })
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionNews(id: string) : Observable {
    return this.http.get(`${this.baseUrl}/convention/${id}/updates?_items_per_page=100`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionBadges(id: string) : Observable {
    return this.http.get(`${this.baseUrl}/convention/${id}/badgetypes?_items_per_page=100`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionVenue(venueId: string) : Observable {
    return this.http.get(`${this.baseUrl}/venue/${venueId}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
