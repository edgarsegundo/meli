import { Component, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit, OnDestroy {
  
  @Output() debounceTime = 300;
  @Output() textChange = new EventEmitter<string>();
  @Output() textClear = new EventEmitter();

  value = ''
  subscriptions: Subscription[] = [];
  inputValue = new Subject<string>();
  trigger = this.inputValue.pipe(debounceTime(this.debounceTime));
  
  ngOnInit() {
    const subscription = this.trigger.subscribe(currentValue => {
      this.textChange.emit(currentValue);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onInput(e: any) {
    this.inputValue.next(e.target.value);
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */