/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-25 13:46:03
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-26 11:38:16
 */
#include <stdio.h>
#include "big_number.h"

BigNumber bigNumber1, bigNumber2;

int main() {
  setValueFromInt(&bigNumber1, 1);
  setValueFromInt(&bigNumber2, 2);
  
  print(bigNumber1);
  printf("\n");
  print(bigNumber2);
  printf("\n");

  BigNumber number1, number2, result;
  int compareFlag;

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
  setValueFromString(&number2, "5");
  twoElementOperate(number1, number2, '*');

  setValueFromString(&number1, "2");
  setValueFromString(&number2, "3");
  twoElementOperate(number1, number2, '*');

  setValueFromString(&number1, "12");
  setValueFromString(&number2, "13");
  twoElementOperate(number1, number2, '*');
  
  setValueFromString(&number1, "19");
  setValueFromString(&number2, "13");
  twoElementOperate(number1, number2, '+');

  setValueFromInt(&number1, 1234);
  setValueFromInt(&number2, 999);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 7);
  setValueFromInt(&number2, 1);
  twoElementOperate(number1, number2, '-');

  setValueFromInt(&number1, 4508543);
  setValueFromInt(&number2, 4508543 - 3);
  twoElementOperate(number1, number2, '-');

  printf("%d\n", isEven(number1));
  printf("%d\n", isEven(number2));

  setValueFromInt(&number1, 1024);
  print(number1);
  printf(" / 2 = ");
  result = divide2(number1);
  print(result);
  printf("\n");

  setValueFromInt(&number1, 1);
  print(number1);
  printf(" / 2 = ");
  result = divide2(number1);
  print(result);
  printf("\n");

  setValueFromInt(&number1, 3);
  print(number1);
  printf(" / 2 = ");
  result = divide2(number1);
  print(result);
  printf("\n");

  setValueFromString(&number1, "33333333333333333333333333333333333333333333333333333333333333333333");
  print(number1);
  printf(" / 2 = ");
  result = divide2(number1);
  print(result);
  printf("\n");

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

  printf("number1 = %s, number2 = %s", bigNumberToString(number1), bigNumberToString(number2));

  return 0;
}
