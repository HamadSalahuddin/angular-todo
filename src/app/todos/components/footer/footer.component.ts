import { Component } from "@angular/core";
import { Observable, map } from "rxjs";
import { TodoService } from "src/app/todos/services/todos.service";

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
    noTodosClass$: Observable<boolean>
    activeCount$: Observable<number>
    itemsLeftText$: Observable<string>

    constructor(private todosService: TodoService) {
        this.activeCount$ = this.todosService.todos$.pipe(
            map((todos) => todos.filter(todo => !todo.isCompleted).length)
        )

        this.itemsLeftText$ = this.activeCount$.pipe(map((activeCount)=> `item${activeCount !== 1 ? 's' : ''} left`))
        this.noTodosClass$ = this.todosService.todos$
        .pipe(
            map((todos) => todos.length === 0)
        )
    }
}