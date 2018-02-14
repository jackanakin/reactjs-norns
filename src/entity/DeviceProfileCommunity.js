export default function DeviceProfileCommunity(uuid, id, description, status) {
    this.uuid = (typeof uuid !== 'string') ? DeviceProfileCommunity.defaultProps.uuid : uuid;
    this.id = (typeof id !== 'number') ? DeviceProfileCommunity.defaultProps.id : id;

    this.description = (typeof description !== 'string') ? DeviceProfileCommunity.defaultProps.description : description;
    this.status = (typeof status !== 'boolean') ? DeviceProfileCommunity.defaultProps.status : status;
}

DeviceProfileCommunity.defaultProps = {
    uuid: null,
    id: null,
    description: '',
    status: true
};