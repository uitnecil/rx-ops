import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Other07Component } from './other-07.component';

describe('Other07Component', () => {
  let component: Other07Component;
  let fixture: ComponentFixture<Other07Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Other07Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Other07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
