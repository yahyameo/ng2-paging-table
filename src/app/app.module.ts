import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Ng2PagingTableModule, AngularMyDatePickerModule } from 'projects/ng2-paging-table/src/public_api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerNgmodel } from './date-picker-ngmodel';
import { DatePickerReactiveForms } from './date-picker-reactive-forms';
import { DatePickerDivHostElement } from './date-picker-div-host-element';
import { DatePickerInline} from './date-picker-inline';
@NgModule({
  declarations: [
    AppComponent,
    DatePickerNgmodel, DatePickerReactiveForms, DatePickerDivHostElement, DatePickerInline
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    Ng2PagingTableModule,
    AngularMyDatePickerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
