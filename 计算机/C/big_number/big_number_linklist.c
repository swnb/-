/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-26 15:29:42
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-27 16:45:28
 */
#include <stdio.h>
#include <stdlib.h>
#include "big_number_linklist.h"

void _clearHeadZeros(BigNumber* number) {
  Position p = number->high;
  while(p) {
    if (p->value != 0) break;
    if (number->length == 1) break;
    p = p->toLow;
    number->length--;
  }
  number->high = p;
  p->toHigh = NULL;
}

bool _is0(BigNumber number) {
  return number.length == 1 && number.high->value == 0;
}

bool _is1(BigNumber number) {
  return number.length == 1 && number.high->value == 1;
}

Position createNode(int value) {
  Position node = (Position)malloc(sizeof(struct Node));
  node->value = value;
  node->toLow = NULL;
  node->toHigh = NULL;
  return node;
}

void print(BigNumber number) {
  Position p = number.high;
  while(p != NULL) {
    printf("%d", p->value);
    p = p->toLow;
  }
}
void printAllInfo(BigNumber number) {
  printf("printAllInfo\n");
  printf("length:%d\n", number.length);

  Position p;

  printf("from high to low:");
  p = number.high;
  while(p != NULL) {
    printf("%d", p->value);
    p = p->toLow;
  }
  printf("\n");

  printf("from low to high:");
  p = number.low;
  while(p != NULL) {
    printf("%d", p->value);
    p = p->toHigh;
  }
  printf("\n");
}
char* bigNumberToString(BigNumber number) {
  char* str = (char*)malloc(sizeof(char) * (number.length + 1));
  Position p = number.high;
  int i = 0;
  while(p != NULL) {
    str[i++] = p->value + '0';
    p = p->toLow;
  }
  str[i] = '\0';
  return str;
}
void setValueFromInt(BigNumber* number, unsigned int integer) {
  Position p = createNode(0);
  number->low = p;
  number->length = 1;
  do {
    p->value = integer % 10;
    integer /= 10;
    if (integer <= 0) break;
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
    number->length++;
  } while(integer > 0);
  number->high = p;
}
void setValueFromLong(BigNumber* number, unsigned long integer) {
 Position p = createNode(0);
  number->low = p;
  number->length = 1;
  do {
    p->value = integer % 10;
    integer /= 10;
    if (integer <= 0) break;
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
    number->length++;
  } while(integer > 0);
  number->high = p;
}
void setValueFromLongLong(BigNumber* number, unsigned long long integer) {
  Position p = createNode(0);
  number->low = p;
  number->length = 1;
  do {
    p->value = integer % 10;
    integer /= 10;
    if (integer <= 0) break;
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
    number->length++;
  } while(integer > 0);
  number->high = p;
}
void setValueFromString(BigNumber* number, char str[]) {
  Position p = createNode(0);
  number->high = p;
  int i = 0;
  while(str[i] != '\0') {
    p->value = str[i] - '0';
    i++;
    if (str[i] == '\0') break;
    p->toLow = createNode(0);
    p->toLow->toHigh = p;
    p = p->toLow;
  };
  number->length = i;
  number->low = p;
}
BigNumber add(BigNumber number1, BigNumber number2) {
  BigNumber result;
  if (_is0(number1)) return copyBigNumber(number2);
  if (_is0(number2)) return copyBigNumber(number1);
  Position p = createNode(0);
  result.low = p;
  result.length = 0;
  Position p1 = number1.low;
  Position p2 = number2.low;
  while (p1 && p2) {
    p->value = p1->value + p2->value;
    p1 = p1->toHigh;
    p2 = p2->toHigh;
    if (p1 == NULL || p2 == NULL) break;
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
  }
  if (p1 || p2) {
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
  }
  while (p1) {
    p->value = p1->value;
    p1 = p1->toHigh;
    if (p1 == NULL) break;
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
  }
  while (p2) {
    p->value = p2->value;
    p2 = p2->toHigh;
    if (p2 == NULL) break;
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
  }
  result.length = 0;
  p = result.low;
  while(p) {
    // printf("p->value = %d\n", p->value);
    if (p->value >= 10) {
      if (p->toHigh == NULL) {
        p->toHigh = createNode(0);
        p->toHigh->toLow = p;
      }
      p->toHigh->value += p->value / 10;
      p->value %= 10;
    }
    result.length++;
    if (p->toHigh == NULL) result.high = p;
    p = p->toHigh;
  }
  return result;
}
BigNumber sub(BigNumber number1, BigNumber number2) {
  BigNumber result;
  if (_is0(number2)) return copyBigNumber(number1);
  Position p = createNode(0);
  result.low = p;
  Position p1 = number1.low;
  Position p2 = number2.low;
  while (p1 && p2) {
    p->value = p1->value - p2->value;
    p1 = p1->toHigh;
    p2 = p2->toHigh;
    if (p1 == NULL || p2 == NULL) break;
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
  }
  if (p1 || p2) {
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
  }
  while (p1) {
    p->value = p1->value;
    p1 = p1->toHigh;
    if (p1 == NULL) break;
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
  }
  while (p2) {
    p->value = p2->value;
    p2 = p2->toHigh;
    if (p2 == NULL) break;
    p->toHigh = createNode(0);
    p->toHigh->toLow = p;
    p = p->toHigh;
  }
  result.length = 0;
  p = result.low;
  while(p) {
    if (p->value < 0) {
      p->value += 10;
      p->toHigh->value--;
    }
    result.length++;
    if (p->toHigh == NULL) result.high = p;
    p = p->toHigh;
  }
  _clearHeadZeros(&result);
  return result;
}
BigNumber multiply(BigNumber number1, BigNumber number2) {
  BigNumber result;
  if (_is0(number1) || _is0(number2)) {
    result.length = 1;
    result.high = createNode(0);
    result.low = result.high;
    result.high->value = 0;
    return result;
  }
  if (_is1(number1)) return copyBigNumber(number2);
  if (_is1(number2)) return copyBigNumber(number1);
  Position p = createNode(0);
  Position q;
  result.low = p;
  Position p1 = number1.low;
  Position p2;
  while(p1) {
    p2 = number2.low;
    q = p;
    while(p2) {
      q->value += p1->value * p2->value;
      p2 = p2->toHigh;
      if (p2 == NULL) break;
      if (q->toHigh == NULL) {
        q->toHigh = createNode(0);
        q->toHigh->toLow = q;
      }
      q = q->toHigh;
    }
    p1 = p1->toHigh;
    if (p1 == NULL) break;
    if (p->toHigh == NULL) {
      p->toHigh = createNode(0);
      p->toHigh->toLow = p;
    }
    p = p->toHigh;
  }

  result.length = 0;
  p = result.low;
  while(p) {
    if (p->value >= 10) {
      if (p->toHigh == NULL) {
        p->toHigh = createNode(0);
        p->toHigh->toLow = p;
      }
      p->toHigh->value += p->value / 10;
      p->value %= 10;
    }
    result.length++;
    if (p->toHigh == NULL) result.high = p;
    p = p->toHigh;
  }
  return result;
}
BigNumber divide(BigNumber number1, BigNumber number2) {
  BigNumber result;
  return result;
}
BigNumber divide2(BigNumber number) {
  BigNumber result;
  Position p = createNode(0);
  result.high = p;
  Position q = number.high;
  int m = 0;
  result.length = 0;
  while(q) {
    result.length++;
    p->value = (10 * m + q->value) / 2;
    m = q->value % 2;
    q = q->toLow;
    if (!q) {
      result.low = p;
      break;
    }
    p->toLow = createNode(0);
    p->toLow->toHigh = p;
    p = p->toLow;
  }
  _clearHeadZeros(&result);
  return result;
}
bool isEven(BigNumber number) {
  return number.low->value % 2 == 0;
}
int Compare(BigNumber number1, BigNumber number2) {
  if (number1.length < number2.length) return -1;
  if (number1.length > number2.length) return 1;
  Position p1 = number1.high;
  Position p2 = number2.high;
  while(p1 && p2) {
    if (p1->value < p2->value) return -1;
    if (p1->value > p2->value) return 1;
    p1 = p1->toLow;
    p2 = p2->toLow;
  }
  return 0;
}
BigNumber copyBigNumber(BigNumber number) {
  BigNumber result;
  result.length = number.length;
  Position p = createNode(0);
  result.high = p;
  Position q = number.high;
  while(q) {
    p->value = q->value;
    q = q->toLow;
    if (q == NULL) {
      result.low = p;
      break;
    }
    p->toLow = createNode(0);
    p->toLow->toHigh = p;
    p = p->toLow;
  }
  return result;
}