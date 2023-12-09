import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookatablePage } from './bookatable.page';

describe('BookatablePage', () => {
  let component: BookatablePage;
  let fixture: ComponentFixture<BookatablePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookatablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
