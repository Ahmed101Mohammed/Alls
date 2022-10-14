import { moveingMethods } from "../../library/movingMethods.js";

let successfulButton = document.querySelector('.message-container-successfulColor .btn');
successfulButton.addEventListener('click',moveingMethods.moveToSignPage);

let failurButton = document.querySelector('.message-container-failurColor .btn');
failurButton.addEventListener('click', moveingMethods.moveToRegisterPage);

