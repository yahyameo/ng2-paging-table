## Ng2PagingTableModule

> This angular module is to empover table pagination.

For now, one component is added in this library
```html
  <ng2-paging-table (onRowClick)="onRowClick($event)" [config]="config" [dataSource]="dataSource"></ng2-paging-table>
```

# How to use?

* Include our ```ng2-paging-table``` module in ```app.module.ts```
```javascript
import { Ng2PagingTableModule } from 'ng2-paging-table';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2PagingTableModule //<-- add the module in imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
* Declare settings and datasource  in ```app.component.ts```
```javascript
//app.component.ts
export class AppComponent {
  config:any={
    enableCheck:true,
    showLoading: true,
    paging: {perPage:[10,50,100,500]},
    enablePagingWithApi: true,
    apiSettings: {
      response:{success:Boolean,data:Array,recordsTotal:Number},
      request:"GET",
      url: "http:/localhost:4520/tracker/getTrackers",
      params: ["length", "start"],
      headers: { 'Authorization': '' + window.localStorage.getItem('dmsw_userToken') }
    },
    columns:[
      { "field": "index", "title": "Sr.N", "filter": true, "type": "number" },
      {"field":"id","title":"ID","filter":true,"type":"string"},
      {"field":"name","title":"Name","filter":true,"type":"string"},
      {"field":"country","title":"Country","filter":true,"type":"string"},
      {"field":"city","title":"City","filter":true,"type":"string"},
      {"field":"date","title":"Date","filter":true,"type":"date",'dateFormat':'medium'}
     ]
  };
  dataSource:any[]=[];
  constructor(){
    for(var i=0;i<200;i++){
      this.dataSource.push({"id":i+1,"name":"Yahya Mukhtar","country":"Pakistan","city":"Lahore"})
    }
  }
   onRowClick(item){
    console.log(item)
  }
}
```
*  ```app.component.html```
```html
<div style="text-align:center">
  <ng2-paging-table (onRowClick)="onRowClick($event)" [config]="config" [dataSource]="dataSource"></ng2-paging-table>
</div>
```
* Example Sample  

    ![Rating component image](https://raw.githubusercontent.com/yahyameo/RequireTable/master/paging.png)
> Thank you, give a try. Welcome!
# What's next?
* Refresh table on insert or delete a record without reloading all data
* Pagination with direct APIs
# Contact us?
* Email: yahya_meo@yahoo.com 
* Phone: +92 322 6964686
