import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersList } from './followers-list';

describe('FollowersList', () => {
  let component: FollowersList;
  let fixture: ComponentFixture<FollowersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowersList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
