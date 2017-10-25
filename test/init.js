const expect = require("chai").expect;
const Validation = require("../src");

describe("initialization", () => {
  const id = 777;
  const check = () => true;
  let validator;

  beforeEach(() => {
    validator = new Validation();
  });

  it("should be initialized with condList object", () => {
    expect(validator).to.deep.eql({ condList: {} });
  });

  it("add - should throw an error if there is no condition provided", () => {
    expect(() => validator.add()).to.throw("expect condition to be an object");
  });

  it("add - should throw an error if there is no id provided", () => {
    const badCondition = {};
    expect(() => validator.add(badCondition)).to.throw(
      "expect id to be provided",
    );
  });

  it("add - should throw an error if id is null", () => {
    const badCondition = { id: null };
    expect(() => validator.add(badCondition)).to.throw(
      /expect id to be a number or string/,
    );
  });

  it("add - should throw an error if id type is bool", () => {
    const badCondition = { id: true };
    expect(() => validator.add(badCondition)).to.throw(
      /expect id to be a number or string/,
    );
  });

  it("add - should throw an error if id type is object", () => {
    const badCondition = { id: {} };
    expect(() => validator.add(badCondition)).to.throw(
      /expect id to be a number or string/,
    );
  });

  it("add - should throw an error if check type is not function", () => {
    const badCondition = { id, check: {} };
    expect(() => validator.add(badCondition)).to.throw(
      "expect check to be a function",
    );
  });

  it("add - should add new condition to list", () => {
    const condition = { id, check };
    validator.add(condition);
    expect(validator).to.be.deep.eql({ condList: { 777: condition } });
  });

  it("addMulti - should throw an error if argument is not an array", () => {
    expect(() => validator.addMulti({ id, check })).to.throw(
      "expect conditions to be an array",
    );
  });

  it("should add multiple conditions to list", () => {
    validator.addMulti([{ id: 1, check }, { id: "2", check }]);
    expect(validator).to.be.deep.eql({
      condList: { 1: { id: 1, check }, "2": { id: "2", check } },
    });
  });
});
