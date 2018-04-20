import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { RuntimeService } from '../../services/runtime.service';

@Injectable()
export class JobAnalysisService {

    constructor(private _http: HttpClient) {
    }

    get() {
        return this._http.get('../../plugins/procmon/components/widgets/trend/model.json')
            //.catch(RuntimeService.handleError)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
