package lib;

import js.html.Navigator;
import js.html.audio.AudioContext;

class Audio {
	public static function getUserMedia(constraints: Dynamic, success: Dynamic, error: Dynamic): Void {
		var f = untyped __js__("function(c, s, e) { 
			window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
			window.navigator.getUserMedia(c, s, e);
        }");
		f(constraints, success, error);
	}
}
