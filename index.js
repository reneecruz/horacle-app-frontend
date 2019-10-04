// index.js

// DOM ELEMENTS/////////////////////////////////
let divClassColumns = document.querySelector(".columns")
const newHoroBtn = document.querySelector("#new-horo-btn")
let selectTagVerb = document.createElement("select")
let selectTagNoun = document.createElement("select")
let selectTagAdj = document.createElement("select")
let heroBody = document.querySelector(".hero-body")
let form = document.createElement("form")
let madlib = ""
let newHoroH1 = document.createElement("h1")
let newHoroUl = document.createElement("ul")
let newHoroLi = document.createElement("li")
let newHoroSection = document.querySelector("section")


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

    function formHandler(randomTemplate, id) {
      let submitBtn = document.createElement("submit")
      form.dataset.id = id
      submitBtn.innerHTML = `<input type="submit">`
      form.append(submitBtn)
      // form.append(randomTemplate)
      return heroBody.append(form);
    }


    // REPLACE TEXT HELPER FUNCTION /////////////////////

    const replaceText = (quote, data) => {
      madlib = quote
      let verbCount = (quote.match(new RegExp("VERB", 'g')) || []).length;
      let nounCount = (quote.match(new RegExp("NOUN", 'g')) || []).length;
      let adjectiveCount = (quote.match(new RegExp("ADJECTIVE", 'g')) || []).length;
      //
      //
      //
      //
      //
      //
      //
      // debugger
      // let select = ``;
      let uglyReg = w => new RegExp(w, 'g');
      // let count = (quote.match(uglyReg) || []).length;
      // let template = '';
      // let optionsString = ""
      // arr.forEach(wordObj => {
      //   optionsString += `<option>${wordObj.word}</option>`
      // })
      // let tag = `<select>${optionsString}<select>`
      let newQuote = quote
      console.log(quote);
      // Verbs
      let verbOptionsString = ""
      data.verbs.forEach(wordObj => {
        verbOptionsString += `<option data-id=${wordObj.id}>${wordObj.word}</option>`
      })
      let verbTag = `<select name="verb">${verbOptionsString}<select>`
      for (let i = 0; i < verbCount; i++) {
        newQuote = newQuote.replace(uglyReg("VERB"), verbTag);
      }
      // nouns
      let nounOptionsString = ""
      data.nouns.forEach(wordObj => {
        // nounId = wordObj.id
        nounOptionsString += `<option data-id=${wordObj.id}>${wordObj.word}</option>`
      })
      let nounTag = `<select name="noun">${nounOptionsString}<select>`
      for (let i = 0; i < nounCount; i++) {
        newQuote = newQuote.replace(uglyReg("NOUN"), nounTag);
      }
      // Adjectives
      let adjOptionsString = ""
      data.adjectives.forEach(wordObj => {
        adjOptionsString += `<option data-id=${wordObj.id}>${wordObj.word}</option>`
      })
      let adjTag = `<select name="adjective">${adjOptionsString}<select>`
      for (let i = 0; i < adjectiveCount; i++) {
        newQuote = newQuote.replace(uglyReg("ADJECTIVE"), adjTag);
      }

      return newQuote;
    };

    // console.log(replaceText(x, 'NOUN'));



// NEW HOROSCOPE EVENT LISTENER & READ FETCH ////////////

newHoroBtn.addEventListener("click", function(){
  // console.log("Hiii from the button");
  // newHoroBtn.remove()


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

        // data.adjectives.forEach(adjective => {
        //   quote = random_item(data.template).content
        //   console.log(replaceText(quote, "ADJECTIVE", data.adjectives, selectTagAdj));
        // });
        let template = random_item(data.template)
        let quote = template.content
        let templateId = template.id

        form.innerHTML = replaceText(quote, data)
        // form.innerHTML = replaceText(quote, "NOUN", data.nouns)
        // form.innerHTML = replaceText(quote, "VERB", data.verbs)
        // (quote, word, arr, tag)

        // data.nouns.forEach(noun => handleWord(noun, selectTagNoun))
        // data.verbs.forEach(verb => handleWord(verb, selectTagVerb))
        // data.adjectives.forEach(adj => handleWord(adj, selectTagAdj))

        // quote = random_item(data.template).content


        // console.table(data.template);
        // console.log(quote);
        formHandler(quote, templateId)

      });
  });

  form.addEventListener('submit', event => {
      event.preventDefault();

      let templateId = form.dataset.id
      let wordBank = [];
      let wordIds = {};
      event.target.querySelectorAll('SELECT').forEach(d => {

        let spanTag = document.createElement("span")
        spanTag.innerText = d.value
        spanTag.id = d.name
        let optionTags = d.querySelectorAll('option')
        for (let optionTag of optionTags) {
          if (optionTag.innerText === d.value) {
            wordIds[`${d.name}_id`] = optionTag.dataset.id
            // spanTag.dataset.id = optionTag.dataset.id
            break
          }
        }
        // debugger;
        // spanTag.dataset.id = d.value.dataset.id
        // console.log(d);

        form.replaceChild(spanTag, d)
        wordBank.push( {[d.name]: d.value });
      })
      // console.log(form.innerText)
      // console.log(wordBank);

  // POST FETCH CREATE NEW HOROSCOPE //////////////////////

  fetch('http://localhost:3000/horoscopes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        ...wordIds,
        'template_id': templateId

      })
    })
    .then(res => res.json())
    .then((obj_new_horo) => {
      form.remove()
      console.log(obj_new_horo);
      console.log(obj_new_horo.text);

      const newHoroText = obj_new_horo.text
      const newerHoroH1 = document.createElement("h1")
      newerHoroH1.innerText = newHoroText
      newerHoroH1.setAttribute("class", "new-horo-h1")
      heroBody.append(newerHoroH1)
      const delButton = document.createElement("button")
      const reverseButton = document.createElement("button")
      reverseButton.innerText = "Reverse"
      console.log(reverseButton);
      delButton.innerText = "Delete"
      delButton.addEventListener("click", e => {
        newerHoroH1.remove()

        fetch(`http://localhost:3000/horoscopes/${obj_new_horo.id}`, {method: "DELETE"})
        delButton.remove()
      })
      heroBody.append(reverseButton)

      reverseButton.addEventListener("click", e => {
        console.log(event.target.dataset.id);
        horoText = event.target.innerText
        revString = horoText.split('').reverse().join('')

        fetch(`http://localhost:3000/templates/${event.target.dataset.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: revString
          })
        })
        .then(res => res.json())
        .then(data => {
          let revStringDiv = document.createElement("div")
          let revStringP = document.createElement("p")
          revStringDiv.setAttribute("class", "new-horo-h1")
          revStringP.innerText = revString
          revStringDiv.append(revStringP)

          heroBody.append(revStringDiv)
        })

      })
      heroBody.append(delButton)
    })
// }


// DELETE REQUEST FETCH ////////////////////////////////

// fetch(`/horoscopes/${id}`, {method: 'DELETE'})
//     .then(res => res.json())
//     .then(res => {
//       console.log('Deleted:', res.message)
//       return res
//     })

})
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

    fetch("http://localhost:3000/horoscopes")
      .then(response => response.json())
      .then(horoscopes => {
        // debugger
        const newHoroText = horoscopes[horoscopes.length - 1].text
        const newerHoroH1 = document.createElement("h1")
        newerHoroH1.innerText = newHoroText
        newerHoroH1.setAttribute("class", "new-horo-h1")
        newerHoroH1.dataset.id = horoscopes[horoscopes.length - 1].id
        heroBody.append(newerHoroH1)
        const delButton = document.createElement("button")
        delButton.innerText = "Delete"
        delButton.dataset.id = horoscopes[horoscopes.length - 1].id
        delButton.addEventListener("click", e => {
          newerHoroH1.remove()
          fetch(`http://localhost:3000/horoscopes/${delButton.dataset.id}`, {
            method: "DELETE"
          })
          delButton.remove()
        })
        heroBody.append(delButton)
      })
