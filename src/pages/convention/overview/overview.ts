import { Component, Input } from '@angular/core';

import { Convention as ConventionModel } from '../../../app/models/convention';

@Component({
  selector: 'page-convention-overview',
  templateUrl: 'overview.html'
})
export class ConventionOverview {
  @Input() convention: ConventionModel | any;
  @Input() appState: any;

  constructor() {}

  forwardTo(view: string) {
    this.appState.currentConventionView.next(view);
  }
}
