import {
    Directive, Input, EventEmitter, SimpleChange, OnChanges, DoCheck, IterableDiffers,
    IterableDiffer, Output
} from "@angular/core";
import * as _ from "lodash";
import {ReplaySubject} from "rxjs/Rx";

export interface SortEvent {
    sortBy: string|string[];
    sortOrder: string
}

export interface DataEvent {
    length: number;
}

@Directive({
    selector: 'table[mfData]',
    exportAs: 'mfDataTable'
})
export class DataTable implements OnChanges, DoCheck {

    private diff: any;
    @Input("mfData") public inputData: any[] = [];

    @Input("mfSortBy") public sortBy: string|string[] = "";
    @Input("mfSortOrder") public sortOrder = "asc";
    @Output("mfSortByChange") public sortByChange = new EventEmitter<string|string[]>();
    @Output("mfSortOrderChange") public sortOrderChange = new EventEmitter<string>();


    private mustRecalculateData = false;

    public data: any[];

    public onSortChange = new ReplaySubject<SortEvent>(1);

    public constructor(private differs: IterableDiffers) {
        this.diff = differs.find([]).create(null);
    }

    public getSort(): SortEvent {
        return {sortBy: this.sortBy, sortOrder: this.sortOrder};
    }

    public setSort(sortBy: string|string[], sortOrder: string): void {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = _.includes(["asc","desc"], sortOrder) ? sortOrder : "asc";
            this.mustRecalculateData = true;
            this.onSortChange.next({sortBy: sortBy, sortOrder: sortOrder});
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    }


    public ngOnChanges(changes: {[key: string]: SimpleChange}): any {

        if (changes["sortBy"] || changes["sortOrder"]) {
            if (!_.includes(["asc", "desc"], this.sortOrder)) {
                console.warn("angular2-datatable: value for input mfSortOrder must be one of ['asc', 'desc'], but is:", this.sortOrder);
                this.sortOrder = "asc";
            }
            if (this.sortBy) {
                this.onSortChange.next({sortBy: this.sortBy, sortOrder: this.sortOrder});
            }
            this.mustRecalculateData = true;
        }
        if (changes["inputData"]) {
            this.inputData = changes["inputData"].currentValue || [];
            this.mustRecalculateData = true;
        }
    }

    public ngDoCheck(): any {
        let changes = this.diff.diff(this.inputData);
        if (changes) {
            this.mustRecalculateData = true;
        }
        if (this.mustRecalculateData) {
            this.fillData();
            this.mustRecalculateData = false;
        }
    }

    private fillData(): void {

        let data = this.inputData;
        var sortBy = this.sortBy;
        if (typeof sortBy === 'string' || sortBy instanceof String) {
            data = _.orderBy(data, this.caseInsensitiveIteratee(<string>sortBy), [this.sortOrder]);
        } else {
            data = _.orderBy(data, sortBy, [this.sortOrder]);
        }
        this.data = data;
    }

    private caseInsensitiveIteratee(sortBy: string) {
        return (row: any): any => {
            var value = row;
            for (let sortByProperty of sortBy.split('.')) {
                if(value) {
                    value = value[sortByProperty];
                }
            }
            if (value && typeof value === 'string' || value instanceof String) {
                return value.toLowerCase();
            }
            return value;
        };
    }
}