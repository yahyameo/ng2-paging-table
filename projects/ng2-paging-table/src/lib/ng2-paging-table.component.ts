import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Ng2PagingTableService } from './ng2-paging-table.service';
declare var $: any;
@Component({
  selector: 'ng2-paging-table',
  templateUrl: './ng2-paging-table.component.html',
  styleUrls: ['./ng2-paging-table.component.scss'],
})
export class Ng2PagingTableComponent implements OnInit, AfterViewInit {
  @Input() config: any = {
    enableCheck: false,
    tableClass: ['col-md-10', 'col-md-8'],
    showLoading: true,
    paging: { perPage: [10, 50, 100, 500, 100] }
    , columns: []
  };
  @Input() dataSource: any[] = [];
  index: number;
  selectedItems: any[] = [];
  @Output() onRowClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLoadClick: EventEmitter<any> = new EventEmitter<any>();
  private refresh = new Subject<any>();
  private notifyObservable$ = this.refresh.asObservable();
  private _addRow = new Subject<any>();
  private addRowObservable$ = this._addRow.asObservable();
  private _updateRow = new Subject<any>();
  private updateRowObservable$ = this._updateRow.asObservable();
  private _removeRow = new Subject<any>();
  private removeRowObservable$ = this._removeRow.asObservable();
  PerPage: number = 10;
  TotalPages: number;
  ArrLen: number;
  NextPage: number;
  PrevPage: number;
  PageNumber: number;
  LastIndex: number;
  data: any[] = [];
  showLoader: boolean = false;
  recordsTotal: number;
  refreshCall: Function;
  addRow: Function;
  updateRow: Function;
  deleteRow: Function;
  constructor(private datePipe: DatePipe,
    public http: HttpClient,
    private ng2PagingTableService: Ng2PagingTableService) {
    this.onLoadClick.emit(this);
    this.refreshCall = (data) => this.refresh.next(data);
    this.addRow = (data) => this._addRow.next(data);
    this.updateRow = (index, data) => this._updateRow.next({ index: index, data: data });
    this.deleteRow = (index, data) => this._removeRow.next({ index: index, data: data });
    this.notifyObservable$.subscribe(resp => {
      console.log("Refresh Called!!" + resp);
    });
    this.addRowObservable$.subscribe(data => {
      this.data.unshift(data);
      this.dataSource.unshift(data);
    });
    this.updateRowObservable$.subscribe(resp => {
      this.dataSource[resp.index] = resp.data;
      this.data[resp.index] = resp.data;
    });
    this.removeRowObservable$.subscribe(index => {
      this.data.splice(index, 1);
    });
    //with service
    this.ng2PagingTableService.addRowObservable$.subscribe(data => {
      this.data.unshift(data);
      this.recordsTotal = this.recordsTotal + 1;
    });
    this.ng2PagingTableService.updateRowObservable$.subscribe(resp => {
      this.dataSource[resp.index] = resp.data;
      this.data[resp.index] = resp.data;
    });
    this.ng2PagingTableService.removeRowObservable$.subscribe(index => {
      this.dataSource.splice(index, 1);
      this.data.splice(index, 1);
    });
    this.ng2PagingTableService.reloadAPIObservable$.subscribe(data => {
      this.callAPI();
    });
  }
  ngOnChanges() {
    this.PerPage = this.config.paging.perPage[0];
    this.NextPage = this.PerPage;
    this.PrevPage = 0;
    this.TotalPages = 1;
    this.PageNumber = 1;
    this.ArrLen = this.dataSource.length;
    this.recordsTotal = this.ArrLen;
    if (!this.config.tableClass || !this.config.tableClass.length) this.config.tableClass = ['col-md-10', 'col-md-8'];
    if (!this.config.paging.perPage || !this.config.paging.perPage.length) this.config.paging.perPage = [10, 50, 100, 500];
    if (!this.config.enablePagingWithApi) this.loadData();
    else this.callAPI();
  }
  callAPI(searchColumn = null, value = null) {
    if (this.config.showLoading) this.OverlayOn();
    var url = this.config.apiSettings.url + "" + "?";
    if (searchColumn) url += searchColumn + "=" + value;
    else url += "length=" + this.PerPage + "&start=" + this.PrevPage + "";
    let headers = {
      headers: new HttpHeaders(this.config.apiSettings.headers)
    };
    if (this.config.apiSettings && this.config.apiSettings.params) {
      var params = this.config.apiSettings.params;
      if (params.length) {
        params.forEach(element => {
          url += "&" + element.name + "=" + element.value;
        });
      }
    }
    if (this.config.apiSettings.request.toUpperCase() == "GET") {
      this.http.get(url, headers)
        .subscribe(resp => {
          var response = resp as any;
          if (response.success) {
            this.dataSource = response.data;
            this.recordsTotal = response.recordsTotal;
            this.ArrLen = this.recordsTotal;
          }
          if (this.config.showLoading) this.OverlayOff(true);
          if (this.dataSource.length) this.loadData();
        }, (error) => {
          console.log(error);
          if (this.config.showLoading) this.OverlayOff(true);
        });
    }
  }
  bindAPIData() {
    for (var i = this.PrevPage; i < this.LastIndex; i++) {
      var record = this.dataSource[i];
      record["sr"] = 1 + i;
      this.data.push(record);
    }
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    // this.config.columns.forEach(item => {
    //   if (item.datePicker) {
    //     $('#' + item.field).datepicker({
    //       changeMonth: true,
    //       changeYear: true,
    //       showButtonPanel: true,
    //       dateFormat: "m/d/yy",
    //       onSelect: (date) => {
    //         var formatDate = this.datePipe.transform(date, item.dateFormat);
    //         $('#' + item.field).val(formatDate);
    //         this.Filter(item, formatDate);
    //       },
    //     });
    //     document.getElementById("ui-datepicker-div").style.fontSize = "12px";
    //   }
    // });
  }
  loadData() {
    this.showLoader = true;
    this.OverlayOn();
    this.data = [];
    if (Math.trunc(this.ArrLen / this.PerPage) == 0) this.TotalPages = 1;
    else if (Math.trunc(this.ArrLen / this.PerPage) != 0) this.TotalPages = this.ArrLen / this.PerPage;
    if (typeof this.TotalPages === 'number') {
      if (this.TotalPages % 1 !== 0) {
        this.TotalPages = Math.trunc(this.TotalPages) + 1;
      }
    }
    if (this.TotalPages == 1) {
      this.NextPage = this.ArrLen;
    }
    this.LastIndex = this.NextPage;
    if (this.LastIndex > this.ArrLen) {
      this.LastIndex = this.ArrLen;
    }
    if (!this.config.enablePagingWithApi) {
      for (var i = this.PrevPage; i < this.LastIndex; i++) {
        var record = this.dataSource[i];
        record["sr"] = 1 + i;
        this.data.push(record);
      }
    }
    else this.data = this.dataSource;
    this.OverlayOff(true);
  }
  GoLastPage() {
    if (this.PageNumber == this.TotalPages) {
      return false;
    }
    this.PageNumber = this.TotalPages;
    this.NextPage = this.ArrLen;
    this.PrevPage = (this.TotalPages - 1) * this.PerPage;
    if (!this.config.enablePagingWithApi) this.loadData();
    else this.callAPI();
  }
  GoFirstPage() {
    if (this.PageNumber == 1) {
      return false;
    }
    this.PageNumber = 1;
    this.PrevPage = 0;
    this.NextPage = this.PerPage;
    if (!this.config.enablePagingWithApi) this.loadData();
    else this.callAPI();

  }
  GoPrevPage() {
    if (this.PageNumber == 1) {
      return false;
    }
    this.PageNumber = this.PageNumber - 1;
    this.NextPage = this.PrevPage;
    this.PrevPage = this.PrevPage - this.PerPage;
    if (!this.config.enablePagingWithApi) this.loadData();
    else this.callAPI();

  }
  GoNextPage() {
    if (this.PageNumber == this.TotalPages) {
      return false;
    }
    this.PageNumber = this.PageNumber + 1;
    this.PrevPage = this.NextPage;
    this.NextPage = this.NextPage + this.PerPage
    if (!this.config.enablePagingWithApi) this.loadData();
    else this.callAPI();
  }
  PerPageEntries() {
    this.PerPage = parseInt(document.getElementById('ddlPerPage')["value"]);
    this.PageNumber = 1;
    this.PrevPage = 0;
    this.NextPage = this.PerPage
    if (!this.config.enablePagingWithApi) this.loadData();
    else {
      this.dataSource = [];
      this.callAPI();
    }
  }
  tempData: any[] = [];
  tempPagingData: any = {};
  searchIndex: number;
  Filter(col, input) {
    if (!this.tempData.length) {
      this.tempData = this.data;
      this.tempPagingData = {
        recordsTotal: this.recordsTotal, PerPage: this.PerPage,
        PageNumber: this.PageNumber, LastIndex: this.LastIndex,
        NextPage: this.NextPage, PerPageEntries: this.PerPageEntries,
        PrevPage: this.PrevPage, TotalPages: this.TotalPages
      };
    }
    else if (input == '' || input == null) {
      this.data = this.tempData;
      this.recordsTotal = this.tempPagingData.recordsTotal;
      this.PerPage = this.tempPagingData.PerPage;
      this.LastIndex = this.tempPagingData.LastIndex;
      this.NextPage = this.tempPagingData.NextPage;
      this.PerPageEntries = this.tempPagingData.PerPageEntries;
      this.PrevPage = this.tempPagingData.PrevPage;
      this.TotalPages = this.tempPagingData.TotalPages;
      return true;
    }
    if (col.field == 'index') {
      var record = this.dataSource[input - 1];
      record["sr"] = input;
      this.data = [record];
    }
    else if (col.type != 'date') {
      this.data = this.dataSource.filter(x => x[col.field] && x[col.field].toString().toUpperCase().includes(input.toString().toUpperCase()));
    }
    else if (col.type == 'date'&&!col.datePicker) this.data = this.dataSource.filter(x => x[col.field] && this.datePipe.transform((x[col.field]), col.dateFormat).toString().toUpperCase().includes(input.toString().toUpperCase()));
    else if (col.type == 'date'&&col.datePicker) this.data = this.dataSource.filter(x => x[col.field] && this.datePipe.transform((x[col.field]), col.dateFormat).toString().toUpperCase().includes((this.datePipe.transform(input,col.dateFormat)).toString().toUpperCase()));
  }
  sort(col) {
    col["order"] = !col["order"];
    if (col.field == "index") {
      this.data.reverse();
    }
    else if (col.type == "date") {
      this.data.sort(function (a, b) {
        var keyA = new Date(col["order"] ? a[col.field] : b[col.field]),
          keyB = new Date(col["order"] ? b[col.field] : a[col.field]);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    }
    else {
      this.data.sort(function (a, b) {
        var keyA = col["order"] ? a[col.field] : b[col.field],
          keyB = col["order"] ? b[col.field] : a[col.field];
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    }
    console.log(this.data)
  }
  OverlayOn() {
    if (!this.config.showLoading) return false;
    console.log('loading started')
    document.getElementById("overlay").style.display = "block";
  }

  OverlayOff(last) {
    if (!this.config.showLoading) return false;
    this.selectedRow = null;
    if (last) {
      console.log('loading stopped' + last)
      setTimeout(() => {
        document.getElementById("overlay").style.display = "none";
      }, 500)
    }
  }
  validateDate(date) {
    if (Date.parse(date)) return true;
    else return false;
  }
  selectedRow: any = {};
  rowClick(item, event, index) {
    item["index"] = index;
    if (item == this.selectedRow) {
      this.selectedRow = {};
      if (item["checked"] == true) {
        var del = this.selectedItems.findIndex(x => x.index == index);
        this.selectedItems.splice(del, 1);
        item["checked"] = false;
      }
      else {
        item["checked"] = true;
        this.selectedItems.push(item);
      }
    }
    else {
      if (item["checked"] == true) {
        var del = this.selectedItems.findIndex(x => x.index == index);
        this.selectedItems.splice(del, 1);
        item["checked"] = false;
      }
      else {
        item["checked"] = true;
        this.selectedItems.push(item);
      }

      this.selectedRow = item;
      this.index = index;
    }
    if (this.selectedRow["index"] != item["index"]) this.selectedRow = null;
    this.onRowClick.emit(event);
  }
  checkedAll: boolean;
  CheckAllOptions() {
    this.checkedAll = !this.checkedAll;
    if (!this.checkedAll) {
      this.selectedItems = [];
      this.data.forEach(val => { val.checked = false });
    }
    else {
      this.data.forEach(val => {
        val.checked = true;
        this.selectedItems.push(val);
      });
    }
  }
  getValue(column, item): any {
    const valid = column.valueFunc instanceof Function;
    if (valid) {
      return column.valueFunc(item[column.field], item);
    }
    else { return item[column.field]; }
  }
}
