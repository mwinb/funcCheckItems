$(document).ready( function () {

	var deviceList = [];
	var currentAccessories = [];
	var deviceIndex;
	var previousIndex;

	$('#buttonNewTv').click(function () {
		var tvAccessories = ["Factory Box", "Documentation","AC Adapter", "Stands", 
		"Screws", "HDMI", "Optical", "AV Cable"]
		var tvButtons = [];

		for (var i = 0; i < tvAccessories.length; i++) {
			tvButtons.push(newAccessoryButton(tvAccessories[i], i));
		}

		var tvBrand = prompt('Enter Brand Name', 'Generic TV');
		var tvModel = prompt('Enter Model Number', 'Model');

		if(deviceIndex == null) {
			deviceIndex = 0;
			var newTV =  newDevice("TV", deviceIndex, tvBrand, tvModel, tvButtons);
			deviceList.push(newTV);
			addButtons(deviceIndex);
			previousIndex = deviceIndex;
			$(deviceList[deviceIndex].deviceButton.css('background-color', 'coral'));
			$(deviceList[deviceIndex].deviceButton.css('box-shadow', '10px 10px 5px 0px slategrey'));
		}
		else {
			previousIndex = deviceIndex;
			deviceIndex = deviceIndex + 1;
			var newTV =  newDevice("TV", deviceIndex, tvBrand, tvModel, tvButtons);
			deviceList.push(newTV);
			clearAccessoryButtons(previousIndex);
			console.log(deviceIndex);
			addButtons(deviceIndex)
			$(deviceList[deviceIndex].deviceButton.css('background-color', 'coral'));
			$(deviceList[deviceIndex].deviceButton.css('box-shadow', '10px 10px 5px 0px slategrey'));
			$(deviceList[previousIndex].deviceButton.css('background-color', 'slategrey'));
			$(deviceList[previousIndex].deviceButton.css('box-shadow', '10px 10px 5px 0px coral'));
		}

	})

	$('#buttonCode').click(function () {
		if($('#oldCode').val() != '' && deviceIndex != null) {
			try {
				var oldCode = $('#oldCode').val();
				var currentDevice = deviceList[deviceIndex];
				currentDevice.setCode(oldCode);	
			}
			catch (err) {
				alert("Improper Code. Make Sure Device Selected is Correct Type");
			}
		}
		else {
			alert("Error. Make Sure Code Entered is Valid");
		}



	})


	var clearAccessoryButtons = function (prevIndex) {
		for (var i = 0; i < deviceList[prevIndex].accessoryButtons.length; i++) {
			$('#' + deviceList[prevIndex].accessoryButtons[i].attr('id')).remove();
		}
	}

	var addButtons = function(currentIndex) {
		var tempDevice = deviceList[currentIndex];
		for (var i = 0; i < deviceList[currentIndex].accessoryButtons.length; i++) {
			var currentButton = deviceList[currentIndex].accessoryButtons[i];
			$('#devicesButtons').append(currentButton);
			if(currentButton.attr('clicked') == 'true') {
				currentButton.css('background-color', 'coral');
			} else {
				currentButton.css('background-color', 'slategrey');
			}
		}
		for (var i =0; i < deviceList.length; i++) {
			$('#devices').append(deviceList[i].deviceButton);
		}
		var currentButton = deviceList[currentIndex].deviceButton;
		var deviceBrand = deviceList[currentIndex].name;
		$('#brandTitle').html(deviceBrand);
		$('#modelTitle').html(deviceList[currentIndex].model);
		var newCode = tempDevice.getCode();
		$('#currentCode').html(newCode);

	}


	var newDeviceButton = function(deviceType, Index, deviceName, deviceModel) {
		var $btn = $('<button/>', {
			id: deviceType + Index,
			class: 'buttons'
		});

		$($btn).html(deviceType + " " + deviceName + " " + deviceModel + " " + Index);

		$($btn).on('click', function () {
			previousIndex = deviceIndex;
			deviceIndex = Index;
			$('#brandTitle').html(deviceName);
			$('#modelTitle').html(deviceModel);
			clearAccessoryButtons(previousIndex);
			addButtons(deviceIndex);
			$(deviceList[deviceIndex].deviceButton.css('background-color', 'coral'));
			$(deviceList[deviceIndex].deviceButton.css('box-shadow', '10px 10px 5px 0px slategrey'));
			$(deviceList[previousIndex].deviceButton.css('background-color', 'slategrey'));
			$(deviceList[previousIndex].deviceButton.css('box-shadow', '10px 10px 5px 0px coral'));

		})

		return $btn
	}

	var newAccessoryButton = function (buttonValue, buttonIndex) {
		var $btn = $('<button/>', {
			id: 'accessory' + buttonIndex,
			index: buttonIndex,
			class: 'buttons',
			clicked: 'false'
		});

		$($btn).html(buttonValue);

		$($btn).on('click', function () {
			if ($($btn).attr('clicked') == 'false') {
				$($btn).attr('clicked', 'true');
				$($btn).css('background-color', 'coral');
			}
			else {
				$($btn).attr('clicked', 'false');
				$($btn).css('background-color', 'slategrey');
			}

			var tempDevice = deviceList[deviceIndex];
			var newCode = tempDevice.getCode();
			$('#currentCode').html(newCode);
			
		})

		return $btn
	}


	var newDevice = function (deviceType, deviceIndex,
		deviceName, deviceModel, deviceAccessories) {
		return {
			type: deviceType,

			index: deviceIndex,

			name: deviceName,

			model: deviceModel,

			accessoryButtons: deviceAccessories,

			deviceButton: newDeviceButton(deviceType, deviceIndex, deviceName, deviceModel),

			getCode: function () {
				var newCode = "";
				for (var i = 0; i < this.accessoryButtons.length; ++i) {
					if (this.accessoryButtons[i].attr('clicked') == 'false') {
						newCode += 0;
					}
					else {
						newCode += 1;
					}

				}

				return newCode;
			},

			setCode: function (inputedCode) {
				var newCode = inputedCode;
				for (var i = 0; i < this.accessoryButtons.length; ++i) {
					if(newCode.charAt(i) == '1') {
						this.accessoryButtons[i].attr('clicked', 'true');
					}
					else if (newCode.charAt(i)=='0'){
						this.accessoryButtons[i].attr('clicked', 'false');
					}
				}

				clearAccessoryButtons(deviceIndex);
				addButtons(deviceIndex);


			}

		}  
	}






})
