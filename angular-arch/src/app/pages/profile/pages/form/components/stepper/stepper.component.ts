import { Component, OnDestroy, OnInit } from "@angular/core";
import { StepperService } from "./services";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.scss"]
})
export class StepperComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  constructor(private stepper: StepperService) {}

  ngOnInit(): void {
    this.stepper.next$.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.stepper.onNext();
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  get steps() {
    return this.stepper.steps;
  }

  get activeSteps() {
    return this.stepper.activeStep;
  }

  isActive(index: number): boolean {
    return index === this.activeSteps.index;
  }

  isCompleted(index: number): boolean {
    return index < this.activeSteps.index;
  }

  isFirst(): boolean {
    return this.activeSteps.index === 0;
  }

  isLast(): boolean {
    return this.activeSteps.index === this.steps.length - 1;
  }

  onNext(): void {
    this.stepper.check.next("next");
  }

  onPrev(): void {
    this.stepper.onPrev();
  }

  onComplete(): void {
    this.stepper.complete.next(true);
  }

  onCancel(): void {
    this.stepper.cancel.next(true);

  }
}
