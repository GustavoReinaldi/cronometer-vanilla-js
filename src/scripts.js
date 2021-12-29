const displayHours = document.querySelector("#display-hours");
const displayMinutes = document.querySelector("#display-minutes");
const displaySeconds = document.querySelector("#display-seconds");
const displayMilliseconds = document.querySelector("#display-milis");

const actionButton = document.querySelector("#action-button");
const storagedTimerElement = document.querySelector("#storaged-timer-list");

const DEFAULT_BUTTON_CLASS = "button";

const initialMarkedTimer = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  miliseconds: 0,
};
var listMarkedTimes = [initialMarkedTimer];
var allButtonState = [
  {
    id: 1,
    label: "Start<br>(ENTER)",
    css: " start",
  },
  {
    id: 2,
    label: "Stop<br>(ENTER)",
    css: " stop",
  },
  {
    id: 3,
    label: "Continue<br>(ENTER)",
    css: " continue",
  },
];
var actionButtonState = allButtonState[0];

var cronometerHours = 0;
var cronometerMinutes = 0;
var cronometerSeconds = 0;
var cronometerMiliseconds = 0;

var myTimer = null;

const handleActionButtonClick = () => {
  if (actionButtonState.id === 1) {
    startCronometer();
    actionButtonState = allButtonState[1];
  } else if (actionButtonState.id === 2) {
    stopCronometer();
    actionButtonState = allButtonState[2];
  } else if (actionButtonState.id === 3) {
    startCronometer();
    actionButtonState = allButtonState[1];
  }
  //}
  changeButtonLabel();
};

const startCronometer = () => {
  myTimer = setInterval(() => {
    if (cronometerMiliseconds < 100) {
      cronometerMiliseconds++;
    } else {
      cronometerMiliseconds = 0;
      if (cronometerSeconds < 59) {
        cronometerSeconds++;
      } else {
        cronometerSeconds = 0;
        if (cronometerMinutes < 59) {
          cronometerMinutes++;
        } else {
          cronometerMinutes = 0;
          cronometerHours++;
        }
      }
    }
    displayNumber();
  }, 10);
};
const stopCronometer = () => {
  clearInterval(myTimer);
};
const clearCronometer = () => {
  stopCronometer();
  cronometerSeconds = 0;
  cronometerSeconds = 0;
  cronometerMinutes = 0;
  cronometerMiliseconds = 0;
  actionButtonState = allButtonState[0];
  displayNumber();
  changeButtonLabel();
};
const clearMarkedTimes = () => {
  listMarkedTimes = [initialMarkedTimer];
  displayMarkedTimer();
};
const markTime = () => {
  let newTime = {
    hours: cronometerHours,
    minutes: cronometerMinutes,
    seconds: cronometerSeconds,
    miliseconds: cronometerMiliseconds,
  };
  listMarkedTimes[0] === initialMarkedTimer && listMarkedTimes.pop();

  listMarkedTimes.push(newTime);
  displayMarkedTimer();
};
const displayNumber = () => {
  displayHours.innerHTML = `${("0" + cronometerHours).slice(-2)}`;
  displayMinutes.innerHTML = `${("0" + cronometerMinutes).slice(-2)}`;
  displaySeconds.innerHTML = `${("0" + cronometerSeconds).slice(-2)}`;
  displayMilliseconds.innerHTML = `${("0" + cronometerMiliseconds).slice(-2)}`;
  //numberDisplayier.innerHTML = `${('0' + cronometerHours).slice(-2)
  //    }:${('0' + cronometerMinutes).slice(-2)}:${('0' + cronometerSeconds).slice(-2)}`;
};

const timerIsEmpty = (timerItem = initialMarkedTimer) => {
  return (
    timerItem.hours == 0 &&
    timerItem.minutes == 0 &&
    timerItem.seconds == 0 &&
    timerItem.miliseconds == 0
  );
};

const displayMarkedTimer = () => {
  storagedTimerElement.innerHTML = "";
  if (listMarkedTimes[0] !== initialMarkedTimer) {
    listMarkedTimes.reverse().map((item) => {
      if (!timerIsEmpty(item)) {
        let newLine = document.createElement("tr");

        let newId = document.createElement("td");
        let newHour = document.createElement("td");
        let newMinute = document.createElement("td");
        let newSecond = document.createElement("td");
        let newMilisecond = document.createElement("td");

        newId.innerHTML =
          listMarkedTimes.length - listMarkedTimes.indexOf(item);
        
        newHour.innerHTML = (item.hours == 0) 
          ? " - " 
          : `${("0" + item.hours).slice(-2)}`;
        
        newMinute.innerHTML = (item.hours == 0 && item.minutes == 0)
          ? " - "
          : `${("0" + item.minutes).slice(-2)}`;
       
        newSecond.innerHTML = ( item.hours == 0 && item.minutes == 0 &&  item.seconds == 0)
          ? " - " 
          : `${("0" + item.seconds).slice(-2)}`;
        
        newMilisecond.innerHTML = `${("0" + item.miliseconds).slice(-2)}`;

        newLine.appendChild(newId);
        newLine.appendChild(newHour);
        newLine.appendChild(newMinute);
        newLine.appendChild(newSecond);
        newLine.appendChild(newMilisecond);
        storagedTimerElement.appendChild(newLine);
      }
    });
  }
};
const changeButtonLabel = () => {
  actionButton.innerHTML = actionButtonState.label;
  actionButton.className = DEFAULT_BUTTON_CLASS + actionButtonState.css;
};
displayNumber();
