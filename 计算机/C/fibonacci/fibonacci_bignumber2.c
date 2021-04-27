/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-23 14:55:52
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-27 16:48:36
 */
#include<stdio.h>
#include<stdlib.h>
#include "../big_number/big_number_linklist.h"
#include<time.h>

BigNumber bigNumber0, bigNumber1, bigNumber2;

void freeMatrix(BigNumber** matrix, int r, int c) {
  int i;
  for(i = 0; i < r; i++) {
    free(matrix[i]);
  }
  free(matrix);
}

// 递归实现
BigNumber solve_by_recur(BigNumber n) {
  BigNumber result;
  if (Compare(n, bigNumber2) != 1) return bigNumber1;
  return add(solve_by_recur(sub(n, bigNumber1)), solve_by_recur(sub(n, bigNumber2)));
}

// 动态规划
BigNumber solve_by_dp(BigNumber n) {
  if (Compare(n, bigNumber2) != 1) return bigNumber1;
  BigNumber number1, number2;
  setValueFromInt(&number1, 1);
  setValueFromInt(&number2, 1);
  while(Compare(n, bigNumber2) == 1) {
    number2 = add(number2, number1);
    number1 = sub(number2, number1);
    n = sub(n, bigNumber1);
  }
  return number2;
}

void print_matrix(BigNumber** matrix, int r, int c) {
  int i, j;
  char* str;
  for(i = 0; i < r; i++) {
    for (j = 0; j < c; j++) {
      str = bigNumberToString(matrix[i][j]);
      printf("%s ", str);
      free(str);
    }
    printf("\n");
  }
}

int runTimes = 0;

BigNumber** multiply_matrix(BigNumber** matrix1, int r1, int c1, BigNumber** matrix2, int r2, int c2) {
  if (c1 != r2) return NULL;
  BigNumber** product = (BigNumber**)malloc(sizeof(BigNumber*) * r1);
  int i, j, k;
  BigNumber sum;
  for(i = 0; i < r1; i++) {
    product[i] = (BigNumber*)malloc(sizeof(BigNumber) * c2);
    for (j = 0; j < c2; j++) {
      setValueFromInt(&sum, 0);
      for(k = 0; k < c1; k++) {
        sum = add(sum, multiply(matrix1[i][k], matrix2[k][j]));
      }
      product[i][j] = sum;
    }
  }
  return product;
}

BigNumber** copyBigNumberMatrix(BigNumber** matrix, int r, int c) {
  BigNumber** result = (BigNumber**)malloc(sizeof(BigNumber*) * r);
  int i, j;
  for(i = 0; i < r; i++) {
    result[i] = (BigNumber*)malloc(sizeof(BigNumber) * c);
    for (j = 0; j < c; j++) {
      result[i][j] = matrix[i][j];
    }
  }
  return result;
}

BigNumber** pow_matrix(BigNumber** matrix, int size, BigNumber b) {
  if (Compare(b, bigNumber1) == 0) return matrix;
  BigNumber **p;
  BigNumber hb = divide2(b);
  p = pow_matrix(matrix, size, hb);
  p = multiply_matrix(p, size, size, p, size, size);
  if (!isEven(b)) {
    p = multiply_matrix(p, size, size, matrix, size, size);
  }
  return p;
}

// 矩阵幂次实现
/*
1 0
1 1
*/
BigNumber solve_by_matrix(BigNumber n) {
  n = sub(n, bigNumber1);
  BigNumber** matrix = (BigNumber**)malloc(sizeof(BigNumber*) * 2);
  matrix[0] = (BigNumber*)malloc(sizeof(BigNumber) * 2);
  matrix[1] = (BigNumber*)malloc(sizeof(BigNumber) * 2);
  setValueFromInt(&matrix[0][0], 0);
  setValueFromInt(&matrix[0][1], 1);
  setValueFromInt(&matrix[1][0], 1);
  setValueFromInt(&matrix[1][1], 1);
  BigNumber** p = pow_matrix(matrix, 2, n);
  BigNumber ans = copyBigNumber(p[1][1]);
  freeMatrix(matrix, 2, 2);
  freeMatrix(p, 2, 2);
  return ans;
}

// TODO 解析式实现


void init() {
  setValueFromInt(&bigNumber0, 0);
  setValueFromInt(&bigNumber1, 1);
  setValueFromInt(&bigNumber2, 2);
}

int main() {
  init();

  BigNumber n;
  clock_t start, finish;
  BigNumber ans;
  
  setValueFromInt(&n, 7);
  printf("计算斐波那契数列第%s项的值:\n", bigNumberToString(n));
  
  start = clock();
  ans = solve_by_recur(n);
  finish = clock();
  printf("递归实现的结果为:%s, 耗时%d毫秒\n", bigNumberToString(ans), (finish - start));

  start = clock();
  ans = solve_by_dp(n);
  finish = clock();
  printf("动态规划实现的结果为:%s, 耗时%d毫秒\n", bigNumberToString(ans), (finish - start));

  start = clock();
  ans = solve_by_matrix(n);
  finish = clock();
  printf("矩阵幂次实现的结果为:%s, 耗时%d毫秒\n", bigNumberToString(ans), (finish - start));

  setValueFromInt(&n, 2E3);
  printf("计算斐波那契数列第%s项的值:\n", bigNumberToString(n));

  start = clock();
  ans = solve_by_dp(n);
  finish = clock();
  printf("动态规划实现的结果为:%s, 耗时%d毫秒\n", bigNumberToString(ans), (finish - start));

  start = clock();
  ans = solve_by_matrix(n);
  finish = clock();
  printf("矩阵幂次实现的结果为:%s, 耗时%d毫秒\n", bigNumberToString(ans), (finish - start));


  setValueFromLongLong(&n, 1000);
  printf("计算斐波那契数列第%s项的值:\n", bigNumberToString(n));

  start = clock();
  ans = solve_by_matrix(n);
  finish = clock();
  printf("矩阵幂次实现的结果为:%s, 耗时%d毫秒\n", bigNumberToString(ans), (finish - start));

  setValueFromLongLong(&n, 999);
  printf("计算斐波那契数列第%s项的值:\n", bigNumberToString(n));

  start = clock();
  ans = solve_by_matrix(n);
  finish = clock();
  printf("矩阵幂次实现的结果为:%s, 耗时%d毫秒\n", bigNumberToString(ans), (finish - start));

  setValueFromInt(&n, 1E4);
  printf("计算斐波那契数列第%s项的值:\n", bigNumberToString(n));

  start = clock();
  ans = solve_by_dp(n);
  finish = clock();
  printf("动态规划实现的结果为:%s, 耗时%d毫秒\n", bigNumberToString(ans), (finish - start));

  start = clock();
  ans = solve_by_matrix(n);
  finish = clock();
  printf("矩阵幂次实现的结果为:%s, 耗时%d毫秒\n", bigNumberToString(ans), (finish - start));


  return 0;
}