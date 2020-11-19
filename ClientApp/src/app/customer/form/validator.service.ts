import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator';
import * as moment from 'moment';
@Injectable()
export class ValidatorService {

  constructor() {

  }

  date(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const date = moment(control.value);
      if (date.isValid()) {
        return null;
      }
      return { invalidDate: control.value };
    };
  }

  cpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      if (!cpf.isValid(control.value)) {
        return { invalidCpf: control.value };
      }
      return null;
    };
  }

  url(): ValidatorFn {
    return Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  }

}
