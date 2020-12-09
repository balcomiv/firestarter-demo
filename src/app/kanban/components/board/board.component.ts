import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../../board.interface';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board?: Board;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {}

  taskDrop(event: CdkDragDrop<string[]>): void {
    if (!(this.board && this.board.id && this.board.tasks)) {
      console.error('Board/Tasks not set!');
      return;
    }

    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }
}
