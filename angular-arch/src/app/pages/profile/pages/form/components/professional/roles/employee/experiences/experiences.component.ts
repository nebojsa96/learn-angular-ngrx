import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Dictionaries } from "@app/store/dictionaries";

export interface ExperienceForm {
  companyName: string;
  period: Period;
}

interface Period {
  from: number;
  to: number;
}

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroup;
  @Input() name!: string;
  @Input() dictionaries!: Dictionaries;
  @Input() values?: ExperienceForm[];

  form!: FormArray<FormGroup>;

  
  get experiences() : FormArray<FormGroup> {
    return this.parent.controls[this.name] as FormArray<FormGroup>;
  }
  

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.values = this.values ? this.values : [];
    this.init();
  
  }

  private init(): void {
    this.form = this.fb.array(this.getFormGroupArray(this.values));
    this.parent.addControl(this.name, this.form);
  }

  private getFormGroupArray(values?: ExperienceForm[]): FormGroup[] {
    if(!values?.length) {
      return [this.getFormGroup()];
    } else {
      return values.map((val: ExperienceForm) => this.getFormGroup(val));
    }
  }

  private getFormGroup(value?: ExperienceForm): FormGroup {
    const group = this.fb.group({
      companyName: ['', {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }],
      period: [{ from: 0, to: 0} as Period, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }]
    });

    if(value) {
      group.patchValue(value);
    }

    return group;
  }

  addExperience(): void {
    this.form.push(this.getFormGroup());
  }

  removeExperience(i: number): void {
    this.form.removeAt(i);
  }


  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }
}
