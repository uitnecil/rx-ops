import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Create01Component } from './create-01.component';

describe('Create01Component', () => {
  let component: Create01Component;
  let fixture: ComponentFixture<Create01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
