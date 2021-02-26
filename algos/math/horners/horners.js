export default function hornerMethod(equation, x) {
  let initial = equation[0];
  for (let i = 1; i < equation.length; i++) {
    initial = initial * x + equation[i];
  }
  return initial;
}
