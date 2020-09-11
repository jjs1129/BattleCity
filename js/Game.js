import Config from './Config.js';
import Grass from './Grass.js';
import Steel from './Steel.js';
import Wall from './Wall.js';
import Tank from './Tank.js';
import Enemy from './Enemy.js';
import Direction from './Direction.js';
import BlockType from './BlockType.js';
import Status from './Status.js';

export default class Game {
  constructor(context, tankNum) {
    this.tankNum = tankNum;
    this.context = context;//画笔对象
    this.controlKeys = [];//方向控制按键保存
    this.map = [];//地形方块存储
    this.enemyTankArr = [];//敌人坦克存储
    this.playerRocketArr = [];//把玩家发射的子弹存储
    this.enemyRocketArr = [];//敌人发射的子弹存储
    this.temp = [];//随机生成地方坦克时用到的数组
    // this.func=func;
  }
  // 初始化游戏数据
  init() {
    this.controlKeys = [];//方向控制按键保存
    this.map = [];//地形方块存储
    this.enemyTankArr = [];//敌人坦克存储
    this.playerRocketArr = [];//把玩家发射的子弹存储
    this.enemyRocketArr = [];//敌人发射的子弹存储
    this.temp = [];//随机生成地方坦克时用到的数组

    let size = Config.blockSize;
    //所有地形都填充上草地
    let vertical = Config.mapSize.height / size;
    let horizontal = Config.mapSize.width / size;
    for (let i = 0; i < horizontal; i++) {
      let arr = [];
      for (let j = 0; j < vertical; j++) {
        //if(Math.random()<0.6)
        arr.push(new Grass(i * size, j * size));
      }
      this.map.push(arr);
    }

    // 在随机的生成多个墙壁和水
    let count = Math.floor(Math.random() * 151) + 50;
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * horizontal);
      let y = Math.floor(Math.random() * vertical);
      let type = Math.floor(Math.random() * 2);
      switch (type) {
        case 0:
          this.map[x][y] = new Steel(x * size, y * size);
          break;
        case 1:
          this.map[x][y] = new Wall(x * size, y * size);
          break;
      }
    }

    this.map[13][11] = new Grass(13 * size, 11 * size);// 玩家的坦克生成位置

    this.player = new Tank(13 * size, 11 * size);// 生成玩家坦克

    for (var i = 0; i < 24; i++) {        //一维长度为24
      this.temp[i] = new Array();
      for (var j = 0; j < 12; j++) {    //二维长度为12
        this.temp[i][j] = 0;
      }
    }
    this.temp[13][11] = 1;

    //随机位置敌方坦克
    for (let i = 0; i < this.tankNum; i++) {
      let xx = parseInt(Math.random() * 24) * size;
      let yy = parseInt(Math.random() * 11) * size;
      if (this.temp[xx / size][yy / size] == 0) {
        let tk = new Enemy(xx, yy);
        this.enemyTankArr.push(tk);
        this.temp[xx / size][yy / size] = 1;
      }
      else {
        i = i - 1;
        continue;
      }
    }

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 12; j++) {
        if (this.temp[i][j] == 1)
          this.map[i][j] = new Grass(i * size, j * size);
      }
    }
  }

  render() {
    //画笔对象
    let context = this.context;
    context.clearRect(0, 0, 24 * Config.blockSize, 12 * Config.blockSize);

    // 渲染地图
    this.map.forEach((e, i) => {
      e.forEach((e, i) => {
        e.render(context);
      });
    });

    // 渲染敌人坦克
    this.enemyTankArr.forEach((e) => {
      e.render(context);
    })
    // 渲染敌人的子弹
    this.enemyRocketArr.forEach((e) => {
      e.render(context);
    });
    // 渲染玩家的子弹
    this.playerRocketArr.forEach((e, i) => {
      e.render(context);
    });
    // 渲染玩家的坦克

    if (this.player && this.player.status == Status.alive) {
      this.player.render(context);
    }

  }

  clearDieObj() {
    // 清理玩家子弹
    this.playerRocketArr.forEach((e, i) => {
      if (e.status == Status.die) {
        this.playerRocketArr.splice(i, 1);
      }
    });
    // 清理墙壁 墙壁被击破后变成草地
    this.map.forEach((e, i) => {
      e.forEach((w, j) => {
        if (w.status == Status.die) {
          this.map[i][j] = new Grass(i * Config.blockSize, j * Config.blockSize);
          //变成草地 下次update时渲染
        }
      });
    })
    // 清理敌人的坦克
    this.enemyTankArr.forEach((e, i) => {
      if (e.status == Status.die) {
        this.enemyTankArr.splice(i, 1);//删除
      }
    });
    // 清理敌人的子弹
    this.enemyRocketArr.forEach((e, i) => {
      if (e.status == Status.die) {
        this.enemyRocketArr.splice(i, 1);//删除
      }
    });

    //清理玩家的坦克
    if (this.player.life == 0) {
      this.player.status == Status.die;
    }

    if (this.player.status == Status.die) {
      // delete this.player;
      this.goon = 1;
      //console.log(this.goon);
    }


  }

  update() {
    let steels = [];
    this.map.forEach((e, i) => {
      e.forEach((w, j) => {
        if (w.blockType == BlockType.steel) {
          steels.push(w);
        }
      });
    });
    //清除定时器
    clearInterval(this.timer);
    //this.timer = 0;
    //console.log(Config.gameUpdateTick);
    this.timer = setInterval((() => {
      //筛选出所有的现存砖块
      let walls = [];
      this.map.forEach((e, i) => {
        e.forEach((w, j) => {
          if (w.blockType == BlockType.wall) {
            walls.push(w);
          }
        });
      });

      // 控制玩家坦克
      if (this.controlKeys.length != 0) {
        let first = this.controlKeys[0];
        switch (first) {
          case 87:
            this.player.direction = Direction.up;
            this.player.image.src = Config.playerAssets.up;
            break;
          case 68:
            this.player.direction = Direction.right;
            this.player.image.src = Config.playerAssets.right;
            break;
          case 83:
            this.player.direction = Direction.down;
            this.player.image.src = Config.playerAssets.down;
            break;
          case 65:
            this.player.direction = Direction.left;
            this.player.image.src = Config.playerAssets.left;
            break;
        }
        this.player.forward([].concat(walls, steels, this.enemyTankArr));
      }

      // 玩家射击
      if (this.player && this.player.isShootting && this.player.isWeaponReady) {
        let r = this.player.shoot();
        this.playerRocketArr.push(r);
      }

      // 移动玩家的子弹
      this.playerRocketArr.forEach((e, i) => {
        let cols = [].concat(walls, this.enemyTankArr);
        e.move(cols);
      });

      // 敌方坦克移动
      this.enemyTankArr.forEach((e, i) => {
        let siblings = this.enemyTankArr.slice(0);
        siblings.splice(i, 1);
        let cols = siblings.concat(walls, steels, this.player);
        e.autorun(cols);
        if (e.isWeaponReady) {
          let r = e.shoot(Config.enemyRocketAssets.normal);
          this.enemyRocketArr.push(r);
        }
      });

      // 移动敌人的子弹
      this.enemyRocketArr.forEach((e) => {
        let cols = [].concat(walls, this.player);
        e.move(cols);
      });




      if (this.player.life == 0) {
        this.player.status == Status.die;
      }

      //console.log(this.player.life);

      this.clearDieObj();
      this.render();
      //己方坦克被摧毁就停止计时器
      if (this.goon == 1) {
        clearInterval(this.timer);
        this.init();
        this.update();
        this.keyLisetner();
        this.goon = 0;
        // this.func();
      }
      //console.log(this.enemyTankArr.length);
      if (this.enemyTankArr.length === 0) {
        
        this.tankNum++;
        this.init();
        this.update();
        this.keyLisetner();
      }

    }).bind(this), Config.gameUpdateTick);

  }

  keyLisetner() {
    document.addEventListener('keydown', (e) => {
      if ([87, 65, 83, 68].indexOf(e.keyCode) != -1) {
        if (this.controlKeys.indexOf(e.keyCode) == -1) {
          this.controlKeys.unshift(e.keyCode);
        }
      }
    });
    document.addEventListener('keyup', (e) => {
      let index = this.controlKeys.indexOf(e.keyCode);
      if (index != -1) {
        this.controlKeys.splice(index, 1);
      }
      if (e.keyCode == 32) {
        this.player.isShootting = false;
      }
    });
    document.addEventListener('keypress', (e) => {
      if (e.keyCode == 32) {
        if (!this.player.isShootting) {
          this.player.isShootting = true;
        }
      }
    });
  }
}