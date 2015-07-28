package audio;

import lib.Util.cons;
import lib.Util.copy;
import lib.elm.App.UpdateResult;

import audio.Action;
import audio.Model;

class Update {
	public static function update(action: Action, model: Model): UpdateResult<Model, Task> {
		return switch ({ model: model, action: action }) {
		case { model: Init,              action: RecordClicked   }: result(Recording([]), [ StartRec ]);
		case { model: Recording(sounds), action: SoundArrived(s) }: result(Recording(sounds.concat(s)), []);
		case { model: Recording(sounds), action: PlayClicked     }: result(Recorded(sounds), [ Play(sounds) ]);
		default                                                   : result(model, []);
		}
	}
	static function result(next: Model, tasks: Array<Task>): UpdateResult<Model, Task> {
		return { model: next, tasks: tasks };
	}
}
