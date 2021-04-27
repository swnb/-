/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-23 14:55:52
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-25 14:54:50
 */
#include<stdio.h>
#include<stdlib.h>
#include<time.h>

// 递归实现
unsigned long long solve_by_recur(unsigned long long n) {
  if (n <= 2) return 1;
  return solve_by_recur(n - 1) + solve_by_recur(n - 2);
}

// 动态规划
unsigned long long solve_by_dp(unsigned long long n) {
  if (n <= 2) return 1;
  unsigned long long a = 1;
  unsigned long long b = 1;
  while(n > 2) {
    b = b + a;
    a = b - a;
    n--;
  }
  return b;
}

int my_pow(int a, int b) {
  if (b == 0) return 1;
  if (b == 1) return a;
  int m = b % 2;
  int hb = b >> 1;
  int p = my_pow(a, hb);
  p *= p;
  if (m == 1) p *= a;
  return p;
}

void print_matrix(unsigned long long** matrix, int r, int c) {
  int i, j;
  for(i = 0; i < r; i++) {
    for (j = 0; j < c; j++) {
      printf("%lld ", matrix[i][j]);
    }
    printf("\n");
  }
}

unsigned long long** multiply_matrix(unsigned long long** matrix1, int r1, int c1, unsigned long long** matrix2, int r2, int c2) {
  if (c1 != r2) return NULL;
  unsigned long long** product = (unsigned long long**)malloc(sizeof(unsigned long long*) * r1);
  int i, j, k;
  unsigned long long sum;
  for(i = 0; i < r1; i++) {
    product[i] = (unsigned long long*)malloc(sizeof(unsigned long long) * c2);
    for (j = 0; j < c2; j++) {
      sum = 0;
      for(k = 0; k < c1; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      product[i][j] = sum;
    }
  }
  return product;
}

unsigned long long** pow_matrix(unsigned long long** matrix, int size, unsigned long long b) {
  if (b == 1) return matrix;
  int m = b % 2;
  unsigned long long hb = b >> 1;
  unsigned long long** p = pow_matrix(matrix, size, hb);
  p = multiply_matrix(p, size, size, p, size, size);
  if (m == 1) p = multiply_matrix(p, size, size, matrix, size, size);
  return p;
}

// 矩阵幂次实现
/*
1 0
1 1
*/
unsigned long long solve_by_matrix(unsigned long long n) {
  n--;
  unsigned long long** matrix = (unsigned long long**)malloc(sizeof(unsigned long long*) * 2);
  matrix[0] = (unsigned long long*)malloc(sizeof(unsigned long long) * 2);
  matrix[1] = (unsigned long long*)malloc(sizeof(unsigned long long) * 2);
  matrix[0][0] = 0;
  matrix[0][1] = 1;
  matrix[1][0] = 1;
  matrix[1][1] = 1;
  unsigned long long** p = pow_matrix(matrix, 2, n);
  unsigned long long ans = p[1][1];
  free(matrix[0]);
  free(matrix[1]);
  free(matrix);
  free(p[0]);
  free(p[1]);
  free(p);
  return ans;
}

// 解析式实现

int main() {
  unsigned long long n;
  clock_t start, finish;
  unsigned long long ans;
  
  n = 40;
  printf("计算斐波那契数列第%lld项的值:\n", n);
  
  start = clock();
  ans = solve_by_recur(n);
  finish = clock();
  printf("递归实现的结果为:%lld, 耗时%lld毫秒\n", ans, (finish - start));

  start = clock();
  ans = solve_by_dp(n);
  finish = clock();
  printf("动态规划实现的结果为:%lld, 耗时%lld毫秒\n", ans, (finish - start));

  start = clock();
  ans = solve_by_matrix(n);
  finish = clock();
  printf("矩阵幂次实现的结果为:%lld, 耗时%lld毫秒\n", ans, (finish - start));


  n = 1E8;
  printf("计算斐波那契数列第%lld项的值:\n", n);

  start = clock();
  ans = solve_by_dp(n);
  finish = clock();
  printf("动态规划实现的结果为:%lld, 耗时%lld毫秒\n", ans, (finish - start));

  start = clock();
  ans = solve_by_matrix(n);
  finish = clock();
  printf("矩阵幂次实现的结果为:%lld, 耗时%lld毫秒\n", ans, (finish - start));


  n = 1E9 * 1E9;
  printf("计算斐波那契数列第%lld项的值:\n", n);

  start = clock();
  ans = solve_by_matrix(n);
  finish = clock();
  printf("矩阵幂次实现的结果为:%lld, 耗时%lld毫秒\n", ans, (finish - start));

  return 0;
}