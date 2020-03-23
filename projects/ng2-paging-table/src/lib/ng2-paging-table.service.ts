import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Ng2PagingTableService {
  _addRow = new BehaviorSubject(Object);
   addRowObservable$:Observable<Object> = this._addRow.asObservable();
  _updateRow = new Subject<any>();
  updateRowObservable$:Observable<any> = this._updateRow.asObservable();
  _removeRow = new Subject<any>();
  removeRowObservable$:Observable<any> = this._removeRow.asObservable();
  _reloadAPI = new Subject<any>();
  reloadAPIObservable$:Observable<any> = this._reloadAPI.asObservable();
  addRow: Function;
  updateRow: Function;
  deleteRow: Function;
  reloadAPI:Function;
  constructor() {
    this.addRow = (data) => this._addRow.next(data);
    this.updateRow = (index, data) => this._updateRow.next({ index: index, data: data });
    this.deleteRow = (index, data) => this._removeRow.next({ index: index, data: data });
    this.reloadAPI = (data) => this._reloadAPI.next(data);
  }
}
