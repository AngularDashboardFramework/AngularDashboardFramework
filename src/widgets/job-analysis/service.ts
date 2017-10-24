import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RuntimeService } from '../../services/runtime.service';

@Injectable()
export class JobAnalysisService {

    constructor(private _http: Http) {
    }

    get() {
        return this._http.request('../../plugins/procmon/components/widgets/trend/model.json')
            .map(res => res.json())
            .catch(RuntimeService.handleError);
    }
}
