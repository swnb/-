/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-08 14:04:55
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-08 17:47:24
 */

const BoxLength = 1250;
const BoxWidth = 800;

function Particle(position, radius, velocity) {
  this.position = position;
  this.radius = radius;
  this.velocity = velocity;
}

Particle.prototype = {
  run() {
    let x = this.position[0] + this.velocity[0] / 100;
    let y = this.position[1] + this.velocity[1] / 100;
    const MaxX = BoxLength - this.radius;
    const MaxY = BoxWidth - this.radius;
    if (x <= this.radius) {
      this.position[0] = 2 * this.radius - x;
      this.velocity[0] *= -1;
    } else if (x >= MaxX) {
      this.position[0] = 2 * MaxX - x;
      this.velocity[0] *= -1;
    } else {
      this.position[0] = x;
    }
    if (y <= this.radius) {
      this.position[1] = 2 * this.radius - y;
      this.velocity[1] *= -1;
    } else if (y >= MaxY) {
      this.position[1] = 2 * MaxY - y;
      this.velocity[1] *= -1;
    } else {
      this.position[1] = y;
    }
  },
  isExclusion(position, radius) {
    return new Vector(this.position).dist(new Vector(position)) <= this.radius + radius;
  }
};

