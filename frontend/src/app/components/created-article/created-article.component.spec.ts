import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedArticleComponent } from './created-article.component';

describe('CreatedArticleComponent', () => {
  let component: CreatedArticleComponent;
  let fixture: ComponentFixture<CreatedArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
