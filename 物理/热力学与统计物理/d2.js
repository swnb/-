/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-01 15:36:52
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-09 13:57:25
 */

const add = (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1]]
const sub = (v1, v2) => [v1[0] - v2[0], v1[1] - v2[1]]
const normal2 = v => v[0] ** 2 + v[1] ** 2
const normal = v => normal2(v) ** .5
const scale = (v, k) => [v[0] * k, v[1] * k]
const normalize = v => {
  let normal = normal(v)
  if (normal === 0) return v
  return scale(v, 1 / normal)
}
const rotate = (v, angle) => {
  let sin = Math.sin(angle)
  let cos = Math.cos(angle)
  return [cos * v[0] - sin * v[1], sin * v[0] + cos * v[1]]
}


const calc = () => {
  let u0 = [1, 0]

  let NA = 200
  let dA = Math.PI / NA
  let pθ = []

  let NV = 100
  let pv = []
  let pe = []

  let NC = 5
  let cs = []
  cs.push(0)
  cs = cs.concat(Array(NC).fill(undefined).map((_, i) => 1 / (NC - i)))
  cs = cs.concat(Array(4).fill(undefined).map((_, i) => .5 + (i + 1) / 10))
  cs = cs.concat(Array(NC - 1).fill(undefined).map((_, i) => i + 2))

  for (let c of cs) {
    let pθc = Array(NA).fill(0)
    let pvc = Array(NV).fill(0)
    let pec = Array(NV).fill(0)
    pθ.push(pθc)
    pv.push(pvc)
    pe.push(pec)
    let EMax = 1 ** 2 + c ** 2
    let VMax = EMax ** .5
    let total = 0
    for (let av0 = 0; av0 <= 2 * Math.PI; av0 += dA) {
      let v0 = [c * Math.cos(av0), c * Math.sin(av0)]
      let w = sub(u0, v0)
      // 速度向量 与 位置向量 夹角 的 sin值 是 均匀分布
      for (let sinAv1 = -1; sinAv1 <= 1; sinAv1 += .001) {
        let av1 = Math.asin(sinAv1)
        let wu = scale(rotate(w, av1), Math.cos(av1))
        let wv = scale(rotate(w, av1 - Math.PI / 2), Math.sin(av1))
        let u1 = add(wu, v0)
        let v1 = add(wv, v0)

        let u1l = normal(u1)
        let v1l = normal(v1)
        
        let iu = Math.floor(u1l * NV / VMax)
        let iv = Math.floor(v1l * NV / VMax)
        iu = Math.min(iu, NV - 1)
        iv = Math.min(iv, NV - 1)
        pvc[iu]++
        pvc[iv]++

        let eu1 = u1l ** 2
        let ev1 = v1l ** 2
        let ieu = Math.floor(eu1 * NV / EMax)
        let iev = Math.floor(ev1 * NV / EMax)
        ieu = Math.min(ieu, NV - 1)
        iev = Math.min(iev, NV - 1)
        pec[ieu]++
        pec[iev]++

        let angle = Math.atan2(v1l, u1l)
        let ia = Math.floor(angle * NA / (Math.PI / 2))
        pθc[ia]++

        total++

        // let dE = (normal2(u1) + normal2(v1)) - (normal2(u0) + normal2(v0))
        // if (dE > 1E-2) {
        //   console.error('error')
        //   return
        // }
      }
    }
    pvc.forEach((_, i) => pvc[i] /= 2 * VMax * total / NV)
    pec.forEach((_, i) => pec[i] /= 2 * EMax * total / NV)
    pθc.forEach((_, i) => pθc[i] /= total / NA)
  }
  return {
    cs,
    pv,
    pθ,
    pe,
  }
}

let { cs, pv, pθ, pe } = calc()
