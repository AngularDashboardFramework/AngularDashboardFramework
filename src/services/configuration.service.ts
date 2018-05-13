/**
 * Created by jayhamilton on 2/7/17.
 */
import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/empty';

import { defaultBoard } from './models/board-default';
import { sampleBoardCollection } from './models/board-collection-sample';
import { WidgetService } from './widget.service';

@Injectable()
export class ConfigurationService {
    model: any; // todo review this object closely
    currentModel: any; // this object helps with updates to property page values
    demo = true;

    defaultBoard: any;
    sampleBoardCollection: any;

    /**
     * todo - fix this hard coded store
     * @type {string}
     */
    remoteConfigurationRepository = 'http://localhost:8090/api/store';

    constructor(
        private _http: Http,
        private _widgetService: WidgetService
    ) {
        Object.assign(this, {defaultBoard});
        Object.assign(this, {sampleBoardCollection});

        this._widgetService.DeleteBoard$.subscribe(board => {
            this.deleteBoard(board);
        });

        this._widgetService.SaveBoard$.subscribe(board => {
            this.saveBoard(board).subscribe(result => {
                    /**
                     * todo - create popup/toast to show configuration saved message
                     */
                    console.debug('The following configuration model was saved!');
                },
                error => console.error('Error' + error),
                () => console.debug('Saving configuration to store!')
            );
        });

        this.seedLocalStorageWithSampleBoardCollection();
    }

    private seedLocalStorageWithSampleBoardCollection() {
        if (localStorage.getItem('board') === null) {
            localStorage.setItem('board', JSON.stringify(this.sampleBoardCollection));
        }
    }

    public getBoardByTitle(title: string) {
        if (this.demo) {
            return new Observable(observer => {
                const board_collection = JSON.parse(localStorage.getItem('board'));

                let data = '';
                board_collection['board'].forEach(boardModel => {

                    if (boardModel.title === title) {
                        data = boardModel;
                    }
                });
                observer.next(data);
                return () => {
                };
            });
        } else {
            return this._http.get(this.remoteConfigurationRepository + '/' + name).map(res => res.json());
        }
    }

    public getBoards() {
        if (this.demo) {
            return new Observable(observer => {
                let data = JSON.parse(localStorage.getItem('board'));
                if (!data) {
                    data = {board: []};
                }
                observer.next(data.board);
                return () => {
                };
            });

        } else {
            /**
             * todo - this call is based on an internal representation (admin console) of something called a store.
             * That concept requires refactoring.
             */
            return this._http.get(this.remoteConfigurationRepository).map(res => res.json());
        }
    }

    public saveBoard(board: any) {
        this.model = board;

        if (Object.keys(board).length === 0 && board.constructor === Object) {
            return Observable.empty();
        }

        if (this.demo) {
            return new Observable(observer => {
                let board_collection;

                // find and remove board from storage
                this.deleteBoardFromLocalStore(board.title);

                // get a collection object and add board to it
                if ((board_collection = JSON.parse(localStorage.getItem('board'))) == null) {
                    board_collection = {
                        board: []
                    };
                }
                board_collection['board'].push(board);

                // save
                localStorage.setItem('board', JSON.stringify(board_collection));

                observer.next({});

                return () => {
                };
            });
        } else {
            /**
             * todo - a delete must happen here
             *
             */
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this.remoteConfigurationRepository + '?id=' + board.title, JSON.stringify(board), {headers: headers});
        }
    }

    private deleteBoardFromLocalStore(boardTitle: string) {
        const board_collection = JSON.parse(localStorage.getItem('board'));

        let index;

        if (board_collection && (index = board_collection['board'].findIndex(item => {
                return item.title === boardTitle;
            })) >= 0) {

            board_collection['board'].splice(index, 1);

            this.delete(board_collection);
        }
    }

    private delete(board_collection: any) {
        localStorage.removeItem('board');
        localStorage.setItem('board', JSON.stringify(board_collection));
    }

    public deleteBoard(boardTitle: string) {
        if (this.demo) {
            return new Observable(observer => {
                this.deleteBoardFromLocalStore(boardTitle);

                observer.next({});
                return () => {
                };

            });
        } else {
            return this._http.delete(this.remoteConfigurationRepository + '/' + boardTitle);
        }
    }

    public getDefaultBoard() {
        return new Observable(observer => {
            observer.next(this.defaultBoard);
            return () => {
            };
        });
    }


    setCurrentModel(_currentModel: any) {
        this.currentModel = _currentModel;
    }


}
