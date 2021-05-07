const lag = (ms, callBack) => {
    console.log("Lagging ....")
    setTimeout (callBack, ms);
}

lag (600, ()=>{
    lag(800, ()=>{
        lag(1000, ()=> {
            console.log("Finalizo el lag hell");
        })
    })
})