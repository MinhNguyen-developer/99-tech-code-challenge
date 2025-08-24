function sum(n: number) {
    return n * (n + 1) / 2;
}

function sum2(n: number) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sum3(n: number): number {
    if (n <= 1) return n;
    return n + sum3(n - 1);
}

console.log(sum(100));
console.log(sum2(100));
console.log(sum3(100));