import { AbstractControl, FormGroup } from "@angular/forms";
import { ControlItem } from "../controls/select/select.component";

export const markFormGroupTouched = (formGroup: FormGroup) => {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
        control.markAsTouched();

        if (control instanceof FormGroup && control.controls) {
            markFormGroupTouched(control);
        }
    });
};

export interface Control {
    items?: ControlItem[];
    changed?: () => void;
    map?: () => void;
}

export interface ControlEntities {
    [key: string]: Control;
}

export const mapControls = (controls: ControlEntities): void => {
    Object.keys(controls).forEach((key: string) => {
        if(controls[key].map !== undefined) {
            (controls[key].map as () => void)();
        }
    });
}
