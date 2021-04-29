/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-28 09:22:49
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-28 09:47:40
 */
#include <stdio.h>

void insertion_sort(int numbers[], int n) {
  int i, j, k, tmp;
  for(i = 1; i < n; i++) {
    tmp = numbers[i];
    
    // 在数组已排好的头部 查找 比当前数字小的位置
    // TODO 如果数组过长 可以用二分法优化
    j = i - 1;
    while(j >= 0) {
      if (numbers[j] < tmp) break;
      j--;
    }
    j++;
    
    // 插入
    for(k = i; k > j; k--) {
      numbers[k] = numbers[k - 1];
    }
    numbers[j] = tmp;
  }
}

int main() {
  int n = 10;
  int numbers[] = {4, 1, 9, 5, 0, 6, 2, 8, 7, 3};
  insertion_sort(numbers, n);
  int i;
  for(i = 0; i < n; i++) printf("%d ", numbers[i]);
  return 0;
}