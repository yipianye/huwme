const backgroundColors = [
  ['#00dbde','#fc00ff'],
  ['#1CB5E0','#000046'],
  ['#B06AB3','#4568DC'],
  ['#64b3f4','#c2e59c'],
  ['#8360c3','#2ebf91'],
  ['#00B4DB','#0083B0'],
  ['#ff9966','#ff5e62'],
  ['#43C6AC','#F8FFAE'],
  ['#FC354C','#0ABFBC'],
  ['#26D0CE','#1A2980'],
  ['#348F50','#56B4D3'],
  ['#20BDFF','#A5FECB'],
  ['#79CBCA','#77A1D3'],
  ['#EB3349','#F45C43'],
  ['#d53369','#cbad6d'],
]
const sw = window.innerWidth
const sh = window.innerHeight
const pixelRatio = 2
const size = sw / 10
const maxSize = 50
const $info = document.getElementById('info')
const canvas = document.getElementById('canvase')
const ctx = canvas.getContext("2d")
const leon = new LeonSans({
  size: size <= maxSize ? size : maxSize,
  text: CD\. N\n\nContent Delivery Network',
  color: ['#fff'],
  leading: -2,
  weight: 300
})

canvas.width = sw * pixelRatio
canvas.height = sh * pixelRatio
ctx.scale(pixelRatio, pixelRatio)

const x = (sw - leon.rect.w) / 2
const y = (sh - leon.rect.h) / 5
const infoTop = y + leon.rect.h + 30
$info.style.top = infoTop + 'px'

let idx = getIdx()
let starting = false
function getIdx() {
  const max = 15
	return Math.floor(Math.random() * max)
}

function start() {
  // 修改年份
  const $box = document.getElementById('year')
  $box.innerText = (new Date).getFullYear()

  // leon.reset()
  if (starting) {
    return
  }

  starting = true
  idx = getIdx()
  let i, total = leon.drawing.length;
  for (i = 0; i < total; i++) {
    TweenMax.fromTo(leon.drawing[i], 1.1, {
      value: 0
    }, {
      delay: i * 0.05,
      value: 1,
      ease: Power4.easeOut
    });
  }
  setTimeout(function () {
    starting = false
  }, 2800)
}

function animate() {
  requestAnimationFrame(animate)

  ctx.clearRect(0, 0, sw, sh)

  const grad  = ctx.createLinearGradient(0, 0, sw, sh)
  const backgroundColor = backgroundColors[idx]
  grad.addColorStop(0,backgroundColor[0])
  grad.addColorStop(1,backgroundColor[1])
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, sw, sh)

  leon.position(x, y)

  leon.draw(ctx)
  // leon.grid(ctx)
  // leon.drawColorful(ctx)
}

canvas.addEventListener('click', start)

start()
requestAnimationFrame(animate)
