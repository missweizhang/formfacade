wrapName();
wrapAddress();
wrapPhone();

// wrap last/first/middle names in one row
function wrapName() {
    // find all Last Name elements
    var xpath = "//label[contains(text(),'Last')]";
    var result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    // Last, First, Middle Name: wrap in form-row
    for (var i=0; i<result.snapshotLength; i++) {
        var label = result.snapshotItem(i);
        var lastname = label.parentElement;
        var firstname = lastname.nextElementSibling;
        var middlename = firstname.nextElementSibling;
    
    	if ( !firstname.getElementsByTagName( 'label')[0].textContent.includes("First") ) {
        	firstname = null;
        }
        if ( !middlename.getElementsByTagName( 'label')[0].textContent.includes("Middle") ) {
        	middlename = null;
        }
    
    	if ( lastname && firstname && middlename ) {
          lastname.classList.add("col-sm-4");
          firstname.classList.add("col-sm-4");
          middlename.classList.add("col-sm-4");
    
          $( '#' + [lastname.id, firstname.id, middlename.id].join(", #") ).wrapAll( "<div class='form-row' />");
        }
        else if (lastname && firstname ) {
          lastname.classList.add("col-6");
          firstname.classList.add("col-6");
    
          $( '#' + [lastname.id, firstname.id].join(", #") ).wrapAll( "<div class='form-row' />");    
        }
    }
}


// wrap phone and business phone in one row
function wrapPhone() {
    // find all Phone
    var xpath = "//label[contains(text(),'Phone')]";
    var result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    // Phone, Business Phone: wrap in form-row
    for (var i=0; i<result.snapshotLength; i++) {
        var label = result.snapshotItem(i);
        var phone = label.parentElement;
        var business = phone.nextElementSibling;
    
    	if ( business && !business.getElementsByTagName( 'label')[0].textContent.includes("Business Phone") ) {
        	business = null;
        }
    
        if (phone && business ) {
          phone.classList.add("col-6");
          business.classList.add("col-6");
    
          $( '#' + [phone.id, business.id].join(", #") ).wrapAll( "<div class='form-row' />");    
        }
    }
}


// select default state from dropdown menu
function selectState(stateName) {
    var ca = document.querySelectorAll('[value=' + stateName +']');
    for ( var i=0; i<ca.length; i++) {
       ca[i].setAttribute("selected", "true");
    }
}


// wrap city/state/zip code in one row
function wrapAddress() {
    selectState('CA');
    
    // find all City elements
    var xpath = "//label[contains(text(),'City')]";
    var result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    // City, State Zip: wrap in form-row
    for (var i=0; i<result.snapshotLength; i++) {
        var label = result.snapshotItem(i);
        var city = label.parentElement;
        city.classList.add("col-md-6");
    //    city.innerHTML += city.id;
        
        var state = city.nextElementSibling;
        state.classList.add("col-md-3");
        state.classList.add("col-sm-6");
    //    state.innerHTML += state.id;
    
        var zip = state.nextElementSibling;
        zip.classList.add("col-md-3");
        zip.classList.add("col-sm-6");
    //    zip.innerHTML += zip.id;
    
        $( '#' + [city.id, state.id, zip.id].join(", #") ).wrapAll( "<div class='form-row' />");
    }
}