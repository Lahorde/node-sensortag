var util = require('util');
var debug = require('debug')('test_gyro');
var async = require('async');

var SensorTag = require('./index');

SensorTag.discover(function(sensorTag) {

  sensorTag.on('disconnect', function() {
    console.log('disconnected!');
    process.exit(0);
  });
  
  sensorTag.on('connectionDrop', function() {
    console.log('connection drop!');
  });
  
  sensorTag.on('reconnect', function() {
    console.log('successfully reconnected!');
  });


  async.series([
      function(callback) {
        console.log('connect');
        sensorTag.connect(callback);
      },
      function(callback) {
        console.log('discoverServicesAndCharacteristics');
        sensorTag.discoverServicesAndCharacteristics(callback);
      },
      function(callback) {
        console.log('readDeviceName');
        sensorTag.readDeviceName(function(deviceName) {
          console.log('\tdevice name = ' + deviceName);
          callback();
        });
      },
      function(callback) {
        console.log('readSystemId');
        sensorTag.readSystemId(function(systemId) {
          console.log('\tsystem id = ' + systemId);
          callback();
        });
      },
      function(callback) {
        console.log('readSerialNumber');
        sensorTag.readSerialNumber(function(serialNumber) {
          console.log('\tserial number = ' + serialNumber);
          callback();
        });
      },
      function(callback) {
        console.log('readFirmwareRevision');
        sensorTag.readFirmwareRevision(function(firmwareRevision) {
          console.log('\tfirmware revision = ' + firmwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readHardwareRevision');
        sensorTag.readHardwareRevision(function(hardwareRevision) {
          console.log('\thardware revision = ' + hardwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readSoftwareRevision');
        sensorTag.readHardwareRevision(function(softwareRevision) {
          console.log('\tsoftware revision = ' + softwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readManufacturerName');
        sensorTag.readManufacturerName(function(manufacturerName) {
          console.log('\tmanufacturer name = ' + manufacturerName);
          callback();
        });
      },

      function(callback) {
        console.log('enableGyroscope');
        sensorTag.enableGyroscope(callback);
        //100 is min value corresponding to 10ms
        sensorTag.setGyroscopePeriod(100, function(){});
      },
      function(callback) {
        setTimeout(callback, 1000);
      },
      function(callback) {
         sensorTag.on('gyroscopeChange', function(x, y, z) {
           debug('\tx = %d °/s - y = %d °/s - z = %d °/s', x.toFixed(1), y.toFixed(1), z.toFixed(1));
         });
         sensorTag.notifyGyroscope(function() {
         });
      }
    ]
  );
});
