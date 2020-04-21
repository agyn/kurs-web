import { Component, OnInit } from '@angular/core';
import { KursPageSvc } from './kurs-page.svc';

@Component({
  selector: 'app-kurs-page',
  templateUrl: './kurs-page.component.html',
  styleUrls: ['./kurs-page.component.css'],
  providers: [KursPageSvc]
})
export class KursPageComponent implements OnInit {
  public isVisible = false;
  public isOkLoading = false;
  public name: string = '';

  wait = false;
  page = 0;
  count = 10;
  total = 0;
  listOfData = [];

  constructor(private currencySvc: KursPageSvc, ) { }

  ngOnInit(): void {
    this.search(true);
  }

  search(reload: boolean = false) {
    if (reload) {
      this.page = 0;
    }
    this.wait = true;
    this.currencySvc.searchAll(this.count, this.page, this.name).subscribe(res => {
      this.listOfData = res.result || [];
      this.total = res.total - this.count;
    }).add(end =>
      this.wait = false
    );
  }

}
