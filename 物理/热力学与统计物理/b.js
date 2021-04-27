/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-31 18:31:07
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-31 18:48:17
 */

let N = 50
let AList = Array(N).fill(0)
let dA = Math.PI / N
let a = 1, b = 1 / 2
for (let i = 0; i < 1E7; i++) {
  let C = Math.PI * Math.random()
  let c = (a ** 2 + b ** 2 - 2 * a * b * Math.cos(C)) ** .5
  let sinC = Math.sin(C)
  let sinA = a / c * sinC
  let cosA = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c)
  AList[Math.floor(Math.acos(cosA) / dA)]++
  // console.log(sinA, cosA, sinA ** 2 + cosA ** 2, Math.asin(sinA), Math.acos(cosA))
}
console.log(AList)