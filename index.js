const createEmployeeRecord = function (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = function (employeeData) {
    return employeeData.map(function (array) {
        return createEmployeeRecord(array);
    });
};

const createTimeInEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return this;
};

const createTimeOutEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return this;
};

const hoursWorkedOnDate = function (date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = function (date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);

    return payable;
};

const findEmployeeByFirstName = function (collection, firstNameString) {
    return collection.find(function (employee) {
        return employee.firstName === firstNameString;
    });
};
const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce(function (totalPayroll, employee) {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);

    // Mock data for testing



};



