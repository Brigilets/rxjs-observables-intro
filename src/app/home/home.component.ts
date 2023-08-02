import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
        if (count === 5) observer.complete();
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000);
    });

    this.firstObservableSubscription = customIntervalObservable
      .pipe(
        // we can process data to our needs inside the pipe
        filter((data: number) => data > 0),
        map((data: number) => {
          return 'Round: ' + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log('Error encountered,no need to unsubscribe', error);
          alert(error.message);
        },
        () => {
          console.log('Emitting is completed, no need to unsubscribe');
        }
      );
  }

  ngOnDestroy(): void {
    this.firstObservableSubscription.unsubscribe();
  }
}
