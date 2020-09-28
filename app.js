const memesGrid = document.querySelector('#grid');
const loader = document.querySelector('.loader');
const tc = [
  'OldSchoolCool',
  'dankmemes',
  'offlineTV',
  'shittymoviedetails',
  'AdviceAnimals'
];
let memesList = [];

const getMemes = async (nm = 9) => {
  let rn = Math.floor(Math.random()*tc.length);
  const rs = await fetch(`https://meme-api.herokuapp.com/gimme/${tc[rn]}/9`);
  return rs.json();
}

const popMemesGrid = (memes => {
  let html = '';
  memes['memes'].forEach(meme => {
    const gridItem = `
      <div class="grid-item">
        <img class="grid-img box-shadow" src="${meme.url}" alt="${meme.title}" onclick="fb_share(this)" title="click to share on fb">
        <h2>${meme.title}</h2>
        <div><span>${meme.subreddit}</span></div>
      </div>
    `;
    html += gridItem;
  });
  memesGrid.innerHTML += html;
  loader.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', function() {
  getMemes().then(res => { 
    console.log(res);
    popMemesGrid(res);
  });
});

window.onscroll = function(ev) {
  if ((window.innerHeight + window.pageYOffset - 45) >= document.body.offsetHeight) {
    loader.classList.toggle('hidden');
    getMemes(9).then(res => { popMemesGrid(res); });
    // console.log(tc[rn]);
  }
}

const fb_share = img => {
  u = img.src;
  t = img.getAttribute('alt');
  window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;
}
