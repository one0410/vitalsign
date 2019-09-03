import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteRecordListComponent } from './remote-record-list.component';

describe('RemoteRecordListComponent', () => {
  let component: RemoteRecordListComponent;
  let fixture: ComponentFixture<RemoteRecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteRecordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
