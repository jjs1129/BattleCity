import Area from "./Area.js";
import Config from './Config.js';
import Status from "./Status.js";


// 定义一个格子对象，描述游戏中的各种方块格子
export default class Block extends Area {
  constructor(x = 0, y = 0, width = Config.blockSize, height = Config.blockSize, imgUrl = Config.blockDefaultImageUrl) {
    super(x, y, width, height);
    
    this.imageUrl = imgUrl;
    this.image = new Image();
    this.image.src = this.imageUrl;
    this.isReady = false; // 定义一个是否准备好的状态，当图片加载回来的时候设置为true
    this.status = Status.alive;
    this.image.onload = () => {
      // 图片加载完毕了
      this.isReady = true;
    }
  }
  // 渲染到页面上的方法
  render(context) {
    // 当图片准备好了之后再画出来
    this.isReady && context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}