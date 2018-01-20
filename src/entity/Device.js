export class Device {
    constructor() {
        this.uuid = null;
        this.id = null;
        this.ipv4 = '';
        this.port = '';
        this.description = '';
        this.status = true;
        this.sensorList = [];
    }
}