/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-29 09:24:24
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-29 09:26:15
 */
#include <stdio.h>

int main() {
  char* str = "1 abcd";
  printf("<%c> <%d>\n", str[1], str[1]);
  printf("<%c> <%d>\n", ' ', ' ');
  return 0;
}