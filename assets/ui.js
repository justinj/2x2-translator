$(function(){
  $("#go").click(run);
});
function run() 
{
  box = $("#alg_box")
    results = $("#results");
  var inputs = box.val().split("\n")
    results.html("");
  $.each(inputs, function(index, input) {
    var algs = Translator.translate(Translator.formatInput(input, getOptions()), getOptions());
    algs = algs.map(function(input) {
      return "<a class=\"alglink\">"+input+"</a>";
    });
    $.each(algs, function(index,alg){
      addAlgToResults(alg);
    });
  });


  $(".alglink").click(function(event) {
    $("#notes").val($("#notes").val()+event.target.innerHTML+"\n");
  });
}

function addAlgToResults(alg) {
  results.append(alg + "<BR>")
}

function getOptions()
{
  options = {}
  options["remove_trailing_u"] = $("#remove_trailing_u")[0].checked
    options["one_d"] = $("#one_d")[0].checked
    options["show_y_rotations"] = $("#show_y_rotations")[0].checked
    return options;
}
