/**
 * Created by jayhamilton on 6/24/17.
 */
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RuntimeService } from '../../../services/runtime.service';

@Injectable()
export class BarHorizontalChartWidgetService {

    constructor(private _http: Http) {
    }

    getMockData() {
        return this._http.request('/assets/api/cpu-model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }
}
