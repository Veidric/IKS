import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../shared/classes/user';

@Component({
  selector: 'app-upload-image-form',
  imports: [],
  templateUrl: './upload-image-form.html',
  styleUrl: './upload-image-form.css',
})
export class UploadImageForm {
  readonly dialogRef = inject(MatDialogRef<UploadImageForm>);
  readonly data = inject<User>(MAT_DIALOG_DATA);
  profileService = inject(ProfileService);

  selectedImage: File | null = null;

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    if (!this.selectedImage) return;

    const fd = new FormData();
    fd.append('image', this.selectedImage);

    this.profileService.editProfileImage(this.data.id, fd).subscribe((res) => {
      if (res.message === 'Success!') {
        this.dialogRef.close();
      }
    });
  }

  resetImage() {
    this.profileService.deleteProfileImage(this.data.id).subscribe((res) => {
      if (res.message === 'Success!') {
        this.dialogRef.close();
      }
    });
  }
}
