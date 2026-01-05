import { Component, OnInit } from '@angular/core';
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

  // Changed from inject() to constructor injection
  constructor(private cmsService: CmsService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.cmsService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  deleteUser(userId: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.cmsService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== userId);
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
    this.cmsService.updateUser(this.editForm).subscribe({
      next: () => {
        const index = this.users.findIndex(u => u.id === this.editForm.id);
        if (index !== -1) {
          this.users[index] = { ...this.editForm };
        }
        this.cancelEdit();
        alert('User updated successfully!');
      },
      error: (err) => alert(err.error?.message || 'Update failed')
    });
  }
}