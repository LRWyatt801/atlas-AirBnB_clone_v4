$(document).ready(function () {
  const amenities = {};

  $('input[type="checkbox"]').change(function () {
    const ID = $(this).data('id');
    const NAME = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[ID] = NAME;
    } else {
      delete amenities[ID];
    }

    const amenitiesNum = Object.values(amenities);
    $('div.amenities h4').text(amenitiesNum.join(', '));
  });

  // make api get request to check status on DOM ready
  $.get('http://localhost:5001/api/v1/status/', (response) => {
    // check response
    if (response.status === "OK") {
      // if response is 'OK' then add class to div id=api_status
      $('div#api_status').addClass('available');
    } else {
      // if response not 'OK' then remove class from div id=api_status
      $('div#api_status').removeClass('available');
    }
  }).fail(() => {
    // if fail to get response remove class from div id=api_status
    $('div#api_status').removeClass('available');
  });
});
