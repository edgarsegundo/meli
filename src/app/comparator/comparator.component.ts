import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';
import { ItemsService } from '../shared/item/items.service';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ComparatorComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  limit = 20;
  offset = 0;
  query = '';

  constructor(private ngZone: NgZone, public itemsService: ItemsService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      //filter(([y1, y2]) => (y2 < y1 && y2 < 50)),
      filter(([y1, y2]) => (y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.offset += 1;
        this.itemsService.fetchMore(this.query, this.offset, this.limit);
      });
    });
  }

  onTextChange(query:string) {
    this.itemsService.items.length = 0;
    this.query = query;
    this.itemsService.fetchMore(query);
  }

  onTextClear() {
    this.itemsService.items.length = 0;
    this.query = ''; 
    this.itemsService.fetchMore(this.query);
  }

  selectToCompare(item:any) {
    this.itemsService.addSelection(item);
    if(this.itemsService.itemsSelected.length > 1) {
      this.itemsService.buildComparisonReport();
    }
  }

  removeSelectedItem(item:any) {
    this.itemsService.removeSelection(item);
  }
}