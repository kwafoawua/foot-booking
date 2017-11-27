/**
 * Created by pablo on 26/11/2017.
 */

import {Component, Input} from '@angular/core';
import { FormArray } from '@angular/forms';
import {GameComponent} from "./game.component";

@Component({
    moduleId: module.id,
    selector: 'game-array',
    templateUrl: 'game-form-array.component.html'
})
export class GameFormArrayComponent {

    @Input()
    public GameFormArray: FormArray;

    addGame() {
        this.GameFormArray.push(GameComponent.buildField())
    }

    static initGames() {
        return new FormArray([
            GameComponent.buildField()])
    }
}