import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboracionVComponent } from './colaboracion-v.component';

describe('ColaboracionVComponent', () => {
  let component: ColaboracionVComponent;
  let fixture: ComponentFixture<ColaboracionVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboracionVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboracionVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
