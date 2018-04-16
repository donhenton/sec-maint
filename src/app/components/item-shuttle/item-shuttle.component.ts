import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ShuttleData, ShuttleStructure } from './shuttle.interfaces';

@Component({
  selector: 'app-item-shuttle',
  templateUrl: './item-shuttle.component.html',
  styleUrls: ['./item-shuttle.component.scss']
})
export class ItemShuttleComponent implements OnInit, OnChanges {


  constructor() { }

  @Input() shuttleItems: ShuttleStructure;
  @Input() shuttleMetaData: any = {assignedTo: '<assignedTo>'};


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
   // console.log(JSON.stringify(changes));
    if (changes.shuttleItems) {
      console.log(changes.shuttleItems);

    }

  }

}
