import { GenreName } from './genre-name';

describe('GenreName', () => {
  it('should be equal to a string without spaces', () => {
    expect(GenreName.fromString('jazz').value).toBe('jazz');
  });

  it('should be equal to a string with spaces', () => {
    expect(GenreName.fromString('rock and roll').value).toBe('rock and roll');
  });

  it('should not be empty', () => {
    expect(() => GenreName.fromString('')).toThrow();
  });

  it('should not have capital letters', () => {
    expect(() => GenreName.fromString('Genre')).toThrow();
  });
});
