import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bc-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.less']
})
export class UploadButtonComponent {
  @Input() public error: string;
  @Output() public upload: EventEmitter<any> = new EventEmitter();
}
