function maudio(_opt){
  var opt = {
    obj : _opt.obj ? _opt.obj : 'audio',
    fastStep : _opt.fastStep ? _opt.fastStep : 10
  }
  opt.tpl = '\
    <div class="maudio">\
      <audio src="%audioSource%"></audio>\
      <div class="audio-control">\
          <a href="javascript:;" class="fast-reverse"></a>\
          <a href="javascript:;" class="play"></a>\
          <a href="javascript:;" class="fast-forward"></a>\
          <div class="progress-bar">\
              <div class="progress-pass"></div>\
          </div>\
          <div class="time-keep">\
              <span class="current-time">00:00</span> / <span class="duration">00:00</span>\
          </div>\
          <a class="mute"></a>\
          <div class="volume-bar">\
              <div class="volume-pass"></div>\
          </div>\
      </div>\
    </div>';
  // var currentAudio,currentAudioBox;

  // 初始化所有音频
  window.tDuration = [];
  $(opt.obj).each(function(i){
    $(this).before(opt.tpl.replace('%audioSource%',$(this).attr('src')));
    var thisBox = $(this).prev('div.maudio');
    var thisAudio = thisBox.children('audio')[0];
    $(this).remove();
    window.tDuration[i] = setInterval(function(){
      if(thisAudio.duration){
        thisBox.find('.time-keep .duration').text(timeFormat(thisAudio.duration));
        clearInterval(window.tDuration);
      }
    },100);
  });

  function progressBar(audio,pgp){
    var p = 100*currentAudio.currentTime/currentAudio.duration;
    currentAudioBox.find('.progress-pass').css({'width':p + '%'});
    // 计算当前时间
    currentAudioBox.find('.current-time').text(timeFormat(currentAudio.currentTime));
    // 播放结束
    if(currentAudio.currentTime >= currentAudio.duration){
      currentAudioBox.removeClass('playing');
      clearInterval(t);
    }
  }

  function bindAudioCtrl(){
    // 播放
    $('.audio-control .play').on('click', function(){
      var audioBox = $(this).parent('.audio-control').parent('.maudio');
      var audio = audioBox.children('audio')[0];
      if(audioBox.hasClass('playing')){
        audio.pause();
        audioBox.removeClass('playing');
      }else{
        // 停止其他语音播放
        $('.playing').each(function(){
          $(this).children('audio')[0].pause();
          $(this).removeClass('playing');
        });
        audio.play();
        audioBox.addClass('playing');
        currentAudio = audio;
        currentAudioBox = audioBox;
        // 进度条
        window.t = window.setInterval(function(){
          progressBar();
        },500);
      }
    });
    // 快进
    $('.audio-control .fast-reverse').on('click', function(){
      currentAudio.currentTime -= opt.fastStep;
    });
    // 快退
    $('.audio-control .fast-forward').on('click', function(){
      currentAudio.currentTime += opt.fastStep;
    });
    // 音量
    $('.audio-control .volume-bar').on('click', function(e){
      var audioBox = $(this).parent('.audio-control').parent('.maudio');
      var audio = audioBox.children('audio')[0];
      var p = e.offsetX / audioBox.find('.volume-bar').width();
      audioBox.find('.volume-pass').css({"width":p * 100 + '%'});
      audio.volume = p > 1 ? 1 : p;
    });
    // 静音
    $('.audio-control .mute').on('click', function(e){
      var audioBox = $(this).parent('.audio-control').parent('.maudio');
      var audio = audioBox.children('audio')[0];
      if($(this).hasClass('muted')){
        audio.muted = false;
        $(this).removeClass('muted');
      }else{
        audio.muted = true;
        $(this).addClass('muted');
      }
    });
    // 进度条
    $('.audio-control .progress-bar').on('click', function(e){
      var audioBox = $(this).parent('.audio-control').parent('.maudio');
      var audio = audioBox.children('audio')[0];
      var p = e.offsetX / audioBox.find('.progress-bar').width();
      audioBox.find('.progress-pass').css({"width":p * 100 + '%'});
      audio.currentTime = audio.duration * p;
      // 同步一下本条音频的当前时间
      audioBox.find('.current-time').text(timeFormat(audio.currentTime));
    });
  }
  bindAudioCtrl();

  // 时间换算成“00:00”格式
  function timeFormat(sec){
    var m = parseInt(sec/60);
    var s = parseInt(sec%60);
    return (m < 10 ?  '0' + m : m)+ ':' + (s < 10 ?  '0' + s : s);
  }
}