import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, fromEvent, interval } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';
import { Letter, Letters, State } from './types';

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

  private game$ = combineLatest([this.letters$, this.keys$]).pipe(
    scan<[Letters, string], State>(
      (acc: State, [letters, key]: [Letters, string]) =>
        letters.ltrs[letters.ltrs.length - 1] &&
        letters[letters.ltrs.length - 1].ltr === key
          ? {
              score: acc.score + 1,
              letters: acc.letters.pop(),
              ...acc,
            }
          : ({} as State),
      { score: 0, level: 1, letters: [] }
    )
  );

  private randomLetter = () => {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  };
}
