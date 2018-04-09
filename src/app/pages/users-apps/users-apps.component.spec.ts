import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAppsComponent } from './users-apps.component';

describe('UsersAppsComponent', () => {
  let component: UsersAppsComponent;
  let fixture: ComponentFixture<UsersAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
