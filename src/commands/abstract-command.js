module.exports = class Command {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  execute() {}
};
