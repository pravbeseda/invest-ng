import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioListPage } from './portfolio-list.page';

describe('PortfolioListComponent', () => {
  let component: PortfolioListPage;
  let fixture: ComponentFixture<PortfolioListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioListPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
