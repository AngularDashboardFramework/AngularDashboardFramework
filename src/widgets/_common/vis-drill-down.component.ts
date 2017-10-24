/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    ViewChild, ElementRef, AfterViewInit, Component
} from '@angular/core';

import {
    style, state, trigger, animate, transition
} from '@angular/animations';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';


declare var jQuery: any;

/**
 * Message Modal - clasable modal with message
 *
 * Selector message-modal
 *
 * Methods
 *      popMessageModal - display a message modal for a sepcified duration
 *      showMessageModal - show the message modal
 *      hideMessageModal - hide the message modal
 */
@Component({
    selector: 'adf-vis-drill-down-modal',
    moduleId: module.id,
    templateUrl: './vis-drill-down.html',
    animations: [

        trigger('contentSwitch', [
            state('inactive', style({
                opacity: 0
            })),
            state('active', style({
                opacity: 1
            })),
            transition('inactive => active', animate('750ms ease-in')),
            transition('active => inactive', animate('750ms ease-out'))
        ]),
        trigger('tabSwitch', [
            state('inactive', style({
                opacity: .75
            })),
            state('active', style({
                opacity: 1
            })),
            transition('inactive => active', animate('750ms ease-in')),
            transition('active => inactive', animate('750ms ease-out'))
        ])
    ]
})
export class VisDrillDownComponent implements AfterViewInit {
    modalicon: string;
    modalheader: string;
    modalconfig: string;

    @ViewChild('vismodal_tag')
    vismodalaRef: ElementRef;

    configModal: any;

    constructor() {

    }


    showMessageModal(icon: string, header: string, message: string) {
        this.modalicon = icon;
        this.modalheader = header;
        this.modalconfig = message;
        this.configModal.modal('show');
    }

    hideMessageModal() {
        this.modalicon = '';
        this.modalheader = '';
        this.modalconfig = '';
        this.configModal.modal('hide');
    }

    ngAfterViewInit() {
        this.configModal = jQuery(this.vismodalaRef.nativeElement);
        this.configModal.modal('hide');
    }

    showDetail($event) {
        console.log($event);
        const data: string = JSON.stringify($event, null, 4);

        console.log(data);
        this.showMessageModal(null, 'Detail', data);
    }
}
