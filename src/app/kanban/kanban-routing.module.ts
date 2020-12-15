import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardListContainerComponent } from './components/board-list/container/board-list-container/board-list-container.component';

const routes: Routes = [{ path: '', component: BoardListContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanbanRoutingModule {}
