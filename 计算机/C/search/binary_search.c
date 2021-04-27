/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-22 09:27:55
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-22 09:42:03
 */
#include <stdio.h>

int binary_search(int numbers[], int n, int target) {
  int low = 0, high = n;
  int mid;
  while(low <= high) {
    mid = (low + high) / 2;
    if (numbers[mid] == target) return mid;
    if (numbers[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

int main() {
  int n = 10;
  int numbers[n];
  int i;
  for(i = 0; i < n; i++) numbers[i] = i;
  int target;
  scanf("%d", &target);
  int index = binary_search(numbers, n, target);
  printf("the numbers is \n");
  for(i = 0; i < n; i++) printf("%d ", numbers[i]);
  printf("\n");
  printf("the index of %d is %d\n", target, index);
  return 0;
}