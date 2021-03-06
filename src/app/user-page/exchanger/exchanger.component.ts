import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd";
import { ExchangerSvc } from './exchanger.svc';
import { ExchangerEditDto } from './exchanger-edit.dto';
import { ShortRef } from '../short-ref';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.css'],
  providers: [ExchangerSvc]
})
export class ExchangerComponent implements OnInit {


  validateForm: FormGroup;
  public isVisible = false;
  public isOkLoading = false;
  public dto: ExchangerEditDto;
  public name: string = '';
  public editModal: boolean = false;
  public editId: number;
  public cities: ShortRef[] = [];

  wait = false;
  page = 0;
  count = 10;
  total = 0;
  listOfData = [];
  constructor(private fb: FormBuilder,
    private exchangerSvc: ExchangerSvc,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
    });

    this.search(true);

    this.exchangerSvc.getCities().subscribe(res => {
      this.cities = res;
    })
  }

  submitForm(): void {1
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  openModal() {
    this.editModal = false;
    this.isVisible = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].reset();
    }
  }

  handleCancel(): void {
    this.cancelModal();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsPristine();
    }
  }

  cancelModal() {
    this.isVisible = false;
  }

  edit(row: ExchangerEditDto) {
    this.editModal = true;
    this.isVisible = true;
    this.editId = row.id;

    let value = {
      name: row.name,
      phone: row.phone,
      address: row.address,
      cityId: row.cityId
    };

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsUntouched();
      this.validateForm.controls[i].markAsPristine();
    }

    this.validateForm.setValue(value);
  }

  delete(id: number) {
    this.exchangerSvc.delete(id).subscribe(res => {
      this.notification.blank(
        'Результат',
        'Успешно',
        { nzDuration: 3000 }
      );
      this.search();
    })
  };

  save() {
    this.submitForm();
    if (this.validateForm.valid) {
      this.dto = this.validateForm.value;
      if (this.editModal) {
        this.dto.id = this.editId;
        this.exchangerSvc.update(this.dto).subscribe(res => {
          this.isVisible = false;
          this.search();
        })
      } else {
        this.exchangerSvc.add(this.dto).subscribe(res => {
          this.isVisible = false;
          this.search();
        })
      }
    }
  }

  search(reload: boolean = false) {
    if (reload) {
      this.page = 0;
    }
    this.wait = true;
    this.exchangerSvc.search(this.count, this.page, this.name).subscribe(res => {
      this.listOfData = res.result || [];
      this.total = res.total - this.count;
    }).add(end =>
      this.wait = false
    );
  }

}
