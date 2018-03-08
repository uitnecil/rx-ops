import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Search04Component } from './search-04.component';

describe('Search04Component', () => {
  let component: Search04Component;
  let fixture: ComponentFixture<Search04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Search04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Search04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
