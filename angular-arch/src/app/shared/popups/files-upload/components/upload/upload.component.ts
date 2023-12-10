import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, Subject, finalize, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() file: File | null = null;
  @Output() completed = new EventEmitter<string>();

  task: AngularFireUploadTask | null = null;

  percentages$: Observable<number | undefined> = of();
  snapshot$: Observable<any> = of(null);
  downloadURL: string = '';

  private destroy = new Subject<void>();

  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.startUpload();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  startUpload(): void {
    if(!this.file) {
      return;
    }
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${
      this.file.name
    }`;

    const storageRef = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.percentages$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges();

    this.snapshot$
      .pipe(
        takeUntil(this.destroy),
        finalize(async () => {
          this.downloadURL = await storageRef.getDownloadURL().toPromise();
          this.completed.next(this.downloadURL);
        })
      )
      .subscribe();
  }
}
