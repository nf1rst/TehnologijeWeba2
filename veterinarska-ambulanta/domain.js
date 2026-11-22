// Veterinarska ambulanta — patients (animals), owners, appointments and species.
import { statusFlow, minutes } from "./src/rules.js";

const APPOINTMENT_STATUS = { scheduled: "zakazan", done: "obavljen", cancelled: "otkazan" };
const DOG_SPECIES_ID = 1;

const bornInPast = (r, ctx) =>
  r.dateOfBirth && r.dateOfBirth > ctx.today ? { dateOfBirth: "Datum rođenja ne može biti u budućnosti." } : null;

// In Croatia every dog must be microchipped.
const dogHasChip = (r) =>
  r.speciesId === DOG_SPECIES_ID && !r.chipNumber ? { chipNumber: "Pas mora imati broj čipa." } : null;

const inFuture = (r, ctx) => {
  if (ctx.method !== "POST") return null;
  const now = new Date();
  const localNow = `${ctx.today}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return `${r.date}T${r.time}` <= localNow ? { date: "Pregled se ne može zakazati u prošlosti." } : null;
};

const openingHours = (r) => {
  const t = minutes(r.time);
  if (t % 30 !== 0) return { time: "Pregledi počinju u puni sat ili u pola sata." };
  if (t < 8 * 60 || t > 19 * 60 + 30) return { time: "Ambulanta radi od 8 do 20 sati." };
  return null;
};

// Every slot lasts 30 minutes, so two appointments clash when date and time are equal.
const slotFree = (r, ctx) => {
  if (r.status === "cancelled") return null;
  const taken = ctx.db
    .all("appointments")
    .some((o) => String(o.id) !== String(ctx.id) && o.status !== "cancelled" && o.date === r.date && o.time === r.time);
  return taken ? { time: "Termin je već zauzet." } : null;
};

export default {
  name: "Veterinarska ambulanta",
  defaults: { port: 4200, requireAuth: true },
  staffRole: "staff",
  defaultRole: "user",
  resources: {
    species: {
      fields: {
        name: { type: "string", required: true, minLength: 2, maxLength: 40, unique: true,
          messages: { required: "Unesite naziv vrste.", unique: "Vrsta s tim nazivom već postoji." } },
      },
      permissions: { read: "public", create: "staff", update: "staff", delete: "staff" },
    },
    owners: {
      fields: {
        firstName: { type: "string", required: true, minLength: 2, maxLength: 40, messages: { required: "Unesite ime." } },
        lastName: { type: "string", required: true, minLength: 2, maxLength: 40, messages: { required: "Unesite prezime." } },
        email: { type: "string", required: true, pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", unique: true,
          messages: { required: "Unesite adresu e-pošte.", pattern: "Unesite ispravnu adresu e-pošte.",
            unique: "Vlasnik s tom adresom već postoji." } },
        phone: { type: "string", required: true, pattern: "^\\+?[0-9 ]{8,16}$",
          messages: { required: "Unesite broj telefona.", pattern: "Unesite ispravan broj telefona." } },
      },
      permissions: { read: "public", create: "user", update: "user", delete: "user" },
    },
    patients: {
      fields: {
        name: { type: "string", required: true, minLength: 1, maxLength: 40, messages: { required: "Unesite ime životinje." } },
        speciesId: { type: "ref", to: "species", required: true,
          restrictMessage: "Vrsta ima pacijente i ne može se obrisati.",
          messages: { required: "Odaberite vrstu.", ref: "Odabrana vrsta ne postoji." } },
        ownerId: { type: "ref", to: "owners", required: true,
          restrictMessage: "Vlasnik ima pacijente i ne može se obrisati.",
          messages: { required: "Odaberite vlasnika.", ref: "Odabrani vlasnik ne postoji." } },
        breed: { type: "string", maxLength: 60 },
        dateOfBirth: { type: "date", required: true, messages: { required: "Unesite datum rođenja." } },
        chipNumber: { type: "string", pattern: "^\\d{15}$", unique: true,
          messages: { pattern: "Broj čipa sastoji se od 15 znamenaka.", unique: "Životinja s tim brojem čipa već postoji." } },
        weightKg: { type: "number", required: true, min: 0.01, max: 150,
          messages: { required: "Unesite masu.", min: "Masa mora biti veća od 0.", max: "Masa ne smije biti veća od 150 kg." } },
        neutered: { type: "boolean", default: false },
      },
      rules: [bornInPast, dogHasChip],
      permissions: { read: "public", create: "user", update: "user", delete: "user" },
    },
    appointments: {
      fields: {
        patientId: { type: "ref", to: "patients", required: true, onDelete: "cascade",
          messages: { required: "Odaberite pacijenta.", ref: "Odabrani pacijent ne postoji." } },
        date: { type: "date", required: true, messages: { required: "Unesite datum pregleda." } },
        time: { type: "time", required: true, messages: { required: "Unesite vrijeme pregleda." } },
        reason: { type: "string", required: true, minLength: 3, maxLength: 200, messages: { required: "Unesite razlog dolaska." } },
        status: { type: "string", enum: Object.keys(APPOINTMENT_STATUS), default: "scheduled" },
        price: { type: "number", min: 0, max: 5000, messages: { min: "Cijena ne može biti negativna." } },
        vetNote: { type: "string", maxLength: 500 },
      },
      rules: [
        openingHours,
        inFuture,
        statusFlow("status", { scheduled: ["done", "cancelled"] }, APPOINTMENT_STATUS, "scheduled"),
        slotFree,
      ],
      permissions: { read: "public", create: "user", update: "user", delete: "user" },
    },
  },
};
