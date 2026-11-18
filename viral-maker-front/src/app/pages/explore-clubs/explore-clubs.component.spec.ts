import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreClubsComponent } from './explore-clubs.component';

describe('ExploreClubsComponent', () => {
  let component: ExploreClubsComponent;
  let fixture: ComponentFixture<ExploreClubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreClubsComponent]
    });
    fixture = TestBed.createComponent(ExploreClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
