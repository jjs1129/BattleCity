import Tank from "./Tank.js";
import Config from './Config.js';
import Direction from "./Direction.js";

export default class Enemy extends Tank {
  constructor(x = 0, y = 0, width = Config.blockSize, height = Config.blockSize, imgUrl = Config.enemyAssets.down) {
    super(x, y, width, height, imgUrl);
    
    this.moveSpeed = Config.enemyMoveSpeed;
    this.direction = Direction.down;
    this.life = Config.enemyLife;
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
        this.image.src = Config.enemyAssets.up;
      } else if (ran <= 40) {
        this.direction = Direction.right;
        this.image.src = Config.enemyAssets.right;
      } else if (ran <= 70) {
        this.direction = Direction.down;
        this.image.src = Config.enemyAssets.down;
      } else {
        this.direction = Direction.left;
        this.image.src = Config.enemyAssets.left;
      }
    }
    this.forward(cols);
  }
}