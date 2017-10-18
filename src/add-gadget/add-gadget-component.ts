/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    ViewChild, ElementRef, AfterViewInit, Component, Output, EventEmitter
} from '@angular/core';

import {
    style, trigger, animate, transition
} from '@angular/animations';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {AddGadgetService} from './service';

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
    selector: 'adf-add-gadget-modal',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css'],
    animations: [
        trigger(
            'showHideAnimation',
            [
                transition(':enter', [   // :enter is alias to 'void => *'
                    style({opacity: 0}),
                    animate(750, style({opacity: 1}))
                ]),
                transition(':leave', [   // :leave is alias to '* => void'
                    animate(750, style({opacity: 0}))
                ])
            ])
    ],

})
export class AddGadgetComponent implements AfterViewInit {

    @Output() addGadgetEvent: EventEmitter<any> = new EventEmitter();

    gadgetLibraryData: any[] = [];
    gadgetLibraryDataFiltered: any[] = [];
    color = 'white';

    modalicon: string;
    modalheader: string;
    modalmessage: string;

    @ViewChild('messagemodal_tag') messagemodalRef: ElementRef;

    messageModal: any;

    constructor(private _addGadgetService: AddGadgetService) {

        this.getGadgetsFromLibrary();
    }

    addGadget(gadget: any) {
        this.addGadgetEvent.emit(gadget);
        this.hideMessageModal();

    }

    popMessageModal(icon: string, header: string, message: string, durationms: number) {
        this.showMessageModal(icon, header, message);
        Observable.interval(durationms).take(1).subscribe(
            () => {
                this.hideMessageModal();
            }
        );
    }

    showMessageModal(icon: string, header: string, message: string) {
        this.modalicon = icon;
        this.modalheader = header;
        this.modalmessage = message;
        this.messageModal.modal('show');

    }

    showComponentLibraryModal(header: string) {

        this.modalheader = header;
        this.messageModal.modal('show');
    }

    hideMessageModal() {
        this.modalicon = '';
        this.modalheader = '';
        this.modalmessage = '';
        this.messageModal.modal('hide');
    }

    ngAfterViewInit() {
        this.messageModal = jQuery(this.messagemodalRef.nativeElement);
    }

    adjustGadgetLibraryListWithFilter(filterList) {

        console.log('FILTER LIST');
        console.log(filterList);

        this.gadgetLibraryDataFiltered = this.gadgetLibraryData.filter(gadget => {

            let tagFound = false;

            if (!filterList.length) {
                return true;
            } else {
                gadget.tags.forEach(tag => {

                    filterList.forEach(filter => {

                        if (tag.name.toLocaleLowerCase() === filter.toLocaleLowerCase()) {
                            tagFound = true;
                        }
                    });
                });

                return tagFound;
            }
        });


    }

    getGadgetsFromLibrary() {

        this._addGadgetService.getGadgetLibrary().subscribe(data => {

            this.gadgetLibraryData.length = 0;
            this.gadgetLibraryDataFiltered.length = 0;

            const me = this;
            data.forEach(function (item) {
                me.gadgetLibraryData.push(item);
                me.gadgetLibraryDataFiltered.push(item);
            });
        });

    }
}
