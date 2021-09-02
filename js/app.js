
const displayResults = document.getElementById('search-results');
const resultCounts = document.getElementById('results-count');
const blankInputWarning = document.getElementById('warning-msg'); 
const wrongInputWarning = document.getElementById('info-msg');



const searchBook = () =>{

    // Get Input Value 
    const serachInput = document.getElementById('search-input');
    const searchText = serachInput.value ;
    
    // Clear Input Value 
    serachInput.value = '';

    // Validation 
      if (searchText === '') {

        blankInputWarning.style.display = 'block';
        wrongInputWarning.style.display = 'none';

        // Clear Previous Search Result 
          displayResults.textContent = '';
          resultCounts.textContent = '';
        ////////////////////////////////

      }
      else {

        // Fetch Data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(response => response.json())
        .then(data => searchResults(data, data.docs));

        blankInputWarning.style.display = 'none';

        // Clear Previous Search Result 
          displayResults.textContent = '';
          resultCounts.textContent = '';
        ////////////////////////////////
        
      }
};


  const searchResults = (numOfResults, books )=>{

    if (numOfResults.numFound === 0) {

      wrongInputWarning.style.display = 'block';

      // Clear Previous Search Result 
      displayResults.textContent = '';
      resultCounts.textContent = '';
     ////////////////////////////////

    } 
    else {
      
      // Clear Previous Search Result 
      displayResults.textContent = '';
      resultCounts.textContent = '';
     ////////////////////////////////

    resultCounts.innerHTML = `<h5 class='text-white'>Total results found ${numOfResults.numFound}</h5>`;

        books.forEach(book => {

            // Set Image URL Dynamically
            const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

            // Create, Set and Append Element 
            const div = document.createElement('div');
            div.classList.add('col-md-6','col-lg-4');
            div.innerHTML = `
            <div class="card mb-3 rounded-3 bg-transparent border border-warning">
            <div class="row g-0">
              <div class="col-md-4 col-12 overflow-hidden" style="height: 200px;">
                <img src="${url}" class="img-fluid rounded-start" alt="Book-Img" style="height: 200px;" />
              </div>
              <div class="col-md-8 col-12">
                <div class="card-body text-white">
                  <h5 class="card-title">${book.title.slice(0,20)}</h5>
                  <h6 class="text-warning">${book.author_name}</h6>
                  <p class="mb-1">First published in ${book.first_publish_year}</p>
                  <p class="text-muted mb-0">${book.edition_count} Edition in ${book.language}</p>
                </div>
              </div>
            </div>
          </div>
            `;
            displayResults.appendChild(div);
        });

        wrongInputWarning.style.display = 'none';
    }
  }