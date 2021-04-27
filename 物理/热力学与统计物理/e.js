/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-07 15:02:37
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-09 15:33:34
 */
let N = 1E6
let es = Array(N).fill(1)
for (let k = 0; k < 1E3 * N; k++) {
  let i = k % N
  let j = k ** 2 % N
  if (i === j) j = (j + 1) % N
  let e = es[i] + es[j]
  let e1 = Math.random() * e
  es[i] = e1
  es[j] = e - e1
}