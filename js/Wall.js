import Config from "./Config.js";
import BlockType from "./BlockType.js";
import Block from "./Block.js";

export default class Wall extends Block {
  constructor(x = 0, y = 0, width = Config.blockSize, height = Config.blockSize, imgUrl = Config.blockAssets.wall) {
    super(x, y, width, height, imgUrl);
    this.blockType = BlockType.wall;
    // 墙壁是可以破坏的，给他设定一个生命值
    this.life = Config.wallLife;
  }
}