import {Component, ElementRef} from '@angular/core';

/**
 * Created by jayhamilton on 2/26/17.
 */

@Component({
    moduleId: module.id,
    selector: 'adf-search',
    templateUrl: 'search.component.html',
    styleUrls: ['../styles.css']
})
export class SearchComponent {
    public query = '';
    public searchList = [];
    public filteredList = [];
    public elementRef;

    constructor(myElement: ElementRef) {
        this.searchList.push('astring 1');
        this.searchList.push('bstring 1');
        this.searchList.push('cstring 1');

        this.elementRef = myElement;
    }

    filter() {
        if (this.query !== '') {
            this.filteredList = this.searchList.filter(function (el) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
    }
}
