/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-25 14:16:04
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-25 14:16:44
 */
#include "person.h"

int main() {
  Person person;
  person.name = "陈柄宏";
  person.age = 29;
  sayHello(person);
  return 0;
}