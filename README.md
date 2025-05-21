# Entwurfsmuster (Design Patterns)

TODO:

- general instructions (and links to pattern website?)
- adapter pattern: geometry example

## Parkhaussimulation

Entwurfsmuster: [Observer](https://refactoring.guru/design-patterns/observer) (_behavioral_)

In `src/parking-lot.ts` und `src/parking-lot.simulation.ts` ist eine Parkhaussimulation implementiert, die folgendermassen gestartet werden kann:

    npm run build && npm run parkinglot

Ein Parkhaus (`ParkingLot`) hat einen Namen (`name`), eine Kapazität (`capacity`) und einen Füllstand (`occupied`). Mithilfe der Methoden `enter()` und `exit()` kann ein Auto in das Parkhaus einfahren bzw. dieses verlassen.

In `index.ts` wird das Ein- und Ausfahren von Autos mit asynchronen Funktionen simuliert. Die Funktion `display` zeigt dabei mittels _Polling_ (Abfrage in regelmässigen Intervallen) den Füllstand an.

Bauen Sie die Simulation foldendermassen um:

1. Das Parkhaus soll als _Publisher_ agieren und seine _Subscriber_ jeweils informieren, wenn ein Auto in das Parkhaus einfährt oder es verlässt.
   - Erstellen Sie hierzu zwei Interfaces `Publisher` und `Subscriber` mit den entsprechenden Methoden.
2. Eine neue Klasse namens `Display` soll als _Subscriber_ agieren, welcher über ein- und ausfahrende Autos des Parkhauses informiert wird.
3. Überlegen Sie sich, ob die Ereignisse als eine Reihe von Variablen (Name des Parkhauses, Füllstand usw.) übermittelt werden sollen, oder ob hier ein spezielles `Event`-Objekt hilfreich wäre.
4. Ein- und ausfahrende Autos einerseits und der Füllstand des Parkhauses andererseits sollen nicht mehr in getrennten Meldungen ausgegeben werden, sondern zusammen als eine Meldung:

Alt:

    A car entered the lot Bahnhof Parking.
    Bahnhof Parking: 3/100 occupied
    Bahnhof Parking: 3/100 occupied
    Bahnhof Parking: 3/100 occupied
    A car left the lot Bahnhof Parking.
    Bahnhof Parking: 2/100 occupied
    Bahnhof Parking: 2/100 occupied

Neu:

    A car entered the lot Bahnhof Parking: 3/100 occupied.
    A car left the lot Bahnhof Parking: 2/100 occupied.

Diese kompakte Ausgabe ist nur möglich, wenn auf Polling (d.h. Anfragen in
bestimmten Intervallen) verzichtet wird und man stattdessen einen Mechanismus
wie einen Observer verwendet.

## Texteditor

Entwurfsmuster: [State](https://refactoring.guru/design-patterns/state)

TODO