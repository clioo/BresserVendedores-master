import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadeslistComponent } from './propiedadeslist.component';

describe('PropiedadeslistComponent', () => {
  let component: PropiedadeslistComponent;
  let fixture: ComponentFixture<PropiedadeslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropiedadeslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
