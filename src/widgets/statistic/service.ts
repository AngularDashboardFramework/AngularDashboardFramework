/**
 * Created by jayhamilton on 6/24/17.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { RuntimeService } from '../../services/runtime.service';

@Injectable()
export class StatisticService {

    constructor(private _http: HttpClient) {
    }

    get(resourceType) {
        return this._http.get('/assets/api/data/stat-' + resourceType + '-model.json')
            //.catch(RuntimeService.handleError)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
