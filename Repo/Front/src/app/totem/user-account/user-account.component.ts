import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent {
  @Input() user?: any;
  @Output() exit = new EventEmitter<string>();
}
