import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-child',
  template: `
    <div>
      <h3>User Details</h3>
      <p>Name: {{ user?.name }}</p>
      <p>Email: {{ user?.email }}</p>
      <button (click)="notifyParent()">Notify Parent</button>
    </div>
  `,
})
export class ChildComponent {
  //used to pass value from parent to child
  @Input() user: { name: string; email: string } | null = null;

  //used to event value from child to parent
  @Output() userClicked = new EventEmitter<string>();

  notifyParent() {
    this.userClicked.emit(this.user?.name);
  }
}
