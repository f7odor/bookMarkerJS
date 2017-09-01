// Listen for "PUSH"

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
	//Get Form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	
	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	/*
	//Local Storage Test

	localStorage.setItem('test', 'Hello World!');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	// Test if bookmarks is null

	if(localStorage.getItem('bookmarks') === null){
		// Init array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from localStorage 
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmark to array 
		bookmarks.push(bookmark);

		//Re-set back to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

  //Cleat Form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();


	// Prevent form from submitting
	e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
  //Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Loop throught bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to LocalStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();

}

// Fetch bookmarks
function fetchBookmarks(){
	// Get bookmarks from localStorage 
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	// Build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well well-lg">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="_blank" href="#">Delete</a> ' 
                                  '</h3>'+
                                  '</div>';
		}
	}

// Validation Form