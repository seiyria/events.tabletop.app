
import _ from 'lodash';

import { fixConvention, Convention } from '../models/convention';

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class API {
  private baseUrl = 'https://tabletop.events/api';

  constructor(private http: Http) {}

  allConventions(opts: any) : Observable<any> {
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

  singleConventionAll(id: string, opts: any) : Promise<any> {
    return this.singleConvention(id, opts)
      .toPromise()
      .then((data: any) => {

        const con: Convention = data.result;

        const news =        this.singleConventionNews(id).toPromise();
        const badges =      this.singleConventionBadges(id).toPromise();
        const exhibitors =  this.singleConventionExhibitors(id).toPromise();
        const prototypes =  this.singleConventionPrototypes(id).toPromise();
        const events =      this.singleConventionEvents(id).toPromise();
        const venue =       this.singleConventionVenue(con.venue_id).toPromise();

        return Promise.all([news, badges, exhibitors, prototypes, events, venue])
          .then(allConData => {
            const [newsData, badgesData, exhibitorsData, prototypesData, eventsData, venueData] = allConData;
            con._news =       newsData.result.items;
            con._exhibitors = exhibitorsData.result.items;
            con._prototypes = prototypesData.result.items;
            con._events =     eventsData.result.items;
            con._badgetypes = badgesData.result.items;
            con._venue =      venueData.result;

            fixConvention(con);
            return con;
          });
      });
  }

  singleConvention(id: string, opts: any) : Observable<Convention> {
    const params = new URLSearchParams();
    _.each(opts, (val, key) => {
      if(_.isArray(val)) return;
      params.set(key, val);
    });
    return this.http.get(`${this.baseUrl}/convention/${id}`, { search: params })
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionNews(id: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/convention/${id}/updates?_items_per_page=100&_order_by=update_number&_sort_order=desc`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionExhibitors(id: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/convention/${id}/exhibitors?_items_per_page=100&_order_by=name`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionEvents(id: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/convention/${id}/events?_items_per_page=100&_order_by=start_date`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionPrototypes(id: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/convention/${id}/prototypes?_items_per_page=100&_order_by=name`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionBadges(id: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/convention/${id}/badgetypes?_items_per_page=100&_order_by=name`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionVenue(venueId: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/venue/${venueId}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionPrototypeDetails(prototypeId: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/prototype/${prototypeId}?_include_related_objects=user`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  singleConventionEventDetails(eventId: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/event/${eventId}?_include_options=1&_include_related_objects=user&_include_related_objects=type`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
