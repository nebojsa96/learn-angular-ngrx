import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ImageCroppedEvent } from "ngx-image-cropper";
import { blobToBase64, dataURLtoFile } from '../../utils';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {
  @Input() imageFile: File = new File([], '');
  @Output() changed = new EventEmitter<File>();
  croppedImage: string | null | undefined;

  constructor() { }

  ngOnInit(): void {

  }

  imageCropped(event: ImageCroppedEvent): void {
    if(event.blob) {
      blobToBase64(event.blob).then(result => this.croppedImage = result as string);
    }
  }

  onCrop(): void {
    if(!this.croppedImage) {
      return
    }
    const file = dataURLtoFile(this.croppedImage, this.imageFile.name);
    this.changed.emit(file);
  }
}
