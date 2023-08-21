import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export const markFormGroupTouched = (formGroup: FormGroup) => {
    (Object as any).values(formGroup.controls).forEach((control: AbstractControl) => {
        control.markAsTouched();

        if (control instanceof FormGroup && control.controls) {
            markFormGroupTouched(control);
        }
    });
};
