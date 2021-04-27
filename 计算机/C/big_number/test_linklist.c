/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-26 15:38:05
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-27 16:42:16
 */
#include <stdio.h>
#include "big_number_linklist.h"

BigNumber number1, number2, result;

void twoElementOperate(BigNumber number1, BigNumber number2, char operator) {
  switch(operator) {
    case '+':
    result = add(number1, number2);
    break;
    case '-':
    result = sub(number1, number2);
    break;
    case '*':
    result = multiply(number1, number2);
    break;
    default:
    break;
  }
  print(number1);
  printf(" %c ", operator);
  print(number2);
  printf(" = ");
  print(result);
  printf("\n");
}

void testSetValue() {
  setValueFromInt(&number1, 1);
  setValueFromInt(&number2, 2);
  
  print(number1);
  printf("\n");
  print(number2);
  printf("\n");
}

void testAdd() {
  setValueFromString(&number1, "0");
  setValueFromString(&number2, "0");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "0");
  setValueFromString(&number2, "1");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "1");
  setValueFromString(&number2, "0");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "1");
  setValueFromString(&number2, "1");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "1");
  setValueFromString(&number2, "9");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "1");
  setValueFromString(&number2, "99");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "0");
  setValueFromString(&number2, "123");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "123");
  setValueFromString(&number2, "0");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "19");
  setValueFromString(&number2, "13");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "1");
  setValueFromString(&number2, "9999");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "9999");
  setValueFromString(&number2, "1");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "9999");
  setValueFromString(&number2, "9999");
  twoElementOperate(number1, number2, '+');

  setValueFromString(&number1, "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
  setValueFromString(&number2, "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
  twoElementOperate(number1, number2, '+');

  BigNumber one;
  setValueFromInt(&one, 1);
  BigNumber number;
  setValueFromInt(&number, 0);
  int i = 0;
  while(i++ < 10) {
    print(number);
    printf("\n");
    number = add(number, one);
  }
}

void testSub() {
  setValueFromInt(&number1, 0);
  setValueFromInt(&number2, 0);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 1);
  setValueFromInt(&number2, 0);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 1234);
  setValueFromInt(&number2, 0);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 1);
  setValueFromInt(&number2, 1);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 7);
  setValueFromInt(&number2, 1);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 1234);
  setValueFromInt(&number2, 1);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 99);
  setValueFromInt(&number2, 1);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 999);
  setValueFromInt(&number2, 1);
  twoElementOperate(number1, number2, '-');
  
  setValueFromInt(&number1, 1234);
  setValueFromInt(&number2, 999);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 999);
  setValueFromInt(&number2, 999);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 4508543);
  setValueFromInt(&number2, 4508543 - 3);
  twoElementOperate(number1, number2, '-');

  setValueFromString(&number1, "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
  setValueFromString(&number2, "29999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
  twoElementOperate(number1, number2, '-');

  setValueFromString(&number1, "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
  setValueFromString(&number2, "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
  twoElementOperate(number1, number2, '-');
}

void testMultiply() {
  setValueFromInt(&number1, 0);
  setValueFromInt(&number2, 0);
  twoElementOperate(number1, number2, '*');
  
  setValueFromInt(&number1, 0);
  setValueFromInt(&number2, 1);
  twoElementOperate(number1, number2, '*');

  setValueFromInt(&number1, 1);
  setValueFromInt(&number2, 0);
  twoElementOperate(number1, number2, '*');

  setValueFromInt(&number1, 0);
  setValueFromInt(&number2, 999);
  twoElementOperate(number1, number2, '*');

  setValueFromInt(&number1, 999);
  setValueFromInt(&number2, 0);
  twoElementOperate(number1, number2, '*');
 
  setValueFromInt(&number1, 1);
  setValueFromInt(&number2, 1);
  twoElementOperate(number1, number2, '*');
   
  setValueFromInt(&number1, 1);
  setValueFromInt(&number2, 999);
  twoElementOperate(number1, number2, '*');

  setValueFromInt(&number1, 999);
  setValueFromInt(&number2, 1);
  twoElementOperate(number1, number2, '*');

  setValueFromString(&number1, "2");
  setValueFromString(&number2, "5");
  twoElementOperate(number1, number2, '*');

  setValueFromInt(&number1, 11);
  setValueFromInt(&number2, 11);
  twoElementOperate(number1, number2, '*');

  setValueFromInt(&number1, 1234567);
  setValueFromInt(&number2, 7654321);
  twoElementOperate(number1, number2, '*');

  setValueFromInt(&number1, 999999999);
  setValueFromInt(&number2, 999999999);
  twoElementOperate(number1, number2, '*');

  setValueFromString(&number1, "1212312321312313123123123131313131312232432432121231232131231312312312313131313131223243243212123123213123131231231231313131313122324324321212312321312313123123123131313131312232432432");
  setValueFromString(&number2, "156859679486489543753493984358431568596794864895437534939843584315685967948648954375349398435843156859679486489543753493984358431568596794864895437534939843584315685967948648954375349398435843");
  twoElementOperate(number1, number2, '*');

  setValueFromString(&number1, "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
  setValueFromString(&number2, "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
  twoElementOperate(number1, number2, '*');

  setValueFromString(&number1, "2");
  setValueFromString(&number2, "3");
  twoElementOperate(number1, number2, '*');

  setValueFromString(&number1, "12");
  setValueFromString(&number2, "13");
  twoElementOperate(number1, number2, '*');
}

void testDivide2() {
  setValueFromInt(&number1, 1024);
  print(number1);
  printf(" / 2 = ");
  result = divide2(number1);
  print(result);
  printf("\n");
  printAllInfo(result);

  setValueFromInt(&number1, 1999);
  print(number1);
  printf(" / 2 = ");
  result = divide2(number1);
  print(result);
  printf("\n");
  printAllInfo(result);

  setValueFromInt(&number1, 1);
  print(number1);
  printf(" / 2 = ");
  result = divide2(number1);
  print(result);
  printf("\n");
  printAllInfo(result);

  setValueFromInt(&number1, 3);
  print(number1);
  printf(" / 2 = ");
  result = divide2(number1);
  print(result);
  printf("\n");
  printAllInfo(result);

  setValueFromString(&number1, "33333333333333333333333333333333333333333333333333333333333333333333");
  print(number1);
  printf(" / 2 = ");
  result = divide2(number1);
  print(result);
  printf("\n");
  printAllInfo(result);
}

void testIsEven() {
  setValueFromInt(&number1, 1);
  setValueFromInt(&number2, 9998);
  printf("number1 = %s isEven = %d, number2 = %s isEven = %d", bigNumberToString(number1), isEven(number1), bigNumberToString(number2), isEven(number2));
}

void testCompare() {
  int compareFlag;

  setValueFromInt(&number1, 4508543);
  setValueFromInt(&number2, 4508543 - 3);
  compareFlag = Compare(number1, number2);
  print(number1);
  printf(compareFlag == 0 ? " == " : (compareFlag == -1 ? " < " : " > "));
  print(number2);
  printf("\n");

  setValueFromInt(&number1, 4508543);
  setValueFromInt(&number2, 4508543);
  compareFlag = Compare(number1, number2);
  print(number1);
  printf(compareFlag == 0 ? " == " : (compareFlag == -1 ? " < " : " > "));
  print(number2);
  printf("\n");

  setValueFromInt(&number1, 4508543);
  setValueFromInt(&number2, 4508543 + 3);
  compareFlag = Compare(number1, number2);
  print(number1);
  printf(compareFlag == 0 ? " == " : (compareFlag == -1 ? " < " : " > "));
  print(number2);
  printf("\n");
}

void testToString() {
  setValueFromInt(&number1, 1);
  setValueFromInt(&number2, 9999);
  printf("number1 = %s, number2 = %s", bigNumberToString(number1), bigNumberToString(number2));
}

void testCopy() {
  BigNumber one;
  setValueFromInt(&one, 1);
  one = copyBigNumber(one);
  printAllInfo(one);
}

int main() {
  // testSetValue();
  // testAdd();
  // testSub();
  // testMultiply();
  testDivide2();
  // testIsEven();
  // testCompare();
  // testToString();
  // testCopy();

  return 0;
}
