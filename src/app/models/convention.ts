
import _ from 'lodash';

export const RELATED_MODELS = ['geolocation', 'venue', 'updates', 'badges'];

export class Convention {
  constructor(
    public id: string,
    public name: string,
    public description: string
  ) {}
}

export const fixConvention = (convention) => {
  convention.start_date = new Date(convention.start_date.split('-').join('/'));
  convention.end_date = new Date(convention.end_date.split('-').join('/'));

  _.each(convention._news, news => {
    news.date_sent = new Date(news.date_sent.split('-').join('/'));
  });
};
