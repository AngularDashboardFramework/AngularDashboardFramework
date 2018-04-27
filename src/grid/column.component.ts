import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../layout/layout';
//import { Widget } from '../../widgets/_common/widget';
//import { Model } from '../../model';

@Component({
  selector: 'adf-column',
  templateUrl: 'column.component.html'
})
export class ColumnComponent implements OnInit {
    widgets: any[] = []; //Widget[] = [];  

    @Input()
    col: any = {};
    
    ngOnInit() {
      console.log("col:", this.col);
      this.widgets = this.col.widgets;
    }
}