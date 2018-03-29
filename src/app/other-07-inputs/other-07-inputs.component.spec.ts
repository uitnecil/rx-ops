import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Other07InputsComponent } from './other-07-inputs.component';

describe('Other07InputsComponent', () => {
  let component: Other07InputsComponent;
  let fixture: ComponentFixture<Other07InputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Other07InputsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Other07InputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
