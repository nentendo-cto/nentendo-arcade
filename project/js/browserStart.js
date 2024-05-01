/*
This file is part of WebNES.

WebNES is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

WebNES is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with WebNES.  If not, see <http://www.gnu.org/licenses/>.
*/

this.Gui = this.Gui || {};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Function to check the value of the selector list and update the button text
// function updateButton() {
// 	var shaderListComboBox = document.getElementById("shaderListComboBox");
// 	var toggleButton = document.getElementById("togglePostProcessingButton");
// 	console.log("shader test - " + shaderListComboBox.value);

// 	// Check if the value of the selector list is not null or empty
// 	if (shaderListComboBox.value) {
// 		// If the value is present, update button text accordingly
// 		if (shaderListComboBox.value.length > 0) {
// 			toggleButton.textContent = "Oldschool On";
// 		} else {
// 			toggleButton.textContent = "Oldskool Off";
// 		}
// 	} else {
// 		// If the value is null or empty, set default button text
// 		toggleButton.textContent = "Oldskool Off";
// 	}
// }

// Event listener to call updateButton() when the selector list value changes
// document.getElementById("shaderListComboBox").addEventListener("change", updateButton);

// Initial call to updateButton() when the page loads
// updateButton();

// Function to set the ROM value and trigger play action
// function playRom() {
// 	var loadGameComboBox = document.getElementById("loadGameComboBox");
// 	var playButton = document.getElementById("playButton");
// 	console.log("playrom test - " + loadGameComboBox.value);

// 	// Check if the ROM value is already set
// 	if (loadGameComboBox.value) {
// 		console.log("Playing ROM: " + loadGameComboBox.value);
// 		// playButton.hidden = true;
// 		// Perform play action here, e.g., 
// 		Gui.App.loadRomFromUrl(loadGameComboBox.value);
// 	} else {
// 		console.log("No ROM selected.");
// 		// playButton.hidden = false;
// 		// Provide feedback to the user that no ROM is selected
// 		loadGameComboBox.value = "roms/Super Mario Bros (E).nes.zip";
// 		Gui.App.loadRomFromUrl(loadGameComboBox.value);
// 	}
// }

// playRom();

// Event listener to call playRom() when the play button is clicked
document.getElementById("playButton").addEventListener("click", playRom);

window.onload = function() {
	// let romValue;
	// let shaderValue;

	// This allows a list box to be on the page to load a given nes file local to the site
	// romValue = "roms/Super Mario Bros (E).nes.zip";
	// console.log( "Loading ROM " + value );
	// Gui.App.loadRomFromUrl( value );
	var sel = $('#loadGameComboBox');
	if ( sel ) {
		sel['change'](function(){
			var value = $(this)['val']();
			if ( value.length > 0 ) {
				console.log( "Loading ROM " + value );
				Gui.App.loadRomFromUrl( value );
			} else {
				// If nothing is selected, provide a default value to load
				var defaultValue = "roms/Super Mario Bros (E).nes.zip";
				console.log("No ROM selected. Loading default ROM " + defaultValue);
				Gui.App.loadRomFromUrl(defaultValue);
			}
		});
	}
	
	// And this is the select box for selecting a WebGL shader
	// shaderValue = "shaders/v1.0/CRT.xml";
	// console.log( "Loading shader " + value );
	// Gui.App.loadShaderFromUrl( value );
	sel = $('#shaderListComboBox');
	if ( sel ) {
		sel['change'](function(){
			var value = $(this)['val']();
			if ( value.length > 0 ) {
				console.log( "Loading shader " + value );
				Gui.App.loadShaderFromUrl( value );
			} else {
				// If nothing is selected, provide a default value for the shader
				var defaultValue = "shaders/v1.0/CRT.xml";
				console.log("No shader selected. Loading default shader " + defaultValue);
				Gui.App.loadShaderFromUrl(defaultValue);
			}
		});
	}
	
	var requestedGameToLoad = getParameterByName( 'gameUrl' );
	Gui.App.start( { createGuiComponents: true, loadUrl: requestedGameToLoad } );
};
