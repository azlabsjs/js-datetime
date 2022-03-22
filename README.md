# Documentation

## FUNCTIONAL INTERFACES

### ParseMonthq

Functional interface for converting Roman Calendar month index into a language dependant label using pre-configured list of months with.

### GetTimeAgo

Creates a formatter that can takes as input a date like value and returns a `*** time ago` or `*** time after` statement based on a user provided locale string

## TYPE DEFINITIONS

### Month

Interface representing Roman Calendar month by index
with internationalization locales

### JsDateParamType

Type definition of value that can be passed as parameter to {@see JSDate.create()} a.k.a values parseable as Javascript date object.

### JSDate

JSDate is an utility class for manipulating javascript date object. It offers various
methods to serve this purpose.

#### Usage

- Create a javascript date instance

```ts
// Crée une instance {@see Date} de javascript
const date = JSDate.create('2022-02-17 12:5700');
```

- Substract dates

Substract dates from a particular date

> Substract weeks

```ts
// Soustraire une semaine
JSDate.substract('w', JSDate.create('2022-02-17 00:00:00'));
```

> Substract years

```ts
// Soustraire une année
JSDate.substract('y', JSDate.create('2022-02-17 00:00:00'));
```

> Substract months

```ts
// Soustraire un mois
JSDate.substract('M', JSDate.create('2022-02-17 00:00:00'));
```

> Substract days

```ts
// Soustraire un jour
JSDate.substract('d', JSDate.create('2022-02-17 00:00:00'));
```

- add dates

add dates to a particular date

> add weeks

```ts
// ajouter une semaine
JSDate.add('w', JSDate.create('2022-02-17 00:00:00'));
```

> add hours

```ts
// ajouter une heure
JSDate.add('h', JSDate.create('2022-02-17 00:00:00'));
```

> add minutes

```ts
// ajouter une minute
JSDate.add('m', JSDate.create('2022-02-17 00:00:00'));
```

> add secondes

```ts
// ajouter une seconde
JSDate.add('s', JSDate.create('2022-02-17 00:00:00'));
```

- check whether a date is after a particular date

```ts
JSDate.isAfter(
  new Date('2022-02-24T00:00:00'),
  new Date('2022-02-17T00:00:00')
);
```

- check whether a date is before a particular date

```ts
JSDate.isBefore(
  new Date('2022-02-24T00:00:00'),
  new Date('2022-02-17T00:00:00')
);
```

- check for javascript date object is true and return false for invalid dates

```ts
JSDate.isDate('I am not a date');
JSDate.isDate(new Date());
```

- return values when date part methods are called on a date

```ts
JSDate.getMonth(date);
JSDate.getYear(date);
JSDate.getDay(date);
JSDate.getDate(date);
JSDate.getHours(date);
JSDate.getMinutes(date);
JSDate.getSeconds(date);
```

- test the computed unit of time difference between 2 dates

```ts
JSDate.diff(date2, date, 'y');
JSDate.diff(date2, date, 'M');
JSDate.diff(date2, date, 'd');
JSDate.diff(date2, date, 'h');
JSDate.diff(date2, date, 'minutes');
JSDate.diff(date2, date, 's');
```

- converts a date object to user defined format with JSDate.format()

```ts
const format1 = JSDate.format(date, 'L');
const format2 = JSDate.format(date, 'LTS');
const format3 = JSDate.format(date, 'LL');
typeof format1
JSDate.locale('fr-FR');
const format4 = JSDate.format(date, 'LL');

JSDate.format(date, 'YYYY-MM-DD H:I:S'));
```

- returns true for a difference in ms computation of today and another date with JSDate.timeSince()

```ts
JSDate.timeSince(new Date('2022-02-20T13:24:45'));
```

- returns false if a day, a year, month, a minute, a second, an hour, week etc... is addded to current date with JSDate.isPast()

```ts
JSDate.isPast(JSDate.add('w', JSDate.create('2022-02-17 00:00:00')));

JSDate.isPast(JSDate.substract('w', JSDate.create('2022-02-17 00:00:00')));
```

- returns true if a day, a year, month, a minute, a second, an hour, week etc... is addded to current date with JSDate.isFuture()

```ts
JSDate.isFuture(JSDate.add('w', JSDate.create('2022-02-17 00:00:00')));

JSDate.isFuture(JSDate.substract('w', JSDate.create('2022-02-17 00:00:00')));
```

Note: The package being under active development, required method will be added and Api
can be changed.

### TimeAgo

Utility class for providing `*** time ago` or `*** time after` statement from date values.
