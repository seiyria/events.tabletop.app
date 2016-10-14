
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

    public type: any,
    public user: any
) {}
}

export const fixEvent = (event: Event) => {
  event.start_date = new Date(event.start_date.split('-').join('/'));
};
