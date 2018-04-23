import { Injectable } from '@angular/core';

import { Widget } from '../widgets/_common/widget';
import { WidgetConfigChanged, EditModeCancelled } from './widget.events';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class WidgetContext {

    widgetEvents: Observable<Object>;

    editMode = false;

    data: any;

    private eventObserver: Observer<Object>;

    constructor(
        private widget: Widget
    ) {
        this.widgetEvents = Observable.create(observer => this.eventObserver = observer);
    }

    getWidget(): Widget {
        return this.widget;
    }

    getConfig(): any {
        let config = this.widget.config || {};
        return Object.assign({}, config);
    }

    cancelEditMode() {
        this.eventObserver.next(new EditModeCancelled());
    }

    configChanged(config: Object) {
        this.eventObserver.next(new WidgetConfigChanged(config));
    }

    destroy() {
        this.eventObserver.complete();
    }

}
