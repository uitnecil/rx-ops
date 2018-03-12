import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Merging03Component } from './merging-03.component';

describe('Merging03Component', () => {
  let component: Merging03Component;
  let fixture: ComponentFixture<Merging03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Merging03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Merging03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
