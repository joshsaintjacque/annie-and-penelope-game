const PLAYER_SPEED = 80;

document.addEventListener("DOMContentLoaded", function () {
  const annie = document.querySelector(".annie");
  const penelope = document.querySelector(".penelope");
  initializeCharacters();

  function initializeCharacters() {
    annie.style.left = "400px";
    annie.style.top = "200px";

    penelope.style.left = "1000px";
    penelope.style.top = "200px";
  }
});

let timer;

function isPlayerAgainstWall(player, house, direction) {
  const playerRect = player.getBoundingClientRect();
  console.log("isPlayerAgainstWall -> playerRect", playerRect);
  const houseRect = house.getBoundingClientRect();
  if (direction === "down") return playerRect.bottom <= houseRect.height;
  if (direction === "up") return playerRect.top >= 0;
  if (direction === "left") return playerRect.left >= 0;
  if (direction === "right") return playerRect.right <= houseRect.width;
}

function movePlayer(direction) {
  console.log("movePlayer -> direction", direction);
  const selectedCharacter = document.querySelector(
    "input[name=character]:checked"
  ).value;
  const house = document.querySelector(".house");
  const player = document.querySelector(`.${selectedCharacter}`);
  if (!isPlayerAgainstWall(player, house, direction)) return;
  if (direction === "up") {
    player.style.top = parseInt(player.style.top) - PLAYER_SPEED + "px";
  }
  if (direction === "left") {
    player.style.left = parseInt(player.style.left) - PLAYER_SPEED + "px";
  }
  if (direction === "right") {
    player.style.left = parseInt(player.style.left) + PLAYER_SPEED + "px";
  }
  if (direction === "down") {
    player.style.top = parseInt(player.style.top) + PLAYER_SPEED + "px";
  }
}

function startMovingPlayer(direction) {
  if (timer) return;
  timer = setInterval(() => movePlayer(direction), 100);
}

function stopMovingPlayer() {
  clearInterval(timer);
  timer = null;
}
