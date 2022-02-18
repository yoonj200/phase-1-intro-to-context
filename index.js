// Your code here
const createEmployeeRecord = (recordsArray) => {
    return {
        firstName: recordsArray[0],
        familyName: recordsArray[1],
        title: recordsArray[2],
        payPerHour: recordsArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function(employeeRecordObj, dateStamp) {
    const inEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    employeeRecordObj.timeInEvents.push(inEvent)
    return employeeRecordObj;
    }

const createTimeOutEvent = function (employeeRecordObj, dateStamp) {
    const outEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    employeeRecordObj.timeOutEvents.push(outEvent)
    return employeeRecordObj
}

// borrowed from Cecilia Daninthe
function hoursWorkedOnDate(eRecordObj, date){
    let hours;
    
    for (let i=0; i<eRecordObj.timeInEvents.length; i++){
        if (eRecordObj.timeInEvents[i].date === date){
            if (eRecordObj.timeOutEvents[i].date === date){
                hours = eRecordObj.timeOutEvents[i].hour - eRecordObj.timeInEvents[i].hour
            }
        }
    }

    return hours/100
}

const wagesEarnedOnDate = function(employeeRecordObj, targetDate) {
    return hoursWorkedOnDate(employeeRecordObj, targetDate) * employeeRecordObj.payPerHour
}

// borrowed from Cecilia Daninthe
function allWagesFor(eRecordObj){
    let allPay = [];
    let allDates = [];

    for (let i = 0; i < eRecordObj.timeInEvents.length; i++){
        allDates.push(eRecordObj.timeInEvents[i].date)
    }

    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(eRecordObj, date))
    });

    return allPay.reduce(( previousValue, currentValue ) => previousValue + currentValue)
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(rec => rec.firstName === firstName)
}
// borrowed from Cecilia Daninthe
const calculatePayroll = function(recsArray) {
    let payroll = [];
    recsArray.forEach(employee => {
        payroll.push(allWagesFor(employee))
    })
    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}
