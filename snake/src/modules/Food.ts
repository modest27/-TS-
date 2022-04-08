// 定义食物类
class Food{
  // 定义一个属性表示食物对应的元素
  element: HTMLElement

  constructor() {
    // 获取页面中的food元素
    this.element = document.getElementById('food')!
  }

  // 定义一个获取食物X轴坐标的方法
  get X() {
    return this.element.offsetLeft
  }

  // 定义一个获取食物Y轴坐标的方法
  get Y() {
    return this.element.offsetTop
  }

  // 修改食物位置的方法
  change() {
    // 生成一个随机的位置
    // 食物位置是0-290
    // 蛇移动一次就是一格就是10，所以食物坐标必须是整10倍的数字
    let left = Math.round(Math.random() * 29) * 10
    let top = Math.round(Math.random() * 29) * 10
    

    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }

}

export default Food