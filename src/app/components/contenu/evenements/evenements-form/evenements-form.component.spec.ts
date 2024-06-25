import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementsFormComponent } from './evenements-form.component';

describe('EvenementsFormComponent', () => {
  let component: EvenementsFormComponent;
  let fixture: ComponentFixture<EvenementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
