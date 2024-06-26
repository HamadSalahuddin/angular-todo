import { Injectable } from "@angular/core";
import { BehaviorSubject, filter } from "rxjs";
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
    const updatedTodos = this.todos$.getValue()
      .map(todo => {
        return {
          ...todo,
          isCompleted
        }
      })
      this.todos$.next(updatedTodos)
  }

  changeFilter(filterName: FilterEnum) {
    this.filter$.next(filterName)
  }

  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todos$.getValue()
      .map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            text
          }
        }
        return todo
        
      })
      this.todos$.next(updatedTodos)
  }

  removeTodo(id:string): void {
    const updatedTodos = this.todos$.getValue()
      .filter(todo => todo.id !== id)

      this.todos$.next(updatedTodos)
  }

  toggleTodo(id: string): void {
    const updatedTodos = this.todos$.getValue()
      .map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            'isCompleted': !todo.isCompleted
          }
        }
        return todo
        
      })
      this.todos$.next(updatedTodos)
  }
}
