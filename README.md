# Typerift

A command-line tool for creating TypeScript interfaces from Scala case classes.

## Installation

You can install typerift with the following command:

```
npm install -g typerift
```

## Usage

You can use typerift in the following manner


```
typerift <File.scala>
```

## Example

If we have a case class `Driver` that exists in the file `Driver.scala`, and has the following definition:

```scala
case class Driver (
    id: Long,
    first: String,
    last: String,
    vehicle: Vehicle,
    natinoality: Nationality
)
```

Running `typerift Driver.scala` will yield the following:


```typescript
interface Driver {
    id: any;  // Long
    first: string;  // String
    last: string;  // String
    vehicle: any;  // Vehicle
    nationality: any;  // Nationality
}   
```

Notice that complex types get converted to `any`. Future work will include supporting custom/user-defined types.

## Motivation

Although Scala.js exists, there is no simple way to create interop boiler-plate between a JS/TS front-end and
a web service written in Scala. This tool should allow you to accept properly typed objects and use them within
your application as they were written in the Scala service.

## Future Work 

Typerift is currently in a very early state. Goals for the project include:

- Adding wildcard support for source files.
- Support for Scala collections, Options, and more types in general.
- Support for user-defined types.
- Adding reverse generating functionality (ie `TypeScript -> Scala`)
- Supporting general Scala classes.
