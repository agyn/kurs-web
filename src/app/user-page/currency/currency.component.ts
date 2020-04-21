import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd";
import { ShortRef } from '../short-ref';
import { CurrencyEditDto } from './currency-edit.dto';
import { CurrencySvc } from './currency.svc';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
  providers: [CurrencySvc]
})
export class CurrencyComponent implements OnInit {


  validateForm: FormGroup;
  public isVisible = false;
  public isOkLoading = false;
  public dto: CurrencyEditDto;
  public name: string = '';
  public editModal: boolean = false;
  public editId: number;
  public exchangers: ShortRef[] = [];

  wait = false;
  page = 0;
  count = 10;
  total = 0;
  listOfData = [];
  constructor(private fb: FormBuilder,
    private currencySvc: CurrencySvc,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
      exchangerId: [null, [Validators.required]],
    });

    this.search(true);

    this.currencySvc.getExchangers().subscribe(res => {
      this.exchangers = res;
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

  edit(row: CurrencyEditDto) {
    this.editModal = true;
    this.isVisible = true;
    this.editId = row.id;

    let value = {
      name: row.name,
      value: row.value,
      exchangerId: row.exchangerId
    };

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsUntouched();
      this.validateForm.controls[i].markAsPristine();
    }

    this.validateForm.setValue(value);
  }

  delete(id: number) {
    this.currencySvc.delete(id).subscribe(res => {
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
        this.currencySvc.update(this.dto).subscribe(res => {
          this.isVisible = false;
          this.search();
        })
      } else {
        this.currencySvc.add(this.dto).subscribe(res => {
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
    this.currencySvc.search(this.count, this.page, this.name).subscribe(res => {
      this.listOfData = res.result || [];
      this.total = res.total - this.count;
    }).add(end =>
      this.wait = false
    );
  }

}
