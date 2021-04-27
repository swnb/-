/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-08 15:29:05
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-30 16:36:40
 */
function Vector(data) {
  this.data = [...data];
  this.size = data.length;
  for (let i = 0; i < data.length; i++) {
    this[i] = data[i];
  }
}

Vector.zero = () => {
  return new Vector([0, 0]);
};

Vector.unit = (θ) => {
  return new Vector([Math.cos(θ), Math.sin(θ)]);
};

Vector.random = (normal) => {
  let θ = Math.random() * 2 * Math.PI;
  return Vector.unit(θ).scale(normal);
};

// 先实现二位向量的运算
Vector.prototype = {
  isZero() {
    let normal = this.normal();
    return Math.equal(0, normal);
  },
  isUnit() {
    let normal = this.normal();
    return Math.equal(1, normal);
  },
  reverse() {
    return new Vector([-this.data[0], -this.data[1]]);
  },
  add(vector) {
    return new Vector([this.data[0] + vector.data[0], this.data[1] + vector.data[1]])
  },
  sub(vector) {
    return this.add(vector.reverse());
  },
  dist(vector) {
    return this.sub(vector).normal();
  },
  dot(vector) {
    return this.data[0] * vector.data[0] + this.data[1] * vector.data[1];
  },
  // 三维向量才有叉积，先不实现
  // 从 this 到 vector 的 叉乘
  // 是 vector 到 this 的 叉乘 的 相反数
  cos(vector) {
    return this.data[0] * vector.data[1] - this.data[1] * vector.data[0];
  },
  normal() {
    return this.normal2() ** .5;
  },
  normal2() {
    return this.data[0] ** 2 + this.data[1] ** 2;
  },
  scale(k) {
    return new Vector([this.data[0] * k, this.data[1] * k]);
  },
  normalize() {
    let normal = this.normal();
    if (this.isZero()) return this;
    return this.scale(1 / normal);
  },
  cosθ(vector) {
    if (this.isZero() || vector.isZero()) return NaN;
    // return this.normalize().dot(vector.normalize());
    return this.dot(vector) / (this.normal() * vector.normal())
  },
  // 从 this 到 vector 的 角度
  // 是 vector 到 this 的 角度 的 相反数
  sinθ(vector) {
    if (this.isZero() || vector.isZero()) return NaN;
    return this.cos(vector) / (this.normal() * vector.normal());
  },
  angle(vector) {
    let cosθ = this.cosθ(vector);
    let sinθ = this.sinθ(vector);
    return Math.atan2(sinθ, cosθ);
  },
  rotate(θ) {
    let sinθ = Math.sin(θ);
    let cosθ = Math.cos(θ);
    return new Vector([cosθ * this.data[0] - sinθ * this.data[1], sinθ * this.data[0] + cosθ * this.data[1]]);
  },
  equal(vector) {
    return this.sub(vector).isZero();
  },
  collinearTo(vector) {
    return Math.equal(Math.abs(this.cosθ(vector)), 1);
  },
  verticalTo(vector) {
    return Math.equal(this.cosθ(vector), 0);
  },
  toString() {
    return this.data.toString();
  }
};

// module.exports = Vector

// console.log(new Vector([0, 1]).sinθ(new Vector([1, 0])))
// console.log(new Vector([1, 0]).sinθ(new Vector([0, 1])))
// console.log(new Vector([-1, 1]).sinθ(new Vector([1, 0])));
// console.log(new Vector([0, 1]).sinθ(new Vector([-1, 1])));
