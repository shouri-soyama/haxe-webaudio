package audio;

import js.html.Float32Array;

enum Action {
	Init;
	RecordClicked;
	SoundArrived(sounds: Array<Float32Array>);
	PlayClicked;
}
enum Task {
	StartRec;
	Play(sounds: Array<Float32Array>);
}
