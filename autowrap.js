// wraps group of consecutive matching elements in div.form-row (Bootstrap), and add specified(Bootstrap) classes to each matching element.
// a field will be wrapped if consecutive elements match specified, and none of the fields have been wrapped before.

var IDs_wrapped = []; // important global variable

wrapName();
wrapAddress();
wrapPhone();
wrapStudent();
wrapEmergency();

function wrapStudent() {
    wrapAsFormRow({'Gender': ["col-6"], 
                   'Birthdate': ["col-6"],
                  });
}

function wrapName() {
    wrapAsFormRow({'Last': ["col-sm-4"], 
                    'First': ["col-sm-4"],
                    'Middle': ["col-sm-4"],
                  });
    wrapAsFormRow({'Last': ["col-6"], 
                   'First': ["col-6"],
                  });
}

function wrapAddress() {
    wrapAsFormRow({'City': ["col-md-6"], 
                   'State': ["col-md-3","col-sm-6"],
                   'Zip': ["col-md-3","col-sm-6"],
                  });
}

function wrapPhone() {
    wrapAsFormRow({'Phone': ["col-6"], 
                   'Business Phone': ["col-6"],
                  });
}

function wrapPhone() {
    wrapAsFormRow({'Phone': ["col-6"], 
                   'Business Phone': ["col-6"],
                  });
}

function wrapEmergency() {
    wrapAsFormRow({'Name': ["col-6", "col-md-3"], 
                   'Address': ["col-6", "col-md-3"], 
                   'Phone': ["col-6", "col-md-3"], 
                   'Relationship': ["col-6", "col-md-3"], 
                  });
}

// helper function
function wrapAsFormRow(rules) {
    if (!rules) {
            console.log("Error: wrapAsFormRow expects at least one rule.")
            return;
        }  
    
    var fields = Object.keys(rules);
    var classes = Object.values(rules);

    if (fields.length === 0 || fields[0] === '') {
        console.log("Error: wrapAsFormRow expect non-empty fields.")
        return;
    }
    
        // find matching fields in DOM
    var xpath = "//label[contains(text(),'" + fields[0] + "')]";
    var result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    // find matching element sets
    for (var j=0; j<result.snapshotLength; j++) { // loop over sets
        var label = result.snapshotItem(j);
//        console.log(fields[0]);
//        console.log(label.textContent);
        wrapElements(label.parentElement, fields, classes);
    }
}


// helper function
function wrapElements(field0, fields, classes) {
//    console.log(IDs_wrapped);
    
    var elems = []; // elements to wrap using bootstrap classes
    var thiselem = field0; // 0th element
    elems.push(thiselem); 

    // check labels for subsequent elements match remaining fields
    for (var i=1; i<fields.length; i++) { 
        thiselem = thiselem.nextElementSibling;
        
        // null element
        if (!thiselem) return;
        
        // already wrapped
        if (IDs_wrapped.includes(thiselem.id)) return;

        // no label
        var label = thiselem.getElementsByTagName('label')[0];
        if (!label) return;
        
        // field mismatch
        if ( !label.textContent.includes(fields[i]) ) return;
        
        // match found
        elems.push(thiselem);
    }
    
    // consecutive elements match all fields in rule
    console.log(IDs_wrapped);
    
    var ids = [];
    for (i=0; i<elems.length; i++) {
        for (var k=0; k<classes[i].length; k++) {
            if (classes[i][k] !== '') {
                elems[i].classList.add( classes[i][k] );
            }
        } 
        ids.push(elems[i].id);
        console.log(fields[i]);
        console.log(elems[i].getElementsByTagName('label')[0].textContent);
    } 
    
    $( '#' + ids.join(", #") ).wrapAll("<div class='form-row' />");
    IDs_wrapped.push.apply(IDs_wrapped, ids);
    console.log(IDs_wrapped);
}
