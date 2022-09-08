const quoteContainer = document.getElementById('quote-generator');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

//! Empty array to store quotes from API 
let apiQuotes = [];


//! Show new quote
//! To pick a random quote from apiQuotes array
function newQuote(){
  const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
  if(!quote.author){          //! Check if author field is empty
    authorText.textContent = 'Unknown';
  }else {
    authorText.textContent = quote.author;
  } 
  quoteText.textContent = quote.text;
  //! Check quote length to determine styling
if(quoteText.length > 50){
  quoteText.classList.add('long-quote')
}else{
  quoteText.classList.remove('long-quote');
}
quoteText.textContent = quote.text;
}



//! Get new quotes from API
async function getQuotes(){
  const apiUrl = 'https://type.fit/api/quotes';
  try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch(error){}
}

//! Tweet Quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//! EventListeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
getQuotes();