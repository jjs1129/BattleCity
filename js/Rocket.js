import Block from "./Block.js";
import Config from "./Config.js";
import Direction from "./Direction.js";
import Status from "./Status.js";

export default class Rocket extends Block {
  constructor(x = 0, y = 0, width = Config.rocketSize, height = Config.rocketSize, imgUrl = Config.playerRocketAssets.normal) {
    super(x, y, width, height, imgUrl);
    this.direction = Direction.up;
    this.moveSpeed = Config.rocketMoveSpeed;
  }

  move(cols) {
    if (this.status != Status.alive) {
      return;
    }
    let step = this.moveSpeed / 1000 * Config.gameUpdateTick;
    switch (this.direction) {
      case Direction.up:
        this.y -= step;
        break;
      case Direction.right:
        this.x += step;
        break;
      case Direction.down:
        this.y += step;
        break;
      case Direction.left:
        this.x -= step;
        break;
    }
    // 判断子弹的碰撞
    cols.forEach((w, j) => {
      if (this.isCollision(w) && this.status == Status.alive) {
        this.expload();
        w.life -= this.damage;
        if (w.life <= 0) {
          w.status = Status.die;
          //console.log(1);
        }
      }
    })
  }

  expload() {
    this.status = Status.expload;
    setTimeout(() => {
      this.status = Status.die;
    }, Config.exploadTimeout);

    this.image.src = Config.playerRocketAssets.boom;
    this.x -= (Config.rocketBoomSize - Config.rocketSize) / 2;
    this.y -= (Config.rocketBoomSize - Config.rocketSize) / 2;
    this.width = Config.rocketBoomSize;
    this.height = Config.rocketBoomSize;
  }
}