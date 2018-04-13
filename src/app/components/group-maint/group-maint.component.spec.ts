import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMaintComponent } from './group-maint.component';

describe('GroupMaintComponent', () => {
  let component: GroupMaintComponent;
  let fixture: ComponentFixture<GroupMaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
