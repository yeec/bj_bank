var u = navigator.userAgent, app = navigator.appVersion;

var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

if (isiOS){

EMPJSBridge = {
queue: {
ready: true,
commands: [],
timer: null
},
_constructors: []
};


// session id for calls
EMPJSBridge.sessionKey = 0;


/**
 * List of resource files loaded by EMPJSBridge.
 * This is used to ensure JS and other files are loaded only once.
 */
EMPJSBridge.resources = {base: true};

/**
 * Determine if resource has been loaded by EMPJSBridge
 *
 * @param name
 * @return
 */
EMPJSBridge.hasResource = function(name) {
    return EMPJSBridge.resources[name];
};

/**
 * Add a resource to list of loaded resources by EMPJSBridge
 *
 * @param name
 */
EMPJSBridge.addResource = function(name) {
    EMPJSBridge.resources[name] = true;
};

/**
 * Add an initialization function to a queue that ensures it will run and initialize
 * application constructors only once EMPJSBridge has been initialized.
 * @param {Function} func The function callback you want run once EMPJSBridge is initialized
 */
EMPJSBridge.addConstructor = function(func) {
    var state = document.readyState;
    if ( ( state == 'loaded' || state == 'complete' ) )
	{
		func();
	}
    else
	{
        EMPJSBridge._constructors.push(func);
	}
};


(function()
 {
 var timer = setInterval(function()
                         {
                         var state = document.readyState;
                         
                         if ( ( state == 'loaded' || state == 'complete' ) )
                         {
                         clearInterval(timer); // stop looking
                         // run our constructors list
                         while (setInterval._constructors.length > 0)
                         {
                         var constructor = setInterval._constructors.shift();
                         try
                         {
                         constructor();
                         }
                         catch(e)
                         {
                         if (typeof(console['log']) == 'function')
                         {
                         console.log("Failed to run constructor: " + console.processMessage(e));
                         }
                         else
                         {
                         alert("Failed to run constructor: " + e.message);
                         }
                         }
                         }
                         // all constructors run, now fire the deviceready event
                         var e = document.createEvent('Events');
                         e.initEvent('deviceready');
                         document.dispatchEvent(e);
                         }
                         }, 1);
 })();

// centralized callbacks
EMPJSBridge.callbackId = 0;
EMPJSBridge.callbacks = {};
EMPJSBridge.callbackStatus = {
NO_RESULT: 0,
OK: 1,
CLASS_NOT_FOUND_EXCEPTION: 2,
ILLEGAL_ACCESS_EXCEPTION: 3,
INSTANTIATION_EXCEPTION: 4,
MALFORMED_URL_EXCEPTION: 5,
IO_EXCEPTION: 6,
INVALID_ACTION: 7,
JSON_EXCEPTION: 8,
ERROR: 9
};

/**
 * Execute a EMPJSBridge command in a queued fashion, to ensure commands do not
 * execute with any race conditions, and only run when EMPJSBridge is ready to
 * receive them.
 *
 */
EMPJSBridge.exec = function() {
    EMPJSBridge.queue.commands.push(arguments);
    if (EMPJSBridge.queue.timer == null){
        EMPJSBridge.queue.timer = setInterval(EMPJSBridge.run_command, 10);
    }
};

/**
 * Internal function used to dispatch the request to EMPJSBridge.  It processes the
 * command queue and executes the next command on the list.  Simple parameters are passed
 * as arguments on the url.  JavaScript objects converted into a JSON string and passed as a query string argument of the url.
 *
 * Arguments may be in one of two formats:
 *   FORMAT ONE (preferable)
 * The native side will call EMPJSBridge.callbackSuccess or EMPJSBridge.callbackError,
 * depending upon the result of the action.
 *
 * @param {Function} success    The success callback
 * @param {Function} fail       The fail callback
 * @param {String} service      The name of the service to use
 * @param {String} action		The name of the action to use
 * @param {String[]} [args]     Zero or more arguments to pass to the method
 *
 * FORMAT TWO
 * @param {String} command Command to be run in EMPJSBridge, e.g. "ClassName.method"
 * @param {String[]} [args] Zero or more arguments to pass to the method
 * object parameters are passed as an array object [object1, object2] each object will be passed as JSON strings
 * @private
 */
EMPJSBridge.run_command = function() {
    if (!EMPJSBridge.queue.ready){
        return;
        
    }
    EMPJSBridge.queue.ready = false;
    
    if(!this.jsBridge){
        this.jsBridge = document.createElement("iframe");
		this.jsBridge.setAttribute("style", "display:none;");
		this.jsBridge.setAttribute("height","0px");
		this.jsBridge.setAttribute("width","0px");
		this.jsBridge.setAttribute("frameborder","0");
		document.documentElement.appendChild(this.jsBridge);
    }
    var args = EMPJSBridge.queue.commands.shift();
    if (EMPJSBridge.queue.commands.length == 0) {
        clearInterval(EMPJSBridge.queue.timer);
        EMPJSBridge.queue.timer = null;
    }
	
	var service;
	var callbackId = null;
	var start=0;
    try {
 		if (args[0] == null || typeof args[0] === "function") {
            var callback = args[0];
 			service = args[1] + "." + args[2];
			args = args[3];  //array of arguments to
 			callbackId = service + EMPJSBridge.callbackId++;
        	if (callback) {
            	EMPJSBridge.callbacks[callbackId] = {callback:callback};
        	}
 		} else {
 			service = args[0];
 			start = 1;
 		}
        
        var uri = [];
    	var dict = null;
        
        if (args != null){
            for (var i = start; i < args.length; i++) {
                var arg = args[i];
                if (arg == undefined || arg == null)
                    continue;
                if (typeof(arg) == 'object'){
                    dict = arg;
                }
                else{
                    uri.push(encodeURIComponent(arg));
                }
            }
        }
        
    	var next = callbackId != null  ?  ("/" + callbackId + "/") : "/";
        //add the sessionId in the user field of the URL conforming to RFC1808
        //emp://-1134476704@ryt.sms.send/ryt.sms.send0/1123123/hello
        var url = "emp://" + EMPJSBridge.sessionKey + "@"  + service + next + uri.join("/");
        
    	if (dict != null) {
        	url += "?" + encodeURIComponent(JSON.stringify(dict));
    	}
        this.jsBridge.src = url;
    } catch (e) {
        alert(e);
        console.log("EMPJSBridgeExec Error: "+e);
    }
};
/**
 * Called by native code when returning successful result from an action.
 *
 * @param callbackId
 * @param args
 *		args.status - EMPJSBridge.callbackStatus
 *		args.message - return value
 *		args.keepCallback - 0 to remove callback, 1 to keep callback in EMPJSBridge.callbacks[]
 */
EMPJSBridge.callback = function(callbackId, args) {
    
    if (EMPJSBridge.callbacks[callbackId]) {
        // If result is to be sent to callback
        try {
            var message = args.message;
            if(typeof(args.message) == 'string'){
                message = decodeURIComponent(args.message);
            }
            EMPJSBridge.callbacks[callbackId].callback(args.status,message);
        }
        catch (e) {
            console.log("Error in success callback: "+callbackId+" = "+e);
        }
        
        // Clear callback if not expecting any more results
        if (!args.keepCallback) {
            delete EMPJSBridge.callbacks[callbackId];
        }
    }
};


/**
 * Does a deep clone of the object.
 *
 * @param obj
 * @return
 */
EMPJSBridge.clone = function(obj) {
	if(!obj) {
		return obj;
	}
    
	if(obj instanceof Array){
		var retVal = new Array();
		for(var i = 0; i < obj.length; ++i){
			retVal.push(EMPJSBridge.clone(obj[i]));
		}
		return retVal;
	}
    
	if (obj instanceof Function) {
		return obj;
	}
    
	if(!(obj instanceof Object)){
		return obj;
	}
	
	if (obj instanceof Date) {
		return obj;
	}
    
	retVal = new Object();
	for(i in obj){
		if(!(i in retVal) || retVal[i] != obj[i]) {
			retVal[i] = EMPJSBridge.clone(obj[i]);
		}
	}
	return retVal;
};

// Intercept calls to document.addEventListener and watch for unload

EMPJSBridge.m_document_addEventListener = document.addEventListener;

document.addEventListener = function(evt, handler, capture) {
    var e = evt.toLowerCase();
    if (e === 'unload')
	{
        EMPJSBridge.onUnload = function(e){ return handler(e);};
    }
    else
    {
        EMPJSBridge.m_document_addEventListener.call(document, evt, handler, capture);
    }
};

// Intercept calls to document.removeEventListener and watch for events that
// are generated by EMPJSBridge native code

EMPJSBridge.m_document_removeEventListener = document.removeEventListener;

document.removeEventListener = function(evt, handler, capture)
{
    var e = evt.toLowerCase();
    
    if (e === 'unload')
	{
        EMPJSBridge.onUnload = null;
    }
    
    EMPJSBridge.m_document_removeEventListener.call(document, evt, handler, capture);
};

/**
 * Method to fire event from native code
 */
EMPJSBridge.fireEvent = function(type, target) {
    var e = document.createEvent('Events');
    e.initEvent(type);
    
	target = target || document;
	if (target.dispatchEvent === undefined) { // ie window.dispatchEvent is undefined in iOS 3.x
		target = document;
	}
    
    target.dispatchEvent(e);
};

/**
  window back
 
 */
window.back = function(){
    EMPJSBridge.exec(null, "ryt.window", "back", null);
};

/**
 ********************* Camera ********************
 */

if (!EMPJSBridge.hasResource("camera")) {
	EMPJSBridge.addResource("camera");
    CameraError = {
        UNKNOWN_ERROR : 1,
        NOT_SUPPORT_ERROR :2,
    }
    
    camera = function() {
        
    }
    
    /**
     * Gets a picture from source defined by "options.sourceType", and returns the
     * image as defined by the "options.destinationType" option.
     
     * The defaults are sourceType=CAMERA and destinationType=DATA_URL.
     *
     * @param {Function} callback
     */
    camera.open = function(callback) {
        // callback required
        if (typeof callback != "function") {
            // console.log("Camera Error: successCallback is not a function");
            return;
        }
        EMPJSBridge.exec(callback, "ryt.camera", "open", null);
    };
};

/**
 ********************* Geolocation ********************
 */
if (!EMPJSBridge.hasResource("geolocation")) {
EMPJSBridge.addResource("geolocation");
GeolocationError = {
    UNKNOWN_ERROR : 1,
    NOT_SUPPORT_ERROR : 2,
    TIME_OUT_ERROR : 3,
    NO_DATA_ERROR : 4,
}

Position = function(latitude, longitude) {
    this._latitude = latitude; // 纬度（Number）
    this.__defineGetter__("latitude", function(){return this._latitude;});
    this.__defineSetter__("latitude", function(cn){throw {message: "Cannot modify the const attribute"};});
    
    this._longitude = longitude; // 经度 (Number)
    this.__defineGetter__("longitude", function(){return this._longitude;});
    this.__defineSetter__("longitude", function(cn){throw {message: "Cannot modify the const attribute"};});
    
};


geolocation = function() {
    
}

/**
 * get device location
 *
 * @param {double} accuracy
 * @param {Function} callback
 */
geolocation.getCurrentLocation = function(callback, accuracy) {
    try {
        EMPJSBridge.exec(callback, "ryt.geolocation", "getCurrentLocation", [accuracy]);
    }catch(e){
        alert(e);
    }
};
};

/**
 ********************* accelerometer ********************
 */
if (!EMPJSBridge.hasResource("accelerometer")) {
	EMPJSBridge.addResource("accelerometer");
    AccelerometerError = {
        UNKNOWN_ERROR : 1,
        NOT_SUPPORT_ERROR : 2,
        NO_DATA_ERROR : 3,
    }
    
    Acceleration = function(x, y, z) {
        this._x = x; // 坐标系中x轴坐标值（Number）
        this.__defineGetter__("x", function(){return this._x;});
        this.__defineSetter__("x", function(cn){throw {message: "Cannot modify the const attribute"};});
        
        this._y = y; // 坐标系中y轴坐标值 (Number)
        this.__defineGetter__("y", function(){return this._y;});
        this.__defineSetter__("y", function(cn){throw {message: "Cannot modify the const attribute"};});
        
        this._z = z; // 坐标系中z轴坐标值 (Number)
        this.__defineGetter__("z", function(){return this._z;});
        this.__defineSetter__("z", function(cn){throw {message: "Cannot modify the const attribute"};});
    }
    accelerometer = function() {
        
    }
    
    accelerometer.startAccelerometer = function(callback,interval) {
        try {
            if(typeof callback != "function"){
                return;
            }
            EMPJSBridge.exec(callback, "ryt.accelerometer", "startAccelerometer", [interval]);
        }catch(e){
            alert(e);
        }
    };
    
    accelerometer.stopAccelerometer = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.accelerometer", "stopAccelerometer", null);
        }catch(e){
            alert(e);
        }
    };
    
};


/**
 ********************* SMS ********************
 */
if (!EMPJSBridge.hasResource("sms")) {
	EMPJSBridge.addResource("sms");
	SMSError = {
        UNKNOWN_ERROR : 1,
        NOT_SUPPORT_ERROR : 2,
        SEND_FAIL_ERROR : 3,
        TIME_OUT_ERROR : 4,
    }
    
    sms = function() {
        
    }
    
    /**
     * create userInterface of send message
     or jump to message application
     *
     *
     * @param {string} phoneNum
     * @param {string} content
     * @param {Function} callback
     */
    sms.send = function(phoneNum, content, callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.sms", "send", [phoneNum,content]);
        }catch(e){
            alert(e);
        }
        
    };
};

/**
 ********************* Contact ********************
 */
if (!EMPJSBridge.hasResource("contact")) {
	EMPJSBridge.addResource("contact");
	
    ContactError = {
        UNKNOWN_ERROR : 1,
        OPEN_FAIL_ERROR : 2,
        ADD_FAIL_ERROR : 3,
        DEL_FAIL_ERROR : 4,
    }
    Person = function(firstName, middleName, lastName, phoneNumber, email, address) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
    }
    contact = function() {
        
    }
    
    contact.open = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.contact", "open", null);
        }catch(e){
            alert(e);
        }
    };
    contact.add = function(array,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.contact", "add", [array]);
        }catch(e){
            alert(e);
        }
    };
    contact.delete = function(array,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.contact", "delete", [array]);
        }catch(e){
            alert(e);
        }
    };
};
/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */

/**
 ********************* device ********************
 */
if (!EMPJSBridge.hasResource("device")) {
	EMPJSBridge.addResource("device");
    
    Device = function() {
        this.name = null;
        this.platform = null;
        this.version = null;
        this.uuid = null;
        EMPJSBridge.exec(deviceCallback, "ryt.device", "getDeviceInfo", null);
        
    };
    
    function deviceCallback(errorCode,info){
        if(errorCode == 0){
            device.available = true;
            device.platform = info.platform;
            device.version = info.version;
            device.name = info.name;
            device.uuid = info.uuid;
        }else{
            device.available = false;
        }
    }
    if (typeof device == "undefined") {
        device = new Device();
    }
};


//    EMPJSBridge.addConstructor(
//                               function() {
//                               if (typeof device == "undefined") ;
//                               device = new Device();
//                               }
//                               );

/**
 ********************* NetworkConnection ********************
 */
if (!EMPJSBridge.hasResource("RYTNetwork")) {
	EMPJSBridge.addResource("RYTNetwork");
    
    function connectionCallback(errorCode,info){
        if(errorCode == 0){
            http.connectType = info;
        }
    }
    
    RYTNetwork = function () {
        this.connectType = null;
        
        EMPJSBridge.exec(connectionCallback, "ryt.http", "getConnectionInfo", null);
        
    }
    RYTNetwork.prototype.isReachable = function (URI, callback){
        EMPJSBridge.exec(callback, "ryt.http", "isReachable", [URI]);
        
    };
    
    if (typeof http == "undefined") {
        http = new RYTNetwork();
    }
    //    EMPJSBridge.addConstructor(
    //                               function() {
    //                               if (typeof http == "undefined") {
    //                               http = new RYTNetwork();
    //                               }
    //                               }
    //                               );
}
/**
 ********************* file ********************
 */
if (!EMPJSBridge.hasResource("file")) {
	EMPJSBridge.addResource("file");
    FileError = {
        UNKNOWN_ERROR : 1,
        WRITE_FAIL_ERROR : 2,
        READ_FAIL_ERROR :3,
        REMOVE_FAIL_ERROR : 4,
        GET_FAIL_ERROR : 5,
    }
    
    FileEntry = function(name,path){
        this.name = name;
        this.fullPath = path;
    }
    
    file = function() {
        
    };
    file.write = function(name,data,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.file", "write", [name,data]);
        }catch(e){
            alert(e);
        }
    };
    file.read = function(name,type,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.file", "read", [name,type]);
        }catch(e){
            alert(e);
        }
    };
    file.remove = function(name,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.file", "remove", [name]);
        }catch(e){
            alert(e);
        }
    };
    file.isExist = function(name,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.file", "isExist", [name]);
        }catch(e){
            alert(e);
        }
    };
    file.getFile = function(name,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.file", "getFile", [name]);
        }catch(e){
            alert(e);
        }
    };
};
/**
 ********************* Database ********************
 */

if (!EMPJSBridge.hasResource("database")) {
	EMPJSBridge.addResource("database");
    DatabaseError = {
        UNKNOWN_ERROR : 1,
        ADD_FAIL_ERROR : 2,
        GET_FAIL_ERROR : 3,
        INSERT_FAIL_ERROR :4,
        UPDATE_FAIL_ERROR : 5,
        OPEN_FAIL_ERROR : 6,
        CLOSE_FAIL_ERROR : 7,
        EXEC_FAIL_ERROR : 8,
    }
    
    database = function(){
        
    }
    database.addData = function(key,value,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.database", "addData", [key,value]);
        }catch(e){
            alert(e);
        }
    };
    database.getData = function(key,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.database", "getData", [key]);
        }catch(e){
            alert(e);
        }
    };
    database.insertData = function(key,value,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.database", "insertData", [key,value]);
        }catch(e){
            alert(e);
        }
    };
    database.updateData = function(key,value,callback) {
        try {
            var options = [];
            options.push(key);
            options.push(value);
            EMPJSBridge.exec(callback, "ryt.database", "updateData", [key,value]);
        }catch(e){
            alert(e);
        }
    };
};
/**
 ********************* video ********************
 */
/**
 * Create a UUID
 */
function UUIDcreatePart(length) {
    var uuidpart = "";
    for (var i=0; i<length; i++) {
        var uuidchar = parseInt((Math.random() * 256), 10).toString(16);
        if (uuidchar.length == 1) {
            uuidchar = "0" + uuidchar;
        }
        uuidpart += uuidchar;
    }
    return uuidpart;
}
utils = function(){
    
    
}
utils.createUUID = function() {
    return UUIDcreatePart(4) + '-' +
    UUIDcreatePart(2) + '-' +
    UUIDcreatePart(2) + '-' +
    UUIDcreatePart(2) + '-' +
    UUIDcreatePart(6);
};
var mediaObjects = {};
if (!EMPJSBridge.hasResource("Video")) {
	EMPJSBridge.addResource("Video");
    
    VideoError = {
        UNKNOWN_ERROR : 1,
        NO_FILE_ERROR : 2,
        PLAY_FAIL_ERROR : 3,
        PAUSE_FAIL_ERROR : 4,
        RESUME_FAIL_ERROR : 5,
        STOP_FAIL_ERROR :6,
    }
    
    var Video = function(src,callback) {
        this.id = utils.createUUID();
        mediaObjects[this.id] = this;
        
        this.src = src;
        EMPJSBridge.exec(callback, "ryt.video", "load", [this.src,this.id]);
    }
    
    Video.prototype.dispose = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.video", "dispose", [this.id]);
        }catch(e){
            alert(e);
        }
    };
    
    /**
     * Start or resume playing audio file.
     */
    Video.prototype.play = function(frame,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.video", "play", [this.id,frame]);
            
        }catch (e){
            alert(e);
        }
    };
    
    /**
     * Stop playing audio file.
     */
    Video.prototype.stop = function(callback) {
        EMPJSBridge.exec(callback, "ryt.video", "stop", [this.id]);
    };
    
    /**
     * Pause playing audio file.
     */
    Video.prototype.pause = function(callback) {
        EMPJSBridge.exec(callback, "ryt.video", "pause", [this.id]);
    };
    
    
    Video.prototype.resume = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.video", "resume", [this.id]);
        }catch(e){
            alert(e);
        }
    };
};
///**
// ********************* audio ********************
// */
if (!EMPJSBridge.hasResource("audio")) {
	EMPJSBridge.addResource("audio");
    AudioError = {
        UNKNOWN_ERROR : 1,
        NO_FILE_ERROR : 2,
        PLAY_FAIL_ERROR : 3,
        PAUSE_FAIL_ERROR : 4,
        RESUME_FAIL_ERROR : 5,
        STOP_FAIL_ERROR : 6,
        GET_VOLUME_FAIL_ERROR : 7,
        SET_VOLUME_FAIL_ERROR : 8,
    }
    
    var Audio = function(src,callback) {
        this.id = utils.createUUID();
        mediaObjects[this.id] = this;
        this.src = src;
        
        EMPJSBridge.exec(callback, "ryt.audio", "load", [this.src,this.id]);
    }
    
    Audio.prototype.dispose = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.audio", "dispose", [this.id]);
        }catch(e){
            alert(e);
        }
    };
    
    
    /**
     * Start or resume playing audio file.
     */
    Audio.prototype.play = function(numberOfLoops,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.audio", "play", [this.id,numberOfLoops]);
            
        }catch (e){
            alert(e);
        }
    };
    
    /**
     * Stop playing audio file.
     */
    Audio.prototype.stop = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.audio", "stop", [this.id]);
            
        }catch (e){
            alert(e);
        }
    };
    
    /**
     * Pause playing audio file.
     */
    Audio.prototype.pause = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.audio", "pause", [this.id]);
        }catch (e){
            alert(e);
        }
    };
    
    
    Audio.prototype.resume = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.audio", "resume", [this.id]);
        }catch(e){
            alert(e);
        }
    };
    
    Audio.prototype.getMaxVolume = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.audio", "getMaxVolume", [this.id]);
        }catch(e){
            alert(e);
        }
    };
    Audio.prototype.getMinVolume = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.audio", "getMinVolume", [this.id]);
        }catch(e){
            alert(e);
        }
    };
    Audio.prototype.getVolume = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.audio", "getVolume", [this.id]);
        }catch(e){
            alert(e);
        }
    };
    Audio.prototype.setVolume = function(volume,callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.audio", "setVolume", [this.id,volume]);
        }catch(e){
            alert(e);
        }
    };
};

//=====================================================================
var dbObjects = {};
if (!EMPJSBridge.hasResource("Database")) {
	EMPJSBridge.addResource("Database");
    
    Database = function(name,callback) {
        this.name = name;
        
        this.sql = null;
        this.id = utils.createUUID();
        dbObjects[this.id] = this;
        
        EMPJSBridge.exec(callback, "ryt.database", "open", [this.name,this.id]);
    }
    
    Database.prototype.close = function(callback) {
        try {
            EMPJSBridge.exec(callback, "ryt.database", "close", [this.id]);
        }catch(e){
            alert(e);
        }
    };
    
    Database.prototype.exec = function(sql,callback) {
        try {
            this.sql = sql;
            EMPJSBridge.exec(callback, "ryt.database", "exec", [this.sql,this.id]);
        }catch (e){
            alert(e);
        }
    }
};

/********************** idcard *********************/
if (!EMPJSBridge.hasResource("idcard")) {
EMPJSBridge.addResource("idcard");
IDCardError = {
    UNKNOWN_ERROR : 1,
    NOT_SUPPORT_ERROR : 2,
    AUTHORIZE_FAIL_ERROR : 3,
USER_CANCEL_ERROR:4,
    NO_DATA_ERROR : 5,
}

idcard = function() {
    
}

/**
 * idcard detection
 *
 * @param {string} screenOrientation
 * @param {double} side
 * @param {Function} callback
 */

idcard.startDistinguish = function(screenOrientation,side,callback) {
    try {
        EMPJSBridge.exec(callback, "ryt.idcard", "startDistinguish", [screenOrientation,side]);
    }catch(e){
        alert(e);
    }
};
};
                      
/********************** bankcard *********************/
if (!EMPJSBridge.hasResource("bankcard")) {
EMPJSBridge.addResource("bankcard");
BankCardError = {
UNKNOWN_ERROR : 1,
NOT_SUPPORT_ERROR : 2,
AUTHORIZE_FAIL_ERROR : 3,
USER_CANCEL_ERROR:4,
NO_DATA_ERROR : 5,
}

bankcard = function() {

}
                      
/**
 * bankcard detection
 *
 * @param {string} title
 * @param {Function} callback
 */
                      
bankcard.startScan = function(title,callback) {
try {
EMPJSBridge.exec(callback, "ryt.bankcard", "startScan", [title]);
}catch(e){
alert(e);
}
};
};

/********************** bjdevice *********************/
if (!EMPJSBridge.hasResource("bjdevice")) {
EMPJSBridge.addResource("bjdevice");

BJDevice = function(key,value) {
    this.key = key;
    this.value = value;
}

bjdevice = function() {
    
}

/**
 * bjdevice getInfo
 * @param {string} name 获取设备信息的名称
 * @param {string} callbackstring 提供给Android使用的回调
 * @param {function} callback 回调函数
 */
bjdevice.getInfo = function(name,callbackstring,callback) {
    try {
        EMPJSBridge.exec(callback,"ryt.bjdevice","getInfo",[name]);
    } catch(e) {
        alert(e);
    }
};
    
/** doEMPFunction html调用EMP后台方法
 *  @param {string}
 *  @param {string}
 *  @param {string} 预留参数
 */
bjdevice.doEMPFunction = function(flag,data,string) {
    try {
        EMPJSBridge.exec(null,"ryt.bjdevice","doEMPFunction",[flag,data,string]);
    } catch(e) {
        alert(e);
    }
}
    
};
};