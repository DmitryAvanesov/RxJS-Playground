import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetInvasionGameComponent } from './alphabet-invasion-game.component';

describe('AlphabetInvasionGameComponent', () => {
  let component: AlphabetInvasionGameComponent;
  let fixture: ComponentFixture<AlphabetInvasionGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlphabetInvasionGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetInvasionGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
