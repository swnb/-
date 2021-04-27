/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-25 13:53:48
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-02 16:17:18
 */
// const Matrix = require('./common/数学/Matrix')
const { Calculus } = require('./common/数学/Calculus')

const Vmax = 1E3
const A = Math.PI / 2

function c2a(c) {
  c = Math.max(c, 0)
  if (c <= .5) return .6 * c * A
  if (c <= 1) return .5 + .2 * (1 - c)
  return A - c2a(1 / c)
}

function pa(c, x) {
  x = Math.max(Math.min(x, A), 0)
  let a = c2a(c)
  if (x <= a) return x / a * 4 / Math.PI
  return 
}

function p(v, u) {
  if (v >= u) return 0
  return v / ((u ** 2 - v ** 2) ** .5)
}
// console.log(p(1, 1))
// console.log(p(.999, 1))
// console.log(p(.99, 1))
// console.log(p(.9, 1))
// console.log(p(0, 1))
// console.log(p(.5, 1))
// console.log(p(.5 ** .5, 1))

function iter(v, pu) {
  return Calculus.integral(u => p(v, u) * pu, 1E-4, Vmax - 1E-4, 1E-2)
}

let i = 0
let I = 40
let N = 30
let pus = Array(N).fill(1 / N)
while (i < I) {
  let pusSum = 0
  for (let n = 0; n < N; n++) {
    pus[n] = iter(Vmax * n / N, pus[n])
    pusSum += pus[n]
  }
  for (let n = 0; n < N; n++) {
    pus[n] /= pusSum
  }
  i++
}

console.log(pus)

// console.log(Calculus.integral(v => p(v, 2), 0, 2-1E-10))