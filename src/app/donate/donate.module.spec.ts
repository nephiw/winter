import { DonateModule } from './donate.module';

describe('DonateModule', () => {
  let donateModule: DonateModule;

  beforeEach(() => {
    donateModule = new DonateModule();
  });

  it('should create an instance', () => {
    expect(donateModule).toBeTruthy();
  });
});
