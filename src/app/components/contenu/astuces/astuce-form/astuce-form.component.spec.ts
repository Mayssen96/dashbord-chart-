import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstuceFormComponent } from './astuce-form.component';

describe('AstuceFormComponent', () => {
  let component: AstuceFormComponent;
  let fixture: ComponentFixture<AstuceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstuceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstuceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
