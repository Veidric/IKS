import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list-modal',
  templateUrl: './users-list-modal.component.html',
  styleUrls: ['./users-list-modal.component.scss']
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
