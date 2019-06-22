// classes

// everything related to the quotation and calculations
class Insurance {
    constructor(make, year, level) {
          this.make = make;
          this.year = year;
          this.level = level;
      }
  
      calculateQuotation(insurance) {
          let price;
          const base = 2000;
     
          // get the make
          const make = insurance.make;
     
          /*
             1 = American 15%
             2 = Asian 05%
             3 = European 35%
          */
         if(make === '1') {
             price = base * 1.15;
         } else if(make === '2') {
             price = base * 1.05;
         } else if(make === '3') {
             price = base * 1.35; 
         }
     
         // get the year
         const year = insurance.year;
     
         const difference = this.getYearDifference(year);
     
         // each year the cost of the insurance is going to be 2% cheaper
         price = price - (( difference * 3 ) * price) / 100;
     
         // get the years difference
         const level = insurance.level;
     
         price = this.calculateLevel(price, level);
     
         return price;
     }
     
     // returns the difference between years
     getYearDifference(year) {
         return new Date().getFullYear() - year; 
     } 
     
     // adds the value based on level of protection
     calculateLevel(price, level) {
         // basic insurance will increase the value by 30%
         // complete insurance will increase the value by 50%
         if(level === 'basic') {
             price = price * 1.30;
         } else {
             price = price * 1.50;
         }
         return price;
     }
  }
  
  // calculate the price for the current quotation
  
  
  // everything related to the html
  class HTMLUI {
      // display the latest 20 years in the select
      displayYears() {
          // max and min years
          const max = new Date().getFullYear(),
                  min = max - 20;
  
          // generate the list with the latest 20 years
          const selectYears = document.getElementById('year');
  
          // print the values
          for(let i = max; i >= min; i--) {
              const option = document.createElement('option');
              option.value = i;
              option.textContent = i;
              selectYears.appendChild(option);
  
          } 
  
      }
  
      displayError(msg) {
              const div = document.createElement('div');
              div.classList = 'error';
  
              // insert the message
              div.innerHTML = `
                  <p>${msg}</P>
              
              
              `;
  
              form.insertBefore(div, document.querySelector('.form-group'));
  
              // remove the error
              setTimeout(function() {
                  document.querySelector('.error').remove();
              }, 3000)
          }
  
          // prints the result into the html
          showResults(price, insurance) {
                      // prints the result
                      const result = document.getElementById('result');
  
                      // create a div with the result
                      const div = document.createElement('div');
  
                      let make = insurance.make;
  
                      // get make from the object and assign readable name
                      if(make === '1') {
                          make = 'American';
                      } else if(make === '2') {
                          make = 'Asian';
                      } else if(make === '3') {
                          make = 'European';
                      }
  
  
                      // insert the result
                      div.innerHTML = `
                          <p class="header">Summary</p>
                          <p>Make: ${make}</p>
                          <p>Year: ${insurance.year}</p>
                          <p class="total">Total: $ ${price}</p>
                      `;
  
                      const spinner = document.querySelector('#loading img');
                      spinner.style.display = 'block';
  
                      setTimeout(function() {
                          spinner.style.display = 'none';
                      }, 3000)
  
                      // insert the result into the html
                      result.appendChild(div);
                  }
  }
  
  


// variables
const form = document.getElementById('request-quote');
const html = new HTMLUI();



// eventlisteners
eventlisteners();

function eventlisteners() {
    document.addEventListener('DOMContentLoaded', function() {
        html.displayYears();
    });
    
    // when the form is submitted
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // read the values from the form
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;

        // read the radio buttons
        const level = document.querySelector('input[name="level"]:checked').value;

        // check that all the fields have something
        if(make === '' || year === '' || level === '') {
            html.displayError('All the fields are mandatory');
        } else {
            // clear the previews quotes
            const prevResult =  document.querySelector('#result div');
            if(prevResult != null) {
                prevResult.remove();
            }

            // make the quotation
            const insurance = new Insurance(make, year, level);
            const price = insurance.calculateQuotation(insurance);

            // print the result from HTMLUI
            html.showResults(price, insurance);
        }




    });
}

