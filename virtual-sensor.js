/*
 * Author: Daniel Holmlund <daniel.w.holmlund@Intel.com>
 * Copyright (c) 2015 Intel Corporation.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Load the library dependencies
var mqtt = require('mqtt');

// Load the application specific configurations
var config = require("./config.json");

// Create an MQTT client named client that is
// conncect to the *config.mqtt.url* value
var client  = mqtt.connect(config.mqtt.url);

// Create variables for the sensor name and topic
var tempSensorName = "temperature";
var tempSensorTopic = "sensors/" + tempSensorName + "/data";

// On the client connect event run a function
// to log the event to the console
client.on('connect', function () {
    console.log("Connected to the MQTT server on " + config.mqtt.url);
});

/*
  getRandomTemp: returns a random integer between min and max
*/
function getRandomTemp(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


setInterval(function() {
    var temp = getRandomTemp(17, 30);

    var current_time = (new Date).getTime();

    var json ={
      sensor_id : tempSensorName,
      value : temp,
      timestamp : current_time
    }

    var str = JSON.stringify(json)

    console.log(str);

    client.publish(tempSensorTopic, str);
}, config.interval);
