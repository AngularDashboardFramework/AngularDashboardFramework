/**
 * Created by jayhamilton on 2/7/17.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddWidgetService {
    constructor(private _http: HttpClient) {}

    getWidgetLibrary() {
        return this._http.get('/assets/api/data/widget-library-model.json');
    }
}
