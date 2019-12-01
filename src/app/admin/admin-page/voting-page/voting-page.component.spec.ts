import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Subject } from 'rxjs';

import { AdminService } from '@app/admin/admin.service';
import { VotingPageComponent } from './voting-page.component';
import { By } from '@angular/platform-browser';

describe('VotingPageComponent', () => {
  let element: DebugElement;
  let fixture: ComponentFixture<VotingPageComponent>;
  let adminService: jasmine.SpyObj<AdminService>;
  let resultsSubject: Subject<any>;

  beforeEach(async(() => {
    resultsSubject = new Subject();
    adminService = jasmine.createSpyObj('AdminService', ['getVotingResults']);
    adminService.getVotingResults.and.returnValue(
      resultsSubject.asObservable()
    );

    TestBed.configureTestingModule({
      declarations: [VotingPageComponent],
      providers: [{ provide: AdminService, useValue: adminService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingPageComponent);
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('builds the table', fakeAsync(() => {
    const results = [
      {
        number: 1,
        firstName: 'Albert',
        lastName: 'Addams',
        emailAddress: 'albert@example.com',
        houseAddress: '0001 Cemetery Lane',
        votes: 10
      },
      {
        number: 2,
        firstName: 'Emily',
        lastName: 'Evans',
        emailAddress: 'emily@example.com',
        houseaddress: '8453 Honey Creek St.',
        votes: 2
      }
    ];
    expect(element.queryAll(By.css('tr')).length).toBe(0);

    resultsSubject.next(results);
    flushMicrotasks();
    fixture.detectChanges();

    expect(element.queryAll(By.css('tr')).length).toBe(2);

    const addamsCells = element.query(By.css('tr')).queryAll(By.css('td'));

    expect(addamsCells[0].nativeElement.textContent).toBe('1');
    expect(addamsCells[1].nativeElement.textContent).toBe('Albert Addams');
    expect(addamsCells[2].nativeElement.textContent).toBe('albert@example.com');
    expect(addamsCells[3].nativeElement.textContent).toBe('0001 Cemetery Lane');
    expect(addamsCells[4].nativeElement.textContent).toBe('10');
  }));
});
