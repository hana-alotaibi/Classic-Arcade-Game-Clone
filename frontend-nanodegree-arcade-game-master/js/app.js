// Enemies our player must avoid
var Enemy = function (x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // to give the enmey a random speed and the ceil will make it closer to  bigger number
    if (this.x > 530) {
        
        let random = Math.random(); 
        let num = Math.ceil(random * 300);
        this.x = -70;
        this.speed = 150 + num;
    }
    //here it will check the collisions, If there is any collision it will start again
    let enemyLeft = this.x - 65;
    let enemyRigh = this.x + 65;
    let enemyTop = this.y - 55;
    let enemyDown = this.y + 55;
        
    if (player.x > enemyLeft && player.x < enemyRigh && 
        player.y > enemyTop && player.y < enemyDown) {
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
  
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let score = 0;
let scoreCount = document.getElementById('score').innerHTML = 'Your Score: ' + score;

// the handleInput function, it changes player position according to direction inputs
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x = this.x - 100;
    }
    if (keyPress == 'right' && this.x < 400) {
         this.x = this.x + 100;
    }
    if (keyPress == 'up' && this.y > 0) {
       this.y = this.y - 75;
    }
    if (keyPress == 'down' && this.y < 400) {
        this.y = this.y + 75;
    }
    if (this.y < 0) {
        //When player wins, it counts score
        score++;
       let scoreCount =  document.getElementById('score');
       scoreCount.innerHTML = 'Your Score: ' + score;
        
        console.log('you win');
        // and a Congratulations will be displayed 
        let win = document.getElementById('popup');
        win.classList.remove('hide');
        // game re start after a second 
        setTimeout(function () {
            win.classList.add('hide');
            player.x = 200;
            player.y = 400;
         }, 1000);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
[65, 145, 225].forEach(function(Y){
    enemy = new Enemy(-10, Y, 250);
    allEnemies.push(enemy);
});

let player = new Player(200, 400);

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
