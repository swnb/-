/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-25 13:45:36
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-27 16:28:07
 */
typedef struct Node *PtrToNode;
typedef PtrToNode List;
typedef PtrToNode Position;

struct Node {
  int value;
  Position toHigh;
  Position toLow;
};

typedef enum {
  false = 0,
  true = 1,
} bool;

typedef struct {
  List high;
  List low;
  int length;
} BigNumber;

void print(BigNumber number);
void printAllInfo(BigNumber number);
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