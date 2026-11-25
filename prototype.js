const player = document.querySelector('.prototype');
const select = player.querySelector('select');
const launch = player.querySelector('.launch');
const stage = player.querySelector('.stage');
const poster = stage.querySelector('.poster');
const external = player.querySelector('.external');
let frame;
function sync() {
  const id = select?.value || player.dataset.start;
  const link = new URL(external.href);
  link.searchParams.set('node-id', id.replace(':', '-'));
  link.searchParams.set('starting-point-node-id', id);
  link.searchParams.set('scaling', 'scale-down-width');
  external.href = link;
  if (select) {
    const option = select.selectedOptions[0];
    poster.src = 'assets/' + option.dataset.img + '.webp';
    poster.alt = 'Превью: ' + option.textContent;
  }
  if (frame) {
    link.hostname = 'embed.figma.com';
    link.searchParams.set('embed-host', 'portfolio');
    frame.src = link;
  }
}
select?.addEventListener('change', sync);
launch.addEventListener('click', () => {
  if (frame) {
    frame.remove();
    frame = undefined;
    poster.hidden = false;
    launch.textContent = 'Запустить прототип';
  } else {
    frame = document.createElement('iframe');
    frame.title = 'Интерактивный прототип — ' + document.querySelector('h1').textContent;
    frame.allowFullscreen = true;
    sync();
    poster.hidden = true;
    stage.append(frame);
    launch.textContent = 'Вернуться к превью';
  }
});
sync();
