(function(){
  var ContextClass = (window.AudioContext ||
                        window.webkitAudioContext ||
                        window.mozAudioContext ||
                        window.osAudioContext ||
                        window.msAudioContext)

  navigator.getWebcam = ( navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

  navigator.getWebcam({ audio: true, video: false}, function(stream){
    var context = new ContextClass();
    var source = context.createMediaStreamSource(stream);

    var analyser = context.createAnalyser();
    source.connect(analyser);

    // var gain = context.createGain();

    console.log(source);
    // console.log(gain);
    console.log(analyser);

    var frequencyData = new Uint8Array(200);

    function renderChart() {
      requestAnimationFrame(renderChart);

      // Copy frequency data to frequencyData array.
      analyser.getByteFrequencyData(frequencyData);
      // console.log(frequencyData);
    }
    // renderChart();


  }, function(){ console.log('error on init!'); });

}());
