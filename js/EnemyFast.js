import Tank from "./Tank.js";
import Config from './Config.js';
import Direction from "./Direction.js";

export default class EnemyFast extends Tank {
  constructor(x = 0, y = 0, width = Config.blockSize, height = Config.blockSize, imgUrl = Config.enemy1Assets.down) {
    super(x, y, width, height, imgUrl);
    
    this.moveSpeed = Config.enemy1MoveSpeed;
    this.direction = Direction.down;
    this.life = Config.enemy1Life;
    this.trunRoundTimeout = Config.enemyTurnRoundTimeout;
    this.isWeaponReady = true;
    this.attackSpeed = Config.enemyAttackSpeed;
    this.attack = Config.enemyAttack;
  }

  autorun(cols) {
    this.trunRoundTimeout -= Config.gameUpdateTick;
    if (this.trunRoundTimeout <= 0) {
      this.trunRoundTimeout = Config.enemyTurnRoundTimeout;
      // 方向随机
      let ran = Math.random() * 100;
      if (ran <= 10) {
        this.direction = Direction.up;
        this.image.src = Config.enemy1Assets.up;
      } else if (ran <= 40) {
        this.direction = Direction.right;
        this.image.src = Config.enemy1Assets.right;
      } else if (ran <= 70) {
        this.direction = Direction.down;
        this.image.src = Config.enemy1Assets.down;
      } else {
        this.direction = Direction.left;
        this.image.src = Config.enemy1Assets.left;
      }
    }
    this.forward(cols);
  }
}