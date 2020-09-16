import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, interval } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';
import { Letters, State } from './types';

@Component({
  selector: 'app-alphabet-invasion-game',
  templateUrl: './alphabet-invasion-game.component.html',
  styleUrls: ['./alphabet-invasion-game.component.sass'],
})
export class AlphabetInvasionGameComponent {
  state: State;
  private intervalSubject = new BehaviorSubject(1000);
  private width = 30;

  private letters$ = this.intervalSubject.pipe(
    switchMap((period) =>
      interval(period).pipe(
        scan<number, Letters>(
          (acc: Letters) => ({
            ltrs: [
              {
                ltr: this.randomLetter(),
                y: Math.floor(Math.random() * this.width),
              },
              ...acc.ltrs,
            ],
            interval: period,
          }),
          { ltrs: [], interval: 0 }
        )
      )
    )
  );

  private keys$ = fromEvent(document, 'keydown').pipe(
    map((e: KeyboardEvent) => e.key)
  );

  private randomLetter = () => {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  };
}
