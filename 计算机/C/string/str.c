/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-21 20:07:11
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-21 20:32:46
 */
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
  unsigned char str1 [2] = {0x66, 0x77};
  unsigned char* str2 = (char*)malloc(2 * sizeof(char));
  int i;
  for(i=0;i<2;i++) printf("%c", str1[i]);
  printf("\n");
  memcpy(str2, str1, strlen(str1) + 1);
  for(i=0;i<2;i++) printf("%c", str2[i]);
  // free(str1);  // no-heap object
  free(str2);
  return 0; 
}