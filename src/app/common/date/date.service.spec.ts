import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;
  let tomorrow: Date;
  let yesterday: Date;
  let nextWeek: Date;
  let lastWeek: Date;
  let dateBuilder: jasmine.SpyObj<{ build: (params: any) => Date}>;

  beforeEach(() => {
    const now = new Date();

    dateBuilder = jasmine.createSpyObj('dateBuilder', ['build']);
    dateBuilder.build.and.returnValue(now);

    tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);

    service = new DateService(dateBuilder);
  });

  describe('isVotingLive', () => {
    it('returns true if between house cutoff and voting cutoff', () => {
      service.houseCutoff = lastWeek;
      service.voteCutoff = tomorrow;

      expect(service.isVotingLive()).toBe(true);
    });

    it('returns false if after vote cutoff', () => {
      service.houseCutoff = lastWeek;
      service.voteCutoff = yesterday;

      expect(service.isVotingLive()).toBe(false);
    });

    it('returns false if before house cutoff', () => {
      service.houseCutoff = tomorrow;
      service.voteCutoff = nextWeek;

      expect(service.isVotingLive()).toBe(false);
    });
  });

  describe('isHousesLive', () => {
    it('returns true if before house cutoff', () => {
      service.houseCutoff = nextWeek;

      expect(service.isHousesLive()).toBe(true);
    });

    it('returns false if after house cutoff', () => {
      service.houseCutoff = lastWeek;

      expect(service.isHousesLive()).toBe(false);
    });
  });
});
