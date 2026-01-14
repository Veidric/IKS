import { Component, inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followers-list',
  imports: [],
  templateUrl: './followers-list.html',
  styleUrl: './followers-list.css',
})
export class FollowersList {
  readonly dialogRef = inject(MatDialogRef<FollowersList>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private router: Router) {}

  visitProfile(id: number) {
    this.dialogRef.close();
    this.router.navigate(['/profile', id]);
  }
}
