import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { Observable, Subject, of, takeUntil } from "rxjs";

import { Store, select } from "@ngrx/store";
import * as fromRoot from "@app/store";
import * as fromUser from "@app/store/user";
import * as fromDictionaries from "@app/store/dictionaries";

import { StepperService } from "./components/stepper/services";
import { PersonalForm } from "./components/personal/personal.component";
import { ProfessionalForm } from "./components/professional/professional.component";
import { ActivatedRoute, Router } from "@angular/router";

export interface ProfileForm {
  personal: PersonalForm | null;
  professional: ProfessionalForm | null;
}

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
  dictionaries$: Observable<fromDictionaries.Dictionaries | null> = of(null);
  dictionariesIsReady$: Observable<boolean | null> = of(false);

  private user!: fromUser.User;
  private destroy = new Subject<void>();

  constructor(
    public stepper: StepperService,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    
    this.dictionaries$ = this.store.pipe(
      select(fromDictionaries.getDictionaries)
    );
    this.dictionariesIsReady$ = this.store.pipe(
      select(fromDictionaries.getIsReady)
    );

    this.stepper.init([
      { key: "professional", label: "Professional" },
      { key: "personal", label: "Personal" }
    ]);

    this.stepper.complete$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log("completed");
    });

    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log("canceled");
    });
  }

  onChangedPersonal(data: PersonalForm): void {
    console.log(data);
  }

  onChangedProfessional(data: ProfessionalForm): void {
    console.log(data);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
