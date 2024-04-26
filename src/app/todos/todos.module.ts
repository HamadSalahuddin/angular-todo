import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodosComponent } from "src/app/todos/components/todos.component";
import { HeaderComponent } from "src/app/todos/components/header/header.component";
import { TodoService } from "./services/todos.service";

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  }
];
@NgModule({
  declarations: [TodosComponent, HeaderComponent],
  imports: [RouterModule.forChild(routes)],
  providers:[TodoService,]
})
export class TodosModule {

}
