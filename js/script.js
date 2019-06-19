let searchForm = document.querySelector('.search__form');
let searchSubmit = document.querySelector('.search__submit');
let content = document.querySelector('.row.content');

function apiSearch(event){
event.preventDefault();
let searchText = document.querySelector('.search__text').value;
server = 'https://api.themoviedb.org/3/search/multi?api_key=d74067b4d63689bd8b2da28744f99141&language=ru&query=' + searchText;
requestApi('GET',server)
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url){
let request = new XMLHttpRequest();
request.open(method, url);
request.send();
request.addEventListener('readystatechange', () =>{
    if(request.readyState !== 4){
        return;
    }
    if(request.status !== 200){
        console.log('error ' + request.status);
        return;
    }
    let inner = '';
    let output = JSON.parse(request.responseText);
    output.results.forEach(function(item){
        console.log(item)
        let title = item.title || item.name;
        let poster = item.poster_path;
        let date = item.release_date || item.first_air_date;
        let descr = item.overview.substring(0,150) + '...';
        let rating = item.vote_average;
        inner += 
        `<div class="col-4">
            <div class="movie__card">
                <h2 class="movie__title">${title}</h2>
                <a class="movie__poster" href="https://image.tmdb.org/t/p/w500${poster}"><img src="https://image.tmdb.org/t/p/w500${poster}" alt=""></a>\
                <p class="movie__date">Дата выхода:<span> ${date}</span></p>
                <p class="movie__descr">Описание:<span> ${descr}</span></p>
                <p class="movie__rating">Рейтинг:<span> ${rating}</span></p>
                <a class="movie__more" href="#">Подробнее</a>
            </div>
        </div>`;
    })
    content.innerHTML = inner;
})
}