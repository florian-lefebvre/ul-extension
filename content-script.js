const style = (node, styles) =>
  Object.keys(styles).forEach((key) => (node.style[key] = styles[key]));

const randomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createUl = ({ top, right, bottom, left }) => {
  top = top?.toString();
  right = right?.toString();
  bottom = bottom?.toString();
  left = left?.toString();
  const el = document.createElement("div");
  el.innerHTML = "UL";
  style(el, {
    top,
    right,
    bottom,
    left,
    backgroundColor: "red",
    color: "white",
    position: "fixed",
    zIndex: "9999999999",
    border: "1px solid white",
  });
  return el;
};

const uls = [
  { top: 0, left: 0 },
  { top: 0, right: 0 },
  { bottom: 0, right: 0 },
  { bottom: 0, left: 0 },
].map((e) => ({ el: createUl(e), show: true }));

const i = randomInRange(0, uls.length - 1);
uls[i].show = false;

for (const ul of uls.filter((e) => e.show)) {
  document.body.appendChild(ul.el);
}

document.addEventListener("mousemove", (e) => {
  const x = e.pageX;
  const y = e.pageY;
  const WIDTH = 30;
  const HEIGHT = 25;

  const handleDisplay = (index, condition) => () => {
    const { el, show } = uls[index];
    if (condition(x, y) && show) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  };
  const handlers = [
    handleDisplay(0, (x, y) => x < WIDTH && y < HEIGHT), // top left
    handleDisplay(1, (x, y) => x > window.innerWidth - WIDTH && y < HEIGHT), // top right
    handleDisplay(
      2,
      (x, y) => x > window.innerWidth - WIDTH && y > window.innerHeight - HEIGHT
    ), // bottom right
    handleDisplay(3, (x, y) => x < WIDTH && y > window.innerHeight - HEIGHT), // bottom left
  ];

  for (const handler of handlers) {
    handler();
  }
});
