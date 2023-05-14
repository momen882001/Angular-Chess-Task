import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  MoveChange,
  NgxChessBoardComponent
} from 'ngx-chess-board';
import { Subject } from 'rxjs';
import { ChessService } from '../chess.service';

@Component({
  selector: 'app-iframe-one',
  templateUrl: './iframe-one.component.html',
  styleUrls: ['./iframe-one.component.css'],
})
export class IframeOneComponent implements OnInit, AfterViewInit {

  constructor(private chessService : ChessService) {}

  @ViewChild('board') board: NgxChessBoardComponent | any;
  @Output() moveEvent = new EventEmitter<any>();
  @Input() newGameFlag: Subject<boolean> | any;
  @Input() moveIFrameOne: Subject<MoveChange> | any;
  moveHistory:any;

  moveItem(move: MoveChange): void {
    this.moveEvent.emit(move);
  }

  showMove() {
    this.moveHistory = this.board.getMoveHistory();
    // console.log(this.moveHistory);
  }

  ngOnInit(): void {
    this.moveIFrameOne.subscribe( (move:any) => {
      this.board?.setPGN(move?.pgn);
      this.board?.setFEN(move?.fen);    
      localStorage.setItem('getPGN', this.board?.getPGN());
      localStorage.setItem('getFEN', this.board?.getFEN());
      this.chessService.BoardEmitter.emit(this.board);
      // this.board.reverse();
    });


    this.newGameFlag.subscribe((el:any) => {    
      this.board?.reset();
      // this.board.reverse();
    })
  }

  // test
  handleClick() : void {
    localStorage.clear()
    console.log('test')
  }

  ngAfterViewInit() {
    this.board.reverse();
  }
}
