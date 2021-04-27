/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-25 14:14:36
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-25 14:22:17
 */
#include "person.h"
#include <stdio.h>

void sayHello(Person person) {
  printf("Hello, my name is %s, I'm %d years old.\n",person.name, person.age);
}