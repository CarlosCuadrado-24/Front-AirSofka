import { Component, EventEmitter, input, Output } from '@angular/core';
import { Item } from '../../../../domain/model/card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-class-card',
  imports: [CommonModule],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.scss',
})
export class ClassCardComponent {
  public type = input<string>();
  public description = input<string>();
  public price = input<number>();
  public conditions = input<Item[]>();
  public others = input<Item[]>();
  public colorHeader = input<string>();

  @Output() public onSelect = new EventEmitter<{price: number}>();

  selectCard() {
    this.onSelect.emit({price: this.price()});
  }
}