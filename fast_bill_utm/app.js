// --------------------------------------------------------------------------------------------------------------------
// <copyright file="appjs" compamy="Microtech Support"/>
//  
// </summary>
// <remarks></remarks>
// <author></author>
// <version>1.0</version>
// <revision></revision>
// <includesource>yes</includesource>
// <todo></todo>
// <developer>Nasir Sayed</developer>
// --------------------------------------------------------------------------------------------------------------------

var HttpUrl = "Qry/q.php";
var HttpQry = "";
function resizeIframe(obj) {
                                       obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
                                       obj.style.width = obj.contentWindow.document.body.scrollWidth + 'px';
                        }

var get_params = function(search_string) {

  var parse = function(params, pairs) {
    var pair = pairs[0];
    var parts = pair.split('=');
    var key = decodeURIComponent(parts[0]);
    var value = decodeURIComponent(parts.slice(1).join('='));

    // Handle multiple parameters of the same name
    if (typeof params[key] === "undefined") {
      params[key] = value;
    } else {
      params[key] = [].concat(params[key], value);
    }

    return pairs.length == 1 ? params : parse(params, pairs.slice(1))
  }

  // Get rid of leading ?
  return search_string.length == 0 ? {} : parse({}, search_string.substr(1).split('&'));
}

var params = get_params(location.search);



var previewimage = function(ElementName,ElementValue){
    if(ElementValue == "") return;
     if (ElementName == "logo"){
        $('div[name = "'+ElementName+'_preview"]').html("<img src='http://kent.nasz.us/app_php/shifaappsettings/mumbra/" + ElementValue + "_thumb.jpg' />");
    }
    else {
        if (ElementValue != "")
        {
            $('div[name = "'+ElementName+'_preview"]').html($('div[name = "'+ElementName+'_preview"]').html() + "<span> </span>");
        }
        $('div[name = "'+ElementName+'_preview"]').html($('div[name = "'+ElementName+'_preview"]').html() + "<img src='http://kent.nasz.us/app_php/shifaappsettings/mumbra/" + ElementValue + "_thumb.jpg' />");

    }
}

