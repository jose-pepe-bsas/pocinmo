import {
    ABS
} from '../config/abs.js'


class ABSofferingDTO extends ABS {
    constructor(data) {
        try {
            super("ABSofferingDTO",data)
        } catch (error) {
            throw error;
        }
        Object.assign(this, arguments);


    }



}

class RentOfferingDTO  extends ABSofferingDTO{
    constructor(data) {
        try {
            super("RentOfferingDTO",data)
        } catch (error) {
            throw error;
        }
        Object.assign(this, arguments);


    }


}

class ServiceOfferingDTO extends ABSofferingDTO{
    constructor(data) {
        try {
            super("ServiceOfferingDTO",data)
        } catch (error) {
            throw error;
        }
        Object.assign(this, arguments);


    }


}


export {
    ABSofferingDTO,
    RentOfferingDTO,
    ServiceOfferingDTO,
}
