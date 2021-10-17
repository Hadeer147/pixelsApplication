var waveArr = [];
for(var i = 1; i < $('.charts').length + 1; i++ ) {
    var wavesurfer = WaveSurfer.create({
        container: `#waveform${i}`,
        barWidth: 1,
        barHeight: .2,
        hideScrollbar: true,
        responsive:true,
        cursorWidth: 0,
        progressColor: 'orangered',
        backend: 'MediaElement'
    });
    // wavesurfer.load(`../audio/song${i}.mp3`);
    waveArr.push(wavesurfer);
}

for(x in waveArr) {
   x = parseInt(x);
   waveArr[x].load(`../song${x+1}.mp3`);
   console.log(waveArr);
}

