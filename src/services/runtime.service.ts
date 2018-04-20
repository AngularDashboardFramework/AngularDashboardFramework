/**
 * Created by jayhamilton on 1/18/17.
 */
import { Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import { catchError, map, tap } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { ErrorHandler } from '../error/error-handler';


@Injectable()
export class RuntimeService {

    static handleError(err: HttpErrorResponse | any) {

        const errMsg: any = {
            status: '-1',
            statusText: '',
            resource: ''
        };

        if (err.error instanceof Error) {
            errMsg.statusText = err.error.message;
            console.error('Client error');

        } else {
            errMsg.status = err.status;
            errMsg.statusText = 'A backend error occurred';
            errMsg.resource = err.url;
            console.log('Backend error');
        }
        console.error(err);

        return Observable.throw(ErrorHandler.getErrorObject(errMsg));

    }

    constructor(private _http: HttpClient) {
    }

    testURLResponse(url: string) {
        return this._http.get(url, {responseType: 'text'})
            //.catch(RuntimeService.handleError)
            .pipe(
                catchError(RuntimeService.handleError)
            );

    }
}

