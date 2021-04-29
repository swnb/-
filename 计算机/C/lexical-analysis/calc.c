/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-28 14:02:06
 * @lastNodeEditors: chenbh
 * @lastNodeEditTime: 2021-04-28 14:44:17
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Node *PtrToNode;
typedef PtrToNode Tree;
typedef struct List List;

struct List {
  char** value;
  int length;
};

struct Node {
  int value;
  char op;
  Tree left;
  Tree right;
};

typedef enum {
  false = 0,
  true = 1,
} bool;

bool contains(char* str, char c) {
  int i = 0;
  while(str[i] != '\0') {
    if (str[i] == c) return true;
    i++;
  }
  return false;
}

bool contains_str(char* str1, char* str2) {

}

bool is_digit(char c) {
  return '0' <= c && c <= '9';
}

Tree createNode(int value, char op) {
  Tree tree = (Tree)malloc(sizeof(struct Node));
  tree->value = value;
  tree->op = op;
  tree->left = NULL;
  tree->right = NULL;
  return tree;
}

void print(Tree root) {
  if (!root) return;
  print(root->left);
  if (root->op == '\0') printf("%d", root->value);
  else printf("%c", root->op);
  print(root->right);
}

int copy(List *result, char* str, int N, int start, int length) {
  char* subStr = (char*)malloc(sizeof(char) * (length + 1));
  memcpy(subStr, str + start, length);
  subStr[length] = '\0';
  if (result->length > N - 1) {
    N *= 2;
    result->value = (char**)realloc(result->value, N);
  }
  result->value[result->length] = subStr;
  result->length++;
  return N;
}

List split(char* str, char* separation) {
  int N = 16;
  List result;
  result.value = (char**)malloc(sizeof(char*) * N);
  result.length = 0;
  int i = 0;  
  int length = 0;
  char c;
  while((c = str[i]) != '\0') {
    i++;
    length++;
    if (contains(separation, c)) {
      if (length > 1) N = copy(&result, str, N, i - length, length - 1);
      N = copy(&result, str, N, i - 1, 1);
      length = 0;
    }
  }
  if (length > 0) {
    copy(&result, str, N, i - length, length);
  }
  return result;
}

char* trim(char* str) {
  if (str == NULL) return NULL;
  int i = 0;
  char c;
  int start = -1, end = 0;
  while((c = str[i]) != '\0') {
    if (c != ' ') {
      if (start == -1) start = i;
      end = i + 1;
    }
    i++;
  };
  if (start == -1) start = 0;
  char* subStr = (char*)malloc(sizeof(char) * (end - start + 1));
  memcpy(subStr, str+start, end - start);
  subStr[end - start] = '\0';
  return subStr;
}

Tree parse(char* cmd) {
  List result = split(cmd, "+-*/");
  Tree root = NULL;
  int i;
  char* item;
  for(i = 0; i < result.length; i++) {
    item = trim(result.value[i]);
    if (item == "+")
  }
  return root;
}

void testPrint() {
  Tree root = createNode(0, '+');
  root->left = createNode(1, '\0');
  root->right = createNode(0, '*');
  root->right->left = createNode(2, '\0');
  root->right->right = createNode(3, '\0');
  print(root);
}

void testParseExecute(char* cmd) {
  printf("cmd  :< %s>\n", cmd);
  Tree tree = parse(cmd);
  printf("tree : <");
  print(tree);
  printf(">\n");
}

void testParse() {
  testParseExecute("");
  testParseExecute(" ");
  testParseExecute("  ");
  testParseExecute("1");
  testParseExecute("0");
  testParseExecute(" 1");
  testParseExecute("  1");
  testParseExecute("1 ");
  testParseExecute("1  ");
  testParseExecute(" 1 ");
  testParseExecute("+1");
  testParseExecute("+ 1");
  testParseExecute("1+");
  testParseExecute("1+ ");
  testParseExecute("1 + ");
  testParseExecute("1+2");
  testParseExecute("1 + 2");
  testParseExecute("1+2*3");
  testParseExecute("1*2+3");
  testParseExecute("1+2+3");
  testParseExecute(" 1 + 2 *3 -41/12");
}

void testContainsExcute(char* str, char c) {
  printf("<%s>", str);
  contains(str, c) ? printf(" contains ") : printf(" not contains ");
  printf("<%c>\n", c);
}

void testContains() {
  testContainsExcute("abcd", '1');
  testContainsExcute("abcd", 'a');
  testContainsExcute("abcd", 'b');
  testContainsExcute("abcd", 'c');
  testContainsExcute("abcd", 'd');
}

void testSplitExcute(char* str, char* separation) {
  List result = split(str, separation);
  printf("<%s> split by <%s>, has %d result:\n", str, separation, result.length);
  int i;
  for(i = 0; i < result.length; i++) {
    printf("<%s> ", result.value[i]);
  }
  printf("\n");
}

void testSplit() {
  testSplitExcute("1", "+-*/");
  testSplitExcute("11", "+-*/");
  testSplitExcute("+", "+-*/");
  testSplitExcute("+1", "+-*/");
  testSplitExcute("1+", "+-*/");
  testSplitExcute("1+2", "+-*/");
  testSplitExcute("1 + 2", "+-*/");
  testSplitExcute(" 1 + 2 ", "+-*/");
  testSplitExcute(" 1 + 2 *3", "+-*/");
  testSplitExcute(" 1 + 2 *3 -41/12", "+-*/");
}

void testTrimExcute(char* str) {
  printf("<%s> => <%s>\n", str, trim(str));
}

void testTrim() {
  testTrimExcute("");
  testTrimExcute(" ");
  testTrimExcute("  ");
  testTrimExcute("  ");
  testTrimExcute("1");
  testTrimExcute("a");
  testTrimExcute("a ");
  testTrimExcute(" a ");
  testTrimExcute(" a b ");
  testTrimExcute(" a 1 b ");
  testTrimExcute(" a 1 2 b ");
  testTrimExcute(" a b 3       4       ");
  testTrimExcute("         a b 3       4       ");
}

void testSplitAndTrimExcute(char* str, char* separation) {
  List result = split(str, separation);
  printf("<%s> split by <%s>, has %d result:\n", str, separation, result.length);
  int i;
  for(i = 0; i < result.length; i++) {
    result.value[i] = trim(result.value[i]);
    printf("<%s> ", result.value[i]);
  }
  printf("\n");
}

void testSplitAndTrim() {
  testSplitAndTrimExcute("1", "+-*/");
  testSplitAndTrimExcute("11", "+-*/");
  testSplitAndTrimExcute("+", "+-*/");
  testSplitAndTrimExcute("+1", "+-*/");
  testSplitAndTrimExcute("1+", "+-*/");
  testSplitAndTrimExcute("1+2", "+-*/");
  testSplitAndTrimExcute("1 + 2", "+-*/");
  testSplitAndTrimExcute(" 1 + 2 ", "+-*/");
  testSplitAndTrimExcute(" 1 + 2 *3", "+-*/");
  testSplitAndTrimExcute(" 1 + 2 *3 -41/12", "+-*/");
}

int main() {
  // testContains();
  // testSplit();
  // testTrim();
  testSplitAndTrim();
  // testParse();
  
  return 0;
}