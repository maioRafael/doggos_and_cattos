import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFormConfirmDialogComponent } from './animal-form-confirm-dialog.component';

describe('AnimalFormConfirmDialogComponent', () => {
  let component: AnimalFormConfirmDialogComponent;
  let fixture: ComponentFixture<AnimalFormConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalFormConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalFormConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
