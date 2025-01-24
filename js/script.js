const currentTime = document.querySelector('h1');
const selectMenu = document.querySelectorAll('select');
const setAlarmBtn = document.querySelector('button');
const content = document.querySelector('.content');
let alarmTime, isAlarmSet = false;
ringtone = new Audio("../img/audio3.mp3");

for (let i = 12; i > 0 ; i--) {
  i = i < 10 ? '0' + i : i;
  let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].insertAdjacentHTML('beforeend', option);
}

for (let i = 59; i >= 0 ; i--) {
    i = i < 10 ? '0' + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option);
}

for (let i = 2; i > 0 ; i--) {
    let ampm = i === 2 ? 'AM' : 'PM';
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML('afterend', option);
}

setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm ;
    if(hours > 12){
        hours = hours - 12;
        ampm = 'PM';
    }
    else{
        ampm = 'AM';
    }

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    console.log(hours, minutes, seconds, ampm);
    currentTime.innerHTML = `${hours} &nbsp;: &nbsp;${minutes} &nbsp;: &nbsp;${seconds} &nbsp;&nbsp;&nbsp; ${ampm}`;

    if (alarmTime === `${hours}:${minutes} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }

}, 1000);

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = '';
        ringtone.pause();
        content.classList.remove('disable');
        setAlarmBtn.innerText="Establecer alarma";
        return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return Toastify({
            text: "Por favor seleccione una hora válida",
            duration: 3000,  // Duración en milisegundos
            close: true,
            gravity: "top",  // `top` o `bottom`
            position: "right",  // `left`, `center` o `right`
            backgroundColor: "linear-gradient(135deg, #dcd8d8, #ea7777)"
        }).showToast();
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add('disable');
    setAlarmBtn.innerText="Limpia la alarma";
}

setAlarmBtn.addEventListener('click', setAlarm);