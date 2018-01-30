export default function SifCollector(id, identifier, description, databaseUrl, status) {
    this.id = (typeof id !== 'number') ? SifCollector.defaultProps.id : id;

    this.identifier = (typeof identifier !== 'string') ? SifCollector.defaultProps.identifier : identifier;
    this.description = (typeof description !== 'string') ? SifCollector.defaultProps.description : description;
    this.databaseUrl = (typeof databaseUrl !== 'string') ? SifCollector.defaultProps.databaseUrl : databaseUrl;
    this.status = (typeof status !== 'boolean') ? SifCollector.defaultProps.status : status;
}

SifCollector.defaultProps = {
    id: null,
    identifier: '',
    description: '',
    databaseUrl: '',
    status: true
};