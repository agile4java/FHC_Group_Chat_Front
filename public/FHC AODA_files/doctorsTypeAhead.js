    function compare(a,b) {
        if (a.label.toLowerCase() < b.label.toLowerCase())
            return -1;
        if (a.label.toLowerCase() > b.label.toLowerCase())
            return 1; 
        return 0;
    }  

        
    var termsArrayDoc;
    var listURL = "/SiteAssets/DoctorsTypeAheadList.txt";
    $.get(listURL, function(usersGet) {
        termsArrayDoc = eval(usersGet); termsArrayDoc.sort(compare); });
    var path = "/doctors/search/";
    var gotSearchDoc = false;
    

    var displayListDoc = new Array();
    var subItem = null;
    var textValue = null;
    var displayItem = null;    

	  
    //choose which item will be displayed
    function appendToListDoc(){
        displayListDoc.length = 0;
        textValue = $("#docSearchInput").val();

        textValue = textValue.replace("Dr.","");
        textValue = textValue.replace("Dr ","");
        textValue = textValue.replace("dr.","");
        textValue = textValue.replace("dr ","");
        textValue = textValue.replace("Doctor","");
        textValue = textValue.replace("doctor","");
        textValue = textValue.replace("(","\\(");
        textValue = textValue.replace(")","\\)");
        textValue = $.trim(textValue);
		
        var reg = new RegExp("(^"+textValue+")|(\\W"+textValue+")","i");
		
        for(var i=0;i<termsArrayDoc.length;i++){
		
            var item = termsArrayDoc[i].label;
			
            if(reg.test(item)){
                displayListDoc.push(termsArrayDoc[i]);
            }
        }
        return displayListDoc;
    }

    //format the displayed item
    function formatListDoc(item){
        displayItem = "<a href='#'>";
        textValue = $("#docSearchInput").val();
        textValueOld = textValue;
        textValueOld = textValueOld.replace("Dr.","");
        textValueOld = textValueOld.replace("Dr ","");
        textValueOld = textValueOld.replace("dr.","");
        textValueOld = textValueOld.replace("dr ","");
        textValueOld = textValueOld.replace("Doctor","");
        textValueOld = textValueOld.replace("doctor","");
        textValueOld = $.trim(textValueOld);
        var label= item.label;
		
        textValue = textValue.replace("Dr.","");
        textValue = textValue.replace("Dr ","");
        textValue = textValue.replace("dr.","");
        textValue = textValue.replace("dr ","");
        textValue = textValue.replace("Doctor","");
        textValue = textValue.replace("doctor","");
        textValue = textValue.replace("(","\\(");
        textValue = textValue.replace(")","\\)");
        textValue = $.trim(textValue);
		
        var reg = new RegExp("(^"+textValue+")|(\\W"+textValue+")","i");
        var index = label.search(reg);
		
        if(index>0){
            displayItem+=label.substring(0, index+1);
            displayItem+="<font style='font-weight:bolder;'>"+label.substring(index+1,index+1+textValueOld.length)+"</font>";
            displayItem+=label.substring(index+1+textValueOld.length,label.length);
        }
        else{
            displayItem += label.replace(reg, "<font style='font-weight:bolder;'>"+
							label.substring(0,textValueOld.length)+"</font>");
        }
        displayItem +="</a>";
		
        return displayItem;
    } 
    
    $(function () {
        $("#docSearchInput").autocomplete({
            source: function(request, response){
                response(appendToListDoc());
            },
            minLength:3,
            select: function( event, ui ) {
                var query = ui.item.url.split("?"); 
                var url = ui.item.url;
                if ( url.indexOf("k='") != -1)
                {
                    url = url.replace("k='", 'k="').replace("'", '"');
                }
               else if ( url.indexOf('k="') != -1)
               {
               }
               else
               { 
                  if ( url.indexOf("k=") != -1 )
                  {
                     url = url.replace("k=", 'k=\u0022');
                     url = url + '\u0022';
                   }
               }

                if(query.length == 1) {
                    url += "?ek=" + ui.item.label; 
                } else {
                    url += "&ek=" + ui.item.label;
                }
                if (!gotSearchDoc) {
                    window.location.href = url;
                    gotSearchDoc = true;
                }                                                   
            }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li>" )
              .append(formatListDoc(item))
              .appendTo( ul );
        };
    });
    
    
    /* keyup was not working due to event listener conflicts 
$(document).on('keyup', '#docSearchInput', function (event) { 
});*/
        $('#docSearchInput').keydown(function (e) {
           if (e.keyCode == 13 && $('#docSearchInput').val() !== '') {        
              var term = $('#docSearchInput').val();
              for(var i = 0; i < termsArrayDoc.length; i++){
                 if (term == termsArrayDoc[i].label)
                 {
                    var url = termsArrayDoc[i].url;
					var query = url.split("?");
					
					if ( url.indexOf("k='") != -1)
					{
					   url = url.replace("k='", 'k="').replace("'", '"');
					}
					else if ( (url.indexOf("Center") != -1) || (url.indexOf("Dental") != -1) || (url.indexOf("Therapy") != -1) || (url.indexOf("Plaza") != -1) || (url.indexOf("Central") != -1))
					{ 
					   url = url.replace("k=", 'k="');
					   url = url + '"';
					}
					    
					if(query.length == 1) {
					    url += "?ek=" + term; 
					} else {
					   url += "&ek=" + term;
					}
					if (!gotSearchDoc) {
					    window.location.href = url;
					    gotSearchDoc = true;
					}
					return true;
                 }
              }
              if (!gotSearchDoc) {
                 if ( ( $('#docSearchInput').val().indexOf('Center') != -1) || ( $('#docSearchInput').val().indexOf('Dental') != -1) || ( $('#docSearchInput').val().indexOf('docSearchInput') != -1) || ( $('#docSearchInput').val().indexOf('Plaza') != -1) || ( $('#docSearchInput').val().indexOf('Central') != -1) )
                 {
                    window.location.href = '/doctors/search/?k=' + '?k="' + $('#docSearchInput').val().replace(/\-/g,' ').replace('&',' ').replace('＆',' ').replace('   ',' ').replace('  ',' ') + '"';
                 }
                 else 
                 {
                    window.location.href = '/doctors/search/?k=' + '?k=\u0022' + $('#docSearchInput').val().replace(/\-/g,' ').replace('&',' ').replace('＆',' ').replace('   ',' ').replace('  ',' ') + '\u0022';
                 }
                 gotSearchDoc = true;
              }      
           }        
        });
        


