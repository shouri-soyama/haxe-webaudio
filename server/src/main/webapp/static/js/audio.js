(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
Math.__name__ = true;
var audio_Action = { __ename__ : true, __constructs__ : ["Init","RecordClicked","SoundArrived","PlayClicked"] };
audio_Action.Init = ["Init",0];
audio_Action.Init.toString = $estr;
audio_Action.Init.__enum__ = audio_Action;
audio_Action.RecordClicked = ["RecordClicked",1];
audio_Action.RecordClicked.toString = $estr;
audio_Action.RecordClicked.__enum__ = audio_Action;
audio_Action.SoundArrived = function(sounds) { var $x = ["SoundArrived",2,sounds]; $x.__enum__ = audio_Action; $x.toString = $estr; return $x; };
audio_Action.PlayClicked = ["PlayClicked",3];
audio_Action.PlayClicked.toString = $estr;
audio_Action.PlayClicked.__enum__ = audio_Action;
var audio_Task = { __ename__ : true, __constructs__ : ["StartRec","Play"] };
audio_Task.StartRec = ["StartRec",0];
audio_Task.StartRec.toString = $estr;
audio_Task.StartRec.__enum__ = audio_Task;
audio_Task.Play = function(sounds) { var $x = ["Play",1,sounds]; $x.__enum__ = audio_Task; $x.toString = $estr; return $x; };
var audio_Main = function() { };
audio_Main.__name__ = true;
audio_Main.main = function() {
	var app = lib_elm_App.create({ model : audio_Models.init(), update : audio_Update.update, view : audio_View.view});
	lib_elm_App.renderToBody(app.main());
	var exec = new audio_TaskExecutor();
	app.task().stream().assign(function(task) {
		exec.exec(app.address(),task);
	});
	app.address().send(audio_Action.Init);
};
var audio_Model = { __ename__ : true, __constructs__ : ["Init","Recording","Recorded"] };
audio_Model.Init = ["Init",0];
audio_Model.Init.toString = $estr;
audio_Model.Init.__enum__ = audio_Model;
audio_Model.Recording = function(sounds) { var $x = ["Recording",1,sounds]; $x.__enum__ = audio_Model; $x.toString = $estr; return $x; };
audio_Model.Recorded = function(sounds) { var $x = ["Recorded",2,sounds]; $x.__enum__ = audio_Model; $x.toString = $estr; return $x; };
var audio_Models = function() { };
audio_Models.__name__ = true;
audio_Models.init = function() {
	return audio_Model.Init;
};
var audio_TaskExecutor = function() {
	this.playingTime = 0.0;
	this.audioConf = { bufferSize : 16384, channels : 1, sampleRate : 8000};
	this.audioContext = null;
};
audio_TaskExecutor.__name__ = true;
audio_TaskExecutor.prototype = {
	exec: function(address,task) {
		var _g = this;
		switch(task[1]) {
		case 0:
			this.audioContext = new AudioContext();
			this.scriptProcessor = this.audioContext.createScriptProcessor(this.audioConf.bufferSize,1,1);
			this.scriptProcessor.onaudioprocess = function(e) {
				var data = e.inputBuffer.getChannelData(0);
				console.log(data);
				address.send(audio_Action.SoundArrived(data));
			};
			lib_Audio.getUserMedia({ audio : true, video : false},function(stream) {
				var micSource = _g.audioContext.createMediaStreamSource(stream);
				micSource.connect(_g.scriptProcessor);
			},function(err) {
				console.log(err);
			});
			this.scriptProcessor.connect(this.audioContext.destination);
			break;
		case 1:
			var sounds = task[2];
			this.scriptProcessor.disconnect();
			var _g1 = 0;
			while(_g1 < sounds.length) {
				var s = sounds[_g1];
				++_g1;
				var buffer = this.audioContext.createBuffer(this.audioConf.channels,s.length,this.audioContext.sampleRate);
				buffer.getChannelData(0).set(s);
				var source = this.audioContext.createBufferSource();
				source.buffer = buffer;
				source.connect(this.audioContext.destination);
				var playTime = Math.max(this.audioContext.currentTime,this.playingTime);
				source.start(playTime);
				this.playingTime = playTime + buffer.duration;
			}
			break;
		}
	}
};
var audio_Update = function() { };
audio_Update.__name__ = true;
audio_Update.update = function(action,model) {
	{
		var _g_model = model;
		var _g_action = action;
		switch(_g_model[1]) {
		case 0:
			switch(_g_action[1]) {
			case 1:
				return audio_Update.result(audio_Model.Recording([]),[audio_Task.StartRec]);
			default:
				return audio_Update.result(model,[]);
			}
			break;
		case 1:
			switch(_g_action[1]) {
			case 2:
				var sounds = _g_model[2];
				var s = _g_action[2];
				return audio_Update.result(audio_Model.Recording(sounds.concat(s)),[]);
			case 3:
				var sounds1 = _g_model[2];
				return audio_Update.result(audio_Model.Recorded(sounds1),[audio_Task.Play(sounds1)]);
			default:
				return audio_Update.result(model,[]);
			}
			break;
		default:
			return audio_Update.result(model,[]);
		}
	}
};
audio_Update.result = function(next,tasks) {
	return { model : next, tasks : tasks};
};
var lib_VirtualDoms = function() { };
lib_VirtualDoms.__name__ = true;
lib_VirtualDoms.instance = function() {
	return window.virtualDom;
};
var audio_View = function() { };
audio_View.__name__ = true;
audio_View.view = function(address,model) {
	var content;
	switch(model[1]) {
	case 0:
		content = audio_View.d.h("button.btn.btn-default",{ onclick : function(e) {
			address.send(audio_Action.RecordClicked);
		}},["Rec"]);
		break;
	case 1:
		var s = model[2];
		content = audio_View.d.h("button.btn.btn-default",{ onclick : function(e1) {
			address.send(audio_Action.PlayClicked);
		}},["Play"]);
		break;
	default:
		content = "";
	}
	return audio_View.d.h("div.container",[content]);
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var lib_Audio = function() { };
lib_Audio.__name__ = true;
lib_Audio.getUserMedia = function(constraints,success,error) {
	var f = function(c, s, e) { 
			window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
			window.navigator.getUserMedia(c, s, e);
        }
	f(constraints,success,error);
};
var lib_Bacons = function() { };
lib_Bacons.__name__ = true;
lib_Bacons.bus = function() {
	var bacon = lib_Bacons.Bacon;
	return new bacon.Bus();
};
var lib_Util = function() { };
lib_Util.__name__ = true;
lib_Util.copy = function(x,ext) {
	var jq = $;
	return jq.extend({ },x,ext);
};
lib_Util.ajax = function(option) {
	var jq = $;
	jq.ajax(option);
};
lib_Util.cons = function(a,b) {
	var f = function(a, b) { return Array.prototype.concat(a, b); }
	return f(a,b);
};
var lib_elm_App = function(main,address,task) {
	this.main_ = main;
	this.address_ = address;
	this.task_ = task;
};
lib_elm_App.__name__ = true;
lib_elm_App.create = function(option) {
	var actions = lib_elm_Signal.mailbox();
	var initM = { model : option.model, tasks : []};
	var next = function(current,action) {
		return option.update(action,current.model);
	};
	var modelWithTask = lib_elm_Signal.fromStream(actions.signal().stream().scan(initM,next).toEventStream());
	var model = lib_elm_Signal.fromStream(modelWithTask.stream().map(function(x) {
		return x.model;
	}).skipDuplicates());
	var task = lib_elm_Signal.fromStream(modelWithTask.stream().flatMap(function(x1) {
		return lib_Bacons.Bacon.fromArray(x1.tasks);
	}));
	var main = lib_elm_Signal.fromStream(model.stream().map(function(m) {
		return option.view(actions.address(),m);
	}));
	return new lib_elm_App(main,actions.address(),task);
};
lib_elm_App.renderToBody = function(main) {
	var d = lib_VirtualDoms.instance();
	var root = null;
	var prev = null;
	main.stream().assign(function(html) {
		if(root == null) {
			root = d.create(html);
			window.document.body.appendChild(root);
			prev = html;
			return;
		}
		var ps = d.diff(prev,html);
		root = d.patch(root,ps);
		prev = html;
	});
};
lib_elm_App.prototype = {
	main: function() {
		return this.main_;
	}
	,address: function() {
		return this.address_;
	}
	,task: function() {
		return this.task_;
	}
};
var lib_elm_Signal = function(stream) {
	this.stream_ = stream;
};
lib_elm_Signal.__name__ = true;
lib_elm_Signal.fromStream = function(stream) {
	return new lib_elm_Signal(stream);
};
lib_elm_Signal.mailbox = function() {
	var bus = lib_Bacons.bus();
	return lib_elm_Mailbox.fromBus(bus);
};
lib_elm_Signal.prototype = {
	stream: function() {
		return this.stream_;
	}
};
var lib_elm_Address = function(send) {
	this.send_ = send;
};
lib_elm_Address.__name__ = true;
lib_elm_Address.fromBus = function(bus) {
	return new lib_elm_Address(function(x) {
		bus.push(x);
	});
};
lib_elm_Address.prototype = {
	send: function(x) {
		this.send_(x);
	}
	,forwardTo: function(f) {
		var _g = this;
		return new lib_elm_Address(function(x) {
			_g.send(f(x));
		});
	}
};
var lib_elm_Mailbox = function(signal,address) {
	this.signal_ = signal;
	this.address_ = address;
};
lib_elm_Mailbox.__name__ = true;
lib_elm_Mailbox.fromBus = function(bus) {
	return new lib_elm_Mailbox(lib_elm_Signal.fromStream(bus),lib_elm_Address.fromBus(bus));
};
lib_elm_Mailbox.prototype = {
	signal: function() {
		return this.signal_;
	}
	,address: function() {
		return this.address_;
	}
};
String.__name__ = true;
Array.__name__ = true;
audio_View.d = lib_VirtualDoms.instance();
lib_Bacons.Bacon = window.Bacon;
audio_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
