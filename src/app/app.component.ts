import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Ng2PagingTableService } from 'projects/ng2-paging-table/src/public_api';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  start_date = '2020-03-17';
  config: any = {
    enableCheck: true,
    showLoading: true,
    paging: { perPage: [10, 50, 100, 500] },
    enablePagingWithApi: true,
    apiSettings: {
      response: { success: Boolean, data: Array, recordsTotal: Number },
      request: "GET",
      url: "http://13.59.21.138:3351/tracker/getTrackers",
      params: [{ "name": "start_date", "value":this.start_date}],
      headers: { 'Authorization': '' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.MTKCob2aVEwOKBR_8_WmFra_8ngNtjx59ALgoc4r1tU" }
    },
    columns: [
      {
        "field": "index", "title": "Sr.N", "filter": true, "type": "number",
      },
      {
        "field": "device_id", "title": "Device id", "filter": true, "type": "string",
        valueFunc: function (data, item) {
          return data
        }
      },
      {
        "field": "display_name", "title": "Name", "filter": true, "type": "html",
        valueFunc: function (data) {
          if (data) return '<span class="blog-post" style="text-align:center;">' + data + '</span>'
        }
      },
      { "field": "email", "title": "Email", "filter": true, "type": "string" },
      { "field": "sim_mobile_number", "title": "Mobile", "filter": true, "type": "string" },
      {
        "field": "username", "title": "Username", "filter": true, "type": "string",
        valueFunc: (data) => {
        }
      },
      {
        "field": "assigned_at", "title": "Assigned at", "filter": true, "type": "date", "dateFormat": "MMM d, y","datePicker":true
      },
    ]
  };
  dataSource: any[] = [];
  constructor(
    private Ng2PagingTableService: Ng2PagingTableService
  ) {
    this.Ng2PagingTableService.addRow({})
    // for (var i = 0; i < 8000; i++) {
    //   this.dataSource.push({ "id": i + 1, "name": "Yahya Mukhtar", "country": "Pakistan", "city": "Okara", "date": new Date() })
    // }
  }
  onRowClick(event: any) {
    console.log(event);
    event.refreshCall(true);
  }
  onLoadClick(event: any) {
    console.log(event)
  }
  ngOnInit() {
    setTimeout(()=>{
      //document.getElementById("ui-datepicker-div").style.fontSize = "12px";
    },3000)
  }
  changeDate(){
    this.config.apiSettings.params[0]["value"]="2020-03-18";
    this.Ng2PagingTableService.reloadAPI();
    console.log(this.config.apiSettings.params)
  }
}
