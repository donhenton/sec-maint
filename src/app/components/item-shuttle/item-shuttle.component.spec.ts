import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemShuttleComponent } from './item-shuttle.component';

describe('ItemShuttleComponent', () => {
  let component: ItemShuttleComponent;
  let fixture: ComponentFixture<ItemShuttleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemShuttleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemShuttleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
