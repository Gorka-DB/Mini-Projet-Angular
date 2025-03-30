export class RESERVATION {
  id!: number;
  nom!: string;
  email!: string;
  tel!: string;
  jeuReserve!: string;
  plateforme!: string;
  date!: Date;
  statut!: string;

  constructor(id: number, nom: string, email: string, tel: string, jeu: string, plateforme: string, date: Date, statut: string) {
    this.id = id;
    this.nom = nom;
    this.email = email;
    this.tel = tel;
    this.jeuReserve = jeu;
    this.plateforme = plateforme;
    this.date = date;
    this.statut = statut;
    // if (this.stock !== undefined) {
    //   this.stock = 0;
    // }
  }
}
