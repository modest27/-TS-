import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器，控制其他所有类
class GameControl{
  // 定义三个属性
  // 蛇
  snake: Snake
  // 食物
  food: Food
  //积分牌
  scorePanel: ScorePanel

  // 创建一个属性，来存储蛇的移动方向（也就是按键方向）
  direction: string = ''

  // 创建一个属性，判断游戏是否结束
  isLive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()

    this.init()
  }

  // 游戏的初始化方法
  init() {
    // 绑定键盘按键按下的事件
    document.addEventListener('keydown', this.keyDownHandker.bind(this))
    this.run()
  }

  // 创建一个键盘按下的响应函数
  keyDownHandker(event: KeyboardEvent) {
    // 需要先检查用户是否按了正确的按键
    // 修改方向

    this.direction = event.key
  }

  // 创建一个蛇移动的方法
  run() {
    // 根据方向让蛇移动
    let X = this.snake.X
    let Y = this.snake.Y

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        // 向上移动
        Y -= 10
        break
      case 'ArrowDown':
      case 'Down':
        // 向下移动
        Y += 10
        break
      case 'ArrowLeft':
      case 'Left':
        // 向左移动
        X -= 10
        break
      case 'ArrowRight':
      case 'Right':
        // 向右移动
        X += 10
        break
    }

    // 检查蛇是否吃到了食物
    this.checkEat(X, Y)

    // 修改蛇的X和Y
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (err:any) {
      // 进入catch说明出现异常，撞墙了
      alert(err.message + ' Game Over!')
      // 同时将isLive设置为false
      this.isLive = false
    }

    // 开起一个定时器
   this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level)*30);
  }

  // 定义一个方法，检查蛇是否吃到食物
  checkEat(X:number, Y:number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 吃到食物后，食物位置要重置
      this.food.change()
      // 分数要增加
      this.scorePanel.addScore()
      // 蛇增加一节
      this.snake.addBody()
    }
  }

}

export default GameControl