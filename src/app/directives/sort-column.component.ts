import {Component, Input, OnInit} from "@angular/core";
import {DataTable, SortEvent} from "./sort-column.directive";

@Component({
    selector: "sortable-column",
    template: `
        <a style="cursor: pointer" (click)="sort()" class="text-nowrap">
            <ng-content></ng-content>
            <span *ngIf="isSortedByMeAsc" class="fa fa-sort-up" aria-hidden="true"></span>
            <span *ngIf="isSortedByMeDesc" class="fa fa-sort-down" aria-hidden="true"></span>
        </a>`
})
export class SortColumnComponent implements OnInit {
    @Input("by") sortBy: string;

    isSortedByMeAsc: boolean = false;
    isSortedByMeDesc: boolean = false;

    public constructor(private mfTable: DataTable) {
    }

    public ngOnInit(): void {
        this.mfTable.onSortChange.subscribe((event: SortEvent) => {
            this.isSortedByMeAsc = (event.sortBy == this.sortBy && event.sortOrder == "asc");
            this.isSortedByMeDesc = (event.sortBy == this.sortBy && event.sortOrder == "desc");
        });
    }

    sort() {
        if (this.isSortedByMeAsc) {
            this.mfTable.setSort(this.sortBy, "desc");
        } else {
            this.mfTable.setSort(this.sortBy, "asc");
        }
    }
}