import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { StepperService } from "../stepper/services";
import { markFormGroupTouched, regex, regexErrors } from "@app/shared/utils";
import { Dictionaries } from "@app/store/dictionaries";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export interface PersonalForm {
  name: string;
  photoURL: string;
  country: string;
}

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalComponent implements OnInit, OnDestroy {
  @Input() value: PersonalForm | null = null;
  @Input() dictionaries: Dictionaries | null = null;

  @Output() changed: EventEmitter<PersonalForm> =
    new EventEmitter<PersonalForm>();

  form: FormGroup = new FormGroup([]);
  regexErrors = regexErrors;

  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private stepper: StepperService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      photoURL: [null],
      name: [
        null,
        {
          updateOn: "blur",
          validators: [
            Validators.required,
            Validators.maxLength(128),
            Validators.pattern(regex.latinAndSpaces)
          ]
        }
      ],
      country: [
        null,
        {
          updateOn: "change",
          validators: [Validators.required]
        }
      ]
    });

    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      if(!this.form.valid) {
        markFormGroupTouched(this.form);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
      } else {
        this.changed.emit(this.form.value)
      }
      this.stepper[type].next(this.form.valid);
    });
  }

  onPhotoChanged(url: string | string[]): void {
    if(url) {
      this.form.controls['photoURL'].setValue(url);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
