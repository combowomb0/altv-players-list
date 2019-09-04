import alt from 'alt';

const playerList = {
  isLoaded: false,
  isShowed: false,
  view: null
}

alt.on('connectionComplete', () => {
  playerList.view = new alt.WebView('http://resource/client/view/index.html');
  playerList.view.on('playersList:loaded', () => {
    playerList.isLoaded = true;
  });
  playerList.view.on('playersList:optionExecute', (id, name) => {
    alt.emitServer('playersList:optionExecute', id, name);
  });
});

alt.on('keydown', (key) => {
  if (key === 'Y'.charCodeAt(0) && playerList.isLoaded) {
    if(playerList.isShowed) {
      playerList.view.emit('playersList:hide');
      playerList.isShowed = false;
      playerList.view.unfocus();
      alt.showCursor(false);
      alt.toggleGameControls(true);
    } else {
      playerList.view.emit('playersList:show');
      alt.emitServer('playersList:fetch');
      playerList.isShowed = true;
      playerList.view.focus();
      alt.showCursor(true);
      alt.toggleGameControls(false);
    }
  }
});

alt.onServer('playersList:update', (data) => {
  playerList.view.emit('playersList:update', data);
});