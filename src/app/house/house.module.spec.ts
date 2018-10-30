import { HouseModule } from './house.module';

describe('HouseModule', () => {
  let houseModule: HouseModule;

  beforeEach(() => {
    houseModule = new HouseModule();
  });

  it('should create an instance', () => {
    expect(houseModule).toBeTruthy();
  });
});
