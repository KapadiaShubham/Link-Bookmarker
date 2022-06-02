// Select the save button
var button = document.querySelector(".save_button");

// Select the input box
var siteName = document.querySelector("[name='site_name']");
var url = document.querySelector("[name='url']");

// Select the <div> with class="bookmarks"
var bookmarksSection = document.querySelector(".bookmarks");

// Not URL
var notURL = document.querySelector("#notURL");

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Hold bookmarks in local storage
if(typeof(localStorage.bookmark) == "undefined"){
localStorage.bookmark = "";
}
function notURLcheck(){
    let patterURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    // console.log("working");
    if(!patterURL.test(url.value) && url.value != ""){
        notURL.style.visibility = "visible";
        // alert("you must enter a valid url");
        return;
    }
    if(url.value == ""){
        notURL.style.visibility = "hidden";
        return;
    }
    notURL.style.visibility = "hidden";
}
setInterval(notURLcheck, 1000);

// function copyToClipboard(){
//     let url = "abcdefghi";
//     navigator.clipboard.writeText(url);
//     modal.style.display = "block";
//     await delay(1000);
//     modal.style.display = "none";
// }


// listen for form submit



button.addEventListener("click", function(e){

    // Prevent the page from reloading when submitting the form
    e.preventDefault();
    
    // let patterURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    
    let arrayItems, check = false, adr, itemAdr;
        
    // Validation of form and URL
    
    if(siteName.value === ""){
        alert("you must fill the siteName input");
    } else if(url.value === ""){
        alert("you must fill the url input");
    } 
    

        
        arrayItems = localStorage.bookmark.split(";");
        adr = url.value;
        // adr = adr.replace(/http:\/\/|https:\/\//i, "");
        arrayItems.length--;
            
        // Check if website is already bookmarked
        for(item of arrayItems){
            itemAdr = item.split(',')[1]//.replace(/http:\/\/|https:\/\//i,"");
            if(itemAdr == adr){
            check = true;
            }
        }
            
        if(check == true){
            alert("This website is already bookmarked");
        }
        else{
            // If all checks are correct, add bookmark to local storage
            localStorage.bookmark += `${siteName.value},${url.value};`;
            addBookmark(siteName.value, url.value);
            siteName.value = "";
            url.value = "";
            notURL.style.visibility = "hidden";
        }
    
    });
    
   
    
    
    // Function to add the bookmark
    function addBookmark(name, url){
        let dataLink = url;
        
        // After obtaining a bookmark, we display it in a div and add
        // a button to visit the link or to delete it
        // if(!url.includes("http")){
            //     url = "//" + url;
            // }
            let item = `<div class="bookmark">
            <span>${name}</span>
            <a class="visit" href="${url}" target="_blank"
            data-link='${dataLink}'>Visit</a>
            <a onclick="copyToClipboard(this)"
            class="copy" href="#">Copy</a>
            <a onclick="removeBookmark(this)"
            class="delete" href="#">delete</a>
            
            </div>`;
            bookmarksSection.innerHTML += item;
        }
        
// function to render the saved bookmarks

(
    function fetchBoookmark(){
    if(typeof(localStorage.bookmark) != "undefined" && localStorage.bookmark !== ""){
        let arrayItems = localStorage.bookmark.split(";");
        arrayItems.length--;
        for(item of arrayItems){
        let itemSpli = item.split(',');
        addBookmark(itemSpli[0], itemSpli[1]);
        }
    }
    }
)();


// Function to remove the bookmark


function removeBookmark(thisItem){
    let arrayItems = [],
        index,
        item = thisItem.parentNode,
        itemURL = item.querySelector(".visit").dataset.link,
        itemName = item.querySelector("span").innerHTML;
    arrayItems = localStorage.bookmark.split(";");
        
    for(i in arrayItems){
        if(arrayItems[i] == `${itemName},${itemURL}`){
        index = i;
        break;
        }
    }
        
    //update the localStorage
    index = arrayItems.indexOf(`${itemName},${itemURL}`);
    arrayItems.splice(index,1);
    localStorage.bookmark = arrayItems.join(";");
        
    //update the bookmark Section
    bookmarksSection.removeChild(item);
    }
            
function copyToClipboard(thisItem){
    let arrayItems = [],
        index,
        item = thisItem.parentNode,
        itemURL = item.querySelector(".visit").dataset.link,
        itemName = item.querySelector("span").innerHTML;
    arrayItems = localStorage.bookmark.split(";");
        
    for(i in arrayItems){
        if(arrayItems[i] == `${itemName},${itemURL}`){
        index = i;
        break;
        }
    }
    console.log(index);
    let url = arrayItems[index];
    // console.log(typeof url);
    url = url.split(',')[1];
    console.log(url);

    navigator.clipboard.writeText(url);
    modal.style.display = "block";

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
      
      delay(1000).then(() => {modal.style.display = "none";});
    
}