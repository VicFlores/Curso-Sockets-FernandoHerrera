const Band = require('./band');

class BandList {
  constructor() {
    this.bands = [
      new Band('Metalica'),
      new Band('Bon Jovi'),
      new Band('Los Bukis'),
      new Band('Creedencee'),
    ];
  }

  getBands() {
    return this.bands;
  }

  createBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);

    return this.bands;
  }

  deleteBands(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  increaseVotes(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes += 1;
      }

      return band;
    });
  }

  changeName(id, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }

      return band;
    });
  }
}

module.exports = BandList;
