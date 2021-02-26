export const shape = (m) => {
  const shapes = [];
  if (m.length === 0) {
    return [0];
  }
  let arr = m;
  while (arr !== null) {
    shapes.push(arr.length);
    arr = arr[0] ? arr[0] : null;
  }
  return shapes;
};

export const validate2D = (m) => {
  const mShape = shape(m);
  if (mShape.length !== 2) {
    throw new Error('Invalid matrix format');
  }
};

export const dot = (m1, m2) => {
  validate2D(m1);
  validate2D(m2);

  if (shape(m1) !== shape(m2)) {
    throw new Error('Invalid matrix format');
  }
};

export const zeros = (dimensions) => {
  let element = 0;
  for (let i = dimensions.length - 1; i >= 0; i--) {
    let temp = [];
    for (let j = 1; j <= dimensions[i]; j++) {
      temp.push(element);
    }
    element = temp;
  }

  return element;
};

export const generate = (dimensions, valueFunction) => {
  let value = valueFunction();
  let element = value;
  for (let i = dimensions.length - 1; i >= 0; i--) {
    let temp = [];
    for (let j = 1; j <= dimensions[i]; j++) {
      temp.push(element);
    }
    element = temp;
  }

  return element;
};
