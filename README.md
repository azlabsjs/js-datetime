# Documentation

## FUNCTIONAL INTERFACES

### ParseMonth

Funtional interface for converting Roman Calendar month index into a language dependant label using pre-configured list of months with.

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

Note: The package being under active development, required method will be added and Api
can be changed.

### TimeAgo

Utility class for providing `*** time ago` or `*** time after` statement from date values.
