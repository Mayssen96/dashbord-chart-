import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstucesComponent } from './astuces.component';

describe('AstucesComponent', () => {
  let component: AstucesComponent;
  let fixture: ComponentFixture<AstucesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstucesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstucesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
