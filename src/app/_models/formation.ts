export class Formation {
    id?: number;
    title!: string;
    startDate: Date;
    endDate: Date;
    teacher!: string;
    // detail!: string;
    // placedisponible: number = 20;
    // participantCount: number = 0;
    duration!: number;

    constructor() {
        // this.placedisponible = 20;
        // Initialise les dates avec la date actuelle par défaut
        this.startDate = new Date();
        this.endDate = new Date();
        // Définit la date de fin par défaut à un jour après la date de début
        this.endDate.setDate(this.startDate.getDate() + 1);
    }
}
