/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-25 13:45:36
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-26 15:53:21
 */
#define MAX_LENGTH 1000

typedef enum {
  false = 0,
  true = 1,
} bool;

typedef struct {
  int value[MAX_LENGTH];
  int length;
} BigNumber;

void print(BigNumber number);
char* bigNumberToString(BigNumber number);
void setValueFromInt(BigNumber* number, unsigned int integer);
void setValueFromLong(BigNumber* number, unsigned long integer);
void setValueFromLongLong(BigNumber* number, unsigned long long integer);
void setValueFromString(BigNumber* number, char str[]);
BigNumber add(BigNumber number1, BigNumber number2);
BigNumber sub(BigNumber number1, BigNumber number2);
BigNumber multiply(BigNumber number1, BigNumber number2);
BigNumber divide(BigNumber number1, BigNumber number2);
BigNumber divide2(BigNumber number);
bool isEven(BigNumber number);
int Compare(BigNumber number1, BigNumber number2);
BigNumber copyBigNumber(BigNumber number);