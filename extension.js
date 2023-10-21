const {St, Clutter} = imports.gi;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const Mainloop = imports.mainloop;



let panelButton;

function init () {

panelButton = new St.Bin({
    style_class : "panel-button",
});

let myArray = ["Good Morning 🌄", "Good Afternoon 🌞", "Good Evening 🌅"];

let panelButtonText = new St.Label({
    text : myArray[0],
    y_align: Clutter.ActorAlign.CENTER,
});
panelButton.set_child(panelButtonText);

let currentIndex = 2;

function toggle (){

let now = GLib.DateTime.new_now_local();
let nowString = now.format("%H:%M");
 
 if (nowString < "12:00") {
   currentIndex = (currentIndex + 1)%3
    panelButtonText.set_text(myArray[currentIndex]);
    }
    else if (nowString < "17:00") {
    currentIndex = (currentIndex + 2)%3
    panelButtonText.set_text(myArray[currentIndex]);
    }
      else {
      currentIndex = (currentIndex + 0)%3
      panelButtonText.set_text(myArray[currentIndex]);
      }
  }
  toggle();
}

function enable () {
Main.panel._leftBox.insert_child_at_index(panelButton, -1); 
}

function disable (){
Main.panel._leftBox.remove_child(panelButton);
}

