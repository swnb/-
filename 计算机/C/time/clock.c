/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-04-23 15:08:02
 * @LastEditors: chenbh
 * @LastEditTime: 2021-04-23 15:09:13
 */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
 
int main( void )
{
   long    i = 10000000L;
   clock_t start, finish;
   double  duration;
   /* 测量一个事件持续的时间*/
   printf( "Time to do %ld empty loops is ", i );
   start = clock();
   while( i-- )      ;
   finish = clock();
   duration = (double)(finish - start) / CLOCKS_PER_SEC;
   printf( "%f seconds\n", duration );
   printf("CLOCKS_PER_SEC = %d\n", CLOCKS_PER_SEC);
   system("pause");
}
