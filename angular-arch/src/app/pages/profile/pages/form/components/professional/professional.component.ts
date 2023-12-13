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
import { markFormGroupTouched, regexErrors } from "@app/shared/utils";
import { Dictionaries } from "@app/store/dictionaries";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RecruiterForm } from "./roles/recruiter/recruiter.component";
import { EmployeeForm } from "./roles/employee/employee.component";
import { Value } from "@app/models/frontend";

export interface ProfessionalForm {
  about: string;
  roleId: string;
  role: RecruiterForm | EmployeeForm;
} 

@Component({
  selector: "app-professional",
  templateUrl: "./professional.component.html",
  styleUrls: ["./professional.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalComponent implements OnInit, OnDestroy {
  @Input() value?: ProfessionalForm;
  @Input() dictionaries: Dictionaries | null = null;

  @Output() changed: EventEmitter<ProfessionalForm> =
    new EventEmitter<ProfessionalForm>();

  form!: FormGroup;
  regexErrors = regexErrors;
  
  employeeRole?: EmployeeForm;
  recruiterRole?: RecruiterForm;

  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private stepper: StepperService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      roleId: [
        null,
        {
          updateOn: "change",
          validators: [
            Validators.required
          ]
        }
      ],
      about: [null],
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
        this.changed.emit(this.form.value);
      }
      this.stepper[type].next(this.form.valid);
    });
  }

  onRoleChange(role: Value): void {
    if(role === 'employee') {
      this.employeeRole = this.value?.role as EmployeeForm;
    } else {
      this.recruiterRole = this.value?.role as RecruiterForm;
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
