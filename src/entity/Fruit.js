export default function Fruit(name, color) {
    this.name = (typeof name !== 'string') ? Fruit.defaultProps.name : name;
    this.color = (typeof color !== 'string') ? Fruit.defaultProps.color : color;
    this.size = Fruit.defaultProps.size;
}

Fruit.prototype.getInfo = function () {
    return this.color + ' a' + this.name;
};

Fruit.defaultProps = {
    name: '',
    color: '',
    size: ''
};