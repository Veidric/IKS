import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageForm } from './upload-image-form';

describe('UploadImageForm', () => {
  let component: UploadImageForm;
  let fixture: ComponentFixture<UploadImageForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadImageForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImageForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
