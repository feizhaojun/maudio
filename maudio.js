
  var currentAudio,currentAudioBox;
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
  // 时间换算成“00:00”格式
  function timeFormat(sec){
    var m = parseInt(sec/60);
    var s = parseInt(sec%60);
    return (m < 10 ?  '0' + m : m)+ ':' + (s < 10 ?  '0' + s : s);
  }
  // 1000ms后初始化所有音频
  setTimeout(function(){
    $('.audio').each(function(){
      thisAudio = $(this).find('audio')[0];
      $(this).find('.time-keep .duration').text(timeFormat(thisAudio.duration));
    });
  },1000);

  function bindAudioCtrl(){
    $('.audio-control .play').on('click', function(){
      var audioBox = $(this).parent('.audio-control').parent('.audio');
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
    $('.audio-control .fast-reverse').on('click', function(){
      currentAudio.currentTime -= 10;
    });
    $('.audio-control .fast-forward').on('click', function(){
      currentAudio.currentTime += 10;
    });
    $('.audio-control .volume-bar').on('click', function(e){
      var audioBox = $(this).parent('.audio-control').parent('.audio');
      var audio = audioBox.children('audio')[0];
      var p = e.offsetX / audioBox.find('.volume-bar').width();
      audioBox.find('.volume-pass').css({"width":p * 100 + '%'});
      audio.volume = p > 1 ? 1 : p;
    });
    $('.audio-control .mute').on('click', function(e){
      var audioBox = $(this).parent('.audio-control').parent('.audio');
      var audio = audioBox.children('audio')[0];
      if($(this).hasClass('muted')){
        audio.muted = false;
        $(this).removeClass('muted');
      }else{
        audio.muted = true;
        $(this).addClass('muted');
      }
    });
    $('.audio-control .progress-bar').on('click', function(e){
      var audioBox = $(this).parent('.audio-control').parent('.audio');
      var audio = audioBox.children('audio')[0];
      var p = e.offsetX / audioBox.find('.progress-bar').width();
      audioBox.find('.progress-pass').css({"width":p * 100 + '%'});
      audio.currentTime = audio.duration * p;
      // 同步一下本条音频的当前时间
      audioBox.find('.current-time').text(timeFormat(audio.currentTime));
    });
  }
