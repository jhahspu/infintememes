const memesGrid = document.querySelector('#grid');
const loader = document.querySelector('.loader');
const tc = [
  'OldSchoolCool',
  'dankmemes',
  'offlineTV',
  'Wellthatsucks',
  'shittymoviedetails',
  'awfuleverything',
  'DarK',
  'Instagramreality',
  'iamverybadass',
  'SweatyPalms',
  'ShittyLifeProTips',
  'HumansAreMetal',
  'marvelstudios',
  'AdviceAnimals',
  'thatHappened'

];

const getMemes = async () => {
  let rn = Math.floor(Math.random()*tc.length);
  const res = await fetch(`https://meme-api.herokuapp.com/gimme/${tc[rn]}/9`);
  // const res = await fetch(`https://meme-api.herokuapp.com/gimme/AdviceAnimals/5`);
  return res.json();
}

const popMemesGrid = (memes => {
  console.log(memes);
  let html = '';
  memes['memes'].forEach(meme => {
    const gridItem = `
      <div class="grid-item">
        <img class="grid-img" src="${meme.url}" alt="${meme.title}">
      </div>
    `;
    html += gridItem;
  });
  memesGrid.innerHTML += html;
  loader.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', function() {

  getMemes().then(res => { popMemesGrid(res);  });
  

});

window.onscroll = function(ev) {
  if ((window.innerHeight + window.pageYOffset - 45) >= document.body.offsetHeight) {
    loader.classList.toggle('hidden');
    getMemes().then(res => { popMemesGrid(res); });
    // console.log(tc[rn]);
    
  }
}