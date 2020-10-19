import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-animal-form-confirm-dialog',
  templateUrl: './animal-form-confirm-dialog.component.html',
  styleUrls: ['./animal-form-confirm-dialog.component.css']
})
export class AnimalFormConfirmDialogComponent implements OnInit {

  @Input() operation;
  constructor() { }

  ngOnInit(): void {
  }

}
