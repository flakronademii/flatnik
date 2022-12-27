import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumersUSERSComponent } from './costumers-users.component';

describe('CostumersUSERSComponent', () => {
  let component: CostumersUSERSComponent;
  let fixture: ComponentFixture<CostumersUSERSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumersUSERSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumersUSERSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
