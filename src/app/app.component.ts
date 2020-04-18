import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Ng2PagingTableService } from 'projects/ng2-paging-table/src/public_api';
declare var $:any;
const lang = JSON.parse(localStorage.getItem("lang"));

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
    verticalScrollClass:"vertical-scroll",
    apiSettings: {
      response: { success: Boolean, data: Array, recordsTotal: Number },
      request: "GET",
      url: "http://apitest.gpsina.com/tracker/getTrackers",
      params: [{ "name": "start_date", "value":this.start_date}],
      headers: { 'Authorization': '' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.MTKCob2aVEwOKBR_8_WmFra_8ngNtjx59ALgoc4r1tU" }
    },
    columns: [

      {
          "field": "device_id",
          "title": lang["text_deviceId"],
          "filter": true,
          "type": "string",
         // "width":"150px"
      },
      { "field": "sim_mobile_number", "title": lang["text_mobile"], "filter": true, "type": "string" },
      {
          "field": "version",
          "title": lang["text_version"],
          "filter": true,
          "type": "string",
          "width":"150px"
      },
      {
          "field": "type",
          "title": lang["text_type"],
          "filter": true,
          "type": "number",
          "width":"150px"
      },
      {
          "field": "iccid",
          "title": lang["text_iccid"],
          "filter": true,
          "type": "string",
          "width":"150px"
      },
      {
          "field": "assigned_by",
          "title": lang["text_assignedBy"],
          "filter": true,
          "type": "string",
          "width":"160px"
      },
      {
          "field": "assigned_to",
          "title": lang["text_assignedTo"],
          "filter": true,
          "type": "string",
          "width":"150px"
      },
      {
          "field": "assigned_at",
          "title": lang["text_assignedAt"],
          "filter": true,
          "type": "date",
          "dateFormat": "MMM d, y",
          "width":"150px"
      },
      {
          "field": "activated_at",
          "title": lang["text_activeDate"],
          "filter": true,
          "type": "date",
          "dateFormat": "MMM d, y",
          "datePicker": true,
          "width":"150px"
      },
      {
          "field": "expired_at",
          "title": lang["text_expiredOn"],
          "filter": true,
          "type": "date",
          "dateFormat": "MMM d, y",
          "datePicker": true,
          "width":"150px"
      },
      {
          "field": "status",
          "title": lang["text_status"],
          "filter": true,
          "type": "html",
          valueFunc(data) {
              //console.log(data);
              if (data) {
                  if (data.toLowerCase() == "online") return '<label class="badge badge-success">' + data + '</label>';
                  else if (data.toLowerCase() == "offline") return '<label class="badge badge-danger">' + data + '</label>';
                  else if (data.toLowerCase() == "expired") return '<label class="badge badge-danger">' + data + '</label>';
                  else if (data.toLowerCase() == "expiring in 30 days") return '<label class="badge badge-warning">' + data + '</label>';
                  else if (data.toLowerCase() == "not activated") return '<label class="badge badge-danger">' + data + '</label>';
              }
          },
          "width":"150px"
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
