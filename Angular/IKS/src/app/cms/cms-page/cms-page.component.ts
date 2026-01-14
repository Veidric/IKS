import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CmsService } from '../../services/cms.service';
import { User } from '../../shared/classes/user';

// Import your new Pipes
import { FilterUserPipe } from '../../pipes/filter-user.pipe';
import { SortUserPipe } from '../../pipes/sort-user.pipe';
import { PaginateUserPipe } from '../../pipes/paginate-user.pipe';

@Component({
  selector: 'app-cms-page',
  standalone: true,
  // Add the pipes to the imports array
  imports: [CommonModule, FormsModule, FilterUserPipe, SortUserPipe, PaginateUserPipe],
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.css'],
})
export class CmsPageComponent implements OnInit {
  users: User[] = [];
  isLoading = true;

  // Filter/Sort/Page State
  searchTerm: string = '';
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string = '';

  sortColumn: string = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  currentPage: number = 1;
  itemsPerPage: number = 5;

  // Modal State
  isModalOpen = false;
  editForm: User = new User();

  constructor(private cmsService: CmsService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.cmsService.getAllUsers().subscribe({
      next: (data: any) => {
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
      },
    });
  }

  // --- ACTIONS ---

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  filterByLetter(letter: string) {
    this.selectedLetter = this.selectedLetter === letter ? '' : letter;
    this.currentPage = 1;
  }

  // Simple Pagination Logic for Buttons
  nextPage(totalItems: number) {
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  deleteUser(userId: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.cmsService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u.id !== userId);
        this.cdr.detectChanges();
      },
      error: (err) => alert(err.error?.message || 'Delete failed'),
    });
  }

  openEditModal(user: User) {
    this.editForm = { ...user };
    if (this.editForm.dateOfBirth) {
      this.editForm.dateOfBirth = this.formatDateForInput(this.editForm.dateOfBirth);
    }
    this.isModalOpen = true;
  }

  private formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  closeModal() {
    this.isModalOpen = false;
    this.editForm = new User();
  }

  saveUser() {
    const payload = {
      id: this.editForm.id,
      Username: this.editForm.username,
      Name: this.editForm.name,
      Surname: this.editForm.surname,
      DateOfBirth: this.editForm.dateOfBirth,
      IsAdmin: this.editForm.isAdmin,
      Password: this.editForm.password || '',
    };

    this.cmsService.updateUser(payload as any).subscribe({
      next: () => {
        const index = this.users.findIndex((u) => u.id === this.editForm.id);
        if (index !== -1) {
          this.users[index] = { ...this.editForm };
        }
        alert('User updated successfully!');
        this.closeModal();
        this.cdr.detectChanges();
      },
      error: (err) => alert(err.error?.message || 'Update failed'),
    });
  }
}
