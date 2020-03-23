import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2PagingTableComponent } from './ng2-paging-table.component';

describe('Ng2PagingTableComponent', () => {
  let component: Ng2PagingTableComponent;
  let fixture: ComponentFixture<Ng2PagingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2PagingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2PagingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
