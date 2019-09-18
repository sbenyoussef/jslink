var jslinkForm = function(){

_onPreRender=function(ctx){
};

_onPostRender=function(ctx){
};

_run = function(){
  // Create object that have the context information about the field that we want to change it's output render  
    var ctx = {
    Templates:{
      },
      OnPreRender:_onPreRender
      OnPostRender:_onPostRender

    }; 

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx); 
}

return {
run:_run
}
};

//Run the jslink
var myForm = new jslinkForm();
myForm.run();
