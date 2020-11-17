import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Address, Customer, Phone, Site } from '..';


@Injectable()
export class CustomerFormService {

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  public addressForm(initialData: Partial<Address> = {}): FormGroup {
    return this.formBuilder.group({
      name: initialData.name,
      zipCode: initialData.zipCode,
      street: initialData.street,
      number: initialData.number,
    });
  }

  public phoneForm(initialData: Partial<Phone> = {}): FormGroup {
    return this.formBuilder.group({
      name: initialData.name,
      number: initialData.number,
    });
  }

  public siteForm(initialData: Partial<Site> = {}): FormGroup {
    return this.formBuilder.group({
      url: initialData.url,
    });
  }


  public customerForm(initialData: Partial<Customer> = {}): FormGroup {
    return this.formBuilder.group({
      name: [initialData.name, [ ]],
      birthday: initialData.birthday,
      cpf: initialData.cpf,
      rg: initialData.rg,
      sites: this.formBuilder.array(
        (initialData.sites || []).map( site => this.siteForm(site))
      ),
      phones: this.formBuilder.array(
        (initialData.phones || []).map( phone => this.phoneForm(phone))
      ),
      addresses: this.formBuilder.array(
        (initialData.addresses || []).map( address => this.addressForm(address))
      )
    });
  }

}
