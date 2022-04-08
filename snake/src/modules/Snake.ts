class Snake{
  // 表示蛇头的元素
  head: HTMLElement
  // 蛇的身体（包括蛇头）
  bodies: HTMLCollection
  // 获取蛇的容器
  element: HTMLElement

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake>div')!
    this.bodies = this.element.getElementsByTagName('div')!
  }

  // 获取蛇的坐标（蛇头）
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }

  // 设置蛇的坐标
  set X(value) {
    // 如果新值和旧值相同，则不再修改
    if (this.X === value) return
    
    // 判断X是否在合法范围
    if (value < 0 || value > 290) {
      // 说明蛇撞墙了
      throw new Error('蛇撞墙了!')
    }

    // 修改X时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右调头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // 如果发生了调头，让蛇反方向继续移动
      if (value > this.X) {
        // 新值大于旧值，则说明蛇本身是在向左，所以让它继续向左
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }

    // 移动身体
    this.moveBody()
      
    this.head.style.left = value + 'px'
    // 检查头有没有撞到身体
    this.checkHeadBody()
  }
  set Y(value) {
    // 如果新值和旧值相同，则不再修改
    if (this.Y === value) return
    
     // 判断Y是否在合法范围
     if (value < 0 || value > 290) {
      // 说明蛇撞墙了
      throw new Error('蛇撞墙了!')
    }

    // 修改Y时，是在修改垂直坐标，蛇在上下移动，蛇在向下移动时，不能向上调头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果发生了调头，让蛇反方向继续移动
            if (value > this.Y) {
              // 新值大于旧值，则说明蛇本身是在向上，所以让它继续向上
              value = this.Y - 10
            } else {
              value = this.Y + 10
            }
    }

     // 移动身体
     this.moveBody()

    this.head.style.top = value + 'px'
    // 检查头有没有撞到身体
    this.checkHeadBody()
  }

  // 蛇增加身体的方法
  addBody() {
    // 想容器里面添加一个蛇的身体
    let div = document.createElement('div')
    this.element.insertAdjacentElement('beforeend', div)
  }

  // 添加一个蛇身体移动的方法
  moveBody() {
    // 从后往前设置每一节身体等于前面一节的位置
    // 遍历获取所有的身体
    for (let i = this.bodies.length - 1; i > 0; i--){
      // 获取前面身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      
      // 将值设置到当前的身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';

    }
  }

  // 检查头和身体有没有相撞
  checkHeadBody() {
    // 获取所有身体，检查是否和头坐标重叠
    for (let i = 1; i < this.bodies.length; i++){
      let bd = this.bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 说明撞到了身体，游戏结束
        throw new Error('撞到了自己! ')
      }
    }
  }
}

export default Snake