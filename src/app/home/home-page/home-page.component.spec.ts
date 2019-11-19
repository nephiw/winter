import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DateService } from '@app/common/date';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let element: DebugElement;
  let dateService: jasmine.SpyObj<DateService>;

  beforeEach(async(() => {
    dateService = jasmine.createSpyObj('DateService', [
      'isVotingLive',
      'isHousesLive'
    ]);

    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [{ provide: DateService, useValue: dateService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('house cutoff date', () => {
    it('hides the house signup link when decorating is not live', () => {
      dateService.isHousesLive.and.returnValue(false);
      fixture.detectChanges();

      const elm = element.query(By.css('.signups .decorate'));
      expect(elm).toBeFalsy();
    });

    it('shows the house signup link when decorating is live', () => {
      dateService.isHousesLive.and.returnValue(true);
      fixture.detectChanges();

      const elm = element.query(By.css('.signups .decorate'));
      expect(elm).toBeTruthy();
    });
  });

  describe('the link to vote', () => {
    it('is hidden when voting is not live', () => {
      dateService.isVotingLive.and.returnValue(false);
      fixture.detectChanges();

      const elm = element.query(By.css('.signups .vote'));
      expect(elm).toBeFalsy();
    });

    it('is shown when voting is live', () => {
      dateService.isVotingLive.and.returnValue(true);
      fixture.detectChanges();

      const elm = element.query(By.css('.signups .vote'));
      expect(elm).toBeTruthy();
    });
  });
});
