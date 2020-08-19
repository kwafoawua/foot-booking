import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { GameComponent } from './game.component';

@Component({
  selector: 'game-array',
  templateUrl: 'game-form-array.component.html'
})
export class GameFormArrayComponent {

  @Input()
  public GameFormArray: FormArray;

  addGame() {
    //this.GameFormArray.push(GameComponent.buildGame())
  }

  // static initGames() {
  //   return new FormArray([
  //     GameComponent.buildGame() ])
  // }
}
