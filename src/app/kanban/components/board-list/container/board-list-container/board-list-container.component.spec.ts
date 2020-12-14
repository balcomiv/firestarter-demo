import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListContainerComponent } from './board-list-container.component';

describe('BoardListContainerComponent', () => {
  let component: BoardListContainerComponent;
  let fixture: ComponentFixture<BoardListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
