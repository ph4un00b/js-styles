es2015_class: {
  class TodoModel {
    constructor() {
      this.todos = [];
      this.lastChange = null;
    }

    addToPrivateList() {
      console.log('addToPrivateList');
    }
    add() {
      console.log('add');
    }
    reload() {}
  }

  var todoModel = new TodoModel();
  console.log(todoModel.todos); //[]
  console.log(todoModel.lastChange); //null
  todoModel.addToPrivateList();
}

constructor: {
  function ConstructorCar() {}

  ConstructorCar.prototype.drive = function () {
    console.log('Vroom! constructor');
  };

  const car2 = new ConstructorCar();
  console.log(car2.drive());
}

old_boilerplate_code: {
  // works for class or contructors!
  function Foo() {
    if (!(this instanceof Foo)) {
      return new Foo();
    }
  }
}

ff: {
  function TodoModel() {
    var todos = [];
    var lastChange = null;

    function addToPrivateList() {
      console.log('addToPrivateList');
    }
    function add() {
      console.log('add');
    }
    function reload() {}

    return Object.freeze({
      add,
      reload,
    });
  }

  var todoModel = TodoModel();
  console.log(todoModel.todos); //undefined
  console.log(todoModel.lastChange); //undefined
  // todoModel.addToPrivateList(); //not a function
}

this_issues: {
  class TodoModel {
    constructor() {
      this.todos = [];
    }

    reload() {
      setTimeout(function log() {
        console.log('inner', this.todos); //undefined
      }, 0);
    }
  }
  // issues:
  new TodoModel().reload();
  // $("#btn").click(todoModel.reload);    //undefined
}

no_this: {
  function TodoModel() {
    var todos = [];

    function reload() {
      setTimeout(function log() {
        console.log('inner', todos); //[]
      }, 0);
    }

    return Object.freeze({ reload });
  }

  TodoModel().reload(); //[]
  // $('#btn').click(todoModel.reload); //[]
}

class_inheritance: {
  class Service {
    doSomething() {
      console.log('doSomething inherited');
    }
  }
  class SpecialService extends Service {
    doSomethingElse() {
      console.log('doSomethingElse inherited');
    }
  }
  var specialService = new SpecialService();
  specialService.doSomething();
  specialService.doSomethingElse();
}

class_composition: {
  class Service {
    doSomething() {
      console.log('doSomething klass composed');
    }
  }
  class SpecialService {
    constructor(args) {
      this.service = args.service;
    }
    doSomething() {
      this.service.doSomething();
    }

    doSomethingElse() {
      console.log('doSomethingElse klass composed');
    }
  }
  var specialService = new SpecialService({
    service: new Service(),
  });
  specialService.doSomething();
  specialService.doSomethingElse();
}

ff_compositions: {
  function Service() {
    function doSomething() {
      console.log('doSomething composed');
    }
    return Object.freeze({
      doSomething,
    });
  }
  function SpecialService(args) {
    var service = args.service;
    function doSomethingElse() {
      console.log('doSomethingElse composed');
    }
    return Object.freeze({
      doSomething: service.doSomething,
      doSomethingElse,
    });
  }
  var specialService = SpecialService({
    service: Service(),
  });
  specialService.doSomething();
  specialService.doSomethingElse();
}
