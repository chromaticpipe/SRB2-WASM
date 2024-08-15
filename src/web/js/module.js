
var InitializeFS = () => {
    FS.mkdirTree('/addons');
    FS.symlink('/home/web_user/.srb2', '/addons/.srb2')
    FS.mount(IDBFS, {}, '/home/web_user');
    return (new Promise((resolve, reject) => {
      FS.syncfs(true, (err) => {
        console.log("SyncFS done");
        console.log(err);
        resolve();
      });
    }));
  };

var SyncFS = (populate = false) => {
    
    return (new Promise((resolve, reject) => {
      if (typeof FS !== 'undefined')
        FS.syncfs(populate, (err) => {
          console.log('Synced persistent storage');
          console.log(err);
        });
      return resolve();
    }));
  };
  
  var Module = { 
    arguments: [],  

    preRun: [() => {   
        addRunDependency('mount-filesystem'); 
        InitializeFS() 
        .then(()=>{    
            console.log('starting..') //idk what im doing here
        }) 
        .then(_ => SyncFS())
        .finally(() => removeRunDependency('mount-filesystem'));
  }]}