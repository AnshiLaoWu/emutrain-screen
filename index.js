function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'});
  document.getElementById('timeDisplay').textContent = timeStr;
}
updateTime();
setInterval(updateTime, 1000);

var text = 0;
var lines;
$.get('./text.txt')
  .done(function(data) {
    lines = data.split("\n");
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
    } else {
      marquee.style.left = newPos + 'px';
      requestAnimationFrame(animate);
    }
  }
  animate();
}
window.onload = function() {
  checkMarqueeComplete();
};