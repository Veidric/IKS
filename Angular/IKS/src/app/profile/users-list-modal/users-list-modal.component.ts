import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './users-list-modal.component.html',
  styleUrls: ['./users-list-modal.scss']
})
export class UsersListModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UsersListModalComponent>,
    private router: Router
  ) {}

  visitProfile(id: number) {
    this.dialogRef.close();
    this.router.navigate(['/profile', id]);
  }
}
