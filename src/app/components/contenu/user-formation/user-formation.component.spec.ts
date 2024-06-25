import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormationComponent } from './user-formation.component';

describe('UserFormationComponent', () => {
  let component: UserFormationComponent;
  let fixture: ComponentFixture<UserFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
