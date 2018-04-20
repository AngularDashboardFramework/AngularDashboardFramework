
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/empty';

@Injectable()
export class WidgetService {

    DeleteBoard$: Subject<string> = new Subject<string>();

    SaveBoard$: Subject<any> = new Subject<any>();

    currentModel: any;

    /*
     when a widget instance's property page is updated and saved, the change gets communicated to all
     widgets. The widget instance id that caused the change will update their current instance. todo - this might be able to be
     improved. For now the utility of this approach allows the configuration service to capture the property page change in a way
     that allows us to update the persisted board model.
     */
    notifyWidgetOnPropertyChange(widgetConfig: string, instanceId: number) {
        this.savePropertyPageConfigurationToStore(widgetConfig, instanceId);
    }

    savePropertyPageConfigurationToStore(widgetConfig: string, instanceId: number) {
        this.currentModel.rows.forEach(row => {
            row.columns.forEach(column => {
                if (column.widgets) {
                    column.widgets.forEach(widget => {
                        this.updateProperties(widgetConfig, widget, instanceId);
                    });
                }
            });
        });

        this.saveBoard(this.currentModel);
    }

    deleteBoard(boardTitle: string): void {
        this.DeleteBoard$.next(boardTitle);
    }

    saveBoard(model): void {
        this.SaveBoard$.next(model);
    }

    updateProperties(updatedProperties: any, widget: any, instanceId: number) {
        const updatedPropsObject = JSON.parse(updatedProperties);

        if (widget.instanceId === instanceId) {

            widget.config.propertyPages.forEach(function (propertyPage) {

                for (let x = 0; x < propertyPage.properties.length; x++) {

                    for (const prop in updatedPropsObject) {
                        if (updatedPropsObject.hasOwnProperty(prop)) {
                            if (prop === propertyPage.properties[x].key) {
                                propertyPage.properties[x].value = updatedPropsObject[prop];
                            }
                        }
                    }
                }
            });
        }
    }
}