const players = document.querySelector('.players');
const template = document.querySelector('.template');
const menuOptions = document.querySelector('.dropdown__list');

if ('alt' in window) {
  alt.emit('playersList:loaded');
}

alt.on('playersList:show', () => document.body.hidden = false);

alt.on('playersList:hide', () => {
  document.body.hidden = true;

  if (menu.isShowed()) {
    menu.hide();
  };
});

alt.on('playersList:setPlayers', (allPlayers) => {
  players.innerHTML = '';

  allPlayers.forEach(player => {
    const clone = template.cloneNode(true);
    clone.hidden = false;
    clone.querySelector('.id').innerText = player.id;
    clone.querySelector('.name').innerText = player.name;
    clone.querySelector('.ping').innerText = player.ping;
    players.append(clone);
  });
});

alt.on('playersList:setOptions', (options) => {
  options.forEach(label => {
    const li = document.createElement('li');
    li.className = 'dropdown__item';
    li.innerText = label;
    menuOptions.append(li);
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

    if (menuCoords.top + this.element.offsetHeight > clientHeight) {
      this.element.style.top = parseInt(this.element.style.top) - this.element.offsetHeight + 'px';
    }
  }
}

const menu = new Menu();

players.addEventListener('click', () => {
  const target = event.target.parentNode;

  if (menu.isShowed()) {
    menu.hide();

    return;
  };

  if (target.classList.contains('row')) {
    menu.setTarget(target);
    menu.highlightRow(target);
    menu.render();
  }
});

players.addEventListener('mousewheel', () => {
  if (menu.isShowed()) {
    menu.hide();
  };
});

menuOptions.addEventListener('click', () => {
  const target = event.target;

  if (target.classList.contains('dropdown__item')) {
    const row = menu.getTarget();
    const id = parseInt(row.querySelector('.id').innerText, 10);
    alt.emit('playersList:optionExecute', id, target.innerText);
    menu.hide();
  }
});
