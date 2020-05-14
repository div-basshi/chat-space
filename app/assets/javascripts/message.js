$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="messages__area">
            <div class="messages__area__name">
              ${message.user_name}
            </div>
            <div class="messages__area__time">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__text">
            <p class="messages__text__message">
              ${message.content}
            </p>
            <img class="messages__text__image" src="${message.image}">
          </div>`
      return html;
    } else {
      let html =
      `<div class="messages__area">
          <div class="messages__area__name">
            ${message.user_name}
          </div>
          <div class="messages__area__time">
            ${message.created_at}
          </div>
        </div>
        <div class="messages__text">
          <p class="messages__text__message">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }

  $('.new-message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    console.log(this)
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $(".new-message")[0].reset();
      $(".messages").append(html)
      $(".messages").animate({ scrollTop: $('.messages')[0].scrollHeight});
      $(".submit-btn").prop('disabled',false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $(".submit-btn").prop('disabled',false);
  });
  });
});



