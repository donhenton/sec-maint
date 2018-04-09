import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSelectorComponent } from './basic-selector.component';

describe('BasicSelectorComponent', () => {
  let component: BasicSelectorComponent;
  let fixture: ComponentFixture<BasicSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
