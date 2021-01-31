// $(document).ready(function(){
//   $("#cloaking").click(function(){
//     $("#wraith").toggle();
//   });
// });

$( "#cloaking" ).first().click(function() {
  $( "#wraith" ).first().fadeToggle( "slow", "linear" );
});
