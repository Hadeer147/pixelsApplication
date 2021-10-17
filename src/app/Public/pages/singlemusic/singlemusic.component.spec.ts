import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglemusicComponent } from './singlemusic.component';

describe('SinglemusicComponent', () => {
  let component: SinglemusicComponent;
  let fixture: ComponentFixture<SinglemusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglemusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglemusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
