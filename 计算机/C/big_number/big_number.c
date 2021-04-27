/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-25 09:42:53
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-26 17:26:15
 */
#include <stdio.h>
#include <stdlib.h>
#include "big_number.h"

void _clearHeadZeros(BigNumber* number) {
  int firstNoZeroIndex = 0;
  while(firstNoZeroIndex < number->length) {
    if (number->value[firstNoZeroIndex] != 0) break;
    firstNoZeroIndex++;
  }
  if (firstNoZeroIndex == 0) return;
  int index;
  for(index = 0; index < number->length - firstNoZeroIndex; index++) number->value[index] = number->value[index + firstNoZeroIndex];
  number->length -= firstNoZeroIndex;
  if (number->length == 0) number->length = 1;
}


void print(BigNumber number) {
  int i;
  for(i = 0; i < number.length; i++) printf("%d", number.value[i]);  
}
char* bigNumberToString(BigNumber number) {
  int i = 0;
  char* str = (char*)malloc(sizeof(char) * (number.length + 1));
  while(i < number.length) {
    str[i] = number.value[i] + '0';
    i++;
  }
  str[i] = '\0';
  return str;
}
void setValueFromInt(BigNumber* number, unsigned int integer) {
  int i = 0;
  do {
    number->value[i] = integer % 10;
    integer /= 10;
    i++;
  } while(integer > 0);
  number->length = i;
  
  int temp;
  for(i = 0; i < number->length / 2; i++) {
    temp = number->value[i];
    number->value[i] = number->value[number->length - i - 1];
    number->value[number->length - i - 1] = temp;
  }
}
void setValueFromLong(BigNumber* number, unsigned long integer) {
  int i = 0;
  while(integer > 0) {
    number->value[i] = integer % 10;
    integer /= 10;
    i++;
  }
  number->length = i;
  
  int temp;
  for(i = 0; i < number->length / 2; i++) {
    temp = number->value[i];
    number->value[i] = number->value[number->length - i - 1];
    number->value[number->length - i - 1] = temp;
  }
}
void setValueFromLongLong(BigNumber* number, unsigned long long integer) {
  int i = 0;
  while(integer > 0) {
    number->value[i] = integer % 10;
    integer /= 10;
    i++;
  }
  number->length = i;
  
  int temp;
  for(i = 0; i < number->length / 2; i++) {
    temp = number->value[i];
    number->value[i] = number->value[number->length - i - 1];
    number->value[number->length - i - 1] = temp;
  }
}
void setValueFromString(BigNumber* number, char str[]) {
  int i = 0;
  while(str[i] != '\0') {
    number->value[i] = str[i] - '0';
    i++;
  }
  number->length = i;
}
BigNumber add(BigNumber number1, BigNumber number2) {
  BigNumber result;
  int maxLength = number1.length > number2.length ? number1.length : number2.length;
  result.length = maxLength + 1;
  
  int index = maxLength;
  int index1 = number1.length - 1;
  int index2 = number2.length - 1;
  while (index1 >= 0 && index2 >= 0) {
    result.value[index--] = number1.value[index1--] + number2.value[index2--];
  }
  while (index1 >= 0) {
    result.value[index--] = number1.value[index1--];
  }
  while (index2 >= 0) {
    result.value[index--] = number2.value[index2--];
  }
  result.value[0] = 0;

  index = maxLength;
  while(index >= 0) {
    if (result.value[index] >= 10) {
      result.value[index - 1] += result.value[index] / 10;
      result.value[index] = result.value[index] % 10;
    }
    index--;
  }
  _clearHeadZeros(&result);
  return result;
}
BigNumber sub(BigNumber number1, BigNumber number2) {
  BigNumber result;
  int maxLength = number1.length > number2.length ? number1.length : number2.length;
  result.length = maxLength;

  int index = maxLength - 1;
  int index1 = number1.length - 1;
  int index2 = number2.length - 1;
  while (index1 >= 0 && index2 >= 0) {
    result.value[index--] = number1.value[index1--] - number2.value[index2--];
  }
  while (index1 >= 0) {
    result.value[index--] = number1.value[index1--];
  }
  while (index2 >= 0) {
    result.value[index--] = number2.value[index2--];
  }
  index = maxLength;
  while(index >= 0) {
    if (result.value[index] < 0) {
      result.value[index - 1]--;
      result.value[index] += 10;
    }
    index--;
  }
  _clearHeadZeros(&result);
  return result;
}
BigNumber multiply(BigNumber number1, BigNumber number2) {
  BigNumber result;
  result.length = number1.length + number2.length;
  int k;
  for(k = 0; k < result.length; k++) {
    result.value[k] = 0;
  }
  int i = number1.length - 1, j;
  while(i >= 0) {
    j = number2.length - 1;
    while(j  >= 0) {
      result.value[i + j + 1] += number1.value[i] * number2.value[j];
      j--;
    }
    i--;
  }
  k = result.length - 1;
  while(k >= 0) {
    if (result.value[k] >= 10) {
      result.value[k - 1] += result.value[k] / 10;
      result.value[k] = result.value[k] % 10;
    }
    k--;
  }
  _clearHeadZeros(&result);
  return result;
}
BigNumber divide2(BigNumber number) {
  BigNumber result;
  result.length = number.length;
  int i;
  int m = 0;
  for(i = 0; i < number.length; i++) {
    result.value[i] = (10 * m + number.value[i]) / 2;
    m = number.value[i] % 2;
  }
  _clearHeadZeros(&result);
  return result;
}
bool isEven(BigNumber number) {
  return number.value[number.length - 1] % 2 == 0;
}
int Compare(BigNumber number1, BigNumber number2) {
  if (number1.length < number2.length) return -1;
  if (number1.length > number2.length) return 1;
  int i = 0;
  while(i < number1.length) {
    if (number1.value[i] < number2.value[i]) return -1;
    if (number1.value[i] > number2.value[i]) return 1;
    i++;
  }
  return 0;
}
BigNumber copyBigNumber(BigNumber number) {
  BigNumber result;
  result.length = number.length;
  int i = 0;
  while(i < number.length) {
    result.value[i] = number.value[i];
    i++;
  }
  return result;
}
