// /**
//  * Created by jayhamilton on 2/7/17.
//  */
// import { Injectable, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { isEmpty } from 'lodash';

// import { AppConfigService } from './app.services';

// import { Board } from '../grid/board';

// import { defaultBoard } from '../board/models/board-default';
// // import { sampleBoardCollection } from '../board/models/board-collection-sample';

// @Injectable()
// export class ConfigurationService implements OnInit {
//     /**
//      * todo - fix this hard coded store
//      * @type {string}
//      */
//     // remoteConfigurationRepository = 'http://localhost:8090/api/store';
//     configRemoteConfigurationRepository = '/assets/api/apps/';

//     // model: any; // todo review this object closely
//     public Model: BehaviorSubject<any> = new BehaviorSubject<any>({});
//     currentModel: any; // this object helps with updates to property page values

//     page: string = '';
//     public Page: BehaviorSubject<any> = new BehaviorSubject<any>({});
//     currentPage: any;

//     // useLocalStore: boolean = true;
//     useLocalStore: boolean = false;

//     defaultBoard: any;
//     // sampleBoardCollection: any;

//     constructor(
//         private _appConfigService: AppConfigService,
//         private _http: HttpClient
//     ) {
//         this.loadAppConfig();

//         Object.assign(this, { defaultBoard });
//         // Object.assign(this, {sampleBoardCollection});

//         //this.seedLocalStorageWithSampleBoardCollection();
//     }

//     ngOnInit() {
//         console.log("ConfigurationService.ngOnInit()");
//         this.reload();
//     }

//     private loadAppConfig() {
//         this._appConfigService.AppConfig.subscribe(config => {
//             if (config !== undefined) {
//                 console.log("ConfigurationService:config:", config);

//                 this.configRemoteConfigurationRepository = config.RemoteConfigurationRepository;
//                 this.reload();
//             }
//         });
//     }

//     // private seedLocalStorageWithSampleBoardCollection() {
//     //     if (localStorage.getItem('board') === null) {
//     //         localStorage.setItem('board', JSON.stringify(this.sampleBoardCollection));
//     //     }
//     // }

//     private reload(): void {
//         console.log("ConfigurationService.reload()");
//         this.loadPage();
//     }

//     public loadPage(page: string = ''): void // Observable<any>
//     {
//         console.log(`ConfigurationService.loadPage("${page}")`);
//         if (page !== '') {
//             this.page = page;
//         }
//         // if (this.useLocalStore) {
//         //     return new Observable(observer => {
//         //         let data = JSON.parse(localStorage.getItem('board'));

//         //         if (!data) {
//         //             data = {board: []};
//         //         }

//         //         observer.next(data.board);

//         //         return () => {};
//         //     });
//         // } else {
//         /**
//          * TODO - this call is based on an internal representation (admin console) of something called a store.
//          * That concept requires refactoring.
//          */
//         if (this.page && this.page !== '') {
//             const pageUrl = this.configRemoteConfigurationRepository + this.page;
//             console.log("ConfigurationService.loadPage(), pageUrl:", pageUrl);

//             this._http
//                 .get(pageUrl)
//                 .subscribe(page => {
//                     console.log("ConfigurationService.loadPage(), page: ", page);
//                     this.setCurrentPage(page);
//                     this.loadBoard();
//                 });
//         }
//         // }
//     }

//     public getBoardByTitle(boardTitle: string): any // Observable<any>
//     {
//         console.log(`ConfigurationService.getBoardByTitle(${boardTitle})`
//             , "CurrentPage: ", this.currentPage
//             , "this.currentPage instanceof Array:", this.currentPage instanceof Array);

//         // if (this.useLocalStore) {
//         return new Observable(observer => {
//             // const board_collection = JSON.parse(localStorage.getItem('board'));
//             // let boards = board_collection['board'];
//             const boards = this.currentPage.boards;
//             let board = {};

//             // if (boards)
//             // {
//             //     let data = '';

//             //     boards.forEach(boardModel => {
//             //         if (boardModel.title === title) {
//             //             data = boardModel;
//             //         }
//             //     });

//             if (boards && boards instanceof Array) // this.currentPage instanceof Array
//             {
//                 boards.forEach(boardModel => {
//                     if (boardModel.title === boardTitle) {
//                         console.log(`updateWidgetPositionInBoard.getBoardByTitle("${boardTitle}") found: `, boardModel.title);
//                         board = boardModel;
//                     }
//                 });
//             } else {
//                 console.log(`updateWidgetPositionInBoard.getBoardByTitle("${boardTitle}"), boards not array`);
//             }

//             if (isEmpty(board)) {
//                 console.log(`updateWidgetPositionInBoard.getBoardByTitle("${boardTitle}"), board isEmpty`);
//             }

//             // return board;
//             observer.next(board);

//             return () => { };
//             // }
//         });
//         // } else {
//         //     return this._http.get(this.configRemoteConfigurationRepository + '/' + name));
//         // }

//         // });
//     }

//     public loadBoard(boardTitle: string = "") {
//         console.log(`ConfigurationService.loadBoard("${boardTitle}")`);

//         console.log("   this.currentPage", this.currentPage);
//         console.log("   this.currentModel", this.currentModel);

//         // this.Page.subscribe(page => {
//         if (this.currentPage) {
//             if (this.currentPage.boards) {
//                 const boards = this.currentPage.boards;

//                 console.log("ConfigurationService.loadBoard, boards:", boards
//                     , "instanceof Array:", boards instanceof Array, " boards.length: ", boards.length);

//                 // TODO: Checking for proper Type
//                 if (boards && boards instanceof Array && boards.length) { // boards.isArray() &&
//                     const sortedBoards = boards.sort(function (a, b) {
//                         return a.id - b.id;
//                     });

//                     if (boardTitle === "") {
//                         const board = sortedBoards[0];
//                         console.log("ConfigurationService.loadBoard, board:", board);
//                         this.setCurrentModel(board);
//                     } else {
//                         // this.loadBoard(sortedBoards[0].title);
//                         const board = this.getBoardByTitle(boardTitle);
//                         console.log("ConfigurationService.loadBoard, board:", board);
//                         this.setCurrentModel(board);
//                     }
//                 } else {
//                     this.loadDefaultBoard();
//                 }
//             } else {
//                 console.log(`ConfigurationServices.loadBoard("${boardTitle}") -> this.currentModel.boards is empty.`);
//             }
//         }
//         // });
//     }

//     public loadDefaultBoard() {
//         console.log("ConfigurationService.loadDefaultBoard()");

//         this.getDefaultBoard().subscribe(board => {
//             this.setCurrentModel(board);
//         });
//     }

//     public getDefaultBoard() {
//         return new Observable(observer => {
//             observer.next(this.defaultBoard);
//             return () => {
//             };
//         });
//     }

//     // selectBoard(boardTitle: string)
//     // {
//     //     console.log(`ConfigurationService.selectBoard(${boardTitle})`);
//     // }

//     // private initializeBoard() {
//     //     this._configurationService.getPage().subscribe(board => {
//     //         if (board && board instanceof Array && board.length) {
//     //             const sortedBoard = board.sort(function(a, b) {
//     //                 return a.id - b.id;
//     //             });

//     //             this.loadBoard(sortedBoard[0].title);
//     //         } else {
//     //             this.loadDefaultBoard();
//     //         }
//     //     });
//     // }

//     public saveBoard(board: any): Observable<any> {
//         console.log("ConfigurationService.saveBoard()");

//         // this.model = board;
//         this.setCurrentModel(board);

//         if (Object.keys(board).length === 0 && board.constructor === Object) {
//             return Observable.empty();
//         }

//         if (this.useLocalStore) {
//             return new Observable(observer => {
//                 let board_collection;

//                 // find and remove board from storage
//                 this.deleteBoardFromLocalStore(board.title);

//                 // get a collection object and add board to it
//                 if ((board_collection = JSON.parse(localStorage.getItem('board'))) == null) {
//                     board_collection = {
//                         board: []
//                     };
//                 }
//                 board_collection['board'].push(board);

//                 // save
//                 localStorage.setItem('board', JSON.stringify(board_collection));

//                 observer.next({});

//                 return () => {
//                 };
//             });
//         } else {
//             /**
//              * todo - a delete must happen here
//              */
//             const headers = new Headers();
//             headers.append('Content-Type', 'application/json');
//             return this._http
//                 .post(this.configRemoteConfigurationRepository + '?id=' + board.title, JSON.stringify(board), { headers: headers });
//         }
//     }

//     updateWidgetPositionInBoard($event, columnNumber, rowNumber, type) {
//         this.currentModel.rows.forEach(row => {
//             let colPos = 0;

//             row.columns.forEach(column => {
//                 let widgetPos = 0;

//                 if (column.widgets) {
//                     column.widgets.forEach(widget => {
//                         if (widget.instanceId === $event.dragData) {
//                             const widget = column.widgets.splice(widgetPos, 1);

//                             console.log("ConfigurationService.updateWidgetPositionInBoard:this.currentModel:", this.currentModel
//                                 , "rowNumber: ", rowNumber
//                                 , "columnNumber:", columnNumber
//                             );

//                             if (!this.currentModel.rows[rowNumber].columns[columnNumber].widgets) {
//                                 this.currentModel.rows[rowNumber].columns[columnNumber].widgets = [];
//                             }

//                             this.currentModel.rows[rowNumber].columns[columnNumber].widgets.push(widget[0]);
//                             // this.saveBoard('drag drop operation', false);
//                             this.saveBoard(this.currentModel);

//                             return;
//                         }

//                         widgetPos++;
//                     });

//                     colPos++;
//                 }
//             });
//         });
//     }

//     private deleteBoardFromLocalStore(boardTitle: string) {
//         const board_collection = JSON.parse(localStorage.getItem('board'));

//         let index;

//         if (board_collection
//             && (index = board_collection['board'].findIndex(item => {
//                 return item.title === boardTitle;
//             })) >= 0) {

//             board_collection['board'].splice(index, 1);

//             this.delete(board_collection);
//         }
//     }

//     private delete(board_collection: any) {
//         console.log("ConfigurationService.delete()");

//         localStorage.removeItem('board');
//         localStorage.setItem('board', JSON.stringify(board_collection));
//     }

//     public deleteBoard(boardTitle: string) {
//         console.log(`ConfigurationService.deleteBoard(${boardTitle})`);

//         if (this.useLocalStore) {
//             return new Observable(observer => {
//                 this.deleteBoardFromLocalStore(boardTitle);

//                 observer.next({});
//                 return () => {
//                 };

//             });
//         } else {
//             return this._http
//                 .delete(this.configRemoteConfigurationRepository + '/' + boardTitle);
//         }
//     }

//     /*
//      when a widget instance's property page is updated and saved, the change gets communicated to all widgets. The widget instance id that caused the change will update their current instance.
//      // TODO - this might be able to be improved. For now the utility of this approach allows the configuration service to capture the property page change in a way
//      that allows us to update the persisted board model.
//      */
//     notifyWidgetOnPropertyChange(widgetConfig: string, instanceId: number) {
//         this.savePropertyPageConfigurationToStore(widgetConfig, instanceId);
//     }

//     setCurrentModel(_currentModel: any): void {
//         console.log("ConfigurationService.setCurrentModel(", _currentModel, ")");
//         this.currentModel = _currentModel;
//         this.Model.next(this.currentModel);
//         console.log("   Model:", this.Model);
//     }

//     setCurrentPage(_currentPage: any): void {
//         console.log("ConfigurationService:setCurrentPage(", _currentPage, ")");
//         this.currentPage = _currentPage;
//         this.Page.next(this.currentPage);
//     }

//     savePropertyPageConfigurationToStore(widgetConfig: string, instanceId: number) {
//         this.currentModel.rows.forEach(row => {
//             row.columns.forEach(column => {
//                 if (column.widgets) {
//                     column.widgets.forEach(widget => {
//                         if (widget.instanceId === instanceId) {
//                             this.updateProperties(widgetConfig, widget, instanceId);
//                         }
//                     });
//                 }
//             });
//         });

//         this.saveBoard(this.currentModel).subscribe(result => {
//             /**
//              * todo - create popup/toast to show configuration saved message
//              */
//             console.debug('The following configuration model was saved!');

//         },
//             error => console.error('Error' + error),
//             () => console.debug('Saving configuration to store!')
//         );
//     }

//     updateProperties(updatedProperties: any, widget: any, instanceId: number) {
//         if (widget.instanceId === instanceId) {
//             const updatedPropsObject = JSON.parse(updatedProperties);
//             console.log("ConfigurationService.updatedPropsObject:", updatedPropsObject);

//             Object.keys(updatedPropsObject).forEach(prop => {
//                 console.log(`ConfigurationService.updatedPropsObject[${prop}]`);
//                 widget.config[prop] = updatedPropsObject[prop];
//             });

//             console.log("ConfigurationService.updateProperties:widget:", widget);

//             // widget.config.propertyPages.forEach(function (propertyPage) {
//             //     for (let x = 0; x < propertyPage.properties.length; x++) {
//             //         for (const prop in updatedPropsObject) {
//             //             if (updatedPropsObject.hasOwnProperty(prop)) {
//             //                 if (prop === propertyPage.properties[x].key) {
//             //                     propertyPage.properties[x].value = updatedPropsObject[prop];
//             //                 }
//             //             }
//             //         }
//             //     }
//             // });

//             // widget.config.propertyPages.forEach(function (propertyPage) {
//             //     for (let x = 0; x < propertyPage.properties.length; x++) {
//             //         for (const prop in updatedPropsObject) {
//             //             if (updatedPropsObject.hasOwnProperty(prop)) {
//             //                 if (prop === propertyPage.properties[x].key) {
//             //                     propertyPage.properties[x].value = updatedPropsObject[prop];
//             //                 }
//             //             }
//             //         }
//             //     }
//             // });
//         }
//     }
// }
