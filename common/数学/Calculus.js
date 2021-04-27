/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-15 09:43:41
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-25 14:52:45
 */
const Calculus = {
  differential(F, x) {
    return (F(x + 1E-5) - F(x - 1E-5)) / 2E-5
  },
  integral(f, from, to, Δ = 1E-5) {
    let sum = 0
    for (let x = from; x <= to; x += Δ) {
      sum += f(x) * Δ
      if (Number.isNaN(sum)) {
        debugger;
      }
    }
    return sum
  }
}

// module.exports = { Calculus }

// console.log(Calculus.differential(x => x ** 2, 3), 2 * 3)
// console.log(Calculus.integral(x => 1 / x, 1, 100), Math.log(100))
// console.log(Calculus.integral(x => x / (Math.E ** x - 1), 1E-5, 1E2), Math.PI ** 2 / 6)
