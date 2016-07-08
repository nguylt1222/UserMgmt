// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
    // write your code in JavaScript (Node.js 4.0.0)

    var tarray = [];
    var isEquil;
    var tvalue;
    for (i = 1; i <= A.length; i++) {
        var p = i
        var yvalue;
        for (y = 0; y < p; y++) {
            yvalue = yvalue + A[y];            
        }
        for (x = A.length; x > p; x--) {
            xvalue = xvalue + A[x];
        }
        
        if (yvalue == xvalue)            
            isEquil = true;
     
    }
}