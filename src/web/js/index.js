import { Elm } from "../elm/Main";
import { Kart } from "./kart";
import "../style.css";

const app = Elm.Main.init({ node: document.getElementById("main") });
const kart = new Kart(app);

app.ports.startGame.subscribe(kart.init);
app.ports.listWads.subscribe(() => kart.Command_ListWADS_f());
app.ports.requestFullScreen.subscribe(() => kart.requestFullscreen());
app.ports.addFile.subscribe((message) => {
  // We handle this in JavaScript because serializing 60MBs of
  // binary data in base64 is pretty bad!
  const input = document.createElement("input");
  input.type = "file";
  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    kart.addFile(file);
  });

  input.click();
}); 


var Module = Module || {};

var InitializeFS = () => {
  FS.mkdirTree('/addons');
  FS.symlink('/home/web_user/.srb2', '/addons/.srb2');
  FS.mount(IDBFS, {}, '/home/web_user');
    FS.syncfs(true, (err) => {
      console.log("SyncFS done");
      console.log(err);
    });
};  

Module.onRuntimeInitialized = function() {  
  InitializeFS()
}

