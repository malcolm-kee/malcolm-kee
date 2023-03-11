#include <stdio.h>

// #include "greet.h"

// int main() {
//     greet("World");
//     return 0;
// }

#define LOWER 0
#define UPPER 300
#define STEP 20

int main() {
    float fahr, celcius;

    printf("Fahrenehit - Celcius\n");
    printf("====================\n");

    for (fahr = LOWER; fahr < UPPER; fahr = fahr + STEP) {
        celcius = (5.0 / 9.0) * (fahr - 32.0);
        printf("%3.0f %6.1f\n", fahr, celcius);
    }
}