export function secondsToString(seconds: number){
    function timeFormat(ms: number){
        function num(val: number){
            val = Math.floor(val);
            return val < 10 ? '0' + val : val;
        }
        const sec = ms / 1000
            , hours = sec / 3600  % 24
            , minutes = sec / 60 % 60
            , seconds = sec % 60;

        return num(hours) + ":" + num(minutes) + ":" + num(seconds);
    }
    return timeFormat(seconds * 1000);
}

export function stringToSeconds(str: any){
    const time = str.split(':');
    var seconds = 0, mult = 1;

    while (time.length > 0) {
        seconds += mult * parseInt(time.pop(), 10);
        mult *= 60;
    }
    return seconds;
}

export function beautifyDate(date: Date) {
    const dateDisplay = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear();
    return dateDisplay;
}

export function getDayStart(date: any){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
}

export function getDayEnd(date: any){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
}

export function avgSpeed(record: {distance: number, time: number}) {
    return ((record.distance / 1000) / (record.time / 3600  % 24)).toFixed(2);
}

export function avgWeekSpeed(record: {avgWeekDist: number, avgWeekTime: number}) {
    return ((record.avgWeekDist / 1000) / (record.avgWeekTime / 3600  % 24)).toFixed(2);
}

export function validateDate(date: Date){
    const now = new Date();
    const userDate = new Date(date)
    if (userDate.getFullYear() > now.getFullYear()){
        return false
    }
    else if (userDate.getFullYear() === now.getFullYear()){
        if (userDate.getMonth() > now.getMonth()){
            return false
        }
        else if (userDate.getMonth() === now.getMonth()){
            if (userDate.getDate() > now.getDate()){
                return false
            }
            else return true
        }
        else return true
    }
    else return true
}

export function validateEmail(email: string){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(email) === false) {
      return false;
    }
    else return true;
}

export function validateDistance(distance: any){
    if(isNaN(distance) === true){
        return false;
    }
    else return true;
}

export function validateTime(time: any){
    for (var j = 0, separator_cnt = 0; j < time.length; j++ ){
        if(time[j] === ':') {
            separator_cnt++;
        }
        if(separator_cnt > 2) return false;
    }
    const i = time.length;
    if(time.length === 0) return true;
    if (time.length === 1){
        if(isNaN(time[0]) === true) return false;
        else return true;
    }
    else if ( i < 9) {
        if(time[i - 2] === ':'){
            if(isNaN(time[i- 1]) === true) return false;
            else return true;
        }
        else if(time[i - 1] === ':') return true;
        else {
            if(isNaN(time[i - 3]) === false) return false;
            else return true;
        } 
    }
    else return false;
}

export async function login(loginEmail: string, loginPassword: string, history: any){
    try {
        const response = await fetch('/api/authentication',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                })
            });
        if (response.status === 201){
            history.push('/records/');
        } else if (response.status === 422){
            alert('Нету такого юзера');
        } else {
            alert('Ошибка авторизации');
        }
    } catch (error) {
        alert('Произошла ошибка в ходе авторизации!');
        console.error(error);
    }
}