import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { BoardListContainerComponent } from './components/board-list/container/board-list-container/board-list-container.component';
import { BoardListPresentationComponent } from './components/board-list/presentation/board-list-presentation.component';
import { BoardComponent } from './components/board/board.component';
import { BoardDialogComponent } from './dialogs/board-dialog/board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';
import { KanbanRoutingModule } from './kanban-routing.module';

@NgModule({
  declarations: [
    BoardComponent,
    BoardListContainerComponent,
    BoardListPresentationComponent,
    BoardDialogComponent,
    TaskDialogComponent,
    BoardListContainerComponent,
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  entryComponents: [BoardDialogComponent, TaskDialogComponent],
})
export class KanbanModule {}
