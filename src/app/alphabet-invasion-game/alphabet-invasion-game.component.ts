import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, fromEvent, interval } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';
import { Letter, State } from './types';

@Component({
  selector: 'app-alphabet-invasion-game',
  templateUrl: './alphabet-invasion-game.component.html',
  styleUrls: ['./alphabet-invasion-game.component.sass'],
})
export class AlphabetInvasionGameComponent implements OnInit {
  state: State = {
    score: 0,
    level: 1,
    letters: [],
  };
  private width = 30;
  private levelUpEvery = 20;
  private intervalSubject = new BehaviorSubject(1000);

  private keys$ = fromEvent(document, 'keydown').pipe(
    map((e: KeyboardEvent) => e.key)
  );

  private randomLetter = () => {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  };

  ngOnInit(): void {
    const letters$ = this.intervalSubject.pipe(
      switchMap((period: number) => interval(period))
    );

    letters$.subscribe((time: number) => {
      this.state.letters.push({
        symbol: this.randomLetter(),
        position: 0,
      });

      if (this.state.score > 0 && this.state.score % this.levelUpEvery === 0) {
        this.state.letters = [];
        this.state.level++;
      }
    });

    this.keys$.subscribe();
  }
}
