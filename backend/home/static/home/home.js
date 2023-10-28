function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function likeajax(object_id,object_type) {
    $.ajax({
        url: likeurl,
        type: "POST",
        dataType: "json",
        data: JSON.stringify({object_id: object_id, object_type: object_type,}),
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRFToken": getCookie("csrftoken"),  // don't forget to include the 'getCookie' function
        },
        success: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      });
}