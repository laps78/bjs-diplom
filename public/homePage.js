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