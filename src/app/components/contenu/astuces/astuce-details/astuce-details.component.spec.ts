import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstuceDetailsComponent } from './astuce-details.component';

describe('AstuceDetailsComponent', () => {
  let component: AstuceDetailsComponent;
  let fixture: ComponentFixture<AstuceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstuceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstuceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
