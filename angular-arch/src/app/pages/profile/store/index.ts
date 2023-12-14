import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromForm from "./form/form.reducer";

export interface ProfileState {
    form: fromForm.FormState;
}

export const reducers: ActionReducerMap<ProfileState, any> = {
    form: fromForm.reducer
}

export const effects: [] = [

];


export const getProfileState = createFeatureSelector<ProfileState>('profile');