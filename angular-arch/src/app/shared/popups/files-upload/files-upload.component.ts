import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss'],
})
export class FilesUploadComponent implements OnInit {
  files: Array<File | null> = [];
  imageFile: File | null = null;
  filesURLs: string[] = [];
  isError: boolean = false;
  isHovering: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(event: Event | FileList): void {
    this.isError = false;
    const files =
      event instanceof Event
        ? ((event.target as HTMLInputElement).files as FileList)
        : event;
    if (this.data.crop && files.length > 1) {
      this.isError = true;
      return;
    }

    if(this.data.crop && files.length === 1 && files.item(0)?.type.split('/')[0] === 'image') {
      this.imageFile = files.item(0);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      if (files.item(i)) {
        this.files.push(files.item(i));
      }
    }

    console.log(files);
  }

  onCrop(file: File): void {
    this.imageFile = null;
    this.files.push(file);
  }

  onUploadComplete(url: string) {
    this.filesURLs.push(url);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onComplete(): void {
    const res = this.data.multiple ? this.filesURLs : this.filesURLs[0];
    this.dialogRef.close(res);
  }
}
