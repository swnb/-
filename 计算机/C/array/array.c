/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-23 15:57:31
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-23 16:02:09
 */
#include<stdio.h>
#include <stdlib.h>

int** get() {
  int** numbers = (int**)malloc(sizeof(int*) * 2);
  numbers[0] = (int*)malloc(sizeof(int)*2);
  numbers[1] = (int*)malloc(sizeof(int)*2);
  numbers[0][0] = 1;
  numbers[0][1] = 0;
  numbers[1][0] = 1;
  numbers[1][1] = 1;
  return numbers;
}

int main() {
  int** numbers = get();
  printf("%d\n", numbers[0][0]);
  printf("%d\n", numbers[0][1]);
  printf("%d\n", numbers[1][0]);
  printf("%d\n", numbers[1][1]);
  free(numbers[0]);
  free(numbers[1]);
  free(numbers);
  return 0;
}
