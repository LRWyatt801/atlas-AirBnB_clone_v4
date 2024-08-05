$(document).ready(function () {
  const amenities = {};
  $('.popover li input').click(function () {
    const ID = $(this).attr('data-id');
    const NAME = $(this).attr('data-name');
    if($(this).prop('checked') === true) {
      amenities[ID] = NAME;
    } else {
      delete amenities[ID];
    }
    const amenitiesNum = Object.values(amenities);
    $('.amenities h4').text(amenitiesNum.join(', '));
  });
});
