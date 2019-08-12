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