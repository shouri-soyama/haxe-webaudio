package audio;

import haxe.Json;

import js.html.Float32Array;
import js.html.audio.AudioContext;
import js.html.audio.AudioBuffer;
import js.html.audio.AudioBufferSourceNode;
import js.html.audio.ScriptProcessorNode;

import lib.Audio;
import lib.Util;
import lib.elm.Signal;

import audio.Action;

class TaskExecutor {
	var audioContext: AudioContext;
	var scriptProcessor: ScriptProcessorNode;
	var audioConf = {
		bufferSize: 16384,
		channels: 1,
		sampleRate: 8000
	};
	var playingTime: Float = 0.0;
	public function new() {
		this.audioContext = null;
	}
	public function exec(address: Address<Action>, task: Task) {
		switch (task) {
      	case StartRec:
			this.audioContext = new AudioContext();
			this.scriptProcessor = audioContext.createScriptProcessor(audioConf.bufferSize, 1, 1);
			this.scriptProcessor.onaudioprocess = function(e) {
				var data = e.inputBuffer.getChannelData(0);
				trace(data);
				address.send(SoundArrived(data));
			};
			Audio.getUserMedia({ audio: true, video: false }, function(stream) {
				var micSource = audioContext.createMediaStreamSource(stream);
				micSource.connect(this.scriptProcessor);
			}, function(err) {
				trace(err);
			});
			this.scriptProcessor.connect(audioContext.destination);
		case Play(sounds):
			this.scriptProcessor.disconnect();
			for (s in sounds) {
				var buffer: AudioBuffer = audioContext.createBuffer(audioConf.channels, s.length, audioContext.sampleRate);
				buffer.getChannelData(0).set(s);
				var source: AudioBufferSourceNode = audioContext.createBufferSource();
				source.buffer = buffer;
				source.connect(audioContext.destination);
				var playTime = Math.max(audioContext.currentTime, playingTime);
				source.start(playTime);
				playingTime = playTime + buffer.duration;
			}
		default:
			return;
		}
	}
}
