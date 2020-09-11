import Block from "./Block.js";
import Config from "./Config.js";
import Area from "./Area.js";
import Direction from "./Direction.js";
import Rocket from "./Rocket.js";

export default class Tank extends Block {
  constructor(x = 0, y = 0, width = Config.blockSize, height = Config.blockSize, imgUrl = Config.playerAssets.up) {
    super(x, y, width, height, imgUrl);
    //坦克的移动速度
    this.moveSpeed = Config.playerMoveSpeed;
    this.direction = Direction.up;
    this.life = Config.playerLife;
    this.attack = Config.playerAttack;
    this.attackSpeed = Config.playerAttackSpeed;
    this.isWeaponReady = true;
  }

  //坦克移动
  forward(cols) {
    //每隔一段时间移动的距离
    let step = this.moveSpeed / 1000 * Config.gameUpdateTick;
    //根据方向向前移动
    let next = new Area(this.x, this.y, this.width, this.height);
    switch (this.direction) {
      case Direction.up:
        next.y -= step;
        break;
      case Direction.right:
        next.x += step;
        break;
      case Direction.down:
        next.y += step;
        break;
      case Direction.left:
        next.x -= step;
        break;
    }
    //限定在地图范围内移动
    next.x = next.x <= 0 ? 0 : next.x;
    next.y = next.y <= 0 ? 0 : next.y;
    let maxX = Config.mapSize.width - Config.blockSize;
    let maxY = Config.mapSize.height - Config.blockSize;
    next.x = next.x >= maxX ? maxX : next.x;
    next.y = next.y >= maxY ? maxY : next.y;

    let canForward = true;
    //判断碰撞
    for (let i = 0; i < cols.length; i++) {
      if (next.isCollision(cols[i])) {
        canForward = false;
        break;
      }
    }

    if (canForward) {
      this.x = next.x;
      this.y = next.y;
    }
  }
  //开火
  shoot(rocketImage = Config.playerRocketAssets.normal) {
    this.isWeaponReady = false;
    setTimeout(() => {
      this.isWeaponReady = true;
    }, this.attackSpeed);

    let x = this.x + (this.width - Config.rocketSize) / 2;
    let y = this.y + (this.height - Config.rocketSize) / 2;
    let rocket = new Rocket(x, y);
    rocket.image.src = rocketImage;
    rocket.direction = this.direction;
    rocket.damage = this.attack;
    return rocket;
  }
}