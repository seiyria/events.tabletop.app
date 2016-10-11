import { Component, Input } from '@angular/core';

import { Convention as ConventionModel } from '../../../app/models/convention';

@Component({
  selector: 'page-convention-contact',
  templateUrl: 'contact.html'
})
export class ConventionContact {
  @Input() convention: ConventionModel | any;

  constructor() {}
}
