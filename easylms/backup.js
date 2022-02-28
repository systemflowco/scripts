<div style="padding-top:50%" class="w-video w-embed">
<iframe class="embedly-embed" src="https://www.youtube.com/embed/{{wf {&quot;path&quot;:&quot;wideo-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}" scrolling="no"></iframe>
</div>

<div style="padding-top:50%" class="w-video w-embed">
<iframe class="embedly-embed" src="https://player.vimeo.com/video/{{wf {&quot;path&quot;:&quot;wideo-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}" scrolling="no"></iframe>
</div>

<script>
window.easyLmsInfo = {
	webhookUrl: "{{wf {&quot;path&quot;:&quot;course:webhook-url&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
  courseName: "{{wf {&quot;path&quot;:&quot;course:name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
  lessonName: "{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
  lessonSlug: "{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
  ecProductId: "{{wf {&quot;path&quot;:&quot;course:identyfikator-produktu-easycart&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
  videoId: "{{wf {&quot;path&quot;:&quot;wideo-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
  videoType: "{{wf {&quot;path&quot;:&quot;serwis-wideo&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}"
};
</script>

Serwis Wideo
Możliwe opcje to YouTube lub Vimeo
Wideo ID

Webhook Url
Adres URL webhook (np. z Make) na który będą wysyłane informacje o akcjach użytkownika jak np. ukończenie lekcji

data-easylms-webhook-url

data-easylms-video


<script>
window.easyLmsInfo = {
  eventName: "{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
  eventSlug: "{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
  eventVideo: "{{wf {&quot;path&quot;:&quot;workshop-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
};
</script>

<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://vimeo.com/event/{{wf {&quot;path&quot;:&quot;workshop-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}/embed" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>

Link do lekcji video
Podaj link do lekcji na YouTube lub Vimeo



<div style="padding-top:56%" class="w-video w-embed">
<iframe data-easylms-video class="embedly-embed" src="" scrolling="no"></iframe>
</div>



<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://vimeo.com/event/1897674/embed" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>