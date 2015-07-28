package lib.opus;

extern class SpeexResampler {
	public function new(channels: Int, in_rate: Int, out_rate: Int, bits_per_sample: Int, is_float: Boolean, quality: Int): Dynamic;
}
