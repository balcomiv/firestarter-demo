import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ShellComponent } from './shell/shell.component';

const components = [ShellComponent];
const modules = [MatButtonModule];

@NgModule({
  declarations: [components],
  imports: [...modules],
  exports: [...modules, ...components],
})
export class SharedModule {}
