const curTime = document.querySelector('.timeContainer h1');
const curDate = document.querySelector('.timeContainer h2');
const SetAlarmBtn = document.getElementById('setAlarmBtn');
const StopAlarmBtn = document.getElementById('stopAlarmBtn');

// alarm which will play when alarm time comes
const alarmSound = new Audio('../assets/audios/coding_ninjas.mpeg');

const Hours = document.getElementById('hours');
const Minutes = document.getElementById('minutes');
const AM_PM = document.getElementById('amPm');

let [hour, minute, amOrPm] = [0, 0, ''];
let isUserAlarmAdded = false;
let isRinging = false;

// get formatted number if less then 10
const getFormattedNum = (num) => (num < 10 ? `0${num}` : num);

// Set Alarm Hours options
for (let i = 1; i <= 12; i++) {
  const hour = getFormattedNum(i);
  const hourEle = document.createElement('option');
  hourEle.setAttribute('value', hour);
  hourEle.textContent = hour;
  Hours.appendChild(hourEle);
}

// Set Alarm Minutes options
for (let i = 0; i <= 59; i++) {
  const minute = getFormattedNum(i);
  const minuteEle = document.createElement('option');
  minuteEle.setAttribute('value', minute);
  minuteEle.textContent = minute;
  Minutes.appendChild(minuteEle);
}

// Function to show current time, date and year,
// It will check alarm time also if user sets the alarm
setInterval(function () {
  let currentDate = new Date();

  let H = currentDate.getHours();
  const M = getFormattedNum(currentDate.getMinutes());
  const S = getFormattedNum(currentDate.getSeconds());

  // Am and PM logic
  const amOrPm = H > 12 ? 'PM' : 'AM';

  H = H > 12 ? H - 12 : H;

  curTime.innerText = `${getFormattedNum(H)}:${M}:${S} ${amOrPm}`;
  curDate.innerText = currentDate.toDateString();

  const checkAlarmTime = `${getFormattedNum(H)}:${M} ${amOrPm}`;

  if (isUserAlarmAdded && !isRinging) {
    isAlarmForCurrentTime(checkAlarmTime);
  }
}, 1000);

// function to start playing alarm song continuously
const startAlarmSound = () => {
  alarmSound.play();
  alarmSound.addEventListener('ended', () => alarmSound.play());
};

// when time comes alarm will ON until and unless user stops the alarm
const isAlarmForCurrentTime = (checkAlarmTime) => {
  const userAlarmTime = `${hour}:${minute} ${amOrPm}`;

  if (checkAlarmTime === userAlarmTime) {
    isRinging = true;
    startAlarmSound();
    console.log('Your Alarm is ringing...');
    console.log('play audio.....');
  }
};

// function which will run "change" event on Hour selector
const onSelectHours = (event) => {
  console.log(event.target.value);
  hour = event.target.value;
};

// function which will run "change" event on minute selector
const onSelectMinutes = (event) => {
  console.log(event.target.value);
  minute = event.target.value;
};

// function which will run "change" event on AM_PM selector
const onSelectAmOrPm = (event) => {
  console.log(event.target.value);
  amOrPm = event.target.value;
};

// Set alarm button logic
const onSetCurrentUserAlarm = () => {
  console.log(hour, minute, amOrPm);
  if (hour && minute && amOrPm) {
    isUserAlarmAdded = true;
    SetAlarmBtn.classList.add('d-none');
    StopAlarmBtn.classList.remove('d-none');
  } else {
    alert('Please select hours, minutes and AM/PM');
  }
};

//Stop  alarm button logic
const onStopCurrentUserAlarm = () => {
  isUserAlarmAdded = false;
  isRinging = false;
  [hour, minute, amOrPm] = [0, 0, ''];
  alarmSound.pause();

  Hours.value = 'hours';
  Minutes.value = 'minutes';
  AM_PM.value = 'amOrPm';

  SetAlarmBtn.classList.remove('d-none');
  StopAlarmBtn.classList.add('d-none');

  console.log('Alarm stopped..');
};

// Event listener on all targeted tags
Hours.addEventListener('change', onSelectHours);
Minutes.addEventListener('change', onSelectMinutes);
AM_PM.addEventListener('change', onSelectAmOrPm);
SetAlarmBtn.addEventListener('click', onSetCurrentUserAlarm);
StopAlarmBtn.addEventListener('click', onStopCurrentUserAlarm);
