import { NgModule } from '@angular/core';
import { Ng2PagingTableComponent } from './ng2-paging-table.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2PagingTableService } from './ng2-paging-table.service';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMyDatePickerModule } from './angular-mydatepicker/angular-mydatepicker.module';


@NgModule({
  declarations: [Ng2PagingTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMyDatePickerModule
  ],
  exports: [Ng2PagingTableComponent],
  providers:[DatePipe,Ng2PagingTableService]
})
export class Ng2PagingTableModule { }
