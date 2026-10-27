
const { expect } = require('chai');
const Mtrx = require('mtrx');

function toArray(matrix) {
  return Array.from(matrix, row => Array.from(row));
}

describe('Створення матриць', function () {

  it('Створення матриці 2x2', function () {
    const matrix = new Mtrx([[1, 2], [3, 4]]);

    expect(toArray(matrix)).to.deep.equal([
      [1, 2],
      [3, 4]
    ]);
  });

  it('Створення нульової матриці', function () {
    const matrix = Mtrx.zeros(2, 2);

    expect(toArray(matrix)).to.deep.equal([
      [0, 0],
      [0, 0]
    ]);
  });

  it('Створення матриці з одиниць', function () {
    const matrix = Mtrx.ones(2, 3);

    expect(toArray(matrix)).to.deep.equal([
      [1, 1, 1],
      [1, 1, 1]
    ]);
  });

  it('Створення одиничної матриці', function () {
    const matrix = Mtrx.eye(3);

    expect(toArray(matrix)).to.deep.equal([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]);
  });

  it('Створення діагональної матриці', function () {
    const matrix = Mtrx.diag([2, 4, 6]);

    expect(toArray(matrix)).to.deep.equal([
      [2, 0, 0],
      [0, 4, 0],
      [0, 0, 6]
    ]);
  });

});

describe('Властивості матриці', function () {

  let matrix;

  beforeEach(function () {
    matrix = new Mtrx([[1, 2], [3, 4]]);
  });

  it('Перевірка кількості рядків', function () {
    expect(matrix.rows).to.equal(2);
  });

  it('Перевірка кількості стовпців', function () {
    expect(matrix.cols).to.equal(2);
  });

  it('Отримання елемента матриці', function () {
    expect(matrix.get(0, 1)).to.equal(2);
  });

  it('Зміна елемента матриці', function () {
    matrix.set(0, 1, 9);

    expect(matrix.get(0, 1)).to.equal(9);
  });

});

describe('Математичні операції', function () {

  let A;
  let B;

  beforeEach(function () {
    A = new Mtrx([[1, 2], [3, 4]]);
    B = new Mtrx([[5, 6], [7, 8]]);
  });

  it('Додавання матриць', function () {
    const result = Mtrx.add(A, B);

    expect(toArray(result)).to.deep.equal([
      [6, 8],
      [10, 12]
    ]);
  });

  it('Віднімання матриць', function () {
    const result = Mtrx.sub(A, B);

    expect(toArray(result)).to.deep.equal([
      [-4, -4],
      [-4, -4]
    ]);
  });

  it('Множення матриці на число', function () {
    const result = Mtrx.mul(A, 2);

    expect(toArray(result)).to.deep.equal([
      [2, 4],
      [6, 8]
    ]);
  });

  it('Множення двох матриць', function () {
    const result = Mtrx.mul(A, B);

    expect(toArray(result)).to.deep.equal([
      [19, 22],
      [43, 50]
    ]);
  });

});

describe('Додаткові операції', function () {

  it('Транспонування матриці', function () {
    const matrix = new Mtrx([[1, 2], [3, 4]]);
    const result = matrix.T();

    expect(toArray(result)).to.deep.equal([
      [1, 3],
      [2, 4]
    ]);
  });

  it('Визначник матриці', function () {
    const matrix = new Mtrx([[1, 2], [3, 4]]);

    expect(matrix.det).to.equal(-2);
  });

  it('Ранг одиничної матриці', function () {
    const matrix = Mtrx.eye(3);

    expect(matrix.rank).to.equal(3);
  });

  it('Перевірка типу Mtrx', function () {
    const matrix = new Mtrx([[1, 2], [3, 4]]);

    expect(Mtrx.isMtrx(matrix)).to.equal(true);
  });

  it('Перевірка однакових розмірів', function () {
    const A = Mtrx.zeros(2, 2);
    const B = Mtrx.ones(2, 2);

    expect(Mtrx.isSameShape(A, B)).to.equal(true);
  });

});
