function createMockServer() {
  jasmine.Ajax.install();
  var servers = {
    alice: {
      serverVersionNumber: 0,
      data: {
        fullName: "Alice Liddell",
        firstName$: "Alice",
        lastName$: "Liddell",
        resetName$: null
      }
    },
    bob: {
      serverVersionNumber: 0,
      data: {
        fullName: "Robert Paulson",
        firstName$: "Robert",
        lastName$: "Paulson",
        resetName$: null
      }
    }
  };


  WebSocket = function FakeWebSocket(url){
    this.url = url;
  };

  function handlePageLoad(url) {
    // if (url.indexOf('alice') > -1) {
    //   full.alice.firstName$ = 'Alice';
    //   full.alice.lastName$ = 'Carroll';
    //   full.alice.fullName = 'Alice Carroll';
    // }
    // else { //index.html
    //   full.bob.firstName$ = 'Bob';
    //   full.bob.lastName$ = 'P';
    //   full.bob.fullName = 'Bob P';
    // }
  }

  var lastUrl = window.location.href;
  // handlePageLoad(lastUrl);

  var stub = jasmine.Ajax.stubRequest(/(\/lab\/polymer\/?$|\/examples\/polymer\/?$|index\.html$|subpage\.html$|alice\/$|bob\/$)/);
  stub.andReturn({
    "responseText": "Error"
  });


  var _old = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (data) {
    var server = servers[this.url.indexOf("alice")>-1? 'alice' : 'bob'];
    if (data == null && this.requestHeaders['Accept'] == 'application/json') {
      stub.responseText = JSON.stringify(server.data);
      stub.responseHeaders = [{name: "Location", value: "_123sessionIdHash/"},{name: "X-Referer", value: "_123sessionIdHash/"}];
    }
    else if (this.requestHeaders['Accept'] == 'application/json-patch+json' && 
      this.url != lastUrl) {
      var outPatches = [];


        // handlePageLoad(this.url);
        // stub.responseHeaders = [{name: "Location", value: this.url},{name: "X-Referer", value: lastUrl}];
        lastUrl = this.url;
        server.serverVersionNumber++;
        outPatches.push({op: 'replace', path: '/_ver#s', value: server.serverVersionNumber});
        outPatches.push({op: 'test', path: '/_ver#c$', value: server.data.firstName$});
        outPatches.push({op: 'replace', path: '/firstName$', value: server.data.firstName$});
        outPatches.push({op: 'replace', path: '/lastName$', value: server.data.lastName$});
        outPatches.push({op: 'replace', path: '/fullName', value: server.data.fullName});

      stub.responseText = JSON.stringify(outPatches);
    } else {
      stub.responseText = "Error";
    }
    console.info("Mock Server ",this.url, "\n request", data, "\n response", stub.status, stub.responseText);
    return _old.apply(this, [].slice.call(arguments));
  };

  WebSocket.prototype.send = function (data) {
    var server = servers[this.url.indexOf("alice")>-1? 'alice' : 'bob'];

    console.info("Mock WebSocket .send to", this.url ,"with",data);
      var inPatches = data ? JSON.parse(data) : [];
      var outPatches = [];

      var clientReplaceVersion = inPatches.shift();
      var serverVersionForOT = inPatches.shift(); // disregard

      server.serverVersionNumber++;
      outPatches.push({op: 'replace', path: '/_ver#s', value: server.serverVersionNumber});
      outPatches.push({op: 'test', path: '/_ver#c$', value: clientReplaceVersion.value});

      jsonpatch.apply(server.data, inPatches);


      inPatches.forEach(function (patch) {
        if (patch.op == "replace" &&
          (patch.path == "/firstName$" || patch.path == "/lastName$")
          ) {
          server.data.fullName = server.data.firstName$ + ' ' + server.data.lastName$;
          outPatches.push({op: 'replace', path: '/fullName', value: server.data.fullName});
        }
        if (patch.op == "replace" &&
          (patch.path == "/resetName$" && patch.value === true)
          ) {
          server.data.firstName$ = "Chuck";
          server.data.lastName$ = "Norris";
          server.data.fullName = server.data.firstName$ + ' ' + server.data.lastName$;
          outPatches.push({op: 'replace', path: '/firstName$', value: server.data.firstName$});
          outPatches.push({op: 'replace', path: '/lastName$', value: server.data.lastName$});
          outPatches.push({op: 'replace', path: '/fullName', value: server.data.fullName});
          outPatches.push({op: 'replace', path: '/resetName$', value: false});
        }
      });


    console.info("Mock WebSocket message ",{data: outPatches});
    this.onmessage({data: JSON.stringify(outPatches) });
  };
};
