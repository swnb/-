/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-14 18:20:10
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-15 11:28:15
 */

// require('./Math')
// const Vector = require('./Vector')

function Complex(a, b) {
  if (Math.equal(a, 0)) a = 0
  if (Math.equal(b, 0)) b = 0
  this.a = a;
  this.b = b;
  this.vector = new Vector([a, b])
  this.normal = this.vector.normal()
  if (this.isZero()) return
  let vector = new Vector([1, 0])
  // 从 vector 到 this.vector 的 角度
  let sinθ = vector.sinθ(this.vector)
  let cosθ = vector.cosθ(this.vector)
  this.angle = sinθ >= 0 ? Math.acos(cosθ) : 2 * Math.PI - Math.acos(cosθ)
}

Complex.prototype = {
  isZero() {
    return this.vector.isZero()
  },
  isUnit() {
    return this.vector.isUnit()
  },
  conjugation() {
    return new Complex(this.a, -this.b)
  },
  add(complex) {
    return new Complex(this.a + complex.a, this.b + complex.b)
  },
  sub(complex) {
    return new Complex(this.a - complex.a, this.b - complex.b)
  },
  scale(k) {
    return new Complex(this.a * k, this.b * k)
  },
  product(complex) {
    return new Complex(this.a * complex.a - this.b * complex.b, this.a * complex.b + this.b * complex.a)
  },
  divide(complex) {
    if (complex.isZero()) return null
    return this.product(complex.conjugation()).scale(1 / (complex.normal ** 2))
  },
  pow(k) {
    let normal = this.normal ** k
    let angle = this.angle * k
    return new Complex(normal * Math.cos(angle), normal * Math.sin(angle))
  }
}

// console.log(new Complex(1, 0).angle)
// console.log(new Complex(1, 1).angle)
// console.log(new Complex(0, 1).angle)
// console.log(new Complex(-1, 1).angle)
// console.log(new Complex(-1, 0).angle)
// console.log(new Complex(-1, -1).angle)
// console.log(new Complex(0, -1).angle)
// console.log(new Complex(1, -1).angle)
// console.log(new Complex(1, -1E-9).angle)

// console.log(new Complex(1,3).divide(new Complex(0,0)))

// console.log(new Complex(1, 1).pow(2))

