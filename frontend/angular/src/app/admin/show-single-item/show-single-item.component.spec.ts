import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleItemComponent } from './show-single-item.component';

describe('ShowSingleItemComponent', () => {
  let component: ShowSingleItemComponent;
  let fixture: ComponentFixture<ShowSingleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSingleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSingleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
