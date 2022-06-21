"use strict";

const logOutButton = new LogoutButton();
logOutButton.action = data => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    } else {
      logOutButton.setLogOutErrorMessage(response.error);
    };
  });
};

ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } else {
    console.log(response.error);
  };
});

const ratesBoard = new RatesBoard();

//get & reload courses
ratesBoard.getCourses = data => {
  ApiConnector.getStocks(response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      ratesBoard.setRatesBoardErrorMessage(response.error);
    };
  });
};

ratesBoard.getCourses();

//reload courses once a minute
let ratesReloadIntervalId = setInterval(ratesBoard.getCourses, 60000);

//Money Manager code
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallBack = data => {
  ApiConnector.addMoney(response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
    };
  });
};
