import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantInfoComponent } from './consultant-info.component';

describe('ConsultantInfoComponent', () => {
  let component: ConsultantInfoComponent;
  let fixture: ComponentFixture<ConsultantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
