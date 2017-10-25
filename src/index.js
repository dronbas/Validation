/**
 * @typedef {object} Condition
 * @property {(number|string)} id
 * @property {function} check - validate function.
 *
 * @param {Condition} cond
 * @throws Error if there is no id provided
 */
const checkCfg = cond => {
  if (cond instanceof Object !== true) {
    throw new Error("expect condition to be an object");
  }

  if (cond.id === undefined) {
    throw new Error("expect id to be provided");
  }

  if (typeof cond.id !== "number" && typeof cond.id !== "string") {
    throw new Error(`expect id to be a number or string, id is ${typeof cond.id}`);
  }

  if (typeof cond.check !== "function") {
    throw new Error("expect check to be a function");
  }
};

module.exports = class Scond {
  constructor() {
    this.condList = {};
  }

  /**
   *
   * @param {Condition} condition
   */
  add(condition) {
    checkCfg(condition);

    if (this.condList[condition.id] === undefined) {
      this.condList[condition.id] = condition;
    }
  }

  /**
   *
   * @param {array<Condition>} conditions
   */
  addMulti(conditions) {
    if (Array.isArray(conditions) === false) {
      throw new Error("expect conditions to be an array");
    }

    conditions.forEach(cond => this.add(cond));
  }

  /**
   *
   * @typedef {object} ConditionConfig
   * @property {(number|string)} id
   * @property {object} params - additional condition params.
   *
   * @param {array.<ConditionConfig>} configs
   * @param {object} values
   * @returns {boolean}
   */
  exec(configs, values) {
    if (Array.isArray(configs) === false) {
      throw new Error("expect configs to be an array");
    }
    return configs.every(cfg => {
      const cond = this.condList[cfg.id];
      if (cond === undefined) {
        throw new Error(`expect condition module #${cfg.id} to be added`);
      }

      return cond.check(values, cfg.params);
    });
  }
};
