import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CitiesComponent } from './cities/cities.component';
import { UserPageRoutingModule } from './user-page.routing.module';
import { ExchangerComponent } from './exchanger/exchanger.component';
import { CurrencyComponent } from './currency/currency.component';

@NgModule({
    declarations: [
        CitiesComponent,
        ExchangerComponent,
        CurrencyComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        UserPageRoutingModule
    ],
    providers: [
    ]
})
export class UserPageModule { }
