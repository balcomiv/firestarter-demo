import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Board } from 'src/app/kanban/board.interface';
import { BoardDialogComponent } from 'src/app/kanban/dialogs/board-dialog/board-dialog.component';
import { BoardService } from 'src/app/kanban/services/board.service';

@Component({
  selector: 'app-board-list-container',
  templateUrl: './board-list-container.component.html',
  styleUrls: ['./board-list-container.component.scss'],
})
export class BoardListContainerComponent implements OnInit {
  //  boards?: Board[];
  //  boardsSubscription?: Subscription;
  boards: Observable<Board[]>;

  constructor(private boardService: BoardService, private dialog: MatDialog) {
    this.boards = this.boardService.getUserBoards().pipe(
      tap(() => console.log('Making call'))

      //  Fix Me -- Testing Only
      //  shareReplay(1)
    );
    //  this.boards = this.boardService.getUserBoards();
  }

  ngOnInit(): void {
    //  this.boards = this.boardService.getUserBoards()
    // .subscribe((boards) => {
    //   this.boards = boards;
    // });
  }

  ngOnDestroy(): void {
    //  this.boardsSubscription?.unsubscribe();
  }

  /**
   * Handles Cdk Drag and Drop Event
   * @param event Cdk Drag/Drop Event
   */
  drop(event: CdkDragDrop<string[]>): void {
    this.boards.pipe(take(1)).subscribe((boards) => {
      moveItemInArray(boards, event.previousIndex, event.currentIndex);
      this.boardService.sortBoards(boards);
    });
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {},
    });

    this.setAfterClosedCallback(dialogRef);
  }

  private setAfterClosedCallback(
    dialogRef: MatDialogRef<BoardDialogComponent, any>
  ): void {
    const afterClosed = dialogRef.afterClosed();
    const boards = this.boards.pipe(take(1));

    forkJoin([afterClosed, boards]).subscribe(([result, boards]) => {
      if (result) {
        this.boardService.createBoard({
          title: result,
          priority: boards.length,
        });
      }
    });
  }
}
