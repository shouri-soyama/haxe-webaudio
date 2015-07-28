package audio;

import lib.elm.App;
import lib.elm.Signal;

import audio.Action;
import audio.Model;
import audio.TaskExecutor;
import audio.Update;
import audio.View;

class Main {
	public static function main() {
		var app = App.create({
			model: Models.init(),
			update: Update.update,
			view: View.view
		});
		App.renderToBody(app.main());
		var exec = new TaskExecutor();
		app.task().stream().assign(function(task) {
			exec.exec(app.address(), task);
		});
		app.address().send(Init);
	}
}
