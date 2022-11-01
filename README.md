# Cassandra

## Užduotis

Sumodeliuokite nesudėtingą sritį Cassandra duomenų bazėje. Parašykite programą naudojančią duomenų bazę ir leidžiančią atlikti kelias operacijas pasirinktoje srityje. Su programa pateikite duomenų modelio diagramą. Savybės sričiai:

1. Egzistuoja bent kelios esybės
2. Yra bent dvi savybės su vienas-su-daug sąryšiu
3. Panaudojimo atvejuose bent vienai esybei reikalingos kelios užklausos pagal skirtingus parametrus

Pavyzdžiui, banke saugome klientus, jų sąskaitas (vienas su daug sąryšis) ir kreditines korteles. Sąskaitų norime ieškoti pagal klientą (rasti visas jo sąskaitas) bei pagal sąskaitos numerį, klientų norime ieškoti pagal jų kliento ID arba asmens kodą. Kredito kortelių norime ieškoti pagal jų numerį, taip pat norime rasti sąskaitą susietą su konkrečia kortele.

Bent vienoje situacijoje prasmingai panaudokite Cassandra compare-and-set operacijas (hint: IF) INSERT ar UPDATE sakinyje. Pavyzdžiui, norime sukurti naują sąskaitą su kodu tik jei ji neegzistuoja. Norime pervesti pinigus, tik jei likutis pakankamas.

Užklausose **ALLOW FILTERING** naudoti negalima!

---

### Užduoties interpretacija

Užduočiai atlikti pasirinkta C2C parduotuvės sritis, kurioje dalyvauja 3 esybės - users, wallets, items.

---

### Physical data model

Fiziniame duomenų lygmenyje pateikiamos visos reikalingos lentelės bei atributai su nurodytais tipais.

Lentelės ir jų atributai buvo supaprastinti iki minimumo, kadangi duomenys į lenteles buvo suvedami rankiniu būdu

- Visose lentelėse palikti tik *svarbiausi* atributai, kurie reikalingi kad užtikrinti pilnavertį sistemos darbą. Lentelės galėtų būti papildytos papildomais atributais, tačiau tai apsunkintų rankinį duomenų suvedimą.

![physical data model](./model.png)

---

## Run program

## Prerequisites for macOS

- Install [node.js](https://nodejs.org/en/)
- Install [Cassandra](https://www.javatpoint.com/how-to-install-cassandra-on-mac): `brew install cassandra`
- If you're getting Java errors, install a newer version of Java Native Access ([check here](https://stackoverflow.com/questions/69486339/nativelibrarydarwin-java64-failed-to-link-the-c-library-against-jna-native-m))

## Setup Cassandra

Open Cassandra shell:

```zsh
cqlsh
```

Create keyspace `shop`:

```zsh
CREATE KEYSPACE IF NOT EXISTS shop WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
```

## Launch program

1. Install `pnpm`: `npm i pnpm --global`
2. Install npm modules: `npm install`
3. Launch MongoDB server: `npm run start-server`
    - If it tells you that port 7199 is already used, try to kill it. If still no success, try killing Java process via Activity Monitor.
4. Execute the program: `npm run start`
