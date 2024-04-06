import { capitalizeWords } from './string';

describe('capitalizeWords', () => {
  it('should capitalize each word in a string', () => {
    const input = 'hello world';
    const expectedOutput = 'Hello World';
    const result = capitalizeWords(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty string', () => {
    const input = '';
    const expectedOutput = '';
    const result = capitalizeWords(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle single word', () => {
    const input = 'hello';
    const expectedOutput = 'Hello';
    const result = capitalizeWords(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle already capitalized words', () => {
    const input = 'Hello World';
    const expectedOutput = 'Hello World';
    const result = capitalizeWords(input);
    expect(result).toEqual(expectedOutput);
  });
});
