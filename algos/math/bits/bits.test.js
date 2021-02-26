import {
  isEven,
  bothSameSign,
  swapTwoNumbers,
  isPowerofTwo,
  findParity,
  turnOffKthbit,
  turnOnKthBit,
  getBit,
  setBit,
  countSetBits,
} from './bits';

describe('bits', () => {
  it('isEven', () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(-2)).toBe(true);
    expect(isEven(1)).toBe(false);
    expect(isEven(-1)).toBe(false);
    expect(isEven(-3)).toBe(false);
    expect(isEven(3)).toBe(false);
    expect(isEven(8)).toBe(true);
    expect(isEven(9)).toBe(false);
    expect(isEven(121)).toBe(false);
    expect(isEven(122)).toBe(true);
    expect(isEven(1201)).toBe(false);
    expect(isEven(1202)).toBe(true);
  });
  it('bothSameSign, ', () => {
    expect(bothSameSign(2, 2)).toBe(true);
    expect(bothSameSign(12, 2)).toBe(true);
    expect(bothSameSign(-2, 2)).toBe(false);
    expect(bothSameSign(-2, -2)).toBe(true);
    expect(bothSameSign(-2, 12)).toBe(false);
    expect(bothSameSign(0, 2)).toBe(true);
  });
  it('swapTwoNumbers', () => {
    expect(swapTwoNumbers(4, 5)).toEqual([5, 4]);
    expect(swapTwoNumbers(4, 0)).toEqual([0, 4]);
    expect(swapTwoNumbers(-4, 5)).toEqual([5, -4]);
    expect(swapTwoNumbers(-14, -25)).toEqual([-25, -14]);
  });
  it('isPowerofTwo, ', () => {
    expect(isPowerofTwo(2)).toBe(true);
    expect(isPowerofTwo(32)).toBe(true);
    expect(isPowerofTwo(5)).toBe(false);
    expect(isPowerofTwo(0)).toBe(true);
  });

  it('findParity', () => {
    expect(findParity(16)).toEqual('odd');
    expect(findParity(31)).toEqual('odd');
    expect(findParity(20)).toEqual('even');
  });
  it('turnOffKthbit', () => {
    expect(turnOffKthbit(15, 3)).toEqual(11);
    expect(turnOffKthbit(18, 5)).toEqual(2);
    expect(turnOffKthbit(20, 3)).toEqual(16);
  });
  it('turnOnKthBit', () => {
    expect(turnOnKthBit(20, 4)).toEqual(28);
    expect(turnOnKthBit(18, 3)).toEqual(22);
  });

  it('should get bit at specific position', () => {
    // 1 = 0b0001
    expect(getBit(1, 1)).toEqual(1);
    expect(getBit(1, 2)).toEqual(0);

    // 2 = 0b0010
    expect(getBit(2, 1)).toEqual(0);
    expect(getBit(2, 2)).toEqual(1);

    // 3 = 0b0011
    expect(getBit(3, 1)).toEqual(1);
    expect(getBit(3, 2)).toEqual(1);

    // 10 = 0b1010
    expect(getBit(10, 1)).toEqual(0);
    expect(getBit(10, 2)).toEqual(1);
    expect(getBit(10, 3)).toEqual(0);
    expect(getBit(10, 4)).toEqual(1);
  });
  it('should set bit at specific position', () => {
    // 1 = 0b0001
    expect(setBit(1, 1)).toBe(1);
    expect(setBit(1, 2)).toBe(3);
    expect(setBit(1, 3)).toBe(5);

    // 10 = 0b1010
    expect(setBit(10, 1)).toBe(11);
    expect(setBit(10, 2)).toBe(10);
    expect(setBit(10, 3)).toBe(14);
  });
  it('should return number of set bits', () => {
    expect(countSetBits(0)).toBe(0);
    expect(countSetBits(1)).toBe(1);
    expect(countSetBits(2)).toBe(1);
    expect(countSetBits(3)).toBe(2);
    expect(countSetBits(4)).toBe(1);
    expect(countSetBits(5)).toBe(2);
    expect(countSetBits(21)).toBe(3);
    expect(countSetBits(255)).toBe(8);
    expect(countSetBits(1023)).toBe(10);
    // expect(countSetBits(-1)).toBe(32);
    // expect(countSetBits(-21)).toBe(30);
    // expect(countSetBits(-255)).toBe(25);
    // expect(countSetBits(-1023)).toBe(23);
    // expect(countSetBits(-4294967296)).toBe(0);
  });
});
