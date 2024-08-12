var InitializeFS = () => { //uhh this is an attempt at a file system, I have almost no experience in javascript
   // Make a directory other than '/'
			// FS.mkdir('/user');
			// Then mount with IDBFS type
			FS.mount(IDBFS, {}, '/home/web_user'); 

            // Then sync
			FS.syncfs(true, function (err) {
				console.log("Intial syncFS done");
                if (err) {
                		console.log(err); }

  }); 
} 

var Module = {
    onRuntimeInitialized: function() {
      InitializeFS();
    }
  };
  
