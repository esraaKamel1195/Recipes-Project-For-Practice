import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input({required: true}) message: any;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
