import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFramesComponent } from './list-frames.component';

describe('ListFramesComponent', () => {
  let component: ListFramesComponent;
  let fixture: ComponentFixture<ListFramesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFramesComponent]
    });
    fixture = TestBed.createComponent(ListFramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
