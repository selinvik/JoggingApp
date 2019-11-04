export function secondsToString(seconds){
    function timeFormat(ms){
        function num(val){
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

export function stringToSeconds(str){
    const time = str.split(':');
    var seconds = 0, mult = 1;

    while (time.length > 0) {
        seconds += mult * parseInt(time.pop(), 10);
        mult *= 60;
    }
    return seconds;
}

export function beautifyDate(date) {
    const dateDisplay = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear();
    return dateDisplay;
}

export function getDayStart(date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
}

export function getDayEnd(date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
}

export function avgSpeed(record) {
    return ((record.distance / 1000) / (record.time / 3600  % 24)).toFixed(2);
}

export function avgWeekSpeed(record) {
    return ((record.avgWeekDist / 1000) / (record.avgWeekTime / 3600  % 24)).toFixed(2);
}

export function validateDate(date){
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

export function validateEmail(email){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(email) === false) {
      return false;
    }
    else return true;
}

export async function login(loginEmail, loginPassword, history){
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