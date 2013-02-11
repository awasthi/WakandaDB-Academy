﻿const    LOG_SERVER_URL = 'http://ec2-54-247-62-118.eu-west-1.compute.amazonaws.com/saveCode',    RPC_METHOD = 'saveCode';function logStatsFromWorker(message, port) {    var        data,        rpcNotification,        xhr;    data = message.data;    // JSON-RPC notification    rpcNotification = {    	jsonrpc: '2.0',    	method: RPC_METHOD,    	params: [    	    {    	    	userID: data.client,    	    	code: data.code,    	    	time: data.end - data.begin,    	    	error: data.error    	    }    	]    };    xhr = new XMLHttpRequest();    xhr.open('POST', LOG_SERVER_URL, false);    xhr.setRequestHeader('Content-Type', 'application/json');	xhr.send(rpcNotification);	port.close();}onconnect = function onStatsLogSharedWorker(event) {    var        port;    port = event.ports[0];    port.start();    port.addEventListener(        'message',        function(event) {        	logStatsFromWorker(event, port);        }    );}