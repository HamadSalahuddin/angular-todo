import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoInterface } from "../types/todo.interface";
import { FilterEnum } from "src/app/todos/types/filter.enum";

@Injectable()
export class TodoService {
  todos$ = new BehaviorSubject<TodoInterface[]>([])
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

  public addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16)
    }

    const updatedTodos = [...this.todos$.getValue(), newTodo]
    this.todos$.next(updatedTodos)
  }

  toggleAll(isCompleted: boolean) {
    console.log('isCompleted', isCompleted)
    const updatedTodos = this.todos$.getValue()
      .map(todo => {
        return {
          ...todo,
          isCompleted
        }
      })
      this.todos$.next(updatedTodos)
      console.log('updatedTodos', updatedTodos)
  }
}
