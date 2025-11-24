import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListModalComponent } from './users-list-modal.component';

describe('UsersListModal', () => {
  let component: UsersListModalComponent;
  let fixture: ComponentFixture<UsersListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsersListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});