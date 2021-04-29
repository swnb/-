/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-28 13:46:45
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-28 13:59:51
 */
#include<stdio.h>
#include <stdlib.h>

#define N 100

int main() {
  FILE *fp;
  if ((fp = fopen("code1.c", "rt")) == NULL) {
    printf("打开文件失败");
    exit(0);
  }

  char str[N + 1];
  while( fgets(str, N, fp) != NULL ) {
      printf("%s", str);
  }

  fclose(fp);
  return 0;
}