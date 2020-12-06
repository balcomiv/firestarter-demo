import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Board } from '../../board.interface';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards?: Board[];
  sub?: Subscription;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.sub = this.boardService
      .getUserBoards()
      .subscribe((boards) => (this.boards = boards));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  /**
   * Handles Cdk Drag and Drop Event
   * @param event Cdk Drag/Drop Event
   */
  drop(event: CdkDragDrop<string[]>): void {
    if (!this.boards) {
      console.error(`Boards not set!`);
      return;
    }

    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }
}
