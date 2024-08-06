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

document.addEventListener('DOMContentLoaded', function () {
  const apiStatus = document.getElementById('api_status');

  function updateStatus() {
    fetch('http://0.0.0.0:5001/api/v1/status/')
      .then(response => response.json())
      .then(data => {
        if(data.status === 'OK') {
          apiStatus.classList.add('available');
        } else {
            apiStatus.classList.remove('available');
        }
      })
      .catch(() => {
        apiStatus.classList.remove('available');
      });
  }

  updateStatus();
  setInterval(updateStatus, 1000);
});
