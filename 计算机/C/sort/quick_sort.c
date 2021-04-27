/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-22 14:37:02
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-22 15:43:06
 */
#include <stdio.h>

void print(int numbers[], int start, int end) {
  int i;
  for(i = start; i <= end; i++) printf("%d ", numbers[i]);
  printf("\n");
}

void swap(int numbers[], int i, int j) {
  int temp = numbers[i];
  numbers[i] = numbers[j];
  numbers[j] = temp;
}

int divide(int numbers[], int start, int end) {
  // TODO 可以使用随机选取优化下选取划分点 避免退化成O(n^2)
  int mid = (start + end) / 2;
  int small = start;
  swap(numbers, mid, end);
  for (; start < end; start++) {
    if (numbers[start] < numbers[end]) {
      swap(numbers, small, start);
      small++;
    }
  }
  swap(numbers, small, end);
  return small;
}

void quick_sort(int numbers[], int start, int end) {
  if (start >= end) return;
  int index = divide(numbers, start, end);
  if (start < index - 1) quick_sort(numbers, start, index - 1);
  if (index + 1 < end) quick_sort(numbers, index + 1, end);
}

int main() {
  int n = 10;
  int numbers[] = {4, 1, 9, 5, 0, 6, 2, 8, 7, 3};
  quick_sort(numbers, 0, n - 1);
  print(numbers, 0, n - 1);
  return 0;
}