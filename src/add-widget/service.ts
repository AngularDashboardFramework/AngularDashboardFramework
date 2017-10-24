/**
 * Created by jayhamilton on 2/7/17.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddWidgetService {

    constructor(private _http: Http) {}

    getWidgetLibrary() {
        return this._http.request('/assets/api/widget-library-model.json')
            .map(res => res.json());
    }

}
