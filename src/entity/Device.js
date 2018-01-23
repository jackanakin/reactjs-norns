/*export class Device {
    constructor() {
        this.uuid = null;
        this.id = null;
        this.ipv4 = '';
        this.port = '';
        this.description = '';
        this.status = true;
        this.sensorList = [];
    }
}*/
export default function Device(uuid, id, ipv4, port, description, status, sensorList) {
    this.uuid = (typeof uuid !== 'string') ? Device.defaultProps.uuid : uuid;
    this.id = (typeof id !== 'number') ? Device.defaultProps.id : id;

    this.ipv4 = (typeof ipv4 !== 'string') ? Device.defaultProps.ipv4 : ipv4;
    this.port = (typeof port !== 'number') ? Device.defaultProps.port : port;
    this.description = (typeof description !== 'string') ? Device.defaultProps.description : description;
    this.status = (typeof status !== 'boolean') ? Device.defaultProps.status : status;
}

Device.defaultProps = {
    uuid: null,
    id: null,
    ipv4: '',
    port: 111,
    description: '',
    status: true
};