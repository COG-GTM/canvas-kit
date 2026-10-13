import {fuzzyMatch} from '../lib/fuzzyMatch';

describe('fuzzyMatch', () => {
  it('should match everything with an empty query', () => {
    expect(fuzzyMatch('', 'New Request')).toEqual({score: 0, indices: []});
    expect(fuzzyMatch('   ', 'New Request')).toEqual({score: 0, indices: []});
  });

  it('should return null when characters are missing', () => {
    expect(fuzzyMatch('xyz', 'New Request')).toBeNull();
  });

  it('should return null when characters are out of order', () => {
    expect(fuzzyMatch('wen', 'New Request')).toBeNull();
  });

  it('should be case-insensitive', () => {
    expect(fuzzyMatch('NEW', 'new request')).not.toBeNull();
  });

  it('should return the indices of a contiguous substring match', () => {
    expect(fuzzyMatch('req', 'New Request')?.indices).toEqual([4, 5, 6]);
  });

  it('should match a subsequence and prefer word starts', () => {
    expect(fuzzyMatch('nr', 'New Request')?.indices).toEqual([0, 4]);
    expect(fuzzyMatch('nwrq', 'New Request')?.indices).toEqual([0, 2, 4, 6]);
  });

  it('should rank a word-start substring above a scattered match', () => {
    const substring = fuzzyMatch('exp', 'New Expense Report')!;
    const scattered = fuzzyMatch('exp', 'Example Pipeline')!;
    expect(substring.score).toBeGreaterThan(scattered.score);
  });

  it('should rank earlier matches above later ones', () => {
    const early = fuzzyMatch('time', 'Time Off')!;
    const late = fuzzyMatch('time', 'Request Time Off')!;
    expect(early.score).toBeGreaterThan(late.score);
  });

  it('should not let a preferred word-start occurrence drop a valid match', () => {
    expect(fuzzyMatch('ah', 'Search Admin')?.indices).toEqual([2, 5]);
  });

  it('should still prefer word starts when the rest of the query fits', () => {
    expect(fuzzyMatch('sa', 'Search Admin')?.indices).toEqual([0, 7]);
  });
});
