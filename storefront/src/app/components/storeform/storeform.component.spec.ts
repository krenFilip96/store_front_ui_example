import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreformComponent } from './storeform.component';

describe('StoreformComponent', () => {
  let component: StoreformComponent;
  let fixture: ComponentFixture<StoreformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
