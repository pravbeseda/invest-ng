import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksListPage } from './stocks-list.page';

describe('StocksListComponent', () => {
  let component: StocksListPage;
  let fixture: ComponentFixture<StocksListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksListPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
