import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleUserComponent } from './show-single-user.component';

describe('ShowSingleUserComponent', () => {
  let component: ShowSingleUserComponent;
  let fixture: ComponentFixture<ShowSingleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSingleUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSingleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
