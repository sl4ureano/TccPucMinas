import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  @Input() analitics?: any;
  @Input() user?: any;

  @Output() sair = new EventEmitter<boolean>();
  Sair(){
    this.sair.emit(true)
  }


}
