import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-basic-selector',
  templateUrl: './basic-selector.component.html',
  styleUrls: ['./basic-selector.component.scss']
})
export class BasicSelectorComponent implements OnInit {

  @Input() listData;

  constructor() { }

  ngOnInit() {
  }

}
