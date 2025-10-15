import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrDetailsComponent } from './br-details.component';

describe('BrDetailsComponent', () => {
  let component: BrDetailsComponent;
  let fixture: ComponentFixture<BrDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
