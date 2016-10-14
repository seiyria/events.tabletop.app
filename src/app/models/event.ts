
export class Event {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public long_description_html: string,
    public price: string,
    public duration: string,
    public start_date: any,
    public available_count: string,
    public max_tickets: string,
    public room_name: string,
    public has_more_info: boolean,
    public more_info_uri: string,

    public type: any,
    public user: any
) {}
}

export const fixEvent = (event: Event) => {
  event.start_date = new Date(event.start_date.split('-').join('/'));
  event.has_more_info = event.more_info_uri.length > 10;
};
