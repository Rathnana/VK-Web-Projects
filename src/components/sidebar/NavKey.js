export function keyMenu(e){

    const myArr = e.split("/");
    let x = ""

    if(myArr[1] === 'customer'){
        x="/customer"
    }
    else if(myArr[1] === 'report'){
        x="/report"
    }

    else if(myArr[1] === 'pretty_cash'){
        x="/pretty_cash"
    }

    else if(myArr[1] === 'requesting'){
        x="/requesting"
    }

    else if(myArr[1] === 'users'){
        x="/users"
    }
    
    else{
        x="/"
    }
    
    return x
}