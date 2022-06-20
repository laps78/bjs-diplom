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

ApiConnector.curremt = response => {
  if (response.success) {
    ProfileWidget.showProfile(response);
  } else {
    console.log(response.error)
  };
};

const ratesBoard = new RatesBoard();
/*
ratesBoard.getCourses = data => {
  ApiConnector.getStocks(response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable();
    } else {
      ratesBoard.setRatesBoardErrorMessage(response.error);
    };
  });
};
setInterval(ratesBoard.getCourses(), 1000 * 60);
*/