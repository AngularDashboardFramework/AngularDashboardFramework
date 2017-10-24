
import {Component, ElementRef} from '@angular/core';
/**
 * Created by jayhamilton on 6/27/17.
 */
@Component({
    moduleId: module.id,
    selector: 'adf-search-result',
    template: `
       <!--
        <div class='ui basic segment' style='background-color:white'
             *ngFor='let widgetItemData of widgetLibraryData; let i = index'>
            <div class='ui large middle aligned divided list'>
                <div class='item'>
                    <div class='right floated content'>
                        <div class='ui small blue button' (click)='addWidget(widgetLibraryData[i])'>Add</div>
                    </div>
                    <img class='ui image' src='{{widgetLibraryData[i].icon}}'>
                    <div class='content'>
                        <div class='header'>{{widgetLibraryData[i].name}} Widget</div>
                        {{widgetLibraryData[i].description}}
                    </div>
                </div>
            </div>
        </div>
        -->
    `,
    styleUrls: ['../../widgets/_common/styles-widget.css']
})
export class SearchResultComponent {

    constructor(myElement: ElementRef) {


    }
}
