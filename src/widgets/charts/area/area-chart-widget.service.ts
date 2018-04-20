import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { RuntimeService } from '../../../services/runtime.service';

@Injectable()
export class AreaChartWidgetService {
    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('/assets/api/data/trend-model.json')
            //.catch(RuntimeService.handleError)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
