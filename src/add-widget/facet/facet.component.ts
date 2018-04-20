import { Facet } from './facet-search-model';
import {
    Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';

import {
    style, state, trigger, animate, transition
} from '@angular/animations';

/**
 * Created by jayhamilton on 7/11/17.
 */
@Component({
    moduleId: module.id,
    selector: 'adf-facet',
    templateUrl: 'facet.component.html',
    styleUrls: ['../styles.scss'],
    animations: [
        trigger('accordion', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('700ms ease-in-out')),
            transition('out => in', animate('300ms ease-in-out'))
        ]),
        trigger('accordion2', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('300ms ease-in-out')),
            transition('out => in', animate('800ms ease-in-out'))
        ])
    ]
})
export class FacetComponent implements OnInit {
    @Output()
    tagSelectEvent: EventEmitter<any> = new EventEmitter();

    @Input()
    facet: Facet;
    
    @Input()
    openFacet: boolean;

    facetOpen: string;

    constructor() {
    }

    ngOnInit() {
        if (this.openFacet) {
            this.facetOpen = 'in';
        } else {
            this.facetOpen = 'out';
        }
    }

    toggleAccordion() {
        this.facetOpen = this.facetOpen === 'out' ? 'in' : 'out';
    }

    tagSelect(tagName) {
        this.tagSelectEvent.emit(tagName);
    }
}
