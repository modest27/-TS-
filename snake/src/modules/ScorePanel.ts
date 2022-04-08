// 定义表示积分的类
class ScorePanel{
  // 记录分数和等级
  score = 0
  level = 1

  // 分数和等级所在的元素，在构造函数中进行初始化
  socreEle: HTMLElement
  levelEle: HTMLElement

  // 设置一个变量限制等级
  maxLevel: number

  // 设置一个变量表示多少分升级
  upScore: number
  
  constructor(maxLevel:number = 10, upScore:number = 10) {
    this.socreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 设置一个加分的方法
  addScore() {
    // 使分数增加
    this.score++
    this.socreEle.innerHTML = this.score + ''
    // 每当分数大于每10时，就升级
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }

  // 提示等级的方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++
      this.levelEle.innerHTML = this.level + ''
    }
  }
}

export default ScorePanel