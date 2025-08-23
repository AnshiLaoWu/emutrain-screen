function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'});
  document.getElementById('timeDisplay').textContent = timeStr;
}
updateTime();
setInterval(updateTime, 1000);

function hasChinese(str) {
    return /\p{Script=Han}/u.test(str);
}

var text = 3;
var fileInput = document.getElementById('fileInput');
var lines = [];
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const content = e.target.result;
      lines.push(...content.split(/\r?\n/));
      document.getElementById('coach').innerHTML = lines[0];
      document.getElementById('text').innerHTML = lines[text];
      if (hasChinese(lines[text])) {
        document.getElementById('temp').innerHTML = '内温&nbsp;' + lines[1] + '&nbsp;℃&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;外温&nbsp;' + lines[2] + '&nbsp;℃';
        document.getElementById('temp').style.left = '520px';
      } else {
        document.getElementById('temp').innerHTML = 'IN&nbsp;TEMP&nbsp;' + lines[1] + '&nbsp;℃&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EX&nbsp;TEMP&nbsp;' + lines[2] + '&nbsp;℃';
        document.getElementById('temp').style.left = '450px';
      }
      checkMarqueeComplete();
    };
    reader.readAsText(file);
  }
  document.getElementById('fileInput').style.display = 'none';
});

function checkMarqueeComplete() {
  const marquee = document.getElementById('text');
  const container = document.querySelector('.marquee-container');
  marquee.style.left = (container.offsetWidth + 10) + 'px';
  const speed = Math.max(Math.floor(marquee.scrollWidth / 1000), 1);
  function animate() {
    const currentPos = parseInt(marquee.style.left);
    const newPos = currentPos - speed;
    if (newPos + marquee.scrollWidth < 0) {
      marquee.style.left = (container.offsetWidth + 10) + 'px';
      text = (text + 1) % lines.length;
      marquee.innerHTML = lines[text];
      setTimeout(animate, 1000);
      if (hasChinese(lines[text])) {
        document.getElementById('temp').innerHTML = '内温&nbsp;' + lines[1] + '&nbsp;℃&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;外温&nbsp;' + lines[2] + '&nbsp;℃';
        document.getElementById('temp').style.left = '520px';
      } else {
        document.getElementById('temp').innerHTML = 'IN&nbsp;TEMP&nbsp;' + lines[1] + '&nbsp;℃&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EX&nbsp;TEMP&nbsp;' + lines[2] + '&nbsp;℃';
        document.getElementById('temp').style.left = '450px';
      }
    } else {
      marquee.style.left = newPos + 'px';
      requestAnimationFrame(animate);
    }
  }
  animate();
}