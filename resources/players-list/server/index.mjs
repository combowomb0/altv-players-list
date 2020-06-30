import * as alt from 'alt-server';

const options = {
  'Kick': {
    execute: (player) => player.kick()
  },
  'Kill': {
    execute: (player) => player.health = 0
  }
};

alt.onClient('playersList:getOptions', (player) => {
  alt.emitClient(player, 'playersList:setOptions', Object.keys(options));
});

alt.onClient('playersList:getPlayers', (player) => {
  alt.emitClient(player, 'playersList:setPlayers', alt.Player.all.map(player => ({
    id: player.id,
    name: player.name,
    ping: player.ping
  })));
});

alt.onClient('playersList:optionExecute', (_, id, optionName) => {
  const player = alt.Player.all.find(player => player.id === id);

  if (player) {
    options[optionName].execute(player);
  }
});
