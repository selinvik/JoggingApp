function addZeroes(time){
    return time > 9 ? time : '0' + time;
}

export function secondsToString(seconds){
    //TODO: implement
    return seconds;
}

export function stringToSeconds(str){
    //TODO: implement
    return str;
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