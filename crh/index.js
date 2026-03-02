var text = 1;
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
  const speed = Math.max(Math.floor(marquee.scrollWidth / 2100), 1);
  function animate() {
    const currentPos = parseInt(marquee.style.left);
    const newPos = currentPos - speed;
    if (newPos + marquee.scrollWidth < 0) {
      marquee.style.left = (container.offsetWidth + 10) + 'px';
      text = (text + 1) % lines.length;
      if (text === 0) text = 1;
      marquee.innerHTML = lines[text];
      setTimeout(animate, 1000);
    } else {
      marquee.style.left = newPos + 'px';
      requestAnimationFrame(animate);
    }
  }
  animate();
}