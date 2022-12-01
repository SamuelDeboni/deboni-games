// Globals

function createGamesPage(gameData) {
  if (gameData === null || gameData === undefined) {
    // Create error page

    return;
  }

  for (let result of gameData) {

    // Create div
    let div = document.createElement("div");

    // Create title
    let tag = document.createElement("h2");
    tag.appendChild(document.createTextNode(result.name));
    div.appendChild(tag);

    // Create Image
    let image = document.createElement("img");
    image.src = result.background_image;
    div.appendChild(image);

    // Create Rating
    let rating = document.createElement("p");
    rating.innerHTML = "<b>Rating: </b>" + result.rating + "/" + result.rating_top;
    div.appendChild(rating);

    // Create Released
    let released = document.createElement("p");
    if (result.released != null) {
      let rd = result.released.split("-");
      released.innerHTML = "<b>Released:</b> "+rd[2] + "/" + rd[1] + "/" + rd[0]
      div.appendChild(released);
    }

    // Create publishers
    let plat = document.createElement("p");
    plat.innerHTML = "<b>Plataforms:</b>";
    for (let p of result.platforms) {
      plat.innerHTML += " " + p.platform.name + ";";
    }
    div.append(plat);

    // Create Link
    let link = document.createElement("a");
    link.href = "details.html?" + result.id;
    link.appendChild(document.createTextNode("Details"));
    div.appendChild(link);

    div.onclick = function() {
      window.location = link.href;
    }

    div.className = "game-div";
    document.getElementById("game-page").appendChild(div);
  }
}

function onClickSearch() {
  let input = document.getElementById("search-input");
  console.log(input.value);
  window.location = "search.html?" + input.value.replace(/\s+/g, " ");
}

function titleClick() {
  window.location = ".";
}

function searchMain() {
  let tags = window.location.href.split("?");
  let fetch_url = 'https://rawg.io/api/games?key=8086ef5754a84ad69e5e0adcdabd9698&page=1&search='+tags[1];
  console.log(fetch_url);
  let promisse = fetch(fetch_url);
  promisse.then(
    result => {
      result.json().then(
        result => {
          createGamesPage(result.results);
          console.log(result);
        },
        error => {
          console.log(error);
        }
      )
    },
    error => {
      console.log(error);
    }
  )
}

function windowMain() {
  let promisse = fetch('https://rawg.io/api/games?key=8086ef5754a84ad69e5e0adcdabd9698&page=1');
  promisse.then(
    result => {
      result.json().then(
        result => {
          createGamesPage(result.results);
          console.log(result);
        },
        error => {
          console.log(error);
        }
      )
    },
    error => {
      console.log(error);
    }
  )
}

function buildDetails(detail) {
  let page = document.getElementById("game-detail")

  // Create title
  let title = document.createElement("h1");
  title.appendChild(document.createTextNode(detail.name));
  page.appendChild(title);

  // Create Image
  let image = document.createElement("img");
  image.src = detail.background_image;
  page.appendChild(image);

  /*
  image = document.createElement("img");
  image.src = detail.background_image_additional;
  page.appendChild(image);
  */

  // Create genres
  let gen = document.createElement("p");
  gen.innerHTML = "<br/><b>Genres:</b>";
  for (let g of detail.genres) {
    gen.innerHTML += " " + g.name + ";";
  }

  page.append(gen);

  // Website
  let web = document.createElement("p");
  web.innerHTML = "<b>Website:</b><a href=" + detail.website + ">" + detail.website + "<a/><br/><br/>";
  page.appendChild(web);

  // description
  let descHeader = document.createElement("h2");
  descHeader.appendChild(document.createTextNode("Description:"));
  page.appendChild(descHeader);

  let desc = document.createElement("p");
  desc.innerHTML = "<br/>" + detail.description;
  page.appendChild(desc);
}

function detailMain() {
  let tags = window.location.href.split("?");
  console.log(tags);

  let promisse = fetch('https://rawg.io/api/games/' + tags[1] + '?key=8086ef5754a84ad69e5e0adcdabd9698');
  promisse.then(
    result => {
      result.json().then(
        result => {
          buildDetails(result);
          console.log(result);
        },
        error => {
          console.log(error);
        }
      )
    },
    error => {
      console.log(error);
    }
  )
}