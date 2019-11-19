import { OrdinalDatePipe } from './ordinalDate.pipe';

describe('OrdinalDatePipe', () => {
  let pipe: OrdinalDatePipe;

  beforeEach(() => {
    pipe = new OrdinalDatePipe('en');
  });

  afterEach(() => {
    pipe = null;
  });

  it('creates dates with the "st" ordinal indicator', () => {
    expect(pipe.transform(new Date('2020-01-01T12:00:00'))).toContain('st');
    expect(pipe.transform(new Date('2020-02-21T12:00:00'))).toContain('st');
    expect(pipe.transform(new Date('2020-03-31T12:00:00'))).toContain('st');
  });

  it('creates dates with the "nd" ordinal indicator', () => {
    expect(pipe.transform(new Date('2020-01-02T12:00:00'))).toContain('nd');
    expect(pipe.transform(new Date('2020-02-22T12:00:00'))).toContain('nd');
  });

  it('creates dates with the "rd" ordinal indicator', () => {
    expect(pipe.transform(new Date('2020-01-03T12:00:00'))).toContain('rd');
    expect(pipe.transform(new Date('2020-02-23T12:00:00'))).toContain('rd');
  });

  it('creates dates with the "th" ordinal indicator', () => {
    expect(pipe.transform(new Date('2020-01-05T12:00:00'))).toContain('th');
    expect(pipe.transform(new Date('2020-01-10T12:00:00'))).toContain('th');
    expect(pipe.transform(new Date('2020-01-11T12:00:00'))).toContain('th');
    expect(pipe.transform(new Date('2020-01-12T12:00:00'))).toContain('th');
    expect(pipe.transform(new Date('2020-01-13T12:00:00'))).toContain('th');
    expect(pipe.transform(new Date('2020-01-25T12:00:00'))).toContain('th');
    expect(pipe.transform(new Date('2020-01-29T12:00:00'))).toContain('th');
  });
});
