import { Component, Input } from '@angular/core';

import { Convention as ConventionModel } from '../../../app/models/convention';

@Component({
  selector: 'page-convention-prototypes',
  templateUrl: 'prototypes.html'
})
export class ConventionPrototypes {
  @Input() convention: ConventionModel | any;

  constructor() {}
}
