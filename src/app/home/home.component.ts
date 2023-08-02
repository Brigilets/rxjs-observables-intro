import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObservableSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.firstObservableSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObservable = new Observable((observer) => {
      let count: number = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    this.firstObservableSubscription = customIntervalObservable.subscribe(
      (count: number) => {
        console.log(count);
      }
    );
  }

  ngOnDestroy(): void {
    this.firstObservableSubscription.unsubscribe();
  }
}
