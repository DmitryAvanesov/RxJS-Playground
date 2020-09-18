import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, interval } from 'rxjs';
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
  spaceBetweenLetters = 50;
  private numberOfRows = 12;
  private numberOfCols = 8;
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

    letters$.subscribe((_time: number) => {
      for (const letter of this.state.letters) {
        letter.row++;
      }

      this.state.letters.push({
        symbol: this.randomLetter(),
        row: 0,
        col: Math.floor(Math.random() * this.numberOfCols),
      });
    });

    this.keys$.subscribe((key: string) => {
      if (this.state.letters[0].symbol === key) {
        this.state.letters.shift();
        this.state.score++;
      }

      if (this.state.score > 0 && this.state.score % this.levelUpEvery === 0) {
        this.state.letters = [];
        this.state.level++;
      }
    });
  }
}
