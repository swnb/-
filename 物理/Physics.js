/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-08 15:57:03
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-08 16:21:53
 */
function getEnergy(particles) {
  return particles.map(particle => new Vector(particle.velocity).normal2()).reduce((s, v) => s + v, 0);
}

function getMomentum(particles) {
  return particles.map(particle => new Vector(particle.velocity)).reduce((s, v) => s.add(v), Vector.zero());
}
