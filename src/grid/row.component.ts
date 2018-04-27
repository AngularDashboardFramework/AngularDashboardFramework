import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ConfigurationService } from '../services/configuration.service';

import { Row } from '../layout';
// import { Model } from '../model';

@Component({
    selector: 'adf-row',
    templateUrl: 'row.component.html'
})
export class RowComponent implements OnInit {

    @Input()
    row: Row;

    @Input()
    rowIndex: number;

    // @Input()
    // model: Model;

    constructor(
        // private _widgetInstanceService: WidgetInstanceService,
        private _configurationService: ConfigurationService
    ) {
    }

    ngOnInit() {
        console.log('row:', this.row);
    }

    updateWidgetPositionInBoard($event, columnNumber, rowNumber, type) {
        // this._configurationService.updateWidgetPositionInBoard($event, columnNumber, rowNumber, type);
    }
}
