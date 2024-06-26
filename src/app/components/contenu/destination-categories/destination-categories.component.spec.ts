import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationCategoriesComponent } from './destination-categories.component';

describe('DestinationCategoriesComponent', () => {
  let component: DestinationCategoriesComponent;
  let fixture: ComponentFixture<DestinationCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
