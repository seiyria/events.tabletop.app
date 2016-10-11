import { Component, Input } from '@angular/core';

import { Convention as ConventionModel } from '../../../app/models/convention';

@Component({
  selector: 'page-convention-badges',
  templateUrl: 'badges.html'
})
export class ConventionBadges {
  @Input() convention: ConventionModel | any;

  constructor() {}
}
