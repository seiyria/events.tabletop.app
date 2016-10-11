import { Component, Input } from '@angular/core';

import { Convention as ConventionModel } from '../../../app/models/convention';

@Component({
  selector: 'page-convention-news',
  templateUrl: 'news.html'
})
export class ConventionNews {
  @Input() convention: ConventionModel | any;

  constructor() {}
}
