import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ShuttleData } from '../shuttle.interfaces';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shuttle-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.scss']
})
export class ItemSelectorComponent implements OnInit, OnChanges {

  @Input() shuttleData: ShuttleData[] = null ;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.shuttleData) {
     // console.log(changes.shuttleItems);

    }

  }

}
