import { Component } from "@angular/core";
import { TodoService } from "../../services/todos.service";

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private todoService: TodoService) {
  }

  text: string = ''

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement
    this.text = target.value
  }

  addTodo(): void {
    this.todoService.addTodo(this.text)
    this.text = ''
  }
}
