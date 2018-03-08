import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Filtering06Component } from './filtering-06.component';

describe('Filtering06Component', () => {
  let component: Filtering06Component;
  let fixture: ComponentFixture<Filtering06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Filtering06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Filtering06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
