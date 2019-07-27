function run() {
  const mamal = {
    vertebrate: true,
    earBones: 3
  };

  const rabbit = Object.create(mamal);

  function Animal(legs) {
    this.legs = legs;
  }
  Animal.prototype.walk = function() {
    console.log(`I'm walking on ${this.legs} legs`);
  };

  function Human(name) {
    Animal.call(this, 2);
    this.name = name;
  }
  Human.prototype = Object.create(Animal.prototype);
  Human.prototype.constructor = Human;

  const frank = new Human("frank");
  // console.log(frank);

  /*
   *
   *
   */

  function Printer() {}
  Printer.prototype.print = function(text) {
    console.log(`I am printing ${text} using ${this.technology}`);
  };

  function LaserPrinter() {
    this.technology = "laser";
  }
  LaserPrinter.prototype = Object.create(Printer.prototype);
  LaserPrinter.prototype.constructor = LaserPrinter;
  LaserPrinter.prototype.changeToner = function() {
    console.log("I am changing the Toner");
  };

  function InkjetPrinter() {
    this.technology = "inkJet";
  }
  Object.setPrototypeOf(InkjetPrinter.prototype, Printer.prototype)
  InkjetPrinter.prototype.refillCartridge = function() {
    console.log("I am changing refilling the cartridge");
  };

  function AnotherPrinter() {
    this.technology = 'somethingElse'
  }
  Object.setPrototypeOf(AnotherPrinter.prototype, Printer.prototype)
  AnotherPrinter.prototype.doSomethingElse = function() {
    console.log("I'm doing something else!");
  }

  const p1 = new InkjetPrinter();
  p1.print();
  const p2 = new AnotherPrinter();
  p2.print();
  console.log('p2 :', p2);
  console.log('p1 :', p1);
  // console.log(p1);
  // console.log(Object.getPrototypeOf(p1));
  // console.log(Object.getPrototypeOf(Object.getPrototypeOf(p1)));
  // console.log(
  //   Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(p1)))
  // );
  const a = {};
  const test = Printer.prototype.isPrototypeOf(p2)
  console.log('test :', test);

  const chocolate = {
    _color_: "black",

    get color() {
      return this._color_;
    },
    set color(val) {
      this._color_ = val;
    }
  };

  chocolate.color = 'white'
  console.log("chocolate.color :", chocolate.color);


  function* buildIterator() {
    yield 'first call'
    yield 'second call'
    yield 'third and last call'
  } 

  const myIterator = buildIterator();
  
  console.log(myIterator.next());
  console.log(myIterator.next());
  console.log(myIterator.next());
  console.log(myIterator.next());

  const emptyButActuallyNotWhenIterating = {}
  // console.log('Before setting iterator');
  // for (let thing of emptyButActuallyNotWhenIterating) {
  //   console.log(thing);
  // }
  console.log('\nAfter setting iterator');
  emptyButActuallyNotWhenIterating[Symbol.iterator] = buildIterator
  for (let thing of emptyButActuallyNotWhenIterating) {
    console.log(thing);
  }



}

module.exports = { run };
