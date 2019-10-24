function addZeroes(time){
    return time > 9 ? time : '0' + time;
}

export function secondsToString(seconds){
    var timeFormat = (function (){
        function num(val){
            val = Math.floor(val);
            return val < 10 ? '0' + val : val;
        }
    
        return function (ms){
            var sec = ms / 1000
              , hours = sec / 3600  % 24
              , minutes = sec / 60 % 60
              , seconds = sec % 60
            ;
    
            return num(hours) + ":" + num(minutes) + ":" + num(seconds);
        };
    })()
    return timeFormat(seconds * 1000);
}

export function stringToSeconds(str){
    const time = str.split(':');
    var seconds = 0, m = 1;

    while (time.length > 0) {
        seconds += m * parseInt(time.pop(), 10);
        m *= 60;
    }
    return seconds;
}

export function beautifyDate(date) {
    var dateDisplay = new Date(date);
    dateDisplay = ('0' + dateDisplay.getDate()).slice(-2) + '/' + ('0' + (dateDisplay.getMonth()+1)).slice(-2) + '/' + dateDisplay.getFullYear();
    return dateDisplay;
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
        }
        if (response.status === 422){
          alert('Нету такого юзера');
        }
    } catch (error) {
        alert('Произошла ошибка в ходе авторизации!');
        console.error(error);
    }
}