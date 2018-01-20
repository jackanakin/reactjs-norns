import PubSub from 'pubsub-js';

export default class ErrorValidatorHandler {
    publicaErros(errors) {
        for (let error of errors) {
            PubSub.publish("validation-error", error);
        }
    }
}