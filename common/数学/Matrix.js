/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-02-19 19:39:28
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-31 15:23:34
 */

require('./Math.js')

 function Matrix(data) {
  this.data = data;
  this.row = data.length;
  this.col = data[0].length;
  this.isSquare = this.row === this.col;
  for (let i = 0; i < data.length; i++) {
    this[i] = data[i];
  }
  // this.rank = 0;
}

Matrix.func = (n, m, F) => {
  if (!(Number.isInteger(m) && m > 0)) m = n;
  let data = Array(n).fill(0).map(() => Array(m));
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++)
      data[i][j] = F(i, j);
  return new Matrix(data);
};

Matrix.zeros = (n, m) => Matrix.func(n, m, () => 0);
Matrix.ones = (n, m) => Matrix.func(n, m, () => 1);
Matrix.eye = (n, m) => Matrix.func(n, m, (i, j) => i === j ? 1 : 0);
Matrix.random = (n, m) => Matrix.func(n, m, () => Math.random());

Matrix.prototype = {
  det() {
    if (!this.isSquare) {
      return NaN;
    }
    function _det(data) {
      if (data.length === 1) {
        return data[0][0];
      }
      let sum = 0;
      let row = data[0];
      for (let col = 0; col < row.length; col++) {
        let cofactor = JSON.parse(JSON.stringify(data)).slice(1)
        cofactor.forEach(row => {
          row.splice(col, 1);
        });
        let sign = col % 2 === 0 ? 1 : -1;
        sum += sign * row[col] * _det(cofactor);
      }
      return sum;
    }
    return _det(this.data);
  },
  // TODO 秩
  rank() {
    return Math.min(this.row, this.col);
  },
  transpose() {
    let _data = Array(this.data[0].length).fill(0).map(() => Array(this.data.length));
    this.data.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        _data[colIndex][rowIndex] = col;
      });
    });
    return new Matrix(_data);
  },
  extendTop(matrix) {
    return matrix.extendBottom(this);
  },
  extendBottom(matrix) {
    if (matrix.col !== this.col) return null;
    let data = JSON.parse(JSON.stringify(this.data));
    return new Matrix(data.concat(matrix.data));
  },
  extendLeft(matrix) {
    return matrix.extendRight(this);
  },
  extendRight(matrix) {
    if (matrix.row !== this.row) return null;
    let data = JSON.parse(JSON.stringify(this.data));
    data.forEach((row, rowIndex) => {
      row.push(...matrix.data[rowIndex]);
    });
    return new Matrix(data);
  },
  extract(rowStart, rowEnd, colStart, colEnd) {
    if (!(Number.isInteger(colStart) && colStart >= 0)) colStart = 0;
    if (!(Number.isInteger(colEnd) && colEnd > 0)) colEnd = this.col;
    rowStart = Math.max(0, rowStart);
    colStart = Math.max(0, colStart);
    rowEnd = Math.min(this.row, rowEnd);
    colEnd = Math.min(this.col, colEnd);
    let data = JSON.parse(JSON.stringify(this.data));
    data = data.slice(rowStart, rowEnd).map(row => row.slice(colStart, colEnd));
    return new Matrix(data);
  },
  isZeros() {
    return this.data.every(row => row.every(col => Math.equal(col, 0)));
  },
  isOnes() {
    return this.data.every(row => row.every(col => Math.equal(col, 1)));
  },
  // 是否是正交矩阵
  isOrthogonal() {
    if (!this.isSquare) return false;
    // A * A^T = I
    return this.product(this.transpose()).isEye();
  },
  diag() {
    let size = Math.min(this.row, this.col);
    let data = Array(size);
    for (let i = 0; i < size; i++) data[i] = this.data[i][i];
    return new Matrix([data]);
  },
  isEye() {
    if (!this.isSquare) return false;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (i === j && !Math.equal(this.data[i][j], 1)) return false;
        if (i !== j && !Math.equal(this.data[i][j], 0)) return false;
      }
    }
    return true;
  },
  add(matrix) {
    if (this.row !== matrix.row || this.col !== matrix.col) return null;
    let data = JSON.parse(JSON.stringify(this.data));
    for (let i = 0; i < this.row; i++)
      for (let j = 0; j < this.col; j++)
        data[i][j] += matrix.data[i][j];
    return new Matrix(data);
  },
  sub(matrix) {
    return this.add(matrix.scale(-1));
  },
  scale(k) {
    let data = JSON.parse(JSON.stringify(this.data));
    for (let i = 0; i < this.row; i++)
      for (let j = 0; j < this.col; j++)
        data[i][j] *= k;
    return new Matrix(data);
  },
  product(matrix) {
    if (this.col !== matrix.row) return null;
    let data = Array(this.row).fill(0).map(() => Array(matrix.col));
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < matrix.col; j++) {
        let sum = 0;
        for (let k = 0; k < this.col; k++) sum += this.data[i][k] * matrix.data[k][j];
        data[i][j] = sum;
      }
    }
    return new Matrix(data);
  },
  leftProduct(matrix) {
    return matrix.product(this);
  },
  swapRow(i, j) {
    let tmp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = tmp;
    this[i] = this.data[i];
    this[j] = this.data[j];
    return this;
  },
  swapCol(i, j) {
    let tmp;
    this.data.forEach(row => {
      tmp = row[i];
      row[i] = row[j];
      row[j] = tmp;
    });
    return this;
  },
  inverse(e) {
    let det = this.det();
    if (Number.isNaN(det)) return null;
    if (Math.equal(det, 0, e)) return null;
    if (this.row === 1) return new Matrix([[1 / det]]);
    // 扩展矩阵
    let extendMatrix = this.extendRight(Matrix.eye(this.row));
    let size = this.row;
    // 高斯消元法之三角化
    function gaussReductionTriangulation(rowStart) {
      if (rowStart >= size) return;
      let a = extendMatrix.data[rowStart][rowStart];
      if (!Math.equal(a, 0)) {
        // r0 首元素化为1 r0 = r0 / r00
        for (let col = rowStart; col < extendMatrix.col; col++) {
          extendMatrix.data[rowStart][col] /= a;
        }

        // 从顶自底 三角化
        // ri 首元素化为0 ri = ri - r0 * ri0
        for (let row = rowStart + 1; row < extendMatrix.row; row++) {
          let b = extendMatrix.data[row][rowStart];
          if (Math.equal(b, 0)) continue;
          for (let col = rowStart; col < extendMatrix.col; col++) {
            extendMatrix.data[row][col] -= extendMatrix.data[rowStart][col] * b;
          }
        }
      }

      rowStart++;
      rowStart < size && gaussReductionTriangulation(rowStart);
    }

    // 高斯消元法之三角化 首元素非0行排序
    function gaussReductionSortByZeroColIndex() {
      extendMatrix.data.sort((row1, row2) => {
        let index1 = -1;
        let index2 = -1;
        for (let i = 0; i < row1.length; i++) {
          if (!Math.equal(row1[i], 0)) {
            index1 = i;
            break;
          }
        }
        for (let i = 0; i < row2.length; i++) {
          if (!Math.equal(row2[i], 0)) {
            index2 = i;
            break;
          }
        }
        return index1 - index2;
      });
    }

    // 高斯消元法之对角化
    function gaussReductionDiagonalization(rowEnd) {
      if (rowEnd < 0) return;
      let a = extendMatrix.data[rowEnd][rowEnd];

      // r0 首元素化为1 r0 = r0 / r00
      for (let col = rowEnd; col < extendMatrix.col; col++) {
        extendMatrix.data[rowEnd][col] /= a;
      }

      // 从底自顶 对角化
      for (let row = rowEnd - 1; row >= 0; row--) {
        for (let col = row + 1; col < size; col++) {
          let b = extendMatrix.data[row][col];
          if (Math.equal(b, 0)) continue;
          for (let _col = row + 1; _col < extendMatrix.col; _col++) {
            extendMatrix.data[row][_col] -= extendMatrix.data[col][_col] * b;
          }
        }
      }
      rowEnd--;
      rowEnd && gaussReductionDiagonalization(rowEnd);
    }

    // console.log('extendMatrix 1\n', extendMatrix.toString());
    gaussReductionTriangulation(0);
    // console.log('extendMatrix 2\n', extendMatrix.toString());
    gaussReductionSortByZeroColIndex();
    // console.log('extendMatrix 3\n', extendMatrix.toString());
    gaussReductionDiagonalization(size - 1);
    // console.log('extendMatrix 4\n', extendMatrix.toString());

    return extendMatrix.extract(0, size, size, extendMatrix.col);
  },
  equal(matrix) {
    if (this.row !== matrix.row || this.col !== matrix.col) return false;
    return this.sub(matrix).isZeros();
  },
  // TODO 相似
  similarTo(matrix) {
    if (matrix.row !== this.row || matrix.col !== this.col) return false;
    return false;
  },
  // TODO 特征值分解
  eig() { },
  // TODO SVD分解
  svd() { },
  // TODO 快速幂
  power(n) {
    if (!this.isSquare) return null;
    if (n === 1) return this.product(Matrix.eye(this.row));
    if (n === 2) return this.product(this);
    if (n % 2 === 1) return this.product(this.power(n - 1));
    return this.power(n / 2).power(2);
  },
  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  },
};

function testInverse(matrix) {
  let det = matrix.det();
  if (Number.isNaN(det)) return;
  if (Math.equal(det, 0)) return;
  let inverse = matrix.inverse();
  console.log('原矩阵: ', matrix.toString())
  console.log('逆矩阵: ', inverse.toString())
  if (inverse === null) {
    console.error('求逆错误')
    return;
  }
  if (!inverse.isSquare) {
    console.error('求逆错误')
    return;
  }
  if (inverse.row !== matrix.row) {
    console.error('求逆错误')
    return;
  }
  if (!Math.equal(inverse.det() * det, 1)) {
    console.error('求逆错误')
  }
}

module.exports = Matrix


// console.log(Matrix.zeros(4));
// console.log(Matrix.zeros(4, 2));
// console.log(Matrix.zeros(2, 4));
// console.log(Matrix.ones(4));
// console.log(Matrix.ones(4, 2));
// console.log(Matrix.ones(2, 4));
// console.log(Matrix.eye(4));
// console.log(Matrix.eye(4, 2));
// console.log(Matrix.eye(2, 4));

// console.log(Matrix.zeros(1).isZeros());
// console.log(Matrix.zeros(1, 3).isZeros());
// console.log(new Matrix([
//   [0.1,0,0],
//   [0,0,0],
// ]).isZeros());
// console.log(Matrix.ones(1).isOnes());

// console.log(new Matrix([[1]]).det());
// console.log(new Matrix([[1, 1]]).det());
// console.log(new Matrix([[1], [1]]).det());
// console.log(new Matrix([[1, 1], [0, 6]]).det());
// console.log(new Matrix([[1, 1], [3, 6]]).det());
// console.log(new Matrix([[1, 1, 8], [3, 2, 6], [4, 5, 3]]).det());
// console.log(new Matrix([[1, 1, 8], [3, 2, 6], [4, 5, 3]]));
// console.log(new Matrix([[1, 2, 3], [4, 5, 6]]).transpose());

// console.log(new Matrix([[0]]).extendTop(new Matrix([[1]])))
// console.log(new Matrix([[0]]).extendBottom(new Matrix([[1]])))
// console.log(new Matrix([[0]]).extendLeft(new Matrix([[1]])))
// console.log(new Matrix([[0]]).extendRight(new Matrix([[1]])))

// console.log('diag', new Matrix([[1]]).diag());
// console.log('diag', new Matrix([[1, 2]]).diag());
// console.log('diag', new Matrix([[1, 1, 8], [3, 2, 6], [4, 5, 3]]).diag());

// console.log(Matrix.eye(1).isEye())
// console.log(Matrix.eye(2).isEye())
// console.log(Matrix.eye(3).isEye())
// console.log(new Matrix([[1, 1, 8], [3, 2, 6], [4, 5, 3]]).isEye());

// console.log(Matrix.eye(4).swapRow(1,3).toString());
// console.log(Matrix.eye(4).swapCol(2,3).toString());
// let matrix = Matrix.random(5);
// console.log(matrix.toString());
// console.log();
// console.log(matrix.swapCol(1, 3).toString());

// console.log(Matrix.eye(1).isOrthogonal());
// console.log(Matrix.eye(2).isOrthogonal());
// console.log(Matrix.eye(3).isOrthogonal());
// console.log(new Matrix([
//   [0,1],
//   [1,0]
// ]).isOrthogonal())
// console.log(new Matrix([
//   [0,1],
//   [1.1,0]
// ]).isOrthogonal());

// console.log(Matrix.eye(8).swapCol(3, 7).isOrthogonal());

// testInverse(new Matrix([[0]]));
// testInverse(new Matrix([[1]]));
// testInverse(new Matrix([[13]]));
// testInverse(Matrix.eye(4));
// testInverse(Matrix.eye(4).scale(3));
// testInverse(new Matrix([
//   [1, 2],
//   [2, 1]
// ]));
// testInverse(Matrix.random(9));

// let matrix = new Matrix([
//   [1, 2, 1],
//   [2, 1, 1],
// ]);
// let matrixT = matrix.transpose();
// let matrix1 = matrix.product(matrixT);
// let matrix2 = matrix.leftProduct(matrixT);
// console.log(matrix1.toString(), matrix1.det())
// console.log(matrix2.toString(), matrix2.det())


// let matrix = new Matrix([[1, 2, 3], [4, 5, 6]])
// console.log(matrix.toString())
// console.log(matrix[1])
// console.log(matrix[1][1])
// matrix.swapRow(1, 0)
// console.log(matrix.toString())
// console.log(matrix[1])
// console.log(matrix[1][1])
// matrix.swapCol(1, 0)
// console.log(matrix.toString())
// console.log(matrix[1])
// console.log(matrix[1][1])

