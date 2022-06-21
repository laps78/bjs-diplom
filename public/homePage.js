"use strict";

//logoutr action
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

//show current profile data
const user = ApiConnector.current(response => {
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

//MONEY MANAGER
const moneyManager = new MoneyManager();

//add money
moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Пополнение прошло успешно!");
    } else {
      moneyManager.setMessage(response.success, response.error);
    };
  });
};

//Currency convertation
moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Конвертация прошла успешно!");
    } else {
      moneyManager.setMessage(response.success, response.error);
    };
  });
};

//Money transfers
moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Перевод средств успешно проведен!");
    } else {
      moneyManager.setMessage(response.success, response.error);
    };
  });
};

//FAVORITES
const favorites = new FavoritesWidget();

//uploading favorites data
favorites.getFavorites = (data) => {
  ApiConnector.getFavorites(response => {
    if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    } else {
      favorites.setMessage(response.success, response.error);
    };
  });
};

favorites.getFavorites();

//Add user to favorites
favorites.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favorites.setMessage(response.success, "Успешно добавлено в избранное!");
    } else {
      favorites.setMessage(response.success, response.error);
    };
  });
};

//remove user from favorites
favorites.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favorites.setMessage(response.success, "Успешно удалено из избранного!");
    } else {
      favorites.setMessage(response.success, response.error);
    };
  })
}