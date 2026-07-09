let a = 2
let b = 10

let ar = [1]

for (let x= 1;x<=b;x++){
    let l = ar.length

    for (let j=0;j<l;j++){
        ar[j] = ar[j]*a
        
    }
    for (let k=(l-1);k>=0;k--){
        if (ar[k]>9){
            if (k==0){
                ar.unshift(0)
            }
            else{
                let r = 0;
                let h = 0
                r = ar[k]%10
                h = Math.floor(ar[k]/10)
                ar[k]=r
                ar[k-1]+=h
                
            }
        }
    }
    
}
if (ar[0]==0){
    let r = 0;
                let h = 0
                r = ar[1]%10
                h = Math.floor(ar[1]/10)
                ar[1]=r
                ar[0]+=h
}
console.log(ar)