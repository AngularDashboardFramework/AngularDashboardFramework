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
import {AddWidgetService} from './service';

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
    selector: 'adf-add-widget-modal',
    moduleId: module.id,
    templateUrl: './add-widget.component.html',
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
export class AddWidgetComponent implements AfterViewInit {

    @Output() addWidgetEvent: EventEmitter<any> = new EventEmitter();

    widgetLibraryData: any[] = [];
    widgetLibraryDataFiltered: any[] = [];
    color = 'white';

    modalicon: string;
    modalheader: string;
    modalmessage: string;

    @ViewChild('messagemodal_tag') messagemodalRef: ElementRef;

    messageModal: any;

    constructor(private _addWidgetService: AddWidgetService) {

        this.getWidgetsFromLibrary();
    }

    addWidget(widget: any) {
        this.addWidgetEvent.emit(widget);
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

    adjustWidgetLibraryListWithFilter(filterList) {

        console.log('FILTER LIST');
        console.log(filterList);

        this.widgetLibraryDataFiltered = this.widgetLibraryData.filter(widget => {

            let tagFound = false;

            if (!filterList.length) {
                return true;
            } else {
                widget.tags.forEach(tag => {

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

    getWidgetsFromLibrary() {

        this._addWidgetService.getWidgetLibrary().subscribe(data => {

            this.widgetLibraryData.length = 0;
            this.widgetLibraryDataFiltered.length = 0;

            const me = this;
            data.forEach(function (item) {
                me.widgetLibraryData.push(item);
                me.widgetLibraryDataFiltered.push(item);
            });
        });

    }
}
