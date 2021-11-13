function checkBracket(input){
    const data=[]
    const open=["(","{","["]
    const close=[")","}","]"]
    if(input.length%2!=0){
        return false
    }
    for(let i of input){
        if(open.includes(i)){
            data.push(i)
        }
        console.log(data)
        if(close.includes(i)){
            const match=open[close.indexOf(i)]
            if(match==data[data.length-1]){
                data.splice(-1,1)
            }else{
                data.push(input)
                break
            }
        }
    }
    return (data.length==0)?"true":"salah"
}

console.log(
    checkBracket("({[]})"),
    checkBracket("([][]{})"),
    checkBracket("({)(]){[}"),
    checkBracket("[)()](")
    )