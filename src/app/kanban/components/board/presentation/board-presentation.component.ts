import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board, Task } from '../../../board.interface';
import { BoardService } from '../../../services/board.service';
import { TaskViewModel } from '../container/board-container/board-container.component';

@Component({
  selector: 'app-board-presentation',
  templateUrl: './board-presentation.component.html',
  styleUrls: ['./board-presentation.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board?: Board;

  @Output() taskDrop = new EventEmitter<CdkDragDrop<string[]>>();
  @Output() openDialog = new EventEmitter<TaskViewModel | null>();

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onTaskDrop(event: CdkDragDrop<string[]>): void {
    this.taskDrop.emit(event);
  }

  onOpenDialog(task?: Task, index?: number): void {
    this.openDialog.emit();
  }
}

//  Fix Me -- Testing Only
//  https://stackoverflow.com/questions/50288205/destructuring-a-function-parameter-object-and-rest
// const arr: [string, number | undefined, number] = ['1', undefined, 3];

// function Test(a: string, b: number | undefined, c: number) {
//   console.log(a); // 1
//   console.log(b); // 2
//   console.log(c); // 3
// }

// Test(...arr); // spreading the array into the function
