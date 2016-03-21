// This callback function is called when the content script has been 
// injected and returned its results



// $('*').each(function(){

//     var bgImgStr = $(this).css('backgroundImage'),
//         regEx = /\"|\'|\)/g,
//         bgImgName = bgImgStr.split('/').pop().replace(regEx,'');

//     if(bgImgName === 'poster_0000.png'){
// var url = bgImgStr.replace('poster_0000.png','video-sd.mp4'); 
// url = url.replace('url(','');
// url = url.replace(')',''); $("head").remove();
// $("body").html('<video  width="600" height="1024" autoplay controls><source src=' + url + ' ></source></video>'); 
//     }

// });


function onPageDetailsReceived(pageDetails)  { 
    //alert(pageDetails.url)
    //document  = pageDetails.url

                

     // var vid = document.body;//("videoplayer");
     // vid.innerHTML = '<video  width="600" height="1024" autoplay controls><source src=' + pageDetails.video + ' ></source></video>'; 
    
    //  vid.src = pageDetails.video;
    //  vid.load();
    //alert(pageDetails.video)
   }

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function addBookmark() {
    // Cancel the form submit
    event.preventDefault();

    // The URL to POST our data to
    var postUrl = 'http://post-test.local.com';

    // Set up an asynchronous AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);

    // Prepare the data to be POSTed by URLEncoding each field's contents
    var title = encodeURIComponent(document.getElementById('title').value);
    var url = encodeURIComponent(document.getElementById('url').value);
    var summary = encodeURIComponent(document.getElementById('summary').value);
    var tags = encodeURIComponent(document.getElementById('tags').value);

    var params = 'title=' + title + 
                 '&url=' + url + 
                 '&summary=' + summary +
                 '&tags=' + tags;

    // Replace any instances of the URLEncoded space char with +
    params = params.replace(/%20/g, '+');

    // Set correct header for form data 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Handle request state change events
    xhr.onreadystatechange = function() { 
        // If the request completed
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';
            if (xhr.status == 200) {
                // If it was a success, close the popup after a short delay
                statusDisplay.innerHTML = 'Saved!';
                window.setTimeout(window.close, 1000);
            } else {
                // Show what went wrong
                statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
            }
        }
    };

    // Send the request and set status
    xhr.send(params);
    statusDisplay.innerHTML = 'Saving...';
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark').addEventListener('submit', addBookmark);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);

    });
});