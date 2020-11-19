const Config = {
  blockSize: 50,
  blockCollisionReduce: 2,// 碰撞大小的缩小程度
  blockDefaultImageUrl: require('../assets/grass.png'),
  blockAssets: {
    grass: require('../assets/grass.png'),
    wall: require('../assets/wall.png'),
    steel: require('../assets/steel.gif'),
  },
  mapSize: {
    width: 1200,
    height: 600
  },
  wallLife: 10,
  playerLife: 10,
  enemyLife: 10,
  enemy1Life:15,
  enemy2Life:5,
  playerAssets: {
    up: require('../assets/tank-up.png'),
    right: require('../assets/tank-right.png'),
    down: require('../assets/tank-down.png'),
    left: require('../assets/tank-left.png')
  },
  enemyAssets: {
    up: require('../assets/enemy-up.png'),
    right: require('../assets/enemy-right.png'),
    down: require('../assets/enemy-down.png'),
    left: require('../assets/enemy-left.png'),
  },
  enemy1Assets: {
    up: require('../assets/enemy1-up.png'),
    right: require('../assets/enemy1-right.png'),
    down: require('../assets/enemy1-down.png'),
    left: require('../assets/enemy1-left.png'),
  },
  enemy2Assets: {
    up: require('../assets/enemy2-up.png'),
    right: require('../assets/enemy2-right.png'),
    down: require('../assets/enemy2-down.png'),
    left: require('../assets/enemy2-left.png'),
  },
  playerMoveSpeed: 200, // 移动速度
  enemyMoveSpeed: 150,
  enemy1MoveSpeed:200,
  enemy2MoveSpeed:100,
  rocketMoveSpeed: 300,
  gameUpdateTick: 50,// 游戏画面刷新的间隔
  
  // 子弹的相关配置
  rocketSize: 20,
  rocketBoomSize: 40,
  playerRocketAssets: {
    normal: require('../assets/rocket.png'),
    boom: require('../assets/boom.png')
  },
  enemyRocketAssets: {
    normal: require('../assets/rocket-enemy.png'),
    boom: require('../assets/boom.png')
  },
  playerAttack: 5,//攻击力
  enemyAttack: 5,
  playerAttackSpeed: 200,//攻击速率
  enemyAttackSpeed: 1000,
  exploadTimeout: 150,//爆炸持续时间
  enemyTurnRoundTimeout: 2000//敌人转向的间隔
}
export default Config;