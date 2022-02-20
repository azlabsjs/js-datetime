# Documentation

## FUNCTIONAL INTERFACES

### ParseMonth

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
JSDate.substract('w', JSDate.create('2022-02-17 00:00:00')).toEqual(
  new Date('2022-02-10T00:00:00')
);
```

> Substract years

```ts
// Soustraire une année
JSDate.substract('y', JSDate.create('2022-02-17 00:00:00')).toEqual(
  new Date('2021-02-17T00:00:00')
);
```

> Substract months

```ts
// Soustraire un mois
JSDate.substract('M', JSDate.create('2022-02-17 00:00:00')).toEqual(
  new Date('2022-01-17T00:00:00')
);
```

> Substract days

```ts
// Soustraire un jour
JSDate.substract('d', JSDate.create('2022-02-17 00:00:00')).toEqual(
  new Date('2022-02-16T00:00:00')
);
```

- add dates

add dates to a particular date

> add weeks

```ts
// ajouter une semaine
JSDate.add('w', JSDate.create('2022-02-17 00:00:00')).toEqual(
  new Date('2022-02-24T00:00:00')
);
```

> add hours

```ts
// ajouter une heure
JSDate.add('h', JSDate.create('2022-02-17 00:00:00')).toEqual(
  new Date('2022-02-17T01:00:00')
);
```

> add minutes

```ts
// ajouter une minute
JSDate.add('m', JSDate.create('2022-02-17 00:00:00')).toEqual(
  new Date('2022-02-17T00:01:00')
);
```

> add secondes

```ts
// ajouter une seconde
JSDate.add('s', JSDate.create('2022-02-17 00:00:00')).toEqual(
  new Date('2022-02-17T00:00:01')
);
```

- check whether a date is after a particular date

```ts
JSDate.isAfter(
  new Date('2022-02-24T00:00:00'),
  new Date('2022-02-17T00:00:00')
).toEqual(true);
```

- check whether a date is before a particular date

```ts
      JSDate.isBefore(
        new Date('2022-02-24T00:00:00'),
        new Date('2022-02-17T00:00:00')
      )
    ).toEqual(false);
```

- check for javascript date object is true and return false for invalid dates

```ts
    JSDate.isDate('I am not a date').toEqual(false);
    JSDate.isDate(new Date())).toEqual(true);
```

- return values when date part methods are called on a date

```ts
JSDate.getMonth(date).toEqual(1);
JSDate.getYear(date).toEqual(2022);
JSDate.getDay(date).toEqual(4);
JSDate.getDate(date).toEqual(17);
JSDate.getHours(date).toEqual(13);
JSDate.getMinutes(date).toEqual(24);
JSDate.getSeconds(date).toEqual(45);
```

- test the computed unit of time difference between 2 dates

```ts
JSDate.diff(date2, date, 'y').toEqual(0);
JSDate.diff(date2, date, 'M').toEqual(0);
JSDate.diff(date2, date, 'd').toEqual(0);
JSDate.diff(date2, date, 'h').toEqual(1);
JSDate.diff(date2, date, 'minutes').toEqual(60);
JSDate.diff(date2, date, 's').toEqual(3600);
```

- converts a date object to user defined format with JSDate.format()

```ts
const format1 = JSDate.format(date, 'L');
const format2 = JSDate.format(date, 'LTS');
const format3 = JSDate.format(date, 'LL');
expect(typeof format1).toEqual('string');
expect(format1).toEqual('02/17/2022'); //
expect(format2).toEqual('1:24:45 PM'); //
expect(format3).toEqual('February 17, 2022');
JSDate.locale('fr-FR');
const format4 = JSDate.format(date, 'LL');
expect(format4).toEqual('17 février 2022');
expect(JSDate.format(date, 'YYYY-MM-DD H:I:S')).toEqual('2022-02-17 13:24:45');
```

- returns true for a difference in ms computation of today and another date with JSDate.timeSince()

```ts
JSDate.timeSince(new Date('2022-02-20T13:24:45')).toEqual(
  Math.floor(JSDate.diff(JSDate.now(), new Date('2022-02-20T13:24:45')))
);
```

- returns false if a day, a year, month, a minute, a second, an hour, week etc... is addded to current date with JSDate.isPast()

```ts
JSDate.isPast(JSDate.add('w', JSDate.create('2022-02-17 00:00:00'))).toEqual(
  false
);

JSDate.isPast(
  JSDate.substract('w', JSDate.create('2022-02-17 00:00:00'))
).toEqual(true);
```

- returns true if a day, a year, month, a minute, a second, an hour, week etc... is addded to current date with JSDate.isFuture()

```ts
JSDate.isFuture(JSDate.add('w', JSDate.create('2022-02-17 00:00:00'))).toEqual(
  true
);

JSDate.isFuture(
  JSDate.substract('w', JSDate.create('2022-02-17 00:00:00'))
).toEqual(false);
```

Note: The package being under active development, required method will be added and Api
can be changed.

### TimeAgo

Utility class for providing `*** time ago` or `*** time after` statement from date values.
