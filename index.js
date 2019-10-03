// const classSection = document.querySelector(".section")

// STATIC DOM ELEMENTS/////////////////////////////////
let divClassColumns = document.querySelector(".columns")
const newHoroBtn = document.querySelector("#new-horo-btn")
let selectTag = document.createElement("select")
let heroBody = document.querySelector(".hero-body")
// let createLi = document.createElement("li")
// let createP = document.createElement("p")




newHoroBtn.addEventListener("click", function(){
  // console.log("Hiii from the button");

  fetch("http://localhost:3000/data")
    .then(res => res.json())
    .then(data => {
      // for (const prop in data) {
      // data.noun.forEach(word => {
        // console.log(data.adjectives);
        // console.log(data.nouns);
        // console.log(data.verbs);
        // console.log(data.templates);
        data.adjectives.forEach(handleAdjective)
      });

    function handleAdjective(adjective) {
      let divBtn = document.querySelector("button")
      adjOption = document.createElement("option")
      adjOption.setAttribute("value", "adjective")
      adjOption.innerText = adjective.word
      selectTag.append(adjOption)
      heroBody.append(selectTag)
    }

    // }
  });


  // INITIAL FETCH //////////////////////////////////////
  fetch("https://www.horoscopes-and-astrology.com/json")
      .then(res => res.json())
      .then(data => {
          for (const prop in data) {
          // console.log(`data.${prop} = ${data[prop]}`);
          // console.log(data.dates);
          // console.log(data.dailyhoroscope)
            data.titles.forEach(title => {
            // console.log(data.dates[title]);
            newHoro = divClassColumns.innerHTML += `
              <div class="column">
              <div class="card">
                <div class="card-content">
                  <h2 class="title">${title}</h2>
                  <h3 class="subtitle">${data.dates[title]}</h2>
                  <p>${data.dailyhoroscope[title]}</p>
                </div>
                <footer class="card-footer">
                  <div class="card-footer-item">
                    <a href="#" class="button is-success">
                      <i class="fa fa-thumbs-o-up"></i>
                    </a>
                  </div>
                  <div class="card-footer-item">
                    <a href="#" class="button is-danger">
                      <i class="fa fa-thumbs-o-down"></i>
                    </a>
                  </div>
                  <div class="card-footer-item">
                    <a href="#" class="button is-info">
                      <i class="fa fa-retweet"></i>
                    </a>
                  </div>
                </footer>
              </div>
              </div>
            </div>
              `
          });
        }
        });
