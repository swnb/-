/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-22 14:32:24
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-22 14:36:13
 */
#include <stdio.h>

void bubble_sort(int numbers[], int n) {
  int i, j;
  int temp;
  for(i=0;i<n;i++) {
    for(j=i+1;j<n;j++) {
      if (numbers[i] > numbers[j]) {
        temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
      }
    }
  }
}

int main() {
  int n = 10;
  int numbers[] = {4, 1, 9, 5, 0, 6, 2, 8, 7, 3};
  bubble_sort(numbers, n);
  int i;
  for(i = 0; i < n; i++) printf("%d ", numbers[i]);
  return 0;
}