const expect = require("chai").expect;
const Validation = require("../src");

describe("exec", () => {
  let validator;
  let values = {
    value: 42,
  };

  beforeEach(() => {
    validator = new Validation();
    const conditionModules = [
      {
        id: 1,
        check: values => {
          return values.value > 10;
        },
      },
      {
        id: "check2",
        check: values => {
          return typeof values.value === "number";
        },
      },
    ];
    validator.addMulti(conditionModules);
  });

  it("should throw an error if condition config is not array", () => {
    const conditionConfig = {
      id: 1,
    };
    expect(() => validator.exec(conditionConfig, values)).to.throw("expect configs to be an array");
  });

  it("should throw an error if condition module not fonud", () => {
    const conditionConfig = [
      {
        id: 777,
      },
    ];
    expect(() => validator.exec(conditionConfig, values)).to.throw("expect condition module #777 to be added");
  });

  it("should return false if any condition fails", () => {
    const conditionConfig = [
      {
        id: 1,
      },
      {
        id: "check2",
      },
    ];
    expect(validator.exec(conditionConfig, { value: 2 })).to.be.eql(false);
    expect(validator.exec(conditionConfig, { value: "42" })).to.be.eql(false);
  });

  it("should return true if conditions passed", () => {
    const conditionConfig = [
      {
        id: 1,
      },
    ];
    expect(validator.exec(conditionConfig, values)).to.be.eql(true);
  });
});
