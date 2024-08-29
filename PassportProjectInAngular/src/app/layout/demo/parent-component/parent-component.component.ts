import { Component } from '@angular/core';
import { ChildComponent } from '../child-component/child-component.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ChildComponent, CommonModule],
  selector: 'app-parent',
  template: `
    <div>
      <h2>User List</h2>
      <ul>
        <li
          *ngFor="let user of users"
          (click)="selectUser(user)"
          class="btn btn-primary mx-2"
        >
          {{ user.name }}
        </li>
      </ul>
      <app-child
        [user]="selectedUser"
        (userClicked)="onUserClicked($event)"
      ></app-child>
    </div>
  `,
})
export class ParentComponent {
  users = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'John Doe1', email: 'john@example.com' },
    { name: 'Jane Smith1', email: 'jane@example.com' },
    { name: 'John Doe2', email: 'john@example.com' },
    { name: 'Jane Smith3', email: 'jane@example.com' },
    { name: 'John Doe4', email: 'john@example.com' },
    { name: 'Jane Smith4', email: 'jane@example.com' },
    { name: 'John Doe5', email: 'john@example.com' },
    { name: 'Jane Smith5', email: 'jane@example.com' },
  ];
  selectedUser: { name: string; email: string } | null = null;

  selectUser(user: { name: string; email: string }) {
    this.selectedUser = user;
  }

  onUserClicked(userName: string) {
    alert('Child component notified parent component!' + userName);
  }
}
