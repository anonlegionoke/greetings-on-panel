const { St, Clutter } = imports.gi;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const Mainloop = imports.mainloop;
const Me = imports.misc.extensionUtils.getCurrentExtension();

let panelButton;
let panelButtonText;
let currentIndex = 0;

function init() {
    panelButton = new St.Bin({
        style_class: "panel-button",
    });

    panelButtonText = new St.Label({
        y_align: Clutter.ActorAlign.CENTER,
    });

    panelButton.set_child(panelButtonText);
}

function updateGreeting() {
    const myArray = ["Good Morning 🌅️", "Good Afternoon 🌞", "Good Evening 🌇️", "Night 🌃️"];
    const now = GLib.DateTime.new_now_local();
    const nowString = now.format("%H:%M:%S");

    if ("05:00:00" < nowString < "12:00:00") {
        currentIndex = 0;
    } else if ("12:00:00" < nowString < "17:00:00") {
        currentIndex = 1;
    } else if ("17:00:00" < nowString < "22:00:00") {
        currentIndex = 2;
    }
      else {
        currentIndex = 3;
    }

    panelButtonText.set_text(myArray[currentIndex]);
}

function enable() {
    Main.panel._centerBox.insert_child_at_index(panelButton, 0);
   let sourceId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 5, () => {
    updateGreeting(); 
    const runAgain = true;

    if (runAgain)
        return GLib.SOURCE_CONTINUE;

    return GLib.SOURCE_REMOVE;
});
}

function disable() {
    Main.panel._centerBox.remove_child(panelButton);
}

