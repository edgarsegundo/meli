import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, throttleTime, scan, map, Observable } from 'rxjs';

interface MyEvent  {
  clientX: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meli';
  constructor(private router: Router) {}

  ngOnInit() {

    


    // const observable = new Observable(subscriber => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.next(3);
    //   setTimeout(() => {
    //     subscriber.next(4);
    //     subscriber.complete();
    //   }, 1000);
    // });
    
    // console.log('just before subscribe');
    // observable.subscribe({
    //   next(x) { 
    //     console.log('got value ' + x); 
    //   },
    //   error(err) { console.error('something wrong occurred: ' + err); },
    //   complete() { console.log('done'); }
    // });
    // console.log('just after subscribe');
  
    }
}


