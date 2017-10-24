/**
 * Created by jayhamilton on 1/28/17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class WidgetInstanceService {

    private concreteWidgetInstances: any[] = [];
    private model: any;
    private subject: Subject<string> = new Subject<string>();

    constructor() {
    }

    addInstance(widget: any) {

        this.concreteWidgetInstances.push(widget);

    }

    enableConfigureMode() {

        this.concreteWidgetInstances.forEach(function (widget) {
            widget.instance.toggleConfigMode();
        });
    }

    removeInstance(id: number) {

        // remove instance representation from model
        this.model.rows.forEach(function (row) {
            row.columns.forEach(function (column) {
                if (column.widgets) {
                    for (let i = column.widgets.length - 1; i >= 0; i--) {

                        if (column.widgets[i].instanceId === id) {

                            column.widgets.splice(i, 1);

                            break;
                        }
                    }
                }
            });
        });

        // removes concrete instance from service
        for (let x = this.concreteWidgetInstances.length - 1; x >= 0; x--) {

            if (this.concreteWidgetInstances[x].instance.instanceId === id) {

                const _widget = this.concreteWidgetInstances.splice(x, 1);

                _widget[0].destroy();

                break;
            }
        }

        // raise an event indicating a widget was removed
        this.subject.next('widget id: ' + id);
    }

    getInstanceCount() {
        return this.concreteWidgetInstances.length;
    }

    /*
     this allows this service to update the board when a delete operation occurs
     */
    setCurrentModel(model: any) {

        this.model = model;
    }

    /*
     raise an event that the grid.component is listening for when a widget is removed.
     */
    listenForInstanceRemovedEventsFromWidgets(): Observable<string> {
        return this.subject.asObservable();
    }

    clearAllInstances() {
        this.concreteWidgetInstances.length = 0;
    }

}
