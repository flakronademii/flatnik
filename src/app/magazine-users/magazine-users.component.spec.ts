import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineUSERSComponent } from './magazine-users.component';

describe('MagazineUSERSComponent', () => {
  let component: MagazineUSERSComponent;
  let fixture: ComponentFixture<MagazineUSERSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazineUSERSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagazineUSERSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
