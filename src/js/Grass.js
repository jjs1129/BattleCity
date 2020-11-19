import Block from "./Block.js";
import Config from "./Config.js";
import BlockType from "./BlockType.js";

//草地地形
export default class Grass extends Block {
  constructor(x = 0, y = 0, width = Config.blockSize, height = Config.blockSize, imgUrl = Config.blockAssets.grass) {
    super(x, y, width, height, imgUrl);
    this.blockType = BlockType.grass;
  }
}