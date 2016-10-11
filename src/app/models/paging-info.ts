
export class PagingInfo {
  constructor(
    public total_pages: number,
    public next_page_number: number,
    public total_items: number,
    public previous_page_number: number,
    public items_per_page: number,
    public page_number: number
  ) {}
}
