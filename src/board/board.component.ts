import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Layout } from '../layout/layout';

import { ConfigurationService } from '../services/configuration.service';

/**
 * Board component
 *
 */
@Component({
    selector: 'adf-board',
    templateUrl: './board.component.html',
    styleUrls: [
        './styles-board.css'
    ]
})
export class BoardComponent implements OnInit {
    @Input()
    layouts: Layout[];


    dashboardList: any[] = [];

    selectedBoard = '';

    constructor(
        private _configurationService: ConfigurationService
    ) {
    }

    ngOnInit() {
        this.updateDashboardMenu('');
    }

    updateDashboardMenu(selectedBoard: string) {
        this._configurationService.getBoards().subscribe(data => {
            const me = this;

            if (data && data instanceof Array && data.length) {
                this.dashboardList.length = 0;

                // sort boards
                data.sort((a: any, b: any) => a.id - b.id);

                data.forEach(board => {
                    me.dashboardList.push(board.title);
                });

                if (selectedBoard === '') {
                    this.selectBoard(this.dashboardList[0]);
                } else {
                    this.selectBoard(selectedBoard);
                }
            }
        });
    }

    selectBoard(selectedBoard: string) {
        this.selectedBoard = selectedBoard;
    }
}
