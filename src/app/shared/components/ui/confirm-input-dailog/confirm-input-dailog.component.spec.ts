import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInputDailogComponent } from './confirm-input-dailog.component';

describe('ConfirmInputDailogComponent', () => {
  let component: ConfirmInputDailogComponent;
  let fixture: ComponentFixture<ConfirmInputDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmInputDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmInputDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
