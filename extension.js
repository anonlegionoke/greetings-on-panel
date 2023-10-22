const { St, Clutter } = imports.gi;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const Mainloop = imports.mainloop;

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

    updateGreeting();
}

function updateGreeting() {
    const myArray = ["Good Morning 🌄", "Good Afternoon 🌞", "Good Evening 🌅"];
    const now = GLib.DateTime.new_now_local();
    const nowString = now.format("%H:%M");

    if (nowString < "12:00") {
        currentIndex = 0;
    } else if (nowString < "17:00") {
        currentIndex = 1;
    } else {
        currentIndex = 2;
    }

    panelButtonText.set_text(myArray[currentIndex]);
}

function enable() {
    Main.panel._leftBox.insert_child_at_index(panelButton, -1);
    updateGreeting(); // Set the initial greeting
    Mainloop.timeout_add_seconds(5, updateGreeting); // Update every 5 seconds
}

function disable() {
    Main.panel._leftBox.remove_child(panelButton);
}


