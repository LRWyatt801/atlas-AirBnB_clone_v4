$(document).ready(function () {
  const amenities = {};

  $('input[type="checkbox"]').change(function () {
    const ID = $(this).data('id');
    const NAME = $(this).data('name');

    if($(this).is(':checked')) {
      amenities[ID] = NAME;
    } else {
      delete amenities[ID];
    }

    const amenitiesNum = Object.values(amenities);
    $('div.amenities h4').text(amenitiesNum.join(', '));
  });
});
