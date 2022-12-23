import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  locCords: any;
  times: any;
  constructor(
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy
  ) {
    this.locCords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.times = Date.now();
  }
  chckAppGpsPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.requestToSwitchOnGPS();
        } else {
          this.askGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
  askGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              this.requestToSwitchOnGPS();
            },
            error => {
              alert(error)
            }
          );
      }
    });
  }
  requestToSwitchOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        this.getLocationAccCords()
      },
      error => alert(JSON.stringify(error))
    );
  }
  getLocationAccCords() {
    this.geolocation.getCurrentPosition().then((response) => {
      this.locCords.latitude = response.coords.latitude;
      this.locCords.longitude = response.coords.longitude;
      this.locCords.accuracy = response.coords.accuracy;
      this.locCords.timestamp = response.timestamp;
    }).catch((err) => {
      alert('Error: ' + err);
    });
  }
}