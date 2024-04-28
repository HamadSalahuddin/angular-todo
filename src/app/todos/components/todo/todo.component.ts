import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { TodoInterface } from "../../types/todo.interface";
import { TodoService } from "../../services/todos.service";

@Component({
    selector: 'app-todos-todo',
    templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit, OnChanges {    
    @Input('todo') todoProps: TodoInterface = { id: '', text: '', isCompleted: false }
    @Input('isEditing') isEditingProps: boolean = false

    @Output("setEditingId") setEditingIdEvent: EventEmitter<string | null> = new EventEmitter()

    editingText: string = ''
    @ViewChild('textInput') textInput: ElementRef

    constructor(private todoService: TodoService) {}

    ngOnInit(): void {
        this.editingText = this.todoProps.text
    }
    
    ngOnChanges({isEditingProps}: SimpleChanges): void {
        console.log('changes', isEditingProps)
        if (isEditingProps.currentValue) {
            setTimeout(() => {
                this.textInput.nativeElement.focus()
            }, 0);
        }
    }

    setTodoInEditMode() {
        console.log('setTodoInEditMode')
        this.setEditingIdEvent.emit(this.todoProps.id)
    }

    removeTodo(): void {
        console.log('removeTodo()')
        this.todoService.removeTodo(this.todoProps.id)
    }

    toggleTodo(): void {
        console.log('toggleTodo()')
        this.todoService.toggleTodo(this.todoProps.id)
    }

    changeText(event: Event): void {
        const value = (event.target as HTMLInputElement).value
        this.editingText = value

        console.log('changeText', this.editingText)
    }

    changeTodo(): void {
        console.log('changeTodo()', this.editingText)
        this.todoService.changeTodo(this.todoProps.id, this.editingText)
        this.setEditingIdEvent.emit(null)
    }
}
