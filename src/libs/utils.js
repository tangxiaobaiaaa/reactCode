function formaDataTime(timeStamp){
    const date = new Date(timeStamp)
    
    const y = date.getFullYear(),
            m = date.getMonth() +1,
            d  = date.getDate(),
            h =  date.getHours(),
            i = _addZero(date.getMinutes()),
            s = _addZero(date.getSeconds())


    return `${y}年${m}月${d}日 ${h}:${i}:${s}`
}


function _addZero(value){
    return value<10?("0"+value):value
}

// export default formaDataTime
export  {
    formaDataTime

}