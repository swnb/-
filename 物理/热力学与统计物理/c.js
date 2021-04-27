/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-01 14:18:56
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-01 15:36:16
 */
let u0 = 1, v0
let dAngle = Math.PI / 20
let a1Set = new Set()
let a2Set = new Set()
let eqN = 0, neqN = 0
let printList = []
for (let c = 0; c <= 10; c += .1) {
  v0 = u0 * c
  for (let angle1 = 0; angle1 <= Math.PI; angle1 += dAngle) {
    let w = (u0 ** 2 + v0 ** 2 - 2 * u0 * v0 * Math.cos(angle1)) ** .5
    for (let angle2 = -Math.PI / 2; angle2 <= Math.PI / 2; angle2 += dAngle) {
      let wu = w * Math.sin(angle2)
      let wv = w * Math.cos(angle2)
      let sinU0 = u0 / w * Math.sin(angle1)
      let cosU0 = (w ** 2 + v0 ** 2 - u0 ** 2) / (2 * w * v0)
      let sinV0 = v0 / w * Math.sin(angle1)
      let cosV0 = (w ** 2 + u0 ** 2 - v0 ** 2) / (2 * w * u0)

      let sinAngle2 = Math.sin(Math.abs(angle2))
      let cosAngle2 = Math.cos(Math.abs(angle2))

      // U1 = V0 + (90° - |angle2|)
      // V1 = U1 - 90° = V0 - |angle2|
      let cosV1 = cosV0 * cosAngle2 + sinV0 * sinAngle2
      let cosU1 = cosV0 * sinAngle2 - sinV0 * cosAngle2

      let u1 = (wu ** 2 + u0 ** 2 - 2 * wu * u0 * cosU1) ** .5
      let v1 = (wv ** 2 + v0 ** 2 - 2 * wv * v0 * cosV1) ** .5
      let dE = u1 ** 2 + v1 ** 2 - u0 ** 2 - v0 ** 2

      let a1 = +angle1.toFixed(2)
      let a2 = +angle2.toFixed(2)
      if (dE < 1E-2) {
        eqN++
        a1Set.add(a1)
        a2Set.add(a2)
      } else {
        neqN++
      }
      dE < 1E-2 && !printList.find(e => e.a1 === a1 && e.a2 === a2) && printList.push({ a1, a2 })
      // console.log(dE, {c, angle1, angle2})
    }
  }
}

console.log(a1Set)
console.log(a2Set)
console.log({
  eqN, neqN
})

// console.log(printList)