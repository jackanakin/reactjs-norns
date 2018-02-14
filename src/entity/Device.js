export default function Device(uuid, id, ipv4, port, description, status, sensorList, snmp, sifCollectorId, authenticatioProfileId, communityProfileId) {
    this.uuid = (typeof uuid !== 'string') ? Device.defaultProps.uuid : uuid;
    this.id = (typeof id !== 'number') ? Device.defaultProps.id : id;

    this.ipv4 = (typeof ipv4 !== 'string') ? Device.defaultProps.ipv4 : ipv4;
    this.port = (typeof port !== 'number') ? Device.defaultProps.port : port;
    this.snmp = (typeof snmp !== 'string') ? Device.defaultProps.snmp : snmp;
    this.sifCollectorId = (typeof sifCollectorId !== 'number') ? Device.defaultProps.sifCollectorId : sifCollectorId;
    this.authenticatioProfileId = (typeof authenticatioProfileId !== 'number') ? Device.defaultProps.authenticatioProfileId : authenticatioProfileId;
    this.communityProfileId = (typeof communityProfileId !== 'number') ? Device.defaultProps.communityProfileId : communityProfileId;
    this.description = (typeof description !== 'string') ? Device.defaultProps.description : description;
    this.status = (typeof status !== 'boolean') ? Device.defaultProps.status : status;
}

Device.defaultProps = {
    uuid: null,
    id: null,
    ipv4: '',
    port: 111,
    snmp: '',
    sifCollectorId: 0,
    authenticatioProfileId: 0,
    communityProfileId: 0,
    description: '',
    status: true
};