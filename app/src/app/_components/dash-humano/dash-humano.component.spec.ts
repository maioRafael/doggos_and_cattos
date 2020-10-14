import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashHumanoComponent } from './dash-humano.component';

describe('DashHumanoComponent', () => {
  let component: DashHumanoComponent;
  let fixture: ComponentFixture<DashHumanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashHumanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashHumanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
