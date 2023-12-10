import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { StepperService } from "../stepper/services";

@Component({
  selector: "app-professional",
  templateUrl: "./professional.component.html",
  styleUrls: ["./professional.component.scss"]
})
export class ProfessionalComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  constructor(private stepper: StepperService) {}

  ngOnInit(): void {
    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      // type === 'complete'
      this.stepper[type].next(true);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
