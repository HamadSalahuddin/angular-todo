import { Component } from "@angular/core";
import { Observable, combineLatest, map } from "rxjs";
import { TodoInterface } from "src/app/todos/types/todo.interface";
import { TodoService } from "src/app/todos/services/todos.service";
import { FilterEnum } from "src/app/todos/types/filter.enum";

@Component({
    selector: "app-todos-main",
    templateUrl: './main.component.html'
})
export class MainComponent {
    visibleTodos$: Observable<TodoInterface[]>
    noTodoClass$: Observable<boolean>
    isAllTodosSelected$: Observable<boolean>

    editingId: string | null = null;

    constructor(private todosService: TodoService) {
        this.isAllTodosSelected$ = this.todosService.todos$
        .pipe(
            map((todos) => todos.every(todo => todo.isCompleted)
            )
        )
        this.noTodoClass$ = this.todosService.todos$
        .pipe(
            map((todos) => todos.length === 0)
        )

        this.visibleTodos$ = combineLatest(
            this.todosService.todos$,
            this.todosService.filter$
        ).pipe(
            map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
                console.log('combine', todos, filter)
                if (filter === FilterEnum.active) {
                    return todos.filter(todo => !todo.isCompleted)
                } else if (filter === FilterEnum.completed) {
                    return todos.filter(todo => todo.isCompleted)
                }
                return todos
            })
        )

    }

    toggleAllTodos(event: Event): void {
        const target = event.target as HTMLInputElement
        this.todosService.toggleAll(target.checked)
    }

    setEditingId(editingId: string | null) :void {
        this.editingId = editingId
    }


}