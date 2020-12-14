import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../../../board.interface';
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-board-list-presentation',
  templateUrl: './board-list-presentation.component.html',
  styleUrls: ['./board-list-presentation.component.scss'],
})
export class BoardListPresentationComponent {
  @Input() boards?: Board[];

  @Output() drop = new EventEmitter<CdkDragDrop<string[]>>();
  @Output() openBoardDialog = new EventEmitter<void>();

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  onDrop(event: CdkDragDrop<string[]>): void {
    this.drop.emit(event);
  }

  onOpenBoardDialog(): void {
    this.openBoardDialog.next();
  }
}
