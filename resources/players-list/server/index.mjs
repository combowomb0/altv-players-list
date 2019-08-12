import alt from 'alt';

alt.onClient('playersList:fetch', (player) => {
  const data = [];
  alt.Player.all.forEach(player => {
    data.push({
      id: player.id,
      name: player.name,
      ping: player.ping
    });
  });
  alt.emitClient(player, 'playersList:update', data);
})