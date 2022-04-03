import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineTagDialogComponent } from './define-tag-dialog.component';

describe('DefineTagDialogComponent', () => {
  let component: DefineTagDialogComponent;
  let fixture: ComponentFixture<DefineTagDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineTagDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineTagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
