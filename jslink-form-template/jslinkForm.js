var TechPoint = TechPoint || {};
TechPoint.customForm = function(){
  var _formHtml = "";
  var _formBaseUrl = _spPageContextInfo.webServerRelativeUrl + "/SiteAssets/myCustomForm/";
 
  _onPreRender = function(ctx){
  //if we can parse the BaseViewID it means that we are on list view
  //we don't need to apply custom form on views for this example
  if(parseInt(ctx.BaseViewID))
      return;
  //used to check if form template has already been loaded. OnPrerender can be called several times
  if (_formHtml != "")
      return;
   var formUrl =  formUrl += ctx.ControlMode === SPClientTemplates.ClientControlMode.DisplayForm
            ? "dispForm.html"
            : "editForm.html";
    
    //load the html form template to inject it in sharepoint form
     var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              //this selector is used to move sharepoint form input in our custom form
                var defaultForm = document.querySelector("#onetIDListForm table.ms-formtable");
              //this element will contain our custom form
                var customForm = document.createElement("div");

                _formHtml = this.response;
                customForm.id = "TechPointCustomForm";
                customForm.innerHTML = _formHtml;
                //replace custom form input element by sharepoint form input
                defaultForm.insertAdjacentElement("beforebegin", customForm);
            }
        };
        xhttp.open("GET", formUrl, false);
        xhttp.send();
};

_onPostRender = function(ctx){
};

_run = function(){
  // Create object that have the context information about the field that we want to change it's output render  
    var ctx = {
                Templates:
                {
                },
                OnPreRender:_onPreRender,
                OnPostRender:_onPostRender
    }; 

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx); 
}

  return {
     run:_run
    }
};

//Run the jslink
var myForm = new TechPoint.customForm();
myForm.run();
