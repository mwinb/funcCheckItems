//funcCheckList
//CREATED BY MICHAEL WINBERRY
$(document).ready( function () {

    $('#currentDeviceList').hide();
    $('#devices').hide();
    $('.displayCode').hide();
    $('#createFromCode').hide();
    $('#displayName').hide();
    $('#preDefAcc').hide();
    $('.border').hide();

    var deviceList = [];
    var currentAccessories = [];
    var deviceIndex;
    var previousIndex;
 

    $('#buttonNewTv').click(function () 
    {
        var tvAccessories = ["Factory Box", 'Hub', "Remote", "Documentation","AC Adapter", "Stands", 
        "Screws", "HDMI", "Optical", "AV Cable", 'Func Check Done']

        initilizeDevice("TV", tvAccessories);

    });

    $('#buttonNewSoundBar').click(function () 
    {
        var sbAccessories = ["Factory Box", "Documentation","AC Adapter", "Remote",
        "HDMI", "Optical", "AV Cable", "Aux Cable", 'Func Check Done']

        initilizeDevice("Sound Bar", sbAccessories);

    });

    $('#buttonMediaPlayer').click(function () 
    {
        var mpAccessories = ['Factory Box','Documentation', 'Remote', 'Documentation', 'AC Adapter',
        'HDMI', 'Func Check Done'];

        initilizeDevice("Media Player",mpAccessories);
    });

    $('#buttonHeadPhones').click(function () 
    {
        var hpAccessories = ['Factory Box', 'Remote', 'Spare Ear Buds', 'Stand', 'AC adapter',
        'Documentation', 'Func Check Done']

        initilizeDevice("Head Phones", hpAccessories);
    });

    $('#buttonReciever').click(function () {
        var rcAccessories = ['Factory Box', 'Documentation','Remote', 'AV Cables', 'Aux Cable',
        'Optical Cable', 'HDMI', 'Speaker Cables', 'Func Check Done'];

        initilizeDevice('Reciever', rcAccessories);
    });

    $('#buttonComputer').click(function () {
        var pcAccessories = ['Factory Box', 'Documentation', 'Mouse', 'Keyboard',
        'Pen', 'AC Adaper', 'Speaker/External Device', 'Func Check Done'];

        initilizeDevice("Computer", pcAccessories);
    });

    $('#buttonTablet').click(function () 
    {
        var tbAccessories = ['Factory Box', 'Documentation', 'AC power Cord',
        'USB Block', 'Pen', 'Func Check Done'];

        initilizeDevice("Tablet", tbAccessories);
    });

    $('#buttonMisc').click(function () 
    {
        var mcAccesories = ['Factory Box', 'Charger', 'Remote', 'Documentation',
        'Hub', 'HDMI', 'Pen', 'Speakers', 'SubWoofer', 'AV Cables', 'Aux Cable', 
        'Optical Cable', 'SD Card', 'Hardware', 'Stands', 'Func Check Done'];

        initilizeDevice("Miscellaneous Device", mcAccesories);
    });

    $('#buttonCode').click(function () 
    {
        if( $('#oldCode').val() != '' && deviceIndex != null ) 
        {
            try 
            {
                var oldCode = $('#oldCode').val();
                oldCode = parseInt(oldCode, 16).toString(2);
                var currentDevice = deviceList[deviceIndex];
                currentDevice.setNewButtons();
                while(oldCode.length < currentDevice.accessoryButtons.length)
                {
                    oldCode = "0" + oldCode;
                }
                currentDevice.setCode(oldCode);   
                $('#oldCode').val(""); 
            }
            catch (err) 
            {
                alert("Improper Code. Make Sure Device Selected is Correct Type");
            }
        }
        else 
        {
            alert("Error. Make Sure Code Entered is Valid");
        }
    });

    var initilizeDevice = function(deviceType, accessories) 
    {
        $('#currentDeviceList').show()
        $('#devices').show()
        $('#createFromCode').show()
        $('.displayCode').show()
        $('#displayName').show()
        $('#preDefAcc').show()
        $('.border').show();

        $('body').animate({
            scrollTop: $("#devices").offset().top
        }, 2000);


        var buttons = [];
        for (var i=0; i < accessories.length; i++) 
        {
            buttons.push(newAccessoryButton(accessories[i], i));
        }

        if($('#nameInput').val() != "") 
        {
            var deviceName = $('#nameInput').val();
            $('#nameInput').val('');
        }
        else
        {
            var deviceName = "Generic " + deviceType;
        }

        if(deviceIndex == null) 
        {
            deviceIndex = 0;
            var newDV =  newDevice(deviceType, deviceIndex, deviceName, accessories, buttons);
            deviceList.push(newDV);
            
            previousIndex = deviceIndex;
            var newCode = deviceList[deviceIndex].getCode();

            deviceList[deviceIndex].setNewButtons();
            deviceList[deviceIndex].setCode(newCode);

            $(deviceList[deviceIndex].deviceButton.css('background-color', 'coral'));
            $(deviceList[deviceIndex].deviceButton.css('box-shadow', '5px 5px 5px 0px slategrey'));
        }
        else 
        {
            previousIndex = deviceIndex;
            
            deviceIndex = deviceList.length;
            
            var newDV =  newDevice(deviceType, deviceIndex, deviceName, accessories, buttons);
            
            deviceList.push(newDV);
            
            clearAccessoryButtons(previousIndex);

            var newCode = deviceList[deviceIndex].getCode();

            clearAccessoryButtons(deviceIndex);

            deviceList[deviceIndex].setNewButtons();
            deviceList[deviceIndex].setCode(newCode);
            
            $(deviceList[deviceIndex].deviceButton.css('background-color', 'coral'));
            $(deviceList[deviceIndex].deviceButton.css('box-shadow', '5px 5px 5px 0px slategrey'));
            $(deviceList[previousIndex].deviceButton.css('background-color', 'slategrey'));
            $(deviceList[previousIndex].deviceButton.css('box-shadow', '5px 5px 5px 0px coral'));
        }

    }


    var clearAccessoryButtons = function (prevIndex) 
    {
        for (var i = 0; i < deviceList[prevIndex].accessoryButtons.length; i++) 
        {
            $('#' + deviceList[prevIndex].accessoryButtons[i].attr('id')).remove();
        }
    }

    var addButtons = function(currentIndex) 
    {
        var tempDevice = deviceList[currentIndex];
        for (var i = 0; i < deviceList[currentIndex].accessoryButtons.length; i++) 
        {
            var currentButton = deviceList[currentIndex].accessoryButtons[i];
            
            $('#devicesButtons').append(currentButton);
            
            if(currentButton.attr('clicked') == 'true') 
            {
                currentButton.css('background-color', 'coral');
                currentButton.css('box-shadow', '5px 5px 5px 0px slategrey');

            } 
            else 
            {
                currentButton.css('background-color', 'slategrey');
                currentButton.css('box-shadow', '5px 5px 5px 0px coral');
            }
        }

        for (var i =0; i < deviceList.length; i++) 
        {
            $('#devices').append(deviceList[i].deviceButton);
        }

        var currentButton = deviceList[currentIndex].deviceButton;
        var deviceName = deviceList[currentIndex].name;
        
        $('#nameTitle').html(deviceName);
        
        var newCode = tempDevice.code;
        var hexCode = parseInt(newCode, 2).toString(16).toUpperCase();
        
        $('#currentCode1').html(hexCode);
        $('#currentCode2').html(hexCode);

    }


    var newDeviceButton = function(deviceType, Index, deviceName) 
    {
        var $btn = $('<button/>', {
            id: deviceType + Index,
            class: 'buttons',
        });

        $($btn).html(deviceType + " " + deviceName + " " + Index);

        $($btn).on('click', function () {
            if(Index != deviceIndex)
            {
            previousIndex = deviceIndex;
            deviceIndex = Index;
            $('#nameTitle').html(deviceName);
            
            deviceList[deviceIndex].setNewButtons();
            deviceList[deviceIndex].setCode(deviceList[deviceIndex].code);
            
            $(deviceList[deviceIndex].deviceButton.css('background-color', 'coral'));
            $(deviceList[deviceIndex].deviceButton.css('box-shadow', '5px 5px 5px 0px slategrey'));
            $(deviceList[previousIndex].deviceButton.css('background-color', 'slategrey'));
            $(deviceList[previousIndex].deviceButton.css('box-shadow', '5px 5px 5px 0px coral'));
            
        }

        });

        return $btn
    }

    var newAccessoryButton = function (buttonValue, buttonIndex) 
    {
        var $btn = $('<input/>', {
            id: 'accessory' + buttonIndex,
            type: 'button',
            value: buttonValue,
            index: buttonIndex,
            class: 'buttons',
            clicked: 'false'
        });

        $($btn).val(buttonValue);

        $($btn).on('click', function () 
        {
            if ($($btn).attr('clicked') == 'false') 
            {
                $($btn).attr('clicked', 'true');
                $($btn).css('background-color', 'coral');
                $($btn).css('box-shadow', '5px 5px 5px 0px slategrey');
                deviceList[deviceIndex].code = deviceList[deviceIndex].getCode();
            }
            else if ($($btn).attr('clicked') == 'true') 
            {
                $($btn).attr('clicked', 'false');
                $($btn).css('background-color', 'slategrey');
                $($btn).css('box-shadow', '5px 5px 5px 0px coral');
                deviceList[deviceIndex].code = deviceList[deviceIndex].getCode();
            }

            var tempDevice = deviceList[deviceIndex];
            
            var newCode = tempDevice.getCode();
            var hexCode = parseInt(newCode, 2).toString(16).toUpperCase();
            
            $('#currentCode1').html(hexCode);
            $('#currentCode2').html(hexCode);
            
        });

        return $btn
    }


    var newDevice = function (deviceType, deviceIndex, deviceName, deviceAccessories, deviceButtons) 
    {
        return {
            type: deviceType,

            index: deviceIndex,

            name: deviceName,

            accessories: deviceAccessories,

            accessoryButtons: deviceButtons,

            deviceButton: newDeviceButton(deviceType, deviceIndex, deviceName),

            code: '',


            getCode: function () {
                var newCode = "";
                for (var i = 0; i < this.accessoryButtons.length; ++i) {
                    if (this.accessoryButtons[i].attr('clicked') == 'false') 
                    {
                        newCode += 0;
                    }
                    else 
                    {
                        newCode += 1;
                    }

                }

                return newCode;
            },

            setCode: function (inputedCode) 
            {
                var newCode = inputedCode;
                for (var i = 0; i < this.accessoryButtons.length; ++i) 
                {
                    if(newCode.charAt(i) == '1') 
                    {
                        this.accessoryButtons[i].attr('clicked', 'true');
                    }
                    else if (newCode.charAt(i)=='0')
                    {
                        this.accessoryButtons[i].attr('clicked', 'false');
                    }
                }

                this.code = newCode;

                clearAccessoryButtons(deviceIndex);
                addButtons(deviceIndex);


            },

            setNewButtons: function() 
            {
                this.accessoryButtons = [];
                for (var i = 0; i < this.accessories.length; i++) 
                {
                    this.accessoryButtons.push(newAccessoryButton(this.accessories[i]));
                }

                clearAccessoryButtons(previousIndex);

            }

        }  
    }
})
