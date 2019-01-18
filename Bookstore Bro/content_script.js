let highlightedText, courseName, courseNumber, query;

if($("body:contains('Please proceed to the bookstore website')").length > 0) {
    // click link
	if($('a[href*="bkstr"]').get(0)){
		let bookstoreLink = $('a[href*="bkstr"]').get(0);
		$(bookstoreLink).trigger("click");
		window.location.replace(bookstoreLink);
	}
	// close webpage
	/* window.top.close(); */
};


if($("body:contains('Course Reserves Search:')").length > 0) {
    // get highlighted text if the user presses a forward slash
	$(document).on('keydown',function(e) {
		if(e.which == 191) {
			if (window.getSelection) {
				highlightedText = window.getSelection().toString();
				courseName = highlightedText.substring(0,3);
				courseNumber = highlightedText.substring(3, 8);
				query = {
					courseName: courseName,
					courseNumber: courseNumber
				};
				chrome.storage.sync.set({"active": true}, function() {
					console.log("flow started");
				});
				chrome.storage.sync.set({"query": query}, function() {
					console.log(highlightedText);
				});
				window.open("https://erpapp.banner.uwf.edu/PROD/bwckschd.p_disp_dyn_sched","");
			}
		}
	});
};

if($("body:contains('Search by Term:')").length > 0) {
	let active; 
	
	$(document).ready(function() {
		chrome.storage.sync.get("active", function(result) {
			console.log("i am " + result.active);
			active = result.active;
			
			if (active == true) {
				console.log("i'm in");
				$("#term_input_id").val("201901");
				$("form").submit();	
			} else {
				console.log("didnt work");
			}
		});
	});
};

if($("body:contains('Non-date based courses only')").length > 0) {
	let active;
	
	$(document).ready(function() {
		chrome.storage.sync.get("active", function(result) {
			console.log("i am " + result.active);
			active = result.active;
			
			if (active == true) {
				chrome.storage.sync.get("query", function(result){
					$("#subj_id").val(result.query.courseName);	
					$("#crse_id").val(result.query.courseNumber);
					$("form").submit();
					chrome.storage.sync.set({"active": false}, function() {
						console.log("flow stopped");
					});
				});
			} else {
				console.log("didnt work");
			}
		});
	});
};