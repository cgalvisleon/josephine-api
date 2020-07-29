class Field {
  constructor(
    sheme,
    name,
    description,
    type,
    index,
    _default,
    required,
    unique,
    visualize,
    domain
  ) {
    this.sheme = sheme;
    this.name = name;
    this.description = description || '';
    this.index = index || false;
    this.default = _default;
    this.type = type || 'string';
    this.required = required || false;
    this.unique = unique || false;
    this.visualize = visualize || true;
    this.domain = domain || '';
  }
}

class Scheme {
  constructor(db, name, description) {
    this.db = db;
    this.name = name;
    this.description = description;
    this.fields = [];
    this.makeSheme();
  }

  makeSheme() {
    if (this.db.type === 'MongoDB') {
      this.db.createCollection(this.collection).then(() => {
        this.createFields();
      });
    }
  }

  createFields() {}

  createField(name, description, type, required, unique, values) {
    if (!this.fields[name]) {
      const field = new Field(
        this.sheme,
        name,
        description,
        type,
        required,
        unique,
        values
      );
      this.fields[name] = field;
    }
  }
}

module.exports = Scheme;
