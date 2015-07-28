package audio;

import lib.VirtualDom;
import lib.elm.Signal;

import audio.Action;
import audio.Model;

class View {
	static var d = VirtualDoms.instance();
	public static function view(address: Address<Action>, model: Model): Dynamic {
		var content = switch (model) {
		case Init:
			d.h("button.btn.btn-default", {
				onclick: function(e) {
					address.send(RecordClicked);
				}
			}, [ "Rec" ]);
		case Recording(s): 
			d.h("button.btn.btn-default", {
				onclick: function(e) {
					address.send(PlayClicked);
				}
			}, [ "Play" ]);
   		default:
			"";
   		};     
		return d.h("div.container", [ content ]);
	}
}
