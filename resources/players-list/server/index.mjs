import alt from 'alt';

const getIdxInArray = (array, desiredName, desiredValue) => {
  const idx = array.map(element => {
    return element[desiredName]
  }).indexOf(desiredValue);
  return idx;
};

const menuOptions = { //names must match the names in options in main.js
  'Kick': {
    execute: (player) => {
      player.kick();
    }
  },
  'Kill': {
    execute: (player) => {
      player.health = 0;
    }
  }
}

let data = [];
alt.onClient('playersList:fetch', (player) => {
  data = [];
  alt.Player.all.forEach(player => {
    data.push({
      id: player.id,
      name: player.name,
      ping: player.ping
    });
  });
  alt.emitClient(player, 'playersList:update', data);
})

alt.onClient('playersList:optionExecute', (player, id, name) => {
  id = parseInt(id);
  const idx = getIdxInArray(data, 'id', id);
  menuOptions[name].execute(alt.Player.all[idx]);
});