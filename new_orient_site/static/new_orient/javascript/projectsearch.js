$.datepicker.setDefaults($.datepicker.regional['ja']);
$.datepicker.setDefaults({
  format: 'yyyy/mm/dd'
});

$("#projectDateFrom").focusin(function(){
  $("#projectDateFrom").datepicker({altFormat:"yy-mm-dd"});
});

$("#projectDateBy").focusin(function(){
  $("#projectDateBy").datepicker();
});