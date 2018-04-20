/**
 * Created by jayhamilton on 6/24/17.
 */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { RuntimeService } from '../../../services/runtime.service';
import { LineChartWidgetService } from '../line/line-chart-widget.service';

@Injectable()
export class PieChartWidgetService {
    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('/assets/api/data/disk-model.json')
            // .catch(RuntimeService.handleError)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }

    getHelpTopic() {
        return this._http.get('/assets/api/data/disk-help-model.json')
            // .catch(RuntimeService.handleError)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }

    getMockData() {
        return new Observable(observer => {
            Observable.timer(500, 5000).subscribe(t => {
                const used = LineChartWidgetService.getRandomArbitrary(0, 100);
                const available = 100 - used;

                const data = [
                    {
                        'name': 'used',
                        'value': used
                    },
                    {
                        'name': 'available',
                        'value': available
                    }
                ];
                observer.next(data);
            });
        });
    }
}
