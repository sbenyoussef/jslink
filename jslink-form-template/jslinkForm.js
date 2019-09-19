var TechPoint = TechPoint || {};
TechPoint.customJsLinkForm = function(){
  var _formHtml = "";
  var _formBaseUrl = _spPageContextInfo.webServerRelativeUrl + "/SiteAssets/myCustomForm/";
  var _postFields=0;
  var _formId: "TechPointCustomForm",
 
  _initNewEditForm: function (ctx)
  {
    //in my html form all span with class TechPointCustomForm will be replace by sharepoint form input
    var elts = document.querySelectorAll("span.TechPointCustomForm");
      var nodeListLength = elts.length;
     var form = document.querySelector("table.ms-formtable");
        for (var i = 0; i < nodeListLength; i++) {
            //32 chars max for field id in aspx page
           var fieldName = elts[i].getAttribute("data-fieldname").substr(0, 32);
           var formInput = form.querySelector("[id^='" + fieldName + "_']");
           if (!formInput)
                        continue;
                }
  };

  _initDisplayForm: function ()
  {
  };   
  
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
                //inser custom form before sharepoint form
                defaultForm.insertAdjacentElement("beforebegin", customForm);
            }
        };
        xhttp.open("GET", formUrl, false);
        xhttp.send();
};
  
_onPostRender = function(ctx){
  if (parseInt(ctx.BaseViewID))
    return;
     //in dispform,newform and edit form, onPostRender is called after each field has been rendered
        //this piece of code is to ensure that the post render function is executed only once
  _postfields++;
  if (RiskBaseForm.FormTemplate.postfields < Object.keys(ctx.Templates.Fields).length) {
        return;
   }
   if (ctx.ControlMode === SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode === SPClientTemplates.ClientControlMode.NewForm) {
       _initNewEditForm(ctx);
   }
   else {
      _initDisplayForm();
        }
  
    //form logic (not in list view)
    var myForm = new TechPoint.customForm(ctx);
    myForm.run();
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
var myJsLinkForm = new TechPoint.customJsLinkForm();
myJsLinkForm.run();
