/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-12 13:54:43
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-15 10:42:20
 */
Math.equal = (number1, number2, error = 1E-5) => {
  return Math.abs(number1 - number2) <= error;
};

Math.rnd = (min, max) => {
  if (min === undefined) {
    max = 1;
    min = 0;
  } else if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
};

Math.rndInt = (min, max) => {
  return Math.floor(Math.rnd(min, max));
};

Math.sample = (samples) => {
  return samples[Math.rndInt(samples.length)];
};
