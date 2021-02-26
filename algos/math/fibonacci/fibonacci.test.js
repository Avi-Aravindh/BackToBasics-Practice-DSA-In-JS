import fibonacci from './fibonacci';
import fibonacciNth from './fibNth.js';

describe('fibonacci', () => {
  it('should calculate fibonacci correctly', () => {
    expect(fibonacci(1)).toEqual([1]);
    expect(fibonacci(2)).toEqual([1, 1]);
    expect(fibonacci(3)).toEqual([1, 1, 2]);
    expect(fibonacci(4)).toEqual([1, 1, 2, 3]);
    expect(fibonacci(5)).toEqual([1, 1, 2, 3, 5]);
    expect(fibonacci(6)).toEqual([1, 1, 2, 3, 5, 8]);
    expect(fibonacci(7)).toEqual([1, 1, 2, 3, 5, 8, 13]);
    expect(fibonacci(8)).toEqual([1, 1, 2, 3, 5, 8, 13, 21]);
    expect(fibonacci(9)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34]);
    expect(fibonacci(10)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});

describe('fibonacciNth', () => {
  it('should calculate fibonacci correctly', () => {
    expect(fibonacciNth(1)).toBe(1);
    expect(fibonacciNth(2)).toBe(1);
    expect(fibonacciNth(3)).toBe(2);
    expect(fibonacciNth(4)).toBe(3);
    expect(fibonacciNth(5)).toBe(5);
    expect(fibonacciNth(6)).toBe(8);
    expect(fibonacciNth(7)).toBe(13);
    expect(fibonacciNth(8)).toBe(21);
    expect(fibonacciNth(20)).toBe(6765);
    expect(fibonacciNth(30)).toBe(832040);
    expect(fibonacciNth(50)).toBe(12586269025);
    expect(fibonacciNth(70)).toBe(190392490709135);
    // expect(fibonacciNth(71)).toBe(308061521170129);
    // expect(fibonacciNth(72)).toBe(498454011879264);
    // expect(fibonacciNth(73)).toBe(806515533049393);
    // expect(fibonacciNth(74)).toBe(1304969544928657);
    // expect(fibonacciNth(75)).toBe(2111485077978050);
    // expect(fibonacciNth(80)).toBe(23416728348467685);
    // expect(fibonacciNth(90)).toBe(2880067194370816120);
  });
});
