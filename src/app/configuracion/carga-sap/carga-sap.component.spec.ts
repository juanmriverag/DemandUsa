import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaSapComponent } from './carga-sap.component';

describe('CargaSapComponent', () => {
  let component: CargaSapComponent;
  let fixture: ComponentFixture<CargaSapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaSapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaSapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
