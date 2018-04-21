// // import { Component, OnInit } from '@angular/core';
// import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// import { DataBrokerService } from '../services/databroker.service';

// // import { LayoutService } from './layout/layout.service';
// import { LayoutService } from './layout.service';

// import { AppConfigService } from '../services/appConfig.services';

// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';

// // import { Layout } from '../layout/layout';

// // import { ConfigurationService } from '../services/configuration.service';

// import { ConfigurationService } from 'ng-adf/services';
// import { Layout } from 'ng-adf/layout';
// import { Board } from 'ng-adf/grid/board';
// import { WidgetConfigModel } from 'ng-adf/widgets/_common/widget-config-model';
// /**
//  * Board component
//  *
//  */
// // @Component({
// //   moduleId: module.id,
// //   selector: 'adf-board',
// //   templateUrl: './board.component.html',
// //   styleUrls: [
// //       './styles-board.css'
// //   ]
// // })
// @Component({
//     selector: 'app-root',
//     templateUrl: './page.component.html',
//     styleUrls: [
//         'ng-adf/board/styles-board.css',
//         './page.component.css'
//     ]
// })
// // export class BoardComponent implements OnInit {
// export class PageComponent implements OnInit {
//     defaultApp: string = 'sample';
//     defaultPage: string = 'sample';

//     page: string = '';

//     context: object = {};

//     pageRoute: any;

//     error: string;

//     pageLayoutsSources: Array<string>;

//     // layouts: Map<string, object>;
//     layouts: Layout[];

//     // @Input()
//     // layouts: Layout[];

//     // @Output()
//     // boardUpdateEvent: EventEmitter<any> = new EventEmitter();

//     // @Input()
//     model: Subject<any> = new Subject<any>();
//     // currentModel: any;
//     // model: Observable<any> = new Observable<any>();

//     dashboardList: any[] = [];

//     selectedBoard = '';

//     gridInsertionPosition = {
//         x: 0,
//         y: 0
//     };

//     constructor(
//       private route: ActivatedRoute,
//       private dataBroker: DataBrokerService,
//       // private pageService: PageService,
//       private pageService: ConfigurationService,
//       private layoutService: LayoutService,
//       private _appConfigService: AppConfigService
//     ) {
//       this._appConfigService.AppConfig.subscribe(config => {
//         if (config !== undefined)
//         {
//           console.log('Page:config:', config);

//           this.defaultApp = config.DefaultApp;
//           this.defaultPage = config.DefaultPage;

//           this.setPage();
//         }
//       });

//       // fetch page structure
//       this.pageLayoutsSources = [
//         // 'layouts/deal',
//         // 'layouts/simple',
//         // 'layouts/4-2',
//         // 'layouts/4-8',

//         'narrow-left',
//         'narrow-right',
//         'ngadmin',
//         'single',
//         'three-even',
//         'two-even',
//         'wide-center',
//         'wide-top',
//       ];

//       this.pageLayoutsSources.forEach((pageLayoutSource) => {
//         this.layoutService.addLayoutSource(pageLayoutSource);
//       });
//     }

//     ngOnInit() {
//         console.log('Page:ngOnInit');

//         this.initializeLayouts();

//         this.setPage();

//         // this.updateDashboardMenu('');

//         this.pageService.Model.subscribe((model) => {
//             if (model !== undefined)
//             {
//                 console.log('PageComponents:Model.subscribe:', model);

//                 // this.clearGridModelAndWidgetInstanceStructures();
//                 this.setModel(model);
//                 // this.updateGridState();

//                 // this.boardUpdateEvent.emit(model.boardTitle);
//             }
//           });

//           // this.model = this.pageService.Model;
//           this.pageService.Page.subscribe(
//               (page) => {
//                 console.log('   Page:', page);
//                 if (page) {
//                     const boards = page.boards;

//                     const me = this;

//                     if (boards && boards instanceof Array && boards.length) {
//                         // this.dashboardList.length = 0;
//                         console.log('   DashboardList: ', boards);

//                         // sort boards
//                         boards.sort((a: any, b: any) => a.id - b.id);

//                         me.dashboardList = [];

//                         boards.forEach(board => {
//                             me.dashboardList.push(board.title);
//                         });

//                         this.updateDashboardMenu('');
//                     }
//                 } else {
//                     console.log('BoardComponent:ngOnInit() -> Page.subscribe -> page.boards is empty');
//                 }
//             }
//         );
//     }

//     initializeLayouts() {
//         // this.layoutService.getLayout(this.defaultLayout).subscribe(
//         //     layout => {
//         //       //this.pageStructures.set( = pageStructure;
//         //       console.log('initializeLayouts:layout:', layout);

//         //       //this.register(pageStructure.name, pageStructure);
//         //       this.layouts.push(layout);
//         //     },
//         //     error => this.error = error
//         // );
//         this.layoutService.layouts.subscribe(layouts => {
//             console.log('layouts:', layouts);
//             this.layouts = layouts;
//         });

//         console.log('initializeLayouts.layouts', this.layouts);
//         // Object.assign(this, {layouts});
//         // this.layouts = layouts;
//     }

//     setPage()
//     {
//       this.pageRoute = this.route.params.subscribe(params => {
//         console.log('Page/RouteParams: ', params);

//         let app: string = '';
//         let page: string = '';

//         if (params.page === undefined || params.page === '')
//         {
//             app = this.defaultApp;
//             page = this.defaultPage;
//         } else {
//           app = params.app;
//           page = params.page;
//         }

//         if (app !== '' && page !== '') {
//             console.log('App: ', app, ' Page: ', page);

//             this.page = app + '/page/' + page + '.json';

//             console.log(` this.page: '${this.page}'`);

//             // fetch model
//             this.pageService.loadPage(this.page);
//         //   this.pageService.getPage(this.page).subscribe(
//         //     (model) => {
//         //       console.log('Models', model);
//         //       this.model = model;

//         //       if (this.model.context !== undefined)
//         //       {
//         //         this.model.context.parameters.forEach(parameter => {
//         //           let value = params[parameter.name] || {}

//         //           console.log(`Context Parameter->${parameter.name}: ${value}`);

//         //           this.context[parameter.name] = value;
//         //         });
//         //       }

//         //       if (this.model.dataSources !== undefined)
//         //       {
//         //         this.dataBroker.setDataSources(this.model.dataSources);
//         //       }

//         //       //this._state.notifyDataChanged('menu.activeLink', { 'title': this.model.title });
//         //     },
//         //     error => this.error = error
//         //   );
//         }
//       });
//     }

//     private saveBoard(operation: string, alertBoardListenerThatTheMenuShouldBeUpdated: boolean) {
//         // this.updateServicesAndGridWithModel();

//         this.pageService.saveBoard(this.getModel()).subscribe(result => {
//                 if (alertBoardListenerThatTheMenuShouldBeUpdated) {
//                     // this.boardUpdateEvent.emit(this.getModel().title);
//                 }
//             },
//             error => console.error('Error' + error),
//             () => console.debug('Saving configuration to store!')
//         );
//     }

//     public editBoard(name: string) {
//     }

//     public deleteBoard(name: string) {
//         this.pageService.deleteBoard(name).subscribe(data => {
//                 // this.initializeBoard();
//             },
//             error => console.error('Deletion error', error),
//             () => console.debug('Board Deletion: ' + name)
//         );
//     }

//     private readColumnsFromOriginalModel(_model) {
//         const columns = [];

//         _model.rows.forEach(function (row) {
//             row.columns.forEach(function (col) {
//                 columns.push(col);
//             });
//         });

//         return columns;
//     }

//     private fillGridStructure(_model, columns: any[], counter: number): number {
//         const me = this;

//         _model.rows.forEach(function (row) {
//             row.columns.forEach(function (column) {
//                 if (!column.widgets) {
//                     column.widgets = [];
//                 }

//                 if (columns[counter]) {
//                     me.copyWidgets(columns[counter], column);
//                     counter++;
//                 }
//             });
//         });

//         return counter;
//     }

//     private copyWidgets(source, target): void {
//         if (source.widgets && source.widgets.length > 0) {
//             let w = source.widgets.shift();

//             while (w) {
//                 target.widgets.push(w);
//                 w = source.widgets.shift();
//             }
//         }
//     }

//     public updateBoardLayout(structure) {
//         const _model = Object.assign({}, this.getModel());

//         const columns: any[] = this.readColumnsFromOriginalModel(_model);

//         // reset the original model's rows and columns based on the new structure
//         _model.rows.length = 0;

//         _model.rows = structure.rows;
//         _model.structure = structure.structure;
//         _model.id = structure.id;

//         let counter = 0;

//         while (counter < columns.length) {
//             counter = this.fillGridStructure(_model, columns, counter);
//         }

//         this.setModel(_model);

//         // clear temporary object
//         if (_model !== null) {
//             for (const member in _model) {
//                 delete _model[member];
//             }
//         }

//         this.saveBoard('Grid Layout Update', false);
//     }

//     private widgetCount(): number
//     {
//         let widgetCount = 0;

//         if (this.getModel().rows) {
//             this.getModel().rows.forEach(function (row) {
//                 row.columns.forEach(function (column) {
//                     if (column.widgets) {
//                         column.widgets.forEach(function (widget) {
//                             widgetCount++;
//                         });
//                     }
//                 });
//             });
//         }

//         return widgetCount;
//     }

//     private setWidgetInsertPosition(): void {
//         for (let x = 0; x < this.getModel().rows.length; x++) {
//             for (let y = 0; y < this.getModel().rows[x].columns.length; y++) {
//                 if (this.getModel().rows[x].columns[y].widgets && this.getModel().rows[x].columns[y].widgets.length === 0) {
//                     this.gridInsertionPosition.x = x;
//                     this.gridInsertionPosition.y = y;
//                     return;
//                 }
//             }
//         }

//         // we go here because the board is either empty or full
//         // insert in the top left most cell
//         this.gridInsertionPosition.y = 0;

//         if (this.widgetCount() === 0) {
//             // there are no widgets so insert in top row
//             this.gridInsertionPosition.x = 0;
//         } else {
//             // board is full so insert in the last row
//             this.gridInsertionPosition.x = this.getModel().rows.length - 1;
//         }
//     }

//     public addWidget(widget: any): void{
//         const _widget = Object.assign({}, widget);

//         _widget.instanceId = new Date().getTime();
//         _widget.config = new WidgetConfigModel(widget.config);

//         this.setWidgetInsertPosition();

//         const x = this.gridInsertionPosition.x;
//         const y = this.gridInsertionPosition.y;

//         if (!this.getModel().rows[x].columns[y].widgets) {
//             this.getModel().rows[x].columns[y].widgets = [];
//         }

//         this.getModel().rows[x].columns[y].widgets.push(_widget);

//         this.saveBoard('Adding Widget to the Board', false);
//     }

//     public createBoard(name: string): void {
//         this.loadNewBoard(name);
//     }

//     updateDashboardMenu(selectedBoard: string = '') {
//       this.selectBoard(selectedBoard);
//     }

//     selectBoard(selectedBoard: string = '') {
//         console.log(`BoardComponent:selectBoard('${selectedBoard}')`);

//         if (selectedBoard === '') {
//           // this.selectBoard(this.dashboardList[0]);
//           selectedBoard = this.dashboardList[0];
//         }
//         // else {
//         //   this.selectBoard(selectedBoard);
//         // }

//         if (this.selectedBoard !== selectedBoard)
//         {
//             this.selectedBoard = selectedBoard;
//             this.loadBoard(this.selectedBoard);
//         }
//     }

//     private loadBoard(boardTitle: string) {
//         this.pageService.loadBoard(boardTitle);
//         // this.pageService.getBoardByTitle(boardTitle).subscribe(board => {
//         //         this.setModel(board);
//         //         // this.updateServicesAndGridWithModel();
//         //         // this.boardUpdateEvent.emit(boardTitle);
//         //     },
//         //     error => {
//         //         console.error(error);
//         //         this.loadDefaultBoard();
//         //     }``
//         // );
//     }

//     // private loadDefaultBoard() {
//     //     this.pageService.getDefaultBoard().subscribe(board => {
//     //         console.log('loadDefaultBoard:loading default board');

//     //         this.setModel(board);
//     //         // this.updateServicesAndGridWithModel();
//     //         this.saveBoard('Initialization of a default board', true);
//     //     });
//     // }

//     private loadNewBoard(name: string) {
//         this.pageService.getDefaultBoard().subscribe(res => {
//             const model: Board = <Board>res;
//             model.title = name;
//             model.id = new Date().getTime();

//             this.setModel(model);
//             // this.getModel().title = name;
//             // this.getModel().id = new Date().getTime();

//             // this.updateServicesAndGridWithModel();
//             this.saveBoard('Initialization of a new board', true);
//         });
//     }

//     public getModel(): any {
//         return this.model;
//     }

//     public setModel(model: any): void {
//         console.log('PageComponent::setModel = ', model);
//         // this.currentModel = model;
//         this.model = Object.assign({}, model);
//         // this.model.publish(model);
//     }
// }
