import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Combining02Component } from './combining-02.component';

describe('Combining02Component', () => {
  let component: Combining02Component;
  let fixture: ComponentFixture<Combining02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Combining02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Combining02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
