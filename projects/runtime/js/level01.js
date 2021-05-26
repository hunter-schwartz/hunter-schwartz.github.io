var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                {"type": "reward", "x": 900, "y": groundY },
                {"type": "enemy", "x": 600, "y": groundY},
                {"type": "obstacle", "x": 1400, "y": groundY},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y) {
            var hitZoneSize = 20;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);  
        
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        createSawBlade(900, 310);
        createSawBlade(500, 310);
        createSawBlade(700, 210);

        function createMyObstacle(x,y) {
            hitZoneSize = 20;
            damageFromObstacle = 20;
            var myObstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        
            myObstacleHitZone.x = x;
            myObstacleHitZone.y = y;
            game.addGameItem(myObstacleHitZone);  
        
            var obstacleTrickyImage = draw.bitmap('img/tricky_.png');
            myObstacleHitZone.addChild(obstacleTrickyImage);
            obstacleTrickyImage.x = -25;
            obstacleTrickyImage.y = -30;
        };

        createMyObstacle(1400, 320);

        function createEnemy(x, y) {
        var enemy = game.createGameItem('enemy',25);
        var redSquare = draw.bitmap('img/dsjd.png');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = 600;
            enemy.y = groundY-50;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;

            enemy.onPlayerCollision = function hitHalle() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-20);
                enemy.fadeOut();
            };

            enemy.onProjectileCollision = function hitEnemy() {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.shrink();
                enemy.fadeOut();
            };
            
        }

        createEnemy(400,groundY-10);
        createEnemy(800,groundY-100);
        createEnemy(1200,groundY-50);

        function createReward(x, y) {
        var reward = game.createGameItem('reward',25);
        var blueSquare = draw.bitmap('img/cmf.png');
            blueSquare.x = -25;
            blueSquare.y = -25;
            reward.addChild(blueSquare);
            reward.x = 900;
            reward.y = groundY-50;
            game.addGameItem(reward);
            reward.velocityX = -1.5;

            reward.onPlayerCollision = function hitHalle() {
                console.log('The reward has hit Halle');
                game.changeIntegrity(20);
                reward.fadeOut();
            };
        }
        createReward(900, groundY-60);

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
