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

  // make ajax POST request for all places
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">\$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guests</div>
                        <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                </article>`;
      }))
    }
  });
});
