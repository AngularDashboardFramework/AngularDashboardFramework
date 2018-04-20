import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WidgetInstanceService } from './grid.service';
import { ConfigurationService } from '../services/configuration.service';
import { WidgetService } from '../services/widget.service';
import { WidgetConfigModel } from '../widgets/_common/widget-config-model';

@Component({
    moduleId: module.id,
    selector: 'adf-grid',
    templateUrl: './grid.component.html',
    styleUrls: [
        './styles-grid.scss'
    ]
})
export class GridComponent implements OnInit {
    @Output()
    boardUpdateEvent: EventEmitter<any> = new EventEmitter();

    currentModel: any = {};

    noWidgets = true;

    dashedStyle: {};

    dropZone1: any = null;
    dropZone2: any = null;
    dropZone3: any = null;

    gridInsertionPosition = {
        x: 0,
        y: 0
    };

    /**
     * Todo - split model and board operations. This class should really focus on an individual board model's operations
     * within the grid. The board specific operations should be moved to the board component.
     * @param _widgetInstanceService
     * @param _procmonConfigurationService
     */
    constructor(
        private _widgetInstanceService: WidgetInstanceService,
        private _configurationService: ConfigurationService,
        private _widgetService: WidgetService
    ) {
        this._widgetInstanceService.listenForInstanceRemovedEventsFromWidgets().subscribe((message: string) => {
            this.saveBoard('Widget Removed From Board: ' + message, false)
        });

        this.initializeBoard();
    }

    ngOnInit() {
    }

    updateWidgetPositionInBoard($event, columnNumber, rowNumber, type) {
        this.getModel().rows.forEach(row => {
            let colpos = 0;

            row.columns.forEach(column => {
                let widgetpos = 0;

                if (column.widgets) {
                    column.widgets.forEach(widget => {

                        if (widget.instanceId === $event.dragData) {

                            const widget = column.widgets.splice(widgetpos, 1);

                            if (!this.getModel().rows[rowNumber].columns[columnNumber].widgets) {
                                this.getModel().rows[rowNumber].columns[columnNumber].widgets = [];
                            }
                            this.getModel().rows[rowNumber].columns[columnNumber].widgets.push(widget[0]);
                            this.saveBoard('drag drop operation', false);
                            return;

                        }
                        widgetpos++;
                    });
                    colpos++;
                }
            });
        });
    }

    ngOnChanges(changes: SimpleChanges) {

    }

    public createBoard(name: string) {
        this.loadNewBoard(name);
    }

    public editBoard(name: string) {

    }

    public deleteBoard(name: string) {
        this._configurationService.deleteBoard(name).subscribe(data => {
                this.initializeBoard();
            },
            error => console.error('Deletion error', error),
            () => console.debug('Board Deletion: ' + name)
        );
    }

    public addWidget(widget: any) {
        const _widget = Object.assign({}, widget);

        _widget.instanceId = new Date().getTime();
        _widget.config = new WidgetConfigModel(widget.config);

        this.setWidgetInsertPosition();

        const x = this.gridInsertionPosition.x;
        const y = this.gridInsertionPosition.y;

        if (!this.getModel().rows[x].columns[y].widgets) {
            this.getModel().rows[x].columns[y].widgets = [];
        }

        this.getModel().rows[x].columns[y].widgets.push(_widget);

        this.saveBoard('Adding Widget to the Board', false);
    }

    public updateBoardLayout(structure) {
        const _model = Object.assign({}, this.getModel());

        const columns: any[] = this.readColumnsFromOriginalModel(_model);

        // reset the original model's rows and columns based on the new structure
        _model.rows.length = 0;

        _model.rows = structure.rows;
        _model.structure = structure.structure;
        _model.id = structure.id;

        let counter = 0;

        while (counter < columns.length) {
            counter = this.fillGridStructure(_model, columns, counter);
        }

        this.setModel(_model);

        // clear temporary object
        if (_model) {
            for (const member in _model) {
                if (member) {
                    delete _model[member];
                }
            }
        }

        this.saveBoard('Grid Layout Update', false);
    }

    private updateGridState() {
        let widgetCount = 0;

        if (this.getModel().rows) {
            this.getModel().rows.forEach(function (row) {
                row.columns.forEach(function (column) {
                    if (column.widgets) {
                        column.widgets.forEach(function (widget) {
                            widgetCount++;
                        });
                    }
                });
            });
        }

        this.noWidgets = !widgetCount;

        this.dashedStyle = {
            'border-style': this.noWidgets ? 'dashed' : 'none',
            'border-width': this.noWidgets ? '2px' : 'none',
            'border-color': this.noWidgets ? 'darkgray' : 'none',
            'padding': this.noWidgets ? '5px' : 'none'
        };
    }

    private readColumnsFromOriginalModel(_model) {
        const columns = [];

        _model.rows.forEach(function (row) {
            row.columns.forEach(function (col) {
                columns.push(col);
            });
        });

        return columns;
    }

    private fillGridStructure(_model, columns: any[], counter: number) {
        const me = this;

        _model.rows.forEach(function (row) {
            row.columns.forEach(function (column) {
                if (!column.widgets) {
                    column.widgets = [];
                }

                if (columns[counter]) {
                    me.copyWidgets(columns[counter], column);
                    counter++;
                }
            });
        });

        return counter;
    }

    private copyWidgets(source, target) {
        if (source.widgets && source.widgets.length > 0) {
            let w = source.widgets.shift();

            while (w) {
                target.widgets.push(w);
                w = source.widgets.shift();
            }
        }
    }

    public enableConfigMode(): void {
        this._widgetInstanceService.enableConfigureMode();
    }

    private initializeBoard() {
        this._configurationService.getBoards().subscribe(board => {
            if (board && board instanceof Array && board.length) {
                const sortedBoard = board.sort(function(a, b){
                    return a.id - b.id;
                });

                this.loadBoard(sortedBoard[0].title);
            } else {
                this.loadDefaultBoard();
            }
        });
    }

    public loadBoard(boardTitle: string) {
        // this.clearGridModelAndWidgetInstanceStructures();

        this._configurationService.getBoardByTitle(boardTitle).subscribe(board => {
                this.setModel(board);
                this.updateServicesAndGridWithModel();
                this.boardUpdateEvent.emit(boardTitle);
            },
            error => {
                console.error(error);
                this.loadDefaultBoard();

            });
    }

    public loadDefaultBoard() {
        // this.clearGridModelAndWidgetInstanceStructures();

        this._configurationService.getDefaultBoard().subscribe(board => {
            console.log('loading default board');

            this.setModel(board);
            this.updateServicesAndGridWithModel();
            this.saveBoard('Initialization of a default board', true);
        });
    }

    private loadNewBoard(name: string) {
        this.clearGridModelAndWidgetInstanceStructures();

        this._configurationService.getDefaultBoard().subscribe(res => {
            this.setModel(res);
            this.getModel().title = name;
            this.getModel().id = new Date().getTime();

            this.updateServicesAndGridWithModel();
            this.saveBoard('Initialization of a new board', true);
        });
    }

    private updateServicesAndGridWithModel() {
        this._widgetInstanceService.setCurrentModel(this.getModel());
        this._configurationService.setCurrentModel(this.getModel());

        this.updateGridState();
    }

    private saveBoard(operation: string, alertBoardListenerThatTheMenuShouldBeUpdated: boolean) {
        this.updateServicesAndGridWithModel();

        this._configurationService.saveBoard(this.getModel()).subscribe(result => {
                if (alertBoardListenerThatTheMenuShouldBeUpdated) {
                    this.boardUpdateEvent.emit(this.getModel().title);
                }
            },
            error => console.error('Error' + error),
            () => console.debug('Saving configuration to store!')
        );
    }

    private clearGridModelAndWidgetInstanceStructures(): void {
        // clear widgetInstances
        this._widgetInstanceService.clearAllInstances();

        // clear current model
        for (const prop in this.getModel()) {
            if (this.currentModel.hasOwnProperty(prop)) {
                delete this.currentModel[prop];
            }
        }
    }

    private setWidgetInsertPosition() {
        for (let x = 0; x < this.getModel().rows.length; x++) {
            for (let y = 0; y < this.getModel().rows[x].columns.length; y++) {
                if (this.getModel().rows[x].columns[y].widgets && this.getModel().rows[x].columns[y].widgets.length === 0) {
                    this.gridInsertionPosition.x = x;
                    this.gridInsertionPosition.y = y;
                    return;
                }
            }
        }

        // we go here because the board is either empty or full
        // insert in the top left most cell
        this.gridInsertionPosition.y = 0;

        if (this.noWidgets) {
            // there are no widgets so insert in top row
            this.gridInsertionPosition.x = 0;
        } else {
            // board is full so insert in the last row
            this.gridInsertionPosition.x = this.getModel().rows.length - 1;
        }
    }

    public setModel(model: any) {
        this.currentModel = Object.assign({}, model);
    }

    public getModel(): any {
        return this.currentModel;
    }
}
