export default function DeviceAuthenticationProfile(uuid, id, description, username, password, status) {
    this.uuid = (typeof uuid !== 'string') ? DeviceAuthenticationProfile.defaultProps.uuid : uuid;
    this.id = (typeof id !== 'number') ? DeviceAuthenticationProfile.defaultProps.id : id;

    this.description = (typeof description !== 'string') ? DeviceAuthenticationProfile.defaultProps.description : description;
    this.username = (typeof username !== 'string') ? DeviceAuthenticationProfile.defaultProps.username : username;
    this.password = (typeof password !== 'string') ? DeviceAuthenticationProfile.defaultProps.password : password;
    this.status = (typeof status !== 'boolean') ? DeviceAuthenticationProfile.defaultProps.status : status;
}

DeviceAuthenticationProfile.defaultProps = {
    uuid: null,
    id: null,
    description: '',
    username: '',
    password: '',
    status: true
};