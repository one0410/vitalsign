import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalRecordListComponent } from './local-record-list.component';

describe('LocalRecordListComponent', () => {
  let component: LocalRecordListComponent;
  let fixture: ComponentFixture<LocalRecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalRecordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
