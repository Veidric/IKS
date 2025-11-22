import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListModal } from './users-list-modal';

describe('UsersListModal', () => {
  let component: UsersListModal;
  let fixture: ComponentFixture<UsersListModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
