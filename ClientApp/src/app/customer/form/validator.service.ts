import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator';
@Injectable()
export class ValidatorService {

  constructor() {

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
