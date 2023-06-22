function map(array, callback) {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    newArray.push(callback(array[i], i));
  }

  return newArray;
}

function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);
  }
}

function filter(array, callback) {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i)) {
      newArray.push(array[i]);
    }
  }

  return newArray;
}

function every(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i)) {
      return false;
    }
  }

  return true;
}

function some(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i)) {
      return true;
    }
  }

  return false;
}

function find(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i)) {
      return array[i];
    }
  }
}
