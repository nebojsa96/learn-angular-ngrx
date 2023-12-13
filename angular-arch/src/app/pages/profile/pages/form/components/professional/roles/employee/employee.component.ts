import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Dictionaries } from "@app/store/dictionaries";

export interface EmployeeForm {
  companyName: string;
  employeesCount: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroup;
  @Input() name!: string;
  @Input() dictionaries!: Dictionaries;
  @Input() value?: EmployeeForm;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      specialization: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }],
      skills: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      qualification: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      expectedSalary: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }]
    });

    if(this.value) {
      this.form.patchValue(this.value);
    }

    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }
}
