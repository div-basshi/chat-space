$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="message" data-message-id=${message.id}>
        <div class="message__area">
            <div class="message__area__name">
              ${message.user_name}
            </div>
            <div class="message__area__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="message__text__message">
              ${message.content}
            </p>
            <img class="message__text__image" src="${message.image}">
          </div>`
      return html;
    } else {
      let html =
    `<div class="message" data-message-id=${message.id}>
      <div class="message__area">
          <div class="message__area__name">
            ${message.user_name}
          </div>
          <div class="message__area__time">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="message__text__message">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }

  $('.new-message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
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
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $(".submit-btn").prop('disabled',false);
    });
  });
});



