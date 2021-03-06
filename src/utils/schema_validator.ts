import {Validator, ValidatorResult,  Schema} from 'jsonschema';
import {ecSignatureSchema, ecSignatureParameterSchema} from '../schemas/ec_signature_schema';
import {orderHashSchema} from '../schemas/order_hash_schema';
import {orderSchema, signedOrderSchema} from '../schemas/order_schemas';
import {addressSchema, numberSchema} from '../schemas/basic_type_schemas';
import {tokenSchema} from '../schemas/token_schema';
import {subscriptionOptsSchema, blockParamSchema} from '../schemas/subscription_opts_schema';
import {indexFilterValuesSchema} from '../schemas/index_filter_values_schema';
import {orderFillOrKillRequestsSchema} from '../schemas/order_fill_or_kill_requests_schema';

export class SchemaValidator {
    private validator: Validator;
    constructor() {
        this.validator = new Validator();
        this.validator.addSchema(tokenSchema, tokenSchema.id);
        this.validator.addSchema(orderSchema, orderSchema.id);
        this.validator.addSchema(numberSchema, numberSchema.id);
        this.validator.addSchema(addressSchema, addressSchema.id);
        this.validator.addSchema(orderHashSchema, orderHashSchema.id);
        this.validator.addSchema(blockParamSchema, blockParamSchema.id);
        this.validator.addSchema(ecSignatureSchema, ecSignatureSchema.id);
        this.validator.addSchema(signedOrderSchema, signedOrderSchema.id);
        this.validator.addSchema(subscriptionOptsSchema, subscriptionOptsSchema.id);
        this.validator.addSchema(indexFilterValuesSchema, indexFilterValuesSchema.id);
        this.validator.addSchema(ecSignatureParameterSchema, ecSignatureParameterSchema.id);
        this.validator.addSchema(orderFillOrKillRequestsSchema, orderFillOrKillRequestsSchema.id);
    }
    // In order to validate a complex JS object using jsonschema, we must replace any complex
    // sub-types (e.g BigNumber) with a simpler string representation. Since BigNumber and other
    // complex types implement the `toString` method, we can stringify the object and
    // then parse it. The resultant object can then be checked using jsonschema.
    public validate(instance: any, schema: Schema): ValidatorResult {
        const jsonSchemaCompatibleObject = JSON.parse(JSON.stringify(instance));
        return this.validator.validate(jsonSchemaCompatibleObject, schema);
    }
}
