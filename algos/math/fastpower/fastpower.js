export default function fastPowering(n, pow) {
  if (pow % 2 === 0) {
    return n ** (pow / 2) * n ** (pow / 2);
  } else {
    return n ** Math.floor(pow / 2) * n ** Math.floor(pow / 2) * n;
  }
}
