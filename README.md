# Store Analytics

## Ülesanne 1

Konsoolirakendus: prindib Store Analytics raporti.
Teie lahendus peab:

- olema TypeScriptis ja korrektselt tüübitud (interfaces/types);
- sisaldama vähemalt: tooted, tarnijad, laoseis ladude kaupa, arvustused, soodustuse reeglid;
- arvutama välja: saadav kogus (available), keskmine hinne, laoseisu staatus, soodushind;
- kuvama ka specifications (kui need on olemas), võtme-väärtuse paaridena;
- Vormindamine on osa ülesandest: hinnad 2 komakohta, reavahed ja tekstid peavad klappima.

Raportis kasutatavad arvutused peavad vastama järgmistele reeglitele:

1) Stock status

0 - OUT

1..2 - LOW

3+ - IN_STOCK

2) Average rating

Kui arvustusi ei ole - näidake tekstina no reviews

Kui on arvustused - keskmine hinne 2 komakohaga

3) Discount rules (soodustus)

Soodustus rakendub kategooria järgi.

Mõnel reeglil on minRating: soodustus rakendub ainult siis, kui keskmine hinne on vähemalt see väärtus.

Kui soodustus rakendub, näidake price: X -> Y, muidu ainult price: X.

Hinnad ümardage 2 komakohani.

4) Specifications

Kui tootel on specs, siis printige need kujul: specs: key=value, key=value, ...

Kui specs puuduvad, siis seda osa reas ei ole.