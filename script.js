const accessKey="wBYqpEM7PA5zgeE0wv7rTHpgOvMcH-xkckq9ZdiVpD8"

const formElement=document.querySelector("form")
const inputElement=document.getElementById("search-input")
const searchResults=document.querySelector(".search_results")
const showMore=document.getElementById("show_more_button")

let inputData=""
let page=1;

async function searchImages(){
    inputData=inputElement.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response=await fetch(url);
    const data=await response.json();

    const results=data.results;

    if(page===1){
        searchResults.innerHTML=""
    }

    results.map((result)=>{
        //container
        const imageWrapper=document.createElement("div");
        imageWrapper.classList.add("search_result");

        const image=document.createElement("img");
        image.src=result.urls.small;
        image.alt=result.alt_description;

        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        // now append these in html page 
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if(page>1){
        showMore.style.display="block";
    }
}


//crete eventlister to call the function
//for getting new images and working of function
formElement.addEventListener("submit",(event)=>{
    event.preventDefault()
    page=1;
    searchImages()
});

//but for show more button we again wanted to call
showMore.addEventListener("click",()=>{
    searchImages()
});

