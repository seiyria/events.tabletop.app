import { Component, Input } from '@angular/core';

import { Convention as ConventionModel } from '../../../app/models/convention';

@Component({
  selector: 'page-convention-events',
  templateUrl: 'events.html'
})
export class ConventionEvents {
  @Input() convention: ConventionModel | any;

  constructor() {}
}
