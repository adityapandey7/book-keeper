const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-URL');
const bookmarksContainer = document.getElementById('bookmarks-container');


let bookmarks = [];
//show modal, Focus on input

function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

//Modal event listener
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => (modal.classList.remove('show-modal')));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal'):false));

//validate form
function validate(nameValue, urlValue)
{
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert('please submit values for both fields');
        return false;
    }
    if(!urlValue.match(regex)) {
        alert('please provide a valid web address');
        return false;
    }
    return true;
}

//build bookmarks
function buildBookmarks(){
    //remove all bookmark elements
    bookmarksContainer.textContent=' ';
    bookmarks.forEach((bookmark)=>{
        const {name, url}= bookmark;
        //item
        const item = document.createElement('div');
        item.classList.add('item');
        //close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas','fa-times');
        closeIcon.setAttribute('title','Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        //favicon / link container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        //favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        //Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target','_blank');
        link.textContent=name;
        //Append Bookmarks container
        linkInfo.append(favicon,link);
        item.append(closeIcon,linkInfo);
        bookmarksContainer.appendChild(item);
    })
}

//fetch bookmarks
function fetchBookmarks(){
    if(localStorage.getItem('bookmarks'))
    {
        bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
    }
    else{
        bookmarks=[
            {
                name: "Google",
                url: "https://www.google.com",
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}
//delete bookmark

function deleteBookmark(url){
    bookmarks.forEach((bookmark,i)=> {
        if(bookmark.url === url)
        {
            bookmarks.splice(i, 1);
        }
    });
    //update bookmarks in local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

//Handle bookmark form
function storeBookmark(event){
event.preventDefault();
const nameValue = websiteNameEl.value;
console.log(nameValue);
let urlValue= websiteUrlEl.value;
console.log(urlValue, nameValue);
if(!urlValue.includes('http://','https://'))
{
    urlValue=`https://${urlValue}`;
}
if(!validate(nameValue, urlValue)){
    return false;
}
const bookmark = {
    name: nameValue,
    url: urlValue,
};
bookmarks.push(bookmark);
localStorage.setItem('bookmarks',JSON.stringify( bookmarks));
fetchBookmarks();
bookmarkForm.reset();
websiteNameEl.focus();
}
//event Listener

bookmarkForm.addEventListener('submit', storeBookmark);

//on Load

fetchBookmarks();



