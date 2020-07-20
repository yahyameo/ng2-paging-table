import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Ng2PagingTableService } from 'projects/ng2-paging-table/src/public_api';
declare var $: any;
const lang = JSON.parse(localStorage.getItem("lang"));

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  config: any = {
    enableCheck: false,
    showLoading: true,
    paging: { perPage: [10, 50, 100, 500] },
    enablePagingWithApi: true,
    verticalScrollClass: "vertical-scroll",
    apiSettings: {
      response: { success: Boolean, data: Array, recordsTotal: Number },
      request: "GET",
      url: "http://apitest.gpsina.com/tracker/getTrackers",
      // params: [{ "name": "start_date", "value":this.start_date}],
      headers: { 'Authorization': '' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.MTKCob2aVEwOKBR_8_WmFra_8ngNtjx59ALgoc4r1tU" }
    },
    columns: [
      {
        "sorting":false,
        "type": "html",
        "cssClass": "sticky-col first-col",
        "filterCssClass": "sticky-col first-col",
        "titleCssClass": "sticky-col first-col",
        valueFunc(data) {
          return "<div class='bg-online sts'></div>"
        },
      },
      {
        "field": "device_id",
        "title": lang["text_deviceId"],
        "filter": true,
        "type": "string",
        "cssClass": "no"
      },
      {
        "field": "display_name",
        "title": lang["text_vehicle"],
        "filter": true,
        "type": "string",
        "cssClass": "no"
      },
      { "field": "sim_mobile_number", "title": lang["text_mobile"], "filter": true, "type": "string" },
      {
        "field": "version",
        "title": lang["text_version"],
        "filter": true,
        "type": "string",
        "cssClass": "no"
      },
      {
        "field": "type",
        "title": lang["text_type"],
        "filter": true,
        "type": "number",
        "width": "100px",
        "cssClass": "no"
      },
      {
        "field": "iccid",
        "title": lang["text_iccid"],
        "filter": true,
        "type": "string",
        "width": "100px",
        "cssClass": "no"
      },
      {
        "field": "distributor_name",
        "title": lang["text_distributor"],
        "filter": true,
        "type": "string",
        "width": "100px",
        "cssClass": "no"
      },
      {
        "field": "sub_distributor_name",
        "title": lang["text_subDistributors"],
        "filter": true,
        "type": "string",
        "width": "100px",
        "cssClass": "no"
      },
      {
        "field": "dealer_name",
        "title": lang["text_dealer"],
        "filter": true,
        "type": "string",
        "width": "100px",
        "cssClass": "no"
      },
      {
        "field": "agent_name",
        "title": lang["text_agent"],
        "filter": true,
        "type": "string",
        "width": "100px",
        "cssClass": "no"
      },
      {
        "field": "assigned_at",
        "title": lang["text_assignedAt"],
        "filter": true,
        "type": "date",
        "dateFormat": "MMM d, y",
        "width": "100px",
        "cssClass": "no"
      },
      {
        "field": "activated_at",
        "title": lang["text_activeDate"],
        "filter": true,
        "type": "date",
        "dateFormat": "MMM d, y",
        "datePicker": true,
        "cssClass": "no"
      },
      {
        "field": "expired_at",
        "title": lang["text_expiredOn"],
        "filter": true,
        "dateFormat": "MMM d, y",
        "type": "dateRange",
        "params": ["start_expired_at", "end_expired_at"],
        "width": "160px",
        "cssClass": "no"
      },
      {
        "field": "status",
        "title": lang["text_status"],
        "filter": true,
        "type": "html",
        valueFunc(data) {
          //console.log(data);
          if (data) {
            if (data.toLowerCase() == "online") return '<label class="text-success text-uppercase font-weight-bolder">' + data + '</label>';
            else if (data.toLowerCase() == "offline") return '<label class="text-danger text-uppercase font-weight-bolder">' + data + '</label>';
            else if (data.toLowerCase() == "expired") return '<label class="text-danger text-uppercase font-weight-bolder">' + data + '</label>';
            else if (data.toLowerCase() == "expiring in 30 days") return '<label class="text-warning text-uppercase font-weight-bolder">' + data + '</label>';
            else if (data.toLowerCase() == "not activated") return '<label class="text-danger text-uppercase font-weight-bolder">' + data + '</label>';
            else return '<label class="text-defaults text-uppercase font-weight-bolder">' + data + '</label>';
          }
        },
        "cssClass": "no"
      },
    ]
  };
  dataSource: any[] = [];
  constructor(
    private Ng2PagingTableService: Ng2PagingTableService
  ) {
    this.Ng2PagingTableService.addRow({});

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
    setTimeout(() => {
      //document.getElementById("ui-datepicker-div").style.fontSize = "12px";
    }, 3000)
  }
  changeDate() {
    this.config.apiSettings.params[0]["value"] = "2020-03-18";
    this.Ng2PagingTableService.reloadAPI();
    console.log(this.config.apiSettings.params)
  }
}
