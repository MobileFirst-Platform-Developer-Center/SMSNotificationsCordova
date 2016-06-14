/**
* Copyright 2016 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

// Default tags if "Get Tags" is not clicked first
var tags = ['sample-tag1','sample-tag2'];

// Called automatically after MFP framework initialization by WL.Client.init(wlInitOptions).
function wlCommonInit(){
    //MFP APIs should only be called within wlCommonInit() or after it has been called, to ensure that the APIs have loaded properly
    MFPPush.initialize(
       function(successResponse) {
        WL.Logger.debug("Successfully intialized");
        MFPPush.registerNotificationsCallback(notificationReceived);
    }, function(failureResponse) {
        alert("Failed to initialize");
    });

    //add event listeners for click on buttons

    document.getElementById("registerDevice").addEventListener("click", registerDevice);
    document.getElementById("unregister").addEventListener("click", unregisterDevice);
    document.getElementById("phone").addEventListener()

}


function registerDevice() {
var phoneNumber = prompt("Enter Your 10 digit phone number");
if(phoneNumber != null && phoneNumber!="" && /^\d+$/.test(phoneNumber)) {
    var options = {};
    options.phoneNumber = phoneNumber;
    MFPPush.registerDevice(options
    , function(successResponse) {
        alert("Successfully registered");
        enableButtons();
    }, function(failureResponse) {
        alert("Failed to register");
    });
    return true;
}
else {
alert("Failed to register, You have entered invalid number");
}
}



function unregisterDevice() {
    MFPPush.unregisterDevice(
      function(successResponse) {
           alert("Unregistered successfully");
           disableButtons();
      },
      function(){
           alert("Failed to unregister");
      }
    );
}

var notificationReceived = function(message) {
    alert (JSON.stringify(message));
};

function enableButtons() {
    document.getElementById("unregister").disabled = false;
}

function disableButtons(){
    document.getElementById("unregister").disabled = true;
}


