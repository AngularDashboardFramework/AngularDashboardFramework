import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Created by jayhamilton on 6/29/17.
 */
@Component({
    moduleId: module.id,
    selector: 'adf-widget-operation-control',
    templateUrl: 'widget-operation-control.component.html',
})
export class WidgetOperationComponent {
    @Output() runEvent: EventEmitter<any> = new EventEmitter();
    @Output() stopEvent: EventEmitter<any> = new EventEmitter();

    @Input() inRun: boolean;
    @Input() actionInitiated: boolean;
    @Input() inConfig: boolean;
    @Input() showOperationControls: boolean;
    @Input() widgetHasOperationControls: boolean;

    run() {
        this.runEvent.emit();
    }

    stop() {
        this.stopEvent.emit();
    }

}
