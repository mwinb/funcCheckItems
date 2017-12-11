//funcCheckList
//CREATED BY MICHAEL WINBERRY
$(document).ready( function () {

	var deviceList = [];
	var deviceCodes = [];
	var currentAccessories = [];
	var deviceIndex;
	var previousIndex;

	$('#buttonNewTv').click(function () {
		var tvAccessories = ["Factory Box", 'Hub', "Remote", "Documentation","AC Adapter", "Stands", 
		"Screws", "HDMI", "Optical", "AV Cable", 'Func Check Done']
		var tvButtons = [];

		initilizeDevice("TV", tvAccessories, tvButtons);

	});

	$('#buttonNewSoundBar').click(function () {
		var sbAccessories = ["Factory Box", "Documentation","AC Adapter", "Remote",
		"HDMI", "Optical", "AV Cable", "Aux Cable", 'Func Check Done']
		var sbButtons = [];

		initilizeDevice("Sound Bar", sbAccessories, sbButtons);

	});

	$('#buttonMediaPlayer').click(function () {
		var mpAccessories = ['Factory Box','Documentation', 'Remote', 'Documentation', 'AC Adapter',
		'HDMI', 'Func Check Done'];
		var mpButtons = [];

		initilizeDevice("Media Player",mpAccessories, mpButtons);
	})

	$('#buttonHeadPhones').click(function () {
		var hpAccessories = ['Factory Box', 'Remote', 'Spare Ear Buds', 'Stand', 'AC adapter',
		'Documentation', 'Func Check Done']

		var hpButtons = [];

		initilizeDevice("Head Phones", hpAccessories, hpButtons);
	})

	$('#buttonReciever').click(function () {
		var rcAccessories = ['Factory Box', 'Documentation','Remote', 'AV Cables', 'Aux Cable',
		'Optical Cable', 'HDMI', 'Speaker Cables', 'Func Check Done'];
		var rcButtons = [];

		initilizeDevice('Reciever', rcAccessories, rcButtons);
	})

	$('#buttonComputer').click(function () {
		var pcAccessories = ['Factory Box', 'Documentation', 'Mouse', 'Keyboard',
		'Pen', 'AC Adaper', 'Speaker/External Device', 'Func Check Done'];
		var pcButtons = [];

		initilizeDevice("Computer", pcAccessories, pcButtons);
	})

	$('#buttonTablet').click(function () {
		var tbAccessories = ['Factory Box', 'Documentation', 'AC power Cord',
		'USB Block', 'Pen', 'Func Check Done'];
		var tbButtons = [];

		initilizeDevice("Tablet", tbAccessories, tbButtons);
	})

	$('#buttonMisc').click(function () {
		var mcAccesories = ['Factory Box', 'Charger', 'Remote', 'Documentation',
		'Hub', 'HDMI', 'Pen', 'Speakers', 'SubWoofer', 'AV Cables', 'Aux Cable', 
		'Optical Cable', 'SD Card', 'Hardware', 'Stands', 'Func Check Done'];
		var mcButtons = [];

		initilizeDevice("Miscellaneous Device", mcAccesories, mcButtons);
	})

	var initilizeDevice = function(deviceType,accessories, buttons) {
		for (var i=0; i < accessories.length; i++) {
			buttons.push(newAccessoryButton(accessories[i], i));
		}

		var deviceBrand = prompt("Enter Device Brand", "Brand");
		var deviceModel = prompt("Enter Device Model", "Model#");

		if(deviceIndex == null) {
			deviceIndex = 0;
			var newDV =  newDevice(deviceType, deviceIndex, deviceBrand, deviceModel, accessories, buttons);
			deviceList.push(newDV);
			addButtons(deviceIndex);
			
			previousIndex = deviceIndex;
			var newCode = deviceList[deviceIndex].getCode();
			clearAccessoryButtons(deviceIndex);
			deviceList[deviceIndex].setNewButtons();
			deviceList[deviceIndex].setCode(newCode);
			$(deviceList[deviceIndex].deviceButton.css('background-color', 'coral'));
		}
		else {
			previousIndex = deviceIndex;
			deviceIndex = deviceIndex + 1;
			var newTV =  newDevice(deviceType, deviceIndex, deviceBrand, deviceModel, accessories, buttons);
			
			deviceList.push(newTV);
			clearAccessoryButtons(previousIndex);
			addButtons(deviceIndex)
			var newCode = deviceList[deviceIndex].getCode();
			clearAccessoryButtons(deviceIndex);
			deviceList[deviceIndex].setNewButtons();
			deviceList[deviceIndex].setCode(newCode);
			
			$(deviceList[deviceIndex].deviceButton.css('background-color', 'coral'));
			$(deviceList[previousIndex].deviceButton.css('background-color', 'slategrey'));
		}
	}

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
		var newCode = tempDevice.code;
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
			
			deviceList[deviceIndex].setNewButtons();
			deviceList[deviceIndex].setCode(deviceList[deviceIndex].code);
			
			$(deviceList[deviceIndex].deviceButton.css('background-color', 'coral'));
			$(deviceList[previousIndex].deviceButton.css('background-color', 'slategrey'));

		})

		return $btn
	}

	var newAccessoryButton = function (buttonValue, buttonIndex) {
		var $btn = $('<button/>', {
			id: 'accessory' + buttonIndex,
			type: 'button',
			value: buttonValue,
			index: buttonIndex,
			class: 'buttons',
			clicked: 'false'
		});

		$($btn).html(buttonValue);

		$($btn).on('click', function () {
			if ($($btn).attr('clicked') == 'false') {
				$($btn).attr('clicked', 'true');
				$($btn).css('background-color', 'coral');
				deviceList[deviceIndex].code = deviceList[deviceIndex].getCode();
			}
			else if ($($btn).attr('clicked') == 'true') {
				$($btn).attr('clicked', 'false');
				$($btn).css('background-color', 'slategrey');
				deviceList[deviceIndex].code = deviceList[deviceIndex].getCode();
			}

			var tempDevice = deviceList[deviceIndex];
			var newCode = tempDevice.getCode();
			$('#currentCode').html(newCode);
			
		})

		return $btn
	}


	var newDevice = function (deviceType, deviceIndex,
		deviceName, deviceModel, deviceAccessories, deviceButtons) {
		return {
			type: deviceType,

			index: deviceIndex,

			name: deviceName,

			model: deviceModel,

			accessories: deviceAccessories,

			accessoryButtons: deviceButtons,

			deviceButton: newDeviceButton(deviceType, deviceIndex, deviceName, deviceModel),

			code: '',


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

				this.code = newCode;

				clearAccessoryButtons(deviceIndex);
				addButtons(deviceIndex);


			},

			setNewButtons: function() {
				this.accessoryButtons = [];
				for (var i = 0; i < this.accessories.length; i++) {
					this.accessoryButtons.push(newAccessoryButton(this.accessories[i]));
				}

				clearAccessoryButtons(previousIndex);

			}

		}  
	}
})
