/**
 * Created by jayhamilton on 6/24/17.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { RuntimeService } from '../../../services/runtime.service';

@Injectable()
export class BarHorizontalChartWidgetService {

    constructor(private _http: HttpClient) {
    }

    getMockData() {
        return this._http.get('/assets/api/data/cpu-model.json')
            //.catch(RuntimeService.handleError)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
