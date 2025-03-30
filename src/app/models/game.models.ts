export class GAME {
  id!: number;
  titre!: string;
  plateforme!: string;
  genre!: string;
  developpeur!: string;
  dateDeSortie!: Date;
  stock!: number;

  constructor(id: number, titre: string, platform: string, genre: string, dev: string, dateDeSortie: Date, quantite: number) {
    this.id = id;
    this.titre = titre;
    this.plateforme = platform;
    this.genre = genre;
    this.developpeur = dev;
    this.dateDeSortie = dateDeSortie;
    this.stock = quantite;
    if (this.stock !== undefined) {
      this.stock = 0;
    }
  }
}
