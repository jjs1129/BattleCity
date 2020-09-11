import Config from './Config.js';
import Point from './Point.js';
//区域对象
export default class Area {
  constructor(x = 0, y = 0, width = Config.blockSize, height = Config.blockSize) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  //判断一个点是否在一个矩形区域内
  isPointInArea(p) {
    //碰撞的大小稍微缩小
    if (p.x >= this.x + Config.blockCollisionReduce &&
      p.x <= this.x + this.width - Config.blockCollisionReduce &&
      p.y >= this.y + Config.blockCollisionReduce &&
      p.y <= this.y + this.height - Config.blockCollisionReduce
    ) {
      return true;
    }
    return false;
  }
  //判断两个区域是否碰撞
  isCollision(a) {
    // 左上 上 右上 左 右 左下 下 右下 8个
    let p1 = new Point(a.x, a.y);
    let p2 = new Point(a.x, a.y + a.height / 2);
    let p3 = new Point(a.x, a.y + a.height);
    let p4 = new Point(a.x + a.width / 2, a.y);
    let p5 = new Point(a.x + a.width / 2, a.y + a.height);
    let p6 = new Point(a.x + a.width, a.y);
    let p7 = new Point(a.x + a.width, a.y + a.height / 2);
    let p8 = new Point(a.x + a.width, a.y + a.height);
    // 只要有一个点在区域中就产生了碰撞
    if (this.isPointInArea(p1) ||
      this.isPointInArea(p2) ||
      this.isPointInArea(p3) ||
      this.isPointInArea(p4) ||
      this.isPointInArea(p5) ||
      this.isPointInArea(p6) ||
      this.isPointInArea(p7) ||
      this.isPointInArea(p8)
    ) {
      return true;
    }
    return false;
  }
}