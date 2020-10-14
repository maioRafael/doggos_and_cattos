import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAnimalComponent } from './dash-animal.component';

describe('DashAnimalComponent', () => {
  let component: DashAnimalComponent;
  let fixture: ComponentFixture<DashAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
