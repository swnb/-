/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-15 11:30:20
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-15 13:11:55
 */
/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-11 18:10:43
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-11 18:34:05
 */
function gcd(a, b) {
  if (a <= 1 || b <= 1) return 1;
  if (a < b) {
    let t = a;
    a = b;
    b = t;
  }
  let m = a % b;
  if (m === 0) return b;
  return gcd(b, m);
}

// console.log(gcd(1, 1))
// console.log(gcd(1, 2))
// console.log(gcd(1, 3))
// console.log(gcd(1, 4))
// console.log(gcd(2, 2))
// console.log(gcd(12, 21))
// console.log(gcd(7 * 8 * 11, 121 * 6))



function getPrimes(N) {
  let primes = Array(N).fill(true);
  primes[0] = primes[1] = false;
  let i = 3;
  let result = [2, 3];
  while (i < primes.length) {
    let ii = 2 * i;
    for (; ii < primes.length; ii += i) {
      primes[ii] = false;
    }
    for (ii = i + 2; ii < primes.length; ii += 2) {
      if (primes[ii]) {
        break;
      }
    }
    i = ii;
    if (ii < primes.length) {
      result.push(i);
    }
  }
  return result;
}

let N = 1E7;
let primes = getPrimes(N)
function 是质数实验() {
  return primes.length / N
}

function 互质实验() {
  let n = 0;
  for (let i = 0; i < N; i++) {
    let a = Math.ceil(Math.random() * N);
    let b = Math.ceil(Math.random() * N);
    if (gcd(a, b) === 1) {
      n++;
    }
  }
  return n / N;
}

console.log(是质数实验())
console.log(1 / Math.log(N))
console.log(primes.filter(p => p ** 2 <= N).map(p => 1 - 1 / p).reduce((s, p) => s * p, 1))

console.log(互质实验());
console.log(6 / (Math.PI ** 2));
console.log(primes.map(p => 1 - 1 / (p ** 2)).reduce((s, p) => s * p, 1));
