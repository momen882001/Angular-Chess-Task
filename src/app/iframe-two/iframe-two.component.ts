import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MoveChange, NgxChessBoardComponent } from 'ngx-chess-board';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-iframe-two',
  templateUrl: './iframe-two.component.html',
  styleUrls: ['./iframe-two.component.css']
})
export class IframeTwoComponent implements OnInit {
  
  @ViewChild('board', { static: false }) board: NgxChessBoardComponent | any;
  @Input() moveIFrameTwo: Subject<MoveChange> | any;
  @Input() newGameFlag: Subject<boolean> | any;
  @Output() moveEvent = new EventEmitter<any>();
  resetGame: boolean = false;

  constructor() { }

  moveItem(move: MoveChange): void {
    this.moveEvent.emit(move);  
  }
  
  ngOnInit(): void {
    this.moveIFrameTwo.subscribe( (move:any) => {
      this.board?.setPGN(move?.pgn);
      this.board?.setFEN(move?.fen);
      this.board.reverse();
      // localStorage.setItem('board2', this.moveIFrameTwo);
    });

    this.newGameFlag.subscribe((el:any) => {
      this.board?.reset();
    })
  }
}
