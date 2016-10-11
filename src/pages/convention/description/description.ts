import { Component, Input } from '@angular/core';

import { Convention as ConventionModel } from '../../../app/models/convention';

@Component({
  selector: 'page-convention-description',
  templateUrl: 'description.html'
})
export class ConventionDescription {
  @Input() convention: ConventionModel | any;

  constructor() {}
}
