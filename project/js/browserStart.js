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

window.onload = function() {

	var sel = $('#loadGameComboBox');
	if ( sel ) {
		sel['change'](function(){
			var light = document.getElementById("light");
			var value = $(this)['val']();
			if ( value.length > 0 ) {
				light.style.display = "block";
				console.log( "Loading ROM " + value );
				Gui.App.loadRomFromUrl( value );
			} else {
				// If nothing is selected, provide a default value to load
				light.style.display = "none";
				console.log("No ROM selected.");
			}
		});
	}

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
