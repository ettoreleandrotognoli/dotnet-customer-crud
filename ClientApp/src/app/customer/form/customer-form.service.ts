import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, Customer, Phone, Site } from '..';
import { ValidatorService } from './validator.service';


@Injectable()
export class CustomerFormService {

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService
  ) {

  }

  public addressForm(initialData: Partial<Address> = {}): FormGroup {
    return this.formBuilder.group({
      name: [initialData.name, []],
      zipCode: [initialData.zipCode, [Validators.required]],
      street: [initialData.street, [Validators.required]],
      number: [initialData.number, [Validators.required]],
    });
  }

  public phoneForm(initialData: Partial<Phone> = {}): FormGroup {
    return this.formBuilder.group({
      name: [initialData.name],
      number: [initialData.number, Validators.required],
    });
  }

  public siteForm(initialData: Partial<Site> = {}): FormGroup {
    return this.formBuilder.group({
      url: [initialData.url, [Validators.required, this.validatorService.url()]],
    });
  }


  public customerForm(initialData: Partial<Customer> = {}): FormGroup {
    return this.formBuilder.group({
      id: [initialData.id],
      name: [initialData.name, [Validators.required]],
      birthday: [(initialData.birthday || '').split('T')[0] || null, [this.validatorService.date()]],
      cpf: [initialData.cpf, [this.validatorService.cpf()]],
      rg: [initialData.rg, []],
      sites: this.formBuilder.array(
        (initialData.sites || []).map(site => this.siteForm(site))
      ),
      phones: this.formBuilder.array(
        (initialData.phones || []).map(phone => this.phoneForm(phone))
      ),
      addresses: this.formBuilder.array(
        (initialData.addresses || []).map(address => this.addressForm(address))
      )
    });
  }

}
