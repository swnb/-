/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-08 13:03:36
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-09 09:16:13
 */
const Radius = 1;
const Velocity0 = 100;

function genParticles(n) {
  let particles = [];
  for (let i = 0; i < n; i++) {
    let position;
    do {
      position = [Math.random() * BoxLength, Math.random() * BoxWidth]
    } while (particles.some(particle => particle.isExclusion(position, Radius)));
  
    let velocityTheta = Math.random() * 2 * Math.PI;
    let velocity = [Velocity0 * Math.cos(velocityTheta), Velocity0 * Math.sin(velocityTheta)];
  
    particles.push(new Particle(position, Radius, velocity));
  }
  return particles;
}

