import {
    assert
} from "./index.js";

import {
  ABSofferingDTO,
  ServiceOfferingDTO,
  RentOfferingDTO
} from "../../src/agreement/absoffering.dto.js";

const validABSofferingDTOData = {
  offertID:2,
}

const invalidABSofferingDTOData = {
}

const invalidServiceOfferingDTOData = {
  date: new Date()
}

const invalidRentOfferingDTOData = {
  end_date: new Date()
}


describe("Testing offering protocols", function() {

    it("test_proposal_dto_should_have_all_required_fields", function() {


        const abs_offering_dto = new ABSofferingDTO(validABSofferingDTOData);
        assert.ok(abs_offering_dto, "ABSofferingDTO should be created successfully.");
    });

    it("test_proposal_dto_should_throw_exception_if_any_field_is_missing", function() {
        assert.throws(
            () => new ABSofferingDTO(invalidABSofferingDTOData),
            Error
        );
    });

    it("test_concrete_proposal_should_throw_exception_if_any_field_is_missing", function() {
        assert.throws(
            () => new ServiceOfferingDTO(invalidServiceOfferingDTOData),
            Error
        );
        assert.throws(
            () => new RentOfferingDTO(invalidRentOfferingDTOData),
            Error
        );
    });

});
