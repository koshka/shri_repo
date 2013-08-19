/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {String} Название планеты, если корабль на ней находится
 * @param {Number} capacity Грузоподъемность корабля.
 * @param {Number} cargo Все груза на борту
 */
function Vessel(name, position, capacity) {
  this.name = name;
  this.position = position;
  this.positionPlanet = "";
  this.capacity = capacity;
  this.cargo = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, количество груза на борту.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
  result = "Грузовой корабль \"" + this.name + "\". ";
  if (this.positionPlanet !== "") {
    result += "Местоположение: Планета \"" + this.positionPlanet + "\". ";
  } else {
    result += "Местоположение: " + this.position[0] + "," + this.position[1] + ". ";
  }
  if (this.cargo === 0) {
    result += "Грузов нет. Доступно места: " + this.capacity + "т.";
  } else {
    result += "Занято: " + this.cargo + " из " + this.capacity + "т." ;
  }
  console.log(result);
  return result;
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
  return this.capacity - this.cargo;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
  return this.cargo;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.flyTo
 */
Vessel.prototype.flyTo = function (newPosition) {
  if (newPosition instanceof Array) {
    this.position = newPosition;
    this.positionPlanet = "";
  } else if (newPosition instanceof Planet) {
    this.position = newPosition.position;
    this.positionPlanet = newPosition.name;
  }
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
  this.name = name;
  this.position = position;
  this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
  var result = "Планета" + " \"" + this.name + "\"." + " Местоположение: "
  + this.position[0] + "," + this.position[1] + ".";
  if (this.availableAmountOfCargo) {
    result += " Доступно груза: "+ this.availableAmountOfCargo + "т.";
  } else {
    result += " Груза нет.";
  }
  console.log(result);
  return result;
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
  return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
  // если корабль еще не на планете, вызывается функция flyTo
  // хотя это странно, что любая планета решает, куда лететь кораблю ;-)
  if (vessel.position[0] != this.position[0] || vessel.position[1] != this.position[1]) {
    vessel.flyTo(this);
  }
  if (this.availableAmountOfCargo === 0) {
    console.log("На планете нет грузов!");
    return "На планете нет грузов!";
  }
  if(vessel.getFreeSpace() === 0) {
    console.log("Корабль полон!");
    return "На планете нет грузов!";
  }
  // свободного места на корабле меньше, чем вес груза на планете
  // => загружается сколько возможно
  if (vessel.getFreeSpace() < cargoWeight) {
    // на планете глуза достаточно для погрузки
    if (vessel.getFreeSpace() < this.availableAmountOfCargo) {
      this.availableAmountOfCargo -= vessel.getFreeSpace();
      vessel.cargo = vessel.capacity;
      return;
    } else { // с планеты выгружается весь груз
      vessel.cargo = this.availableAmountOfCargo;
      this.availableAmountOfCargo = 0;
      return;
    }
  } else { // свободного места достаточно для груза
    // на планете достаточно груза
    if (cargoWeight <= this.availableAmountOfCargo) {
      vessel.cargo += cargoWeight;
      this.availableAmountOfCargo -= cargoWeight;
      return;
    } else { // с планеты выгружается весь груз
      vessel.cargo += this.availableAmountOfCargo;
      this.availableAmountOfCargo = 0;
      return;
    }
  }
} 

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
  //
  // если корабль еще не на планете, вызывается функция flyTo
  if (vessel.position[0] != this.position[0] || vessel.position[1] != this.position[1]) {
    vessel.flyTo(this);
  }
  if (vessel.cargo === 0) {
    console.log("На корабле нет грузов!");
    return "На корабле нет грузов!";
  }
  // на корабле меньше груза, чем требуется выгрузить
  // выгружается весь
  if (vessel.cargo < cargoWeight) {
    this.availableAmountOfCargo += vessel.cargo;
    vessel.cargo = 0;
    return;
  } else {
    this.availableAmountOfCargo += cargoWeight;
    vessel.cargo -= cargoWeight;
    return;
  }
}

var vessel = new Vessel('Яндекс', [0,0], 1000);
var planetA = new Planet('A', [0,0], 0);
var planetB = new Planet('B', [100, 100], 5000);

// Тесты
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 0 из 1000т.
planetA.report(); // Планета "A". Местоположене: 0,0. Грузов нет.
planetB.report(); // Планета "B". Местоположене: 100,100. Доступно груза: 5000т.

vessel.flyTo(planetB);
planetB.loadCargoTo(vessel, 1000);
vessel.report(); // Корабль "Яндекс". Местоположение: 100,100. Занято: 1000 из 1000т.

vessel.flyTo(planetA);
planetA.unloadCargoFrom(vessel, 500);
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 500 из 1000т.
planetA.report(); // Планета "A". Местоположение: 0,0. Доступно груза: 500т.
planetB.report(); // Планета "B". Местоположение: 100,100. Доступно груза: 4000т.
vessel.report();
planetB.unloadCargoFrom(vessel, 600);
vessel.report();
planetB.report();
planetB.unloadCargoFrom(vessel, 600);
planetA.loadCargoTo(vessel, 1000);
planetA.report();
vessel.report();
planetA.loadCargoTo(vessel, 1000);