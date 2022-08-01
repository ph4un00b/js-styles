ff_methods: {
  function person(fname, lname) {
    const fullname = () => `${fname} ${lname}`;
    return {
      fname,
      lname,
      fullname,
    };
  }
  const person1 = person('John', 'Locke');
  console.log(person1.fullname());
  //John Locke
}

better_computed_props: {
  function person(fname, lname) {
    const fullname = `${fname} ${lname}`;
    return {
      fname,
      lname,
      fullname,
    };
  }
  const person1 = person('John', 'Locke');
  console.log(person1.fullname);
  //John Locke
}

unnecesary_method: {
  function createPerson(name) {
    function getName() {
      return name;
    }

    // inmutable object
    return Object.freeze({
      name,
      getName,
    });
  }
  const person = createPerson('John Locke');
  console.log(person.name);
}

ff_returns_objects_with_functions: {
  function PersonStore() {
    let items = [];

    function add(person) {
      items.push(person);
    }

    function removeById(id) {
      items = items.filter((p) => p.id !== id);
    }

    function getItems() {
      // read-only data
      return Object.freeze([...items]);
    }

    return Object.freeze({
      add,
      removeById,
      getItems,
    });
  }
  const store = PersonStore();
  store.add({ id: 1, name: 'John Lock' });
  store.add({ id: 2, name: 'Jack Shephard' });
  store.add({ id: 3, name: 'James "Sawyer" Ford' });
  store.removeById(3);
  console.log(store.getItems());
  //[
  //{id: 1, name: "John Lock"}
  //{id: 2, name: "Jack Shephard"}
  //
}
