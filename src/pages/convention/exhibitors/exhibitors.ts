import { Component, Input } from '@angular/core';

import { Convention as ConventionModel } from '../../../app/models/convention';

@Component({
  selector: 'page-convention-exhibitors',
  templateUrl: 'exhibitors.html'
})
export class ConventionExhibitors {
  @Input() convention: ConventionModel | any;

  constructor() {}
}
