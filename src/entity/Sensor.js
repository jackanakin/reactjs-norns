export default function Sensor(uuid, id, name, oid, interval, status, sensorKind, time, description, interval_shortened) {
    this.uuid = (typeof uuid !== 'string') ? Sensor.defaultProps.uuid : uuid;
    this.id = (typeof id !== 'number') ? Sensor.defaultProps.id : id;

    this.name = (typeof name !== 'string') ? Sensor.defaultProps.name : name;
    this.description = (typeof description !== 'string') ? Sensor.defaultProps.description : description;
    this.oid = (typeof oid !== 'string') ? Sensor.defaultProps.oid : oid;
    this.interval = (typeof interval !== 'string') ? Sensor.defaultProps.interval : interval;
    this.interval_shortened = (typeof interval_shortened !== 'string') ? Sensor.defaultProps.interval_shortened : interval_shortened;
    this.sensorKind = (typeof sensorKind !== 'string') ? Sensor.defaultProps.sensorKind : sensorKind;
    this.time = (typeof time !== 'number') ? Sensor.defaultProps.time : time;
    this.status = (typeof status !== 'boolean') ? Sensor.defaultProps.status : status;
}

Sensor.prototype.getClone = function () {
    let clone = new Sensor(null, null, this.name, this.oid, this.interval, this.status,
        this.sensorKind, this.time, this.description, this.interval_shortened);
    clone.uuid = this.uuid;
    clone.id = this.id;
    return clone;
};

Sensor.defaultProps = {
    uuid: null,
    id: null,
    name: '',
    oid: '',
    interval: 'PER_MINUTE',
    time: 5,
    sensorKind: undefined,
    description: '',
    interval_shortened: '',
    status: true
};