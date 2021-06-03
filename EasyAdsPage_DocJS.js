
(function(){
	
	// HIGHLIGHTS 1
	var highlightHTLM = (function(){
		var g_win = window;
		var g_doc = document;
		function func(){
			g_win.addEventListener("DOMContentLoaded", function(){
					var elems = g_doc.getElementsByClassName("w-highlight");
					var len = elems.length;
					for(var i=0;i<len;i++){
						var elem = elems[i];
						process(elem);
					}
				});
		}
		function encodeHTML(s){
			return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
		}
		function decodeHTML(s){
			return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&amp;/g, "&");
		}
		function getHiglightedString(elem){
			var highlightedString = "";
			var elemType = Object.prototype.toString.call(elem); // [object Text],[object HTMLDivElement], [object Comment]
			if(elemType === "[object Text]"){
				highlightedString += "<span class='w-content'>"+ elem.textContent + "</span>";
			}
			else if(elemType === "[object Comment]"){
				highlightedString += "<span class='w-comment'>&lt;!-- comments --&gt;</span>";
			}
			else{
				var attributes = elem.attributes;
				var attributesLength = attributes.length;
				var attributesString = [];
				for(var i=0;i<attributesLength;i++){
					var attribute = attributes[i];
					attributesString.push("<span class='w-attributename'>" + attribute.name + "</span>=<span class='w-attributevalue'>&quot;" + attribute.value + "&quot;</span>"); 
				}
				
				var tagName = elem.tagName.toLowerCase();
				highlightedString += "<span class='w-tag'>&lt;" + tagName;
				if(attributesString.length === 0){
					highlightedString += "&gt;</span>";
				}
				else{
					highlightedString += " " + attributesString.join(" ") + "&gt;</span>";
				}
				
				var nextChilds = elem.childNodes;
				var nextChildsLength = nextChilds.length;
				for(var i=0;i<nextChildsLength;i++){
					highlightedString += getHiglightedString(nextChilds[i]);
				}
				
				highlightedString += "<span class='w-tag'>&lt;/" + tagName + "&gt;</span>";
				
			}
			
			return "<div class='w-block'>" + highlightedString + "</div>";
		}
		function process(elem){
			var	tempDom = g_doc.createElement("div");
			var	decodedString = elem.innerHTML;
					decodedString = decodedString.replace(/<!--/g, "").replace(/-->/g, "");
					
					tempDom.innerHTML = decodedString;
				
			var childs = tempDom.childNodes;
			var childsLength = childs.length;
			var highlightedString = "";
			for(var i=0;i<childsLength;i++){
				highlightedString += getHiglightedString(childs[i]);
			}

			elem.innerHTML = highlightedString;			
		}
		
		return func;
	
	})();

	highlightHTLM();
	
})();