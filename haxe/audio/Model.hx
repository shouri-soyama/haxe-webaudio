package audio;

import js.html.Float32Array;

enum Model {
	Init;
	Recording(sounds: Array<Float32Array>);
	Recorded(sounds: Array<Float32Array>);
}
class Models {
	public static function init(): Model {
		return Init;
    }
}
