import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/kanban/board.interface';
import { BoardDialogComponent } from 'src/app/kanban/dialogs/board-dialog/board-dialog.component';
import { BoardService } from 'src/app/kanban/services/board.service';

@Component({
  selector: 'app-board-list-container',
  templateUrl: './board-list-container.component.html',
  styleUrls: ['./board-list-container.component.scss'],
})
export class BoardListContainerComponent implements OnInit {
  boards?: Board[];
  boardsSubscription?: Subscription;
  //  userBoards?: Observable<Board[]>;

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.boardsSubscription = this.boardService
      .getUserBoards()
      .subscribe((boards) => {
        this.boards = boards;
      });
  }

  ngOnDestroy(): void {
    this.boardsSubscription?.unsubscribe();
  }

  /**
   * Handles Cdk Drag and Drop Event
   * @param event Cdk Drag/Drop Event
   */
  drop(event: CdkDragDrop<string[]>): void {
    if (!this.boards) {
      console.error('No boards configured!');
      return;
    }

    this.boardService;
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.createBoard({
          title: result,
          priority: this.boards?.length,
        });
      }
    });
  }
}
