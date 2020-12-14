import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board, Task } from '../../board.interface';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog.component';
import { BoardService } from '../../services/board.service';

//  Fix Me - The tutorial doesn't adhere to any strict checking or architecture best practices.
//  this is a hack, just to move forward with tutorial as is.
type TaskViewModel = {
  task: Task;
  isNew: boolean;
  boardId: number;
  idx?: number;
};
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board?: Board;

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  taskDrop(event: CdkDragDrop<string[]>): void {
    if (!(this.board && this.board.id && this.board.tasks)) {
      console.error('Board/Tasks not set!');
      return;
    }

    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board?.id, idx }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.isValidTaskViewModel(result)) {
        if (!(this.board && this.board.id && this.board.tasks)) {
          console.error('Invalid board!');
          return;
        }
        if (result.isNew) {
          this.boardService.updateTasks(this.board.id, [
            ...this.board.tasks,
            result.task,
          ]);
        } else {
          if (!result.idx) {
            console.error('Invalid idx!');
            return;
          }
          const update = this.board.tasks;
          update.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(this.board.id, this.board.tasks);
        }
      }
    });
  }

  //  Fix Me - The tutorial doesn't adhere to any strict checking or architecture best practices.
  //  this is a hack, just to move forward with tutorial as is.
  private isValidBoard(value: object | undefined): value is Board {
    if (!value) {
      console.error('Board not set!');
      return false;
    }

    const board = value as Board;
    if (!(board && board.id && board.tasks)) {
      console.error('Board properties not set!');
      return false;
    }
    return true;
  }

  //  Fix Me - The tutorial doesn't adhere to any strict checking or architecture best practices.
  //  this is a hack, just to move forward with tutorial as is.
  private isValidTaskViewModel(
    value: object | undefined
  ): value is TaskViewModel {
    if (!value) {
      console.error('Task not set!');
      return false;
    }

    const taskViewModel = value as TaskViewModel;
    if (!(taskViewModel && taskViewModel.boardId && taskViewModel.task)) {
      console.error('TaskViewModel properties not set!');
      return false;
    }
    return true;
  }
}
