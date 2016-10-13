
import _ from 'lodash';

export const RELATED_MODELS = ['geolocation', 'venue', 'updates', 'badges'];

export class Convention {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public start_date: any,
    public end_date: any,
    public venue_id: string,

    public _news: any,
    public _events: any,
    public _venue: any,
    public _exhibitors: any,
    public _prototypes: any,
    public _badgetypes: any
) {}
}

export const fixConvention = (convention: Convention) => {
  convention.start_date = new Date(convention.start_date.split('-').join('/'));
  convention.end_date = new Date(convention.end_date.split('-').join('/'));

  _.each(convention._news, news => {
    news.date_sent = new Date(news.date_sent.split('-').join('/'));
  });

  _.each(convention._events, event => {
    event.start_date = new Date(event.start_date.split('-').join('/'));
  });
};
