
var list,lastupdate;
$( document ).ready(function() {

   setInterval('refreshPage()', 100000); //refresh page after 10
  var url = "https://api.covid19india.org/data.json";
  $.getJSON(url,function(data){
  //  console.log(data.statewise[1]);
    list = data.statewise;

    // Total
    var confirmed = list[0].confirmed;
    var active  = list[0].active;
    var deaths = list[0].deaths;
    var recovered = list[0].recovered;
    lastupdate= JSON.stringify(list[0].lastupdatedtime);

    $(".confirmed").html(JSON.stringify(JSON.parse(confirmed)));
    $(".active").html(JSON.stringify(JSON.parse(active)));
    $(".deaths").html(JSON.stringify(JSON.parse(deaths)));
    $(".recovered").html(JSON.stringify(JSON.parse(recovered)));
    $('.updateTime').html(JSON.parse(lastupdate));



  var states=[],statecodes=[];

    for(var i= 1;i<list.length;i++){
      states.push(list[i].state);
      statecodes.push(list[i].statecode);
    }

    // Sorting arrays
    states.sort();
    statecodes.sort();

    states.unshift(list[0]);
    statecodes.unshift(list[0]);
    // Updating the states in the list
    for(var i= 1;i<states.length;i++){
    //  console.log(states[i]+"<br>"+statecodes[i]);
      $("#states").append(`<option value="`+states[i]+`">`+states[i]+`</option>`)
    }
  });
});

function refreshPage(){
  location.reload();
}

$("#states ").change(function(){
    console.log($(this).val());
  //  console.log(list);
    var stateid = $(this).val();
    $.ajax({
        success: function(){
          for(var i = 0; i<list.length;i++){
            if(stateid.localeCompare(list[i].state) == 0){
              var confirmed = list[i].confirmed;
              var active  = list[i].active;
              var deaths = list[i].deaths;
              var recovered = list[i].recovered;
              lastupdate = JSON.stringify(list[i].lastupdatedtime);
              console.log(list[i].lastupdatedtime);
              $(".confirmed").html(JSON.stringify(JSON.parse(confirmed)));
              $(".active").html(JSON.stringify(JSON.parse(active)));
              $(".deaths").html(JSON.stringify(JSON.parse(deaths)));
              $(".recovered").html(JSON.stringify(JSON.parse(recovered)));
              $('.updateTime').html(JSON.parse(lastupdate));
              break;
            }//end of if
          }//end of for loop
        }//end of ajax function call
    });//end of ajax
});

$('.closebtn').click(function(){
  var {ipcRenderer} = nodeRequire('electron');
  ipcRenderer.send('close',close);
})
