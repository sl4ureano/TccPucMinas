import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-numeric-keyboard',
  templateUrl: './numeric-keyboard.component.html',
  styleUrl: './numeric-keyboard.component.scss'
})
export class NumericKeyboardComponent {

  digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'Del']; // Adicionando 'Del' como um botão para excluir
  keyboardRows = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0, 'Del']]; // Incluindo 'Del' na última linha

  @Output() digitPressed = new EventEmitter<number | string>();

  addDigit(digit: number | string) {
    this.digitPressed.emit(digit);
  }
}
