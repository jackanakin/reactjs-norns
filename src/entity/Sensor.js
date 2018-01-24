export default function Sensor(uuid, id, name, oid, interval, status) {
    this.uuid = (typeof uuid !== 'string') ? Sensor.defaultProps.uuid : uuid;
    this.id = (typeof id !== 'number') ? Sensor.defaultProps.id : id;

    this.name = (typeof name !== 'string') ? Sensor.defaultProps.name : name;
    this.oid = (typeof oid !== 'string') ? Sensor.defaultProps.oid : oid;
    this.interval = (typeof interval !== 'string') ? Sensor.defaultProps.interval : interval;
    this.status = (typeof status !== 'boolean') ? Sensor.defaultProps.status : status;
}

Sensor.prototype.getClone = function () {
    let clone = new Sensor(this.name, this.oid, this.interval, this.status);
    clone.uuid = this.uuid;
    clone.id = this.id;
    return clone;
};

Sensor.defaultProps = {
    uuid: null,
    id: null,
    name: '',
    oid: '',
    interval: 'THREEHUNDRED',
    status: true
};