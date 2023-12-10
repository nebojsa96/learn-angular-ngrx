import { Injectable } from "@angular/core";
import { Observable, Subject, filter, of } from "rxjs";

export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep extends Step {
  index: number;
}

@Injectable()
export class StepperService {
  steps: Step[] = [{ key: "", label: "" }];
  activeStep: ActiveStep = { ...this.steps[0], index: 0 };

  next: Subject<boolean> = new Subject<boolean>();
  next$: Observable<boolean> = of(false);

  prev: Subject<boolean> = new Subject<boolean>();
  prev$: Observable<boolean> = this.prev.asObservable();

  complete: Subject<boolean> = new Subject<boolean>();
  complete$: Observable<boolean> = of(false);

  cancel: Subject<boolean> = new Subject<boolean>();
  cancel$: Observable<boolean> = this.cancel.asObservable();

  check: Subject<'next' | 'complete'> = new Subject<'next' | 'complete'>();
  check$: Observable<'next' | 'complete'> = this.check.asObservable();

  constructor() {
    this.next$ = this.next.asObservable().pipe(
      filter(isOk => isOk)
    )

    this.complete$ = this.complete.asObservable().pipe(
      filter(isOk => isOk)
    )
  }

  init(steps: Step[]): void {
    this.steps = steps;
    this.activeStep = { ...steps[0], index: 0 };
  }

  onNext(): void {
    const index = this.activeStep.index + 1;
    this.activeStep = { ...this.steps[index], index };
  }

  onPrev(): void {
    const index = this.activeStep.index - 1;
    this.activeStep = { ...this.steps[index], index };
  }
}
