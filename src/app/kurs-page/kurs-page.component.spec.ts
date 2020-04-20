import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KursPageComponent } from './kurs-page.component';

describe('KursPageComponent', () => {
  let component: KursPageComponent;
  let fixture: ComponentFixture<KursPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KursPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
