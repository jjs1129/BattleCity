import Config from "./Config.js";
import BlockType from "./BlockType.js";
//import Block from "./Block.js";
import Wall from "./Wall.js";
export default class Steel extends Wall {
  constructor(x = 0, y = 0, width = Config.blockSize, height = Config.blockSize, imgUrl = Config.blockAssets.steel) {
    super(x, y, width, height, imgUrl);
    this.blockType = BlockType.wall;
    //设定铁的生命值为9999倍墙壁 实际上为不可击破
    this.life = 9999*Config.wallLife;
  }
}