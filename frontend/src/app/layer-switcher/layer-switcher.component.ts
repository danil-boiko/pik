import { Component, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-layer-switcher',
  templateUrl: './layer-switcher.component.html',
  styleUrls: ['./layer-switcher.component.css']
})

export class LayerSwitcherComponent  {
  @Output() radioButtonChanged = new EventEmitter<string>();
  selectedOption: string;

  constructor() {
    this.selectedOption = '1'
  }

  onRadioButtonChange(option: string) {
    this.selectedOption = option;
    this.radioButtonChanged.emit(option);
  }

}
