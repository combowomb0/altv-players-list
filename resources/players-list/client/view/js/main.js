const players = document.querySelector('.players');
const template = document.querySelector('.template');

window.addEventListener('load', () => {
  alt.emit('playersList:loaded');
});

alt.on('playersList:show', () => {
  document.body.hidden = false;
});

alt.on('playersList:hide', () => {
  document.body.hidden = true;
  if (menu.isShowed()) menu.hide();
});

alt.on('playersList:update', (data) => {
  for(let i = 1; i < players.childElementCount; i++)
    players.children[i].remove();
  data.forEach(element => {
    const clone = template.cloneNode(true);
    clone.hidden = false;
    clone.querySelector('.id').innerHTML = element.id;
    clone.querySelector('.name').innerHTML = element.name;
    clone.querySelector('.ping').innerHTML = element.ping;
    players.append(clone);
  });
});

class Menu {
  constructor() {
    this.element = document.querySelector('.dropdown');
    this.primaryColor = '#ececff';
  }
  hide() {
    this.highlight.style.backgroundColor = '';
    this.element.hidden = true;
  }
  show() {
    this.element.hidden = false;
  }
  isShowed() {
    return !this.element.hidden;
  }
  highlightRow(node) {
    this.highlight = node;
    node.style.backgroundColor = this.primaryColor;
  }
  getTarget() {
    return this.target;
  }
  setTarget(node) {
    this.target = node;
  }
  render() {
    this.show();
    const mouseCoords = {
      x: event.pageX,
      y: event.pageY
    };
    this.element.style.left = `${mouseCoords.x}px`;
    this.element.style.top = `${mouseCoords.y}px`;
    const menuCoords = this.element.getBoundingClientRect();
    const clientHeight = document.documentElement.clientHeight;
    if (menuCoords.top + this.element.offsetHeight > clientHeight)
      this.element.style.top = parseInt(this.element.style.top) - this.element.offsetHeight + 'px';
  }
}

const menu = new Menu();
players.addEventListener('click', () => {
  const target = event.target.parentNode;
  if (!target.classList.contains('row')) return;
  if (menu.isShowed()) return menu.hide();
  menu.setTarget(target);
  menu.highlightRow(target);
  menu.render();
});

players.addEventListener('mousewheel', () => {
  if (menu.isShowed()) menu.hide();
});

const menuOptions = document.querySelector('.dropdown__list');
const options = ['Kick', 'Kill']; ////names must match the names in menuOptions in index.mjs
options.forEach(key => {
  const li = document.createElement('li');
  li.className = 'dropdown__item';
  li.innerHTML = key;
  menuOptions.append(li);
});

menuOptions.addEventListener('click', () => {
  const target = event.target;
  if (!target.classList.contains('dropdown__item')) return;
  const row = menu.getTarget();
  const id = row.querySelector('.id').innerHTML;
  alt.emit('playersList:optionExecute', id, target.innerHTML);
  menu.hide();
});