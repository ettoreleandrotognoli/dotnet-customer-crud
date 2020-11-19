import { Component, Input, Optional } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-error-feedback',
  template: `
    <p *ngFor="let error of errors">
        {{error}}
    </p>
  `
})
export class ErrorFeedbackComponent {


  constructor(
  ) {

  }

  @Input()
  protected control: AbstractControl;


  get errors(): string[] {
    return Object.keys(this.control.errors || {});
  }

}
