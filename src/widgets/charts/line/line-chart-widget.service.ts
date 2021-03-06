import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { RuntimeService } from '../../../services/runtime.service';

@Injectable()
export class LineChartWidgetService {
    static seedData() {
        const array = [];

        for (let i = 0; i < 25; i++) {
            array.push({
                'name': i.toString(),
                'value': 0
            });
        }

        return array;
    }

    static retrieveData() {
        const currentDate = new Date();

        const time = LineChartWidgetService.getDay(
            currentDate.getDay()) + ':' +
            currentDate.getHours() + ':' +
            currentDate.getMinutes() + ':' +
            currentDate.getSeconds();

        return {
            'name': time,
            'value': LineChartWidgetService.getRandomArbitrary(5, 20)
        };
    }

    static getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    static getDay(dayOfWeek: number) {
        switch (dayOfWeek) {
            case 0:
                return 'sun';
            case 1:
                return 'mon';
            case 2:
                return 'tue';
            case 3:
                return 'wed';
            case 4:
                return 'thur';
            case 5:
                return 'fri';
            case 6:
                return 'sat';
        }
    }

    constructor(private _http: HttpClient) {
    }

    public get(collectors: any[]) {
        return new Observable(observer => {
            Observable.timer(500, 5000).subscribe(t => {
                const data = [];

                collectors.forEach(collector => {
                    data.push(LineChartWidgetService.retrieveData());
                });

                observer.next(data);
            });
        });
    }

    public stop(subscription: any) {
        subscription.unsubscribe();
    }

    getHelpTopic() {
        return this._http.get('/assets/api/data/trendline-help-model.json')
            //.catch(RuntimeService.handleError)
            .pipe(
                catchError(RuntimeService.handleError)
            );
    }
}
