/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-26 14:31:44
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-26 14:36:40
 */
#include <stdio.h>
#include <stdlib.h>

char* sayHello() {
  return "hello";
}

char* sayHi() {
  return "hi";
}

char* sayBye() {
  char* word = (char*)malloc(sizeof(char) * 4);
  word[0] = 'b';
  word[1] = 'y';
  word[2] = 'e';
  word[3] = '\0';
  return word;
}

char* sayYes() {
  char* word = (char*)malloc(sizeof(char) * 4);
  word[0] = 'y';
  word[1] = 'e';
  word[2] = 's';
  word[3] = '\0';
  return word;
}

int main() {
  char* word = sayHello();
  printf("%s\n", word);
  word = sayHi();
  printf("%s\n", word);
  word = sayBye();
  printf("%s\n", word);
  word = sayYes();
  printf("%s\n", word);
  return 0;
}