import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { Convention as ConventionModel } from '../../../app/models/convention';

declare var google;

@Component({
  selector: 'page-convention-venue',
  templateUrl: 'venue.html'
})
export class ConventionVenue {
  @Input() convention: ConventionModel | any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const latLng = new google.maps.LatLng(+this.convention._venue.latitude, +this.convention._venue.longitude);

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  }
}
