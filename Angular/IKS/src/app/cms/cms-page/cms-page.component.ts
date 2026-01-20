import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CmsService } from '../../services/cms.service';
import { User } from '../../shared/classes/user';

// Pipes
import { FilterUserPipe } from '../../pipes/filter-user.pipe';
import { PaginateUserPipe } from '../../pipes/paginate-user.pipe';
import { SortUserPipe } from '../../pipes/sort-user.pipe';

@Component({
  selector: 'app-cms-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterUserPipe,
    SortUserPipe,
    PaginateUserPipe
  ],
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
  profileImageSafeUrl: SafeUrl | null = null;

  constructor(
    private cmsService: CmsService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

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
    this.loadUserImage(this.editForm.id);
    this.isModalOpen = true;
  }

  loadUserImage(userId: number) {
    this.profileImageSafeUrl = null;

    this.cmsService.getUserImage(userId).subscribe({
      next: (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.profileImageSafeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load image', err);
    
      }
    });
  }

  deleteProfileImage() {
    if (!this.editForm.id) return;
    if (!confirm('Are you sure you want to remove the profile picture?')) return;

    this.cmsService.deleteUserImage(this.editForm.id).subscribe({
      next: () => {
        alert('Image removed successfully!');
        this.loadUserImage(this.editForm.id);
      },
      error: (err) => alert('Failed to delete image: ' + (err.error?.message || 'Unknown error'))
    });
  }

  private formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  closeModal() {
    this.isModalOpen = false;
    this.editForm = new User();
    this.profileImageSafeUrl = null;
  }

  saveUser() {
    const payload = {
      id: this.editForm.id,
      Username: this.editForm.username,
      Name: this.editForm.name,
      Surname: this.editForm.surname,
      DateOfBirth: this.editForm.dateOfBirth,
      IsAdmin: this.editForm.isAdmin,
      Password: this.editForm.password || ''
    };

    this.cmsService.updateUser(payload as any).subscribe({
      next: () => {
        const updatedUsers = this.users.map(u =>
          u.id === this.editForm.id ? { ...u, ...this.editForm } : u
        );
        this.users = [...updatedUsers];

        alert('User updated successfully!');
        this.closeModal();
        this.cdr.detectChanges();
      },
      error: (err) => alert(err.error?.message || 'Update failed')
    });
  }
}