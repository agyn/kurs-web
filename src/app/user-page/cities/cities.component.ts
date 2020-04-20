import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd";
import { CitiesEditDto } from './cities-edit.dto';
import { CitiesSvc } from './cities.svc';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  providers: [CitiesSvc]
})
export class CitiesComponent implements OnInit {

  validateForm: FormGroup;
  public isVisible = false;
  public isOkLoading = false;
  public dto: CitiesEditDto;
  public name: string = '';
  public editModal: boolean = false;
  public editId: number;

  wait = false;
  page = 0;
  count = 10;
  total = 0;
  listOfData = [];
  constructor(private fb: FormBuilder,
    private citiesSvc: CitiesSvc,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
    });

    this.search(true);
  }

  submitForm(): void {
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

  edit(row: CitiesEditDto) {
    this.editModal = true;
    this.isVisible = true;
    this.editId = row.id;

    let value = {
      name: row.name,
    };

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsUntouched();
      this.validateForm.controls[i].markAsPristine();
    }

    this.validateForm.setValue(value);
  }

  delete(id: number) {
    this.citiesSvc.delete(id).subscribe(res => {
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
        this.citiesSvc.update(this.dto).subscribe(res => {
          this.isVisible = false;
          this.search();
        })
      } else {
        this.citiesSvc.add(this.dto).subscribe(res => {
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
    this.citiesSvc.search(this.count, this.page, this.name).subscribe(res => {
      this.listOfData = res.result || [];
      this.total = res.total - this.count;
    }).add(end =>
      this.wait = false
    );
  }

}
