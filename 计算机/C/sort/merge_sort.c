/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-23 14:18:35
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-23 14:52:45
 */
#include <stdio.h>

void print(int numbers[], int start, int end) {
  int i;
  for(i = start; i <= end; i++) printf("%d ", numbers[i]);
  printf("\n");
}

void merge_sort(int numbers[], int start, int end) {
  if (start + 1 >= end) return;
  int temp[end - start];
  int mid = (start + end) / 2;

  if (start + 1 < mid) merge_sort(numbers, start, mid);
  if (mid + 1 < end) merge_sort(numbers, mid, end);

  int i = start, j = mid, k = 0;
  while(i < mid && j < end) {
    if (numbers[i] < numbers[j]) temp[k++] = numbers[i++];
    else temp[k++] = numbers[j++];
  }
  while(i < mid) {
    temp[k++] = numbers[i++];
  }
  while(j < end) {
    temp[k++] = numbers[j++];
  }
  for(k = start; k < end; k++) numbers[k] = temp[k - start];
}

int main() {
  int n = 10;
  int numbers[] = {4, 1, 9, 5, 0, 6, 2, 8, 7, 3};
  merge_sort(numbers, 0, n);
  print(numbers, 0, n - 1);
  return 0;
}