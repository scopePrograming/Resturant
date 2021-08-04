import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleCatComponent } from './show-single-cat.component';

describe('ShowSingleCatComponent', () => {
  let component: ShowSingleCatComponent;
  let fixture: ComponentFixture<ShowSingleCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSingleCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSingleCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
