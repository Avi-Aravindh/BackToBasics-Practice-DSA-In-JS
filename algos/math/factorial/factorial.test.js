import factorial from './factorial';

describe('factorial', () => {
  it('should calculate factorial', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(factorial(8)).toBe(40320);
    expect(factorial(10)).toBe(3628800);
    expect(factorial(15)).toBe(1307674368000);
    expect(factorial(18)).toBe(6402373705728000);
    expect(factorial(25)).toBe(15511210043330985984000000);
  });
});
