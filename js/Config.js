const Config = {
  blockSize: 50,
  blockCollisionReduce: 2,// 碰撞大小的缩小程度
  blockDefaultImageUrl: '/assets/grass.png',
  blockAssets: {
    grass: '/assets/grass.png',
    wall: '/assets/wall.png',
    steel: '/assets/steel.gif',
  },
  mapSize: {
    width: 1200,
    height: 600
  },
  wallLife: 10,
  playerLife: 10,
  enemyLife: 10,
  playerAssets: {
    up: '/assets/tank-up.png',
    right: '/assets/tank-right.png',
    down: '/assets/tank-down.png',
    left: '/assets/tank-left.png'
  },
  enemyAssets: {
    up: '/assets/enemy-up.png',
    right: '/assets/enemy-right.png',
    down: '/assets/enemy-down.png',
    left: '/assets/enemy-left.png',
  },
  playerMoveSpeed: 200, // 移动速度
  enemyMoveSpeed: 150,
  rocketMoveSpeed: 300,
  gameUpdateTick: 50,// 游戏画面刷新的间隔
  
  // 子弹的相关配置
  rocketSize: 20,
  rocketBoomSize: 40,
  playerRocketAssets: {
    normal: '/assets/rocket.png',
    boom: '/assets/boom.png'
  },
  enemyRocketAssets: {
    normal: '/assets/rocket-enemy.png',
    boom: '/assets/boom.png'
  },
  playerAttack: 5,//攻击力
  enemyAttack: 5,
  playerAttackSpeed: 200,//攻击速率
  enemyAttackSpeed: 1000,
  exploadTimeout: 150,//爆炸持续时间
  enemyTurnRoundTimeout: 2000//敌人转向的间隔
}
export default Config;