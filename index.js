// index.js

// STATIC DOM ELEMENTS/////////////////////////////////
let divClassColumns = document.querySelector(".columns")
const newHoroBtn = document.querySelector("#new-horo-btn")
let selectTagVerb = document.createElement("select")
let selectTagNoun = document.createElement("select")
let selectTagAdj = document.createElement("select")
let heroBody = document.querySelector(".hero-body")
let form = document.createElement("form")

// let createLi = document.createElement("li")
// let createP = document.createElement("p")
// const classSection = document.querySelector(".section")


///////// HELPER METHODS ////////////////////////////////

    function handleWord(word, selectTag) {
      // let divBtn = document.querySelector("button")
      wordOption = document.createElement("option")
      wordOption.setAttribute("value", "word")
      wordOption.innerText = word.word
      selectTag.append(wordOption)
      form.append(selectTag)
    }

    // RANDOMIZE TEMPLATE ////////////////////////////////

    function random_item(items) {
      return items[Math.floor(Math.random()*items.length)];
     }

     // FORM HANDLER ///////////////////////////////////

    function formHandler(randomTemplate) {
      form.append(randomTemplate)
      return heroBody.append(form);
    }


    // REPLACE TEXT HELPER FUNCTION /////////////////////

    const replaceText = (quote, word) => {
      let select = ``;
      let uglyReg = new RegExp(word, 'g');
      let count = (quote.match(uglyReg) || []).length;
      let template = '';
      for (let i = 0; i < count; i++) {
        quote = quote.replace(word, 'SELECT');
        template = quote;
      }
      return template;
    };

    // console.log(replaceText(x, 'NOUN'));



// NEW HOROSCOPE EVENT LISTENER & READ FETCH ////////////

newHoroBtn.addEventListener("click", function(){
  // console.log("Hiii from the button");
  newHoroBtn.remove()


  fetch("http://localhost:3000/data")
    .then(res => res.json())
    .then(data => {
      // for (const prop in data) {
      // data.noun.forEach(word => {
        // console.log(data.adjectives);
        // console.log(data.nouns);
        // console.log(data.verbs);
        // console.log(data.templates);
        // data.adjectives.forEach(handleWord)
        data.nouns.forEach(noun => handleWord(noun, selectTagNoun))
        data.verbs.forEach(verb => handleWord(verb, selectTagVerb))
        data.adjectives.forEach(adj => handleWord(adj, selectTagAdj))

        // quote = random_item(data.template).content

        data.adjectives.forEach(adjective => {
          quote = random_item(data.template).content
          console.log(replaceText(quote, adjective));
        });
        // console.table(data.template);
        // console.log(quote);
        formHandler(quote)


      });
  });


  // INITIAL FETCH TO EXTERNAL API ///////////////////////

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
              <div class="column is-one-third">
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
