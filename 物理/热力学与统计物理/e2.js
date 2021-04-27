/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-07 15:02:37
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-09 15:33:25
 */
function gen(e1, e2) {
  let E = e1 + e2
  function inner() {
    let v = Math.random() * (E ** .5)
    let e = v ** 2
    return (Math.random() < .5) ? e : -e
  }

  let e = (Math.random() < .5) ? e1 : e2
  e += inner()
  if (e < 0 || e > E) return gen(e1, e2)
  return e
}

let N = 1E6
let es = Array(N).fill(1)
for (let k = 0; k < 1E3 * N; k++) {
  let i = k % N
  let j = k ** 2 % N
  if (i === j) j = (j + 1) % N
  let e = es[i] + es[j]
  //          √|e-e1| + √|e-e2|
  // p(e) =  ———————————————————
  //            4(√e1 + √e2)
  // p(e) = (Math.abs(e-e1) **.5 + Math.abs(e-e2) **.5) / (4 * (e1 ** .5 + e2 ** .5) )
  let e1 = gen(es[i], es[j])
  es[i] = e1
  es[j] = e - e1
}