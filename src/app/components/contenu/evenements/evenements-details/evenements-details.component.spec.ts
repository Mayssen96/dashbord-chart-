import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementsDetailsComponent } from './evenements-details.component';

describe('EvenementsDetailsComponent', () => {
  let component: EvenementsDetailsComponent;
  let fixture: ComponentFixture<EvenementsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
