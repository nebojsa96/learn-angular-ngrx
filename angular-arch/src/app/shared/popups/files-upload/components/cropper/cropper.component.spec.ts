import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperComponent } from './cropper.component';

describe('CropperComponent', () => {
  let component: CropperComponent;
  let fixture: ComponentFixture<CropperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropperComponent]
    });
    fixture = TestBed.createComponent(CropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
