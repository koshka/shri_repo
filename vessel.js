/**
 * ������� ��������� ������������ �������.
 * @name Vessel
 * @param {String} name �������� �������.
 * @param {Number}[] position �������������� �������.
 * @param {String} �������� �������, ���� ������� �� ��� ���������
 * @param {Number} capacity ���������������� �������.
 * @param {Number} cargo ��� ����� �� �����
 */
function Vessel(name, position, capacity) {
  this.name = name;
  this.position = position;
  this.positionPlanet = "";
  this.capacity = capacity;
  this.cargo = 0;
}

/**
 * ������� ������� ��������� �������: ���, ��������������, ���������� ����� �� �����.
 * @example
 * vessel.report(); // �������� �������. ��������������: �����. ������� ���.
 * @example
 * vesserl.report(); // �������� �������. ��������������: 50,20. ����: 200�.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
  result = "�������� ������� \"" + this.name + "\". ";
  if (this.positionPlanet !== "") {
    result += "��������������: ������� \"" + this.positionPlanet + "\". ";
  } else {
    result += "��������������: " + this.position[0] + "," + this.position[1] + ". ";
  }
  if (this.cargo === 0) {
    result += "������ ���. �������� �����: " + this.capacity + "�.";
  } else {
    result += "������: " + this.cargo + " �� " + this.capacity + "�." ;
  }
  console.log(result);
  return result;
}

/**
 * ������� ���������� ���������� ����� �� �������.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
  return this.capacity - this.cargo;
}

/**
 * ������� ���������� �������� ����� �� �������.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
  return this.cargo;
}

/**
 * ��������� ������� � ��������� �����.
 * @param {Number}[]|Planet newPosition ����� �������������� �������.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('�����', [1,1]);
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
 * ������� ��������� �������.
 * @name Planet
 * @param {String} name �������� �������.
 * @param {Number}[] position �������������� �������.
 * @param {Number} availableAmountOfCargo ��������� ���������� �����.
 */
function Planet(name, position, availableAmountOfCargo) {
  this.name = name;
  this.position = position;
  this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * ������� ������� ��������� �������: ���, ��������������, ���������� ���������� �����.
 * @name Planet.report
 */
Planet.prototype.report = function () {
  var result = "�������" + " \"" + this.name + "\"." + " ��������������: "
  + this.position[0] + "," + this.position[1] + ".";
  if (this.availableAmountOfCargo) {
    result += " �������� �����: "+ this.availableAmountOfCargo + "�.";
  } else {
    result += " ����� ���.";
  }
  console.log(result);
  return result;
}

/**
 * ���������� ��������� ���������� ����� �������.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
  return this.availableAmountOfCargo;
}

/**
 * ��������� �� ������� �������� ���������� �����.
 * 
 * ����� ��������� ������� ������ ������������ �� �������.
 * @param {Vessel} vessel ����������� �������.
 * @param {Number} cargoWeight ��� ������������ �����.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
  // ���� ������� ��� �� �� �������, ���������� ������� flyTo
  // ���� ��� �������, ��� ����� ������� ������, ���� ������ ������� ;-)
  if (vessel.position[0] != this.position[0] || vessel.position[1] != this.position[1]) {
    vessel.flyTo(this);
  }
  if (this.availableAmountOfCargo === 0) {
    console.log("�� ������� ��� ������!");
    return;
  }
  if(vessel.getFreeSpace() === 0) {
    console.log("������� �����!");
    return;
  }
  // ���������� ����� �� ������� ������, ��� ��� ����� �� �������
  // => ����������� ������� ��������
  if (vessel.getFreeSpace() < cargoWeight) {
    // �� ������� ����� ���������� ��� ��������
    if (vessel.getFreeSpace() < this.availableAmountOfCargo) {
      this.availableAmountOfCargo -= vessel.getFreeSpace();
      vessel.cargo = vessel.capacity;
    } else { // � ������� ����������� ���� ����
      vessel.cargo = this.availableAmountOfCargo;
      this.availableAmountOfCargo = 0;
    }
  } else { // ���������� ����� ���������� ��� �����
    // �� ������� ���������� �����
    if (cargoWeight <= this.availableAmountOfCargo) {
      vessel.cargo += cargoWeight;
      this.availableAmountOfCargo -= cargoWeight;
    } else { // � ������� ����������� ���� ����
      vessel.cargo += this.availableAmountOfCargo;
      this.availableAmountOfCargo = 0;
    }
  }
} 

/**
 * ��������� � ������� �������� ���������� �����.
 * 
 * ����� ��������� ������� ������ ������������ �� �������.
 * @param {Vessel} vessel ������������ �������.
 * @param {Number} cargoWeight ��� ������������ �����.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
  //
  // ���� ������� ��� �� �� �������, ���������� ������� flyTo
  if (vessel.position[0] != this.position[0] || vessel.position[1] != this.position[1]) {
    vessel.flyTo(this);
  }
  if (vessel.cargo === 0) {
    console.log("�� ������� ��� ������!");
    return;
  }
  // �� ������� ������ �����, ��� ��������� ���������
  // ����������� ����
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

var vessel = new Vessel('������', [0,0], 1000);
var planetA = new Planet('A', [0,0], 0);
var planetB = new Planet('B', [100, 100], 5000);

// �������� �������� ���������
vessel.report(); // ������� "������". ��������������: 0,0. ������: 0 �� 1000�.
planetA.report(); // ������� "A". �������������: 0,0. ������ ���.
planetB.report(); // ������� "B". �������������: 100,100. �������� �����: 5000�.

vessel.flyTo(planetB);
planetB.loadCargoTo(vessel, 1000);
vessel.report(); // ������� "������". ��������������: 100,100. ������: 1000 �� 1000�.

vessel.flyTo(planetA);
planetA.unloadCargoFrom(vessel, 500);
vessel.report(); // ������� "������". ��������������: 0,0. ������: 500 �� 1000�.
planetA.report(); // ������� "A". ��������������: 0,0. �������� �����: 500�.
planetB.report(); // ������� "B". ��������������: 100,100. �������� �����: 4000�.
vessel.report();
planetB.unloadCargoFrom(vessel, 600);
vessel.report();
planetB.report();
planetB.unloadCargoFrom(vessel, 600);
planetA.loadCargoTo(vessel, 1000);
planetA.report();
vessel.report();
planetA.loadCargoTo(vessel, 1000);