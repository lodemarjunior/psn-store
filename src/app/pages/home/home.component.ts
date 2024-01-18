import { Component } from '@angular/core';
import { dataFake } from '../../data/dataFake'
import { GameContent } from '../../interfaces/game-content'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  gameContent: GameContent[] = dataFake;
}
