package lib.opus;

import js.html.ArrayBuffer;

extern class OpusEncoder {
	public function new(sampling_rate: Int, channels: Int, app: Int, frame_duration: Int): OpusEncoder;
	public function encode(pcm: Float32Array): Array<ArrayBuffer>;
	public function encode_float(pcm: Float32Array): Array<ArrayBuffer>;
	public function encode_final(): ArrayBuffer;
	public function encode_float_final(): ArrayBuffer;
	public function destroy(): Void;
}
