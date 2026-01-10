import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CmsService } from '../../services/cms.service';
import { User } from '../../shared/classes/user';

@Component({
  selector: 'app-cms-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.css']
})
export class CmsPageComponent implements OnInit {
  
  users: User[] = [];
  isLoading = true;

  // Edit State
  editingUserId: number | null = null;
  editForm: User = new User();

  constructor(
    private cmsService: CmsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.cmsService.getAllUsers().subscribe({
      next: (data: any) => {
        console.log('API RESPONSE:', data);

        if (Array.isArray(data) && Array.isArray(data[0])) {
             this.users = data[0];
        } else {
             this.users = data; 
        }

        this.isLoading = false;
        
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteUser(userId: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.cmsService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== userId);
        this.cdr.detectChanges();
      },
      error: (err) => alert(err.error?.message || 'Delete failed')
    });
  }

  startEdit(user: User) {
    this.editingUserId = user.id;
  
    this.editForm = { ...user };
  }

  cancelEdit() {
    this.editingUserId = null;
    this.editForm = new User();
  }

  saveUser() {
    const payload = {
      id: this.editForm.id,
      Username: this.editForm.Username,
      Name: this.editForm.Name,
      Surname: this.editForm.Surname,
      DateOfBirth: this.editForm.DateOfBirth,
      IsAdmin: this.editForm.IsAdmin,
      Password: this.editForm.Password || '' 
    };

    this.cmsService.updateUser(payload as any).subscribe({
      next: () => {
        const index = this.users.findIndex(u => u.id === this.editForm.id);
        if (index !== -1) {
          this.users[index] = { ...this.editForm }; 
        }
        
        alert('User updated successfully!');
        this.cancelEdit();
        this.cdr.detectChanges(); 
      },
      error: (err) => alert(err.error?.message || 'Update failed')
    });
  }
}