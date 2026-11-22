# Veterinarska ambulanta — REST API

Poslužitelj za projekt iz kolegija Tehnologije weba 2. Evidencija pacijenata veterinarske ambulante, njihovih vlasnika, pregleda i vrsta životinja.

## Pokretanje

Potreban je Node.js 20 ili noviji. Poslužitelj nema vanjskih ovisnosti.

```bash
npm install
npm run dev
```

Poslužitelj radi na adresi http://localhost:4200. Naredba `npm run reset` vraća podatke u početno stanje.

## Postavke (.env)

| Postavka | Značenje |
|---|---|
| `PORT` | vrata poslužitelja (zadano 4200) |
| `REQUIRE_AUTH` | `true`: izmjene zahtijevaju token; `false`: izmjene su dopuštene bez prijave |
| `JWT_SECRET` | tajni ključ za potpisivanje tokena |
| `JWT_EXPIRES_IN` | trajanje tokena u sekundama (zadano 7200) |
| `CORS_ORIGIN` | `localhost` dopušta svaku adresu na localhostu; može se navesti popis adresa odvojenih zarezom ili `*` |
| `DELAY_MS` | umjetno kašnjenje svakog odgovora u milisekundama, za isprobavanje stanja učitavanja |

Izmjene podataka zahtijevaju prijavu (REQUIRE_AUTH=true).

## Ispitni računi

Svi računi imaju lozinku `lozinka123`.

| Adresa e-pošte | Uloga | Opis |
|---|---|---|
| maja.vukovic@vet-ambulanta.hr | `staff` | veterinarka |
| test@vet-ambulanta.hr | `user` | korisnik |

Popis svih korisnika dostupan je djelatniku na ruti `GET /users`.

## Prijava

```http
POST /login
Content-Type: application/json

{ "email": "test@vet-ambulanta.hr", "password": "lozinka123" }
```

Odgovor sadrži token i podatke o korisniku:

```json
{ "token": "eyJhbGciOi…", "user": { "id": 3, "name": "Ispitni korisnik", "email": "test@vet-ambulanta.hr", "role": "user" } }
```

Token se šalje u zaglavlju svakog sljedećeg zahtjeva: `Authorization: Bearer <token>`. Ruta `GET /me` vraća prijavljenog korisnika, a `POST /register` s poljima `name`, `email` i `password` izrađuje novi račun i odmah vraća token. Neispravan ili istekao token uvijek vraća status 401.

## Resursi

### `/species` (6 zapisa u početnim podacima)

| Polje | Vrsta | Obavezno | Pravila | Opis |
|---|---|---|---|---|
| `id` | broj | — | dodjeljuje poslužitelj | identifikator |
| `name` | tekst | da | 2–40 znakova, jedinstveno | naziv vrste |

### `/owners` (26 zapisa u početnim podacima)

| Polje | Vrsta | Obavezno | Pravila | Opis |
|---|---|---|---|---|
| `id` | broj | — | dodjeljuje poslužitelj | identifikator |
| `firstName` | tekst | da | 2–40 znakova | ime |
| `lastName` | tekst | da | 2–40 znakova | prezime |
| `email` | tekst | da | oblik `^[^\s@]+@[^\s@]+\.[^\s@]+$`, jedinstveno | adresa e-pošte |
| `phone` | tekst | da | oblik `^\+?[0-9 ]{8,16}$` | telefon |

### `/patients` (46 zapisa u početnim podacima)

| Polje | Vrsta | Obavezno | Pravila | Opis |
|---|---|---|---|---|
| `id` | broj | — | dodjeljuje poslužitelj | identifikator |
| `name` | tekst | da | 1–40 znakova | ime životinje |
| `speciesId` | identifikator | da | → /species | vrsta |
| `ownerId` | identifikator | da | → /owners | vlasnik |
| `breed` | tekst | ne | najviše 60 znakova | pasmina |
| `dateOfBirth` | datum GGGG-MM-DD | da |  | datum rođenja |
| `chipNumber` | tekst | ne | oblik `^\d{15}$`, jedinstveno | broj mikročipa, 15 znamenaka |
| `weightKg` | broj | da | od 0,01 do 150 | masa u kilogramima |
| `neutered` | da/ne | ne | zadano: `false` | kastrirano ili sterilizirano |

### `/appointments` (120 zapisa u početnim podacima)

| Polje | Vrsta | Obavezno | Pravila | Opis |
|---|---|---|---|---|
| `id` | broj | — | dodjeljuje poslužitelj | identifikator |
| `patientId` | identifikator | da | → /patients | pacijent |
| `date` | datum GGGG-MM-DD | da |  | datum |
| `time` | vrijeme HH:MM | da |  | vrijeme, u puni sat ili pola sata |
| `reason` | tekst | da | 3–200 znakova | razlog dolaska |
| `status` | tekst (popis) | ne | zadano: `"scheduled"` | `scheduled`, `done` ili `cancelled` |
| `price` | broj | ne | od 0 do 5000 | cijena u EUR |
| `vetNote` | tekst | ne | najviše 500 znakova | bilješka veterinara |

### Pravila poslovanja

- Datum rođenja ne može biti u budućnosti. Pas (`speciesId` 1) mora imati broj čipa.
- Pregled se ne može zakazati u prošlosti, a počinje u puni sat ili pola sata, između 8 i 20 sati.
- Svaki termin traje 30 minuta i može ga zauzeti samo jedan pregled (pogreška uz polje `time`).
- Novi pregled ima status `scheduled`. Dopušteni prijelazi: `scheduled` → `done` ili `cancelled`.
- Brisanjem pacijenta brišu se i njegovi pregledi. Vlasnik ili vrsta s pacijentima ne mogu se obrisati.

### Ovlasti

Čitanje je javno. Vlasnike, pacijente i preglede mijenja svaki prijavljeni korisnik, a vrste samo djelatnik (`staff`).

## Rute

Za svaki resurs vrijede iste rute:

| Metoda i ruta | Opis | Uspješan odgovor |
|---|---|---|
| `GET /resurs` | svi zapisi | 200, polje |
| `GET /resurs?_page=1&_per_page=10` | jedna stranica | 200, objekt s poljem `data` |
| `GET /resurs/:id` | jedan zapis | 200, objekt |
| `GET /roditelj/:id/dijete` | zapisi povezani s roditeljem | 200, polje |
| `POST /resurs` | novi zapis | 201, izrađeni zapis |
| `PUT /resurs/:id` | zamjena cijelog zapisa | 200, zapis |
| `PATCH /resurs/:id` | izmjena dijela zapisa | 200, zapis |
| `DELETE /resurs/:id` | brisanje | 204, bez tijela |

### Upitni parametri

| Parametar | Primjer | Značenje |
|---|---|---|
| polje | `?categoryId=2` | točna vrijednost; ponavljanjem parametra dobiva se „ili” |
| `_gte`, `_lte`, `_gt`, `_lt`, `_ne`, `_like` | `?dailyPrice_gte=20` | usporedba; isto vrijedi zapis `dailyPrice:gte=20` |
| `q` | `?q=canon` | pretraga po svim tekstnim poljima |
| `_sort` | `?_sort=-dailyPrice,name` | sortiranje; znak minus označava silazni redoslijed |
| `_page`, `_per_page` | `?_page=2&_per_page=20` | straničenje |
| `_embed` | `?_embed=category` | uključuje nadređeni zapis ili popis povezanih zapisa |

Odgovor sa straničenjem:

```json
{ "first": 1, "prev": 1, "next": 3, "last": 5, "pages": 5, "items": 46, "data": [ … ] }
```

Primjeri:

```http
GET /patients?_page=1&_per_page=10
GET /patients?speciesId=1&_sort=name
GET /patients?q=luna
GET /patients/3?_embed=owner&_embed=species
GET /patients/3/appointments
POST /appointments
```

## Pogreške

Svaka pogreška vraća objekt s porukom na hrvatskom jeziku, prikladnom za prikaz korisniku.

| Status | Kada | Tijelo |
|---|---|---|
| 400 | neispravni podaci | `{ "message": "Podaci nisu ispravni.", "fields": { "polje": "poruka" } }` |
| 401 | nema tokena, ili je neispravan ili istekao | `{ "message": "…" }` |
| 403 | korisnik nema ovlasti | `{ "message": "Nemate ovlasti za ovu radnju." }` |
| 404 | zapis ili ruta ne postoji | `{ "message": "Zapis ne postoji." }` |
| 409 | zapis se ne može obrisati zbog povezanih zapisa | `{ "message": "…" }` |

Objekt `fields` sadrži po jednu poruku za svako neispravno polje, pa se poruka može prikazati uz odgovarajuće polje obrasca.
