

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 60;
    this.height = 40;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //simple loop to restart Enemy.
    while (this.x > 575) {
        this.x = -75;
    };
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = "images/char-princess-girl.png";
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 25;
    this.gemScore = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handles Player movement and ensures Player cannot exit the canvas.

Player.prototype.handleInput = function(moveUser) {
    if (moveUser === 'left' && this.x > 25)
        this.x = this.x - 100;
    else if (moveUser === 'right' && this.x < 350)
        this.x = this.x + 100;
    else if (moveUser === 'up' && this.y > 0)
        this.y = this.y - 80;
    else if (moveUser === 'down' && this.y < 375)
        this.y = this.y + 80;
};

// Creating additional functionality with gems!

var Gem = function(x, y) {
    this.sprite = "images/green-gem.png";
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function() {
    // randomizes gem location after player collision;
    this.x = Math.floor(Math.random() * 300) + 100;
    this.y = Math.floor(Math.random() * 300) + 100;
};

function winCondition() {
    if (player.y < 20) {
        player.handleInput = null;
        drawWin();
    };
};

function drawWin() {
    ctx.font = '26px serif';
    ctx.fillStyle = "orange";
    ctx.textBaseline = 'top';
    ctx.fillText('You win!  Gem Score: ' + player.gemScore + '!', 125, 5);
};

// Checks collisions between players, enemies, and gems using bounding boxes.
Player.prototype.checkCollisions = function() {
    // for loop in order to loop through enemy array.
    for (i = 0; i < allEnemies.length; i++)
        // below code assisted by MDN bounding boxes write up
        if (this.x < allEnemies[i].x + allEnemies[i].width && this.x +
            this.width > allEnemies[i].x && this.y < allEnemies[i].y + allEnemies[i].height &&
            this.height + this.y > allEnemies[i].y) {
            this.gemScore = 0;
            this.reset();
        };
    // checks gem collision and then adds to gemScore.
    if (this.x < gem.x + gem.width && this.x +
        this.width > gem.x && this.y < gem.y + gem.height &&
        this.height + this.y > gem.y) {
        this.gemScore++;
        gem.update();
    };
};

// Resets initial player location.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 375;
};

Player.prototype.update = function() {
    this.checkCollisions();
    winCondition();
};

// Now instantiate your objects.

// Place the player object in a variable called player
var player = new Player(200, 375);
// Negative values for x-cordinate to make bugs transition onto the screen smoothly.
var bug1 = new Enemy(-100, 60, 210);
var bug2 = new Enemy(-150, 140, 150);
var bug3 = new Enemy(-50, 230, 180);
var bug4 = new Enemy(-225, 310, 100);
var bug5 = new Enemy(-25, 310, 100);
// Place all enemy objects in an array called allEnemies
var allEnemies = [bug1, bug2, bug3, bug4, bug5];

var gem = new Gem(100, 130);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});