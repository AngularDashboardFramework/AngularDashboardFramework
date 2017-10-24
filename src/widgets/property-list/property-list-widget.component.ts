import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {WidgetInstanceService} from '../../grid/grid.service';
import {WidgetBase} from '../_common/widget-base';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {WidgetPropertyService} from '../_common/widget-property.service';


@Component({
    selector: 'adf-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-widget.css']
})
export class PropertyListWidgetComponent extends WidgetBase implements OnDestroy {


    widgetHasOperationControls = false;
    showConfigurationControl = false;

    constructor(protected _procMonRuntimeService: RuntimeService,
                protected _widgetInstanceService: WidgetInstanceService,
                protected _propertyService: WidgetPropertyService,
                protected _endPointService: EndPointService,
                private _changeDetectionRef: ChangeDetectorRef) {
        super(_procMonRuntimeService,
            _widgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);

    }

    public preRun(): void {
    }

    public run() {
    }

    public stop() {
    }

    public updateData(data: any[]) {
    }

    public updateProperties(updatedProperties: any) {

        this.showOperationControls = true;
    }

    ngOnDestroy() {

    }
}
