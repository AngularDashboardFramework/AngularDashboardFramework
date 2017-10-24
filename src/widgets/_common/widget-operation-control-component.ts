import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Created by jayhamilton on 6/29/17.
 */

@Component({
    moduleId: module.id,
    selector: 'adf-widget-operation-control',
    template: `

        <button class="compact ui button right floated"
                *ngIf="!inRun && !actionInitiated && showOperationControls && widgetHasOperationControls"
                (click)="run()"><i class="green play icon" style="margin-right:0 !important"></i>
        </button>

        <button class="compact ui button right floated"
                *ngIf="!inRun && 
        actionInitiated && 
        showOperationControls && 
        widgetHasOperationControls">
            <i class="black spinner loading icon" style="margin-right:0 !important"></i>
        </button>

        <button class="compact ui button right floated"
                *ngIf="inRun && !actionInitiated && showOperationControls && widgetHasOperationControls"
                (click)="stop()"><i class="red stop icon" style="margin-right:0 !important"></i>
        </button>
    `,
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
