import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Ng2PagingTableModule } from 'projects/ng2-paging-table/src/public_api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2PagingTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
