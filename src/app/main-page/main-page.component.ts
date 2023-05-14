import { Component, OnInit } from '@angular/core';
import { MoveChange } from 'ngx-chess-board';
import { Subject } from 'rxjs';
import { ChessService } from '../chess.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  move: Subject<MoveChange> = new Subject();
  newGameFlag: Subject<boolean> = new Subject();

  constructor(private chessService : ChessService) { }

  ngOnInit(): void {
    // this.board?.setPGN(move?.pgn);
    // this.board?.setFEN(move?.fen); 
    console.log('rendered')
    this.chessService.BoardEmitter.subscribe(board => {
      board.setPGN(localStorage.getItem('getPGN'))
      board.setFEN(localStorage.getItem('getFEN'))
    })
  }


  moveInParent(move: MoveChange) {
    this.move.next(move);
    // localStorage.setItem( 'MovePGN' , JSON.stringify(move.pgn) );
    // localStorage.setItem( 'MoveFEN' , JSON.stringify(move.fen) );
  }

  createNewGame() {
    this.newGameFlag.next(true);
  }

}
