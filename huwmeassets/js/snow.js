class Snow {
  constructor (opt = {}) {
      // 鏄惁鏄洦
      this.isRain = opt.isRain || false
      // 鍏冪礌
      this.el = null
      // 鍊炬枩鏂瑰悜
      this.dir = opt.dir || 'r'
      // 鐩村緞
      this.width = 0
      // 鏈€澶х洿寰 
      this.maxWidth = opt.maxWidth || 80
      // 鏈€灏忕洿寰 
      this.minWidth = opt.minWidth || 2
      // 閫忔槑搴 
      this.opacity = 0
      // 姘村钩浣嶇疆
      this.x = 0
      // 閲嶇疆浣嶇疆
      this.y = 0
      // z杞翠綅缃 
      this.z = 0
      // 姘村钩閫熷害
      this.sx = 0
      // 鏄惁宸﹀彸鎽囨憜
      this.isSwing = false
      // 宸﹀彸鎽囨憜鐨勬闀 
      this.stepSx = 0.02
      // 宸﹀彸鎽囨憜鐨勬寮﹀嚱鏁皒鍙橀噺
      this.swingRadian = 1
      // 宸﹀彸鎽囨憜鐨勬寮姝ラ暱
      this.swingStep = 0.01
      // 鍨傜洿閫熷害
      this.sy = 0
      // 鏈€澶ч€熷害
      this.maxSpeed = opt.maxSpeed || 4
      // 鏈€灏忛€熷害
      this.minSpeed = opt.minSpeed || 1
      // 蹇€熷垝杩囩殑鏈€澶ч€熷害
      this.quickMaxSpeed = opt.quickMaxSpeed || 10
      // 蹇€熷垝杩囩殑鏈€灏忛€熷害
      this.quickMinSpeed = opt.quickMinSpeed || 8
      // 蹇€熷垝杩囩殑瀹藉害
      this.quickWidth = opt.quickWidth || 80
      // 蹇€熷垝杩囩殑閫忔槑搴 
      this.quickOpacity = opt.quickOpacity || 0.2
      // 绐楀彛灏哄
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight

      this.init()
  }

  // 闅忔満鍒濆鍖栧睘鎬 
  init (reset) {
      let isQuick = Math.random() > 0.8
      this.isSwing = Math.random() > 0.8
      this.width = isQuick ? this.quickWidth : Math.floor(Math.random() * this.maxWidth + this.minWidth)
      this.opacity = isQuick ? this.quickOpacity : Math.random()
      this.x = Math.floor(Math.random() * (this.windowWidth - this.width))
      this.y = Math.floor(Math.random() * (this.windowHeight - this.width))
      if (reset && Math.random() > 0.8) {
          this.x = -this.width
      } else if (reset) {
          this.y = -this.width
      }
      this.sy = isQuick ? Math.random() * this.quickMaxSpeed + this.quickMinSpeed : Math.random() * this.maxSpeed + this.minSpeed
      this.sx = this.dir === 'r' ? this.sy : -this.sy
      this.z = isQuick ? Math.random() * 300 + 200 : 0
      this.swingStep = 0.01 * Math.random()
      this.swingRadian = Math.random() * (1.1 - 0.9) + 0.9
  }

  // 璁剧疆鏍峰紡
  setStyle () {
      this.el.style.cssText = `
          position: fixed;
          left: 0;
          top: 0;
          display: block;
          width: ${this.isRain ? 1 : this.width}px;
          height: ${this.width}px;
          opacity: ${this.opacity};
          background-image: radial-gradient(#fff 0%, rgba(255, 255, 255, 0) 60%);
          border-radius: 50%;
          z-index: 9999999999999;
          pointer-events: none;
          transform: translate(${this.x}px, ${this.y}px) ${this.getRotate(this.sy, this.sx)};
      `
  }

  // 娓叉煋
  render () {
      this.el = document.createElement('div')
      this.setStyle()
      document.body.appendChild(this.el)
  }

  move () {
      if (this.isSwing) {
          // if (this.sx >= 1 || this.sx <= -1) {
          //     this.stepSx = -this.stepSx
          // }
          // this.sx += this.stepSx
          if (this.swingRadian > 1.1 || this.swingRadian < 0.9) {
              this.swingStep = -this.swingStep
          }
          this.swingRadian += this.swingStep
          if (this.isRain) {
              this.x += this.sx
          } else {
              this.x += this.sx * Math.sin(this.swingRadian * Math.PI)
          }
          this.y -= this.sy * Math.cos(this.swingRadian * Math.PI)
      } else {
          this.x += this.sx
          this.y += this.sy
      }
      // 瀹屽叏绂诲紑绐楀彛灏辫皟涓€涓嬪垵濮嬪寲鏂规硶锛屽彟澶栬繕闇€瑕佷慨鏀逛竴涓媔nit鏂规硶锛屽洜涓洪噸鏂板嚭鐜版垜浠槸甯屾湜瀹冪殑y鍧愭爣涓 0鎴栬€呭皬浜 0锛岃繖鏍峰氨涓嶄細鍙堝嚟绌哄嚭鐜扮殑鎰熻锛岃€屾槸浠庡ぉ涓婁笅鏉ョ殑
      if (this.x < -this.width || this.x > this.windowWidth || this.y > this.windowHeight) {
        this.init(true)
        this.setStyle()
      }
      this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, ${this.z}px) ${this.getRotate(this.sy, this.sx)}`
    }

    getRotate(sy, sx) {
      return this.isRain ? `rotate(${sx === 0 ? 0 : (90 + Math.atan(sy / sx) * (180 / Math.PI))}deg)` : ''
    }
}

class Snows {
  constructor(opt = {}) {
      this.num = opt.num || 100
      this.opt = opt
      this.snowList = []
      this.createSnows()
      this.moveSnow()
  }
  createSnows () {
      this.snowList = []
      for (let i = 0; i < this.num; i++) {
          let snow = new Snow(this.opt)
          snow.render()
          this.snowList.push(snow)
      }
  }
  moveSnow () {
      window.requestAnimationFrame(() => {
          this.snowList.forEach((item) => {
              item.move()
          })
          this.moveSnow()
      })
  }
}

/* 涓嬮洦 */
// new Snows({
//   isRain: true,
//   num: 300,
//   maxSpeed: 15
// })

/* 涓嬮洩 */
var date = new Date()
var month = date.getMonth()
var day = date.getDate()
if (
  month === 12 && day >= 24 ||
  month === 0 || month === 1
) {
  new Snows({
    isRain: false,
    num: 120
  })
}