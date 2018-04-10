---
layout:     post
title:      Encoding & Decoding Swift 4 Models
subtitle:   "Using Swift 4"'"s coding API for database model serialisation"
date:       2018-02-08
type:       Blog Post
published:  true
---

Tee-ell-dee-argh: view my code examples as a [single file](https://github.com/robinrob/swift-4-model-coding/blob/master/swift-4-model-coding/CodableTest.swift).
Running the [project](https://github.com/robinrob/swift-4-model-coding) in Xcode runs the examples and displays some
output for each.

Whilst working on [GuitarChords](https://github.com/robinrob/guitar-chords) (a personal iOS project of mine for
displaying guitar chord variations) I found
 myself wanting to be able to pre-load the native SQLite database with data serialised in a JSON file. The motivation
 for this was because my app deals with a bunch of data that I've pre-calculated and which doesn't change -
 variations of guitar chords. But I still wanted the database functionality for querying the records quickly.

 I've since decided that I don't need the database layer after all, as I am only dealing with ~several hundred records.
  After more thought I realised that the costs of having an extra persistence layer (e.g. handling app
   updates on users' devices) in my case are not worth any potential
  advantages that might be gained over holding all of that data in memory, compared to simply loading the data in from
  the JSON on each app load.

  Storing the pre-calculated data as static JSON effectively keeps the app stateless in that aspect.
  This also makes serialisation and de-serialisation a bit easier, as I can take full
  advantage of Swift 4's built-in Encoding/Decoding API.

  Nevertheless it was still a fairly interesting process to get things working, so I'll give some code examples
  of encoding & decoding objects in Swift, building up to combining serialisation with persistence, and perhaps it'll
  help somebody else who does need to do this, or myself in future.


## Codable
Swift documentation is good and the best place to start for this topic is
[here](https://developer.apple.com/documentation/foundation/archives_and_serialization/encoding_and_decoding_custom_types).

### Encoding a Struct (into JSON)
If the instance variables of a type that you want to encode all implement the `Encodable` protocol, then Swift will
encode the whole thing automatically. So for instance a Struct consisting only of standard built-in Swift types (which
implement the `Encodable` protocol) can be easily converted into JSON:

code:

<pre><code class="swift small-code">struct CodableStruct: Codable {
    var name: String
    var age: Int
}

static func encodeStructAsJSON() {
    let obj = CodableStruct(name: "Robin", age: 30)
    do {
        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        let data = try encoder.encode(obj)
        let json = String(data: data, encoding: .utf8)!
        print("json: \(json)")
    } catch {
        print("encoding error: \(error)")
    }
}
</code></pre>

output:

<pre class="plaintext"><code class="plaintext small-code">json: {
  "name" : "Robin",
  "age" : 30
}
</code></pre>


### Encoding a Class
The same thing above also works for a Class whose instance variables all implement `Encodable`:

code:

<pre><code class="swift small-code">class CodableClass: Codable {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

static func encodeClassAsJSON() {
    let obj = CodableClass(name: "Robin", age: 30)
    do {
        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        let data = try encoder.encode(obj)
        let json = String(data: data, encoding: .utf8)!
        print("json: \(json)")
    } catch {
        print("encoding error: \(error)")
    }
}
</code></pre>

output:

<pre class="plaintext"><code class="plaintext small-code">json: {
  "name" : "Robin",
  "age" : 30
}
</code></pre>


### Decoding a Struct (from JSON)

<pre><code class="swift small-code">static func decodeStructFromJSON() {
    let json = "{\"name\":\"Robin\",\"age\":30}"

    do {
        let obj = try JSONDecoder().decode(
            CodableStruct.self,
            from: json.data(using: .utf8)!
        )
        print("obj.name: \(obj.name)")
    } catch {
        print("encoding error: \(error)")
    }
}
</code></pre>

output:

<pre class="plaintext"><code class="plaintext small-code">obj.name: Robin
person.age: 30
</code></pre>


### Decoding a Class

<pre><code class="swift small-code">static func decodeClassFromJSON() {
    let json = "{\"name\":\"Robin\",\"age\":30}"

    do {
        let obj = try JSONDecoder().decode(
            CodableClass.self,
            from: json.data(using: .utf8)!
        )
        print("obj.name: \(obj.name)")
        print("person.age: \(String(obj.age))")
    } catch {
        print("decoding error: \(error)")
    }
}
</code></pre>

output:

<pre class="plaintext"><code class="plaintext small-code">obj.name: Robin
person.age: 30
</code></pre>


### Encoding a Database model class
It gets more tricky when you want to directly encode/decode a class which represents one of your database models, because
 we need to do custom decoding & encoding. It looks like this:

<pre><code class="swift small-code">@objc(PersonModel)
final class PersonModel: NSManagedObject, Encodable, Decodable {
    init(from decoder: Decoder) {
        super.init(
            entity: NSEntityDescription.entity(
                forEntityName: "PersonModel",
                in: context
            )!,
            insertInto: context
        )

        do {
            let container = try decoder.container(keyedBy: CodingKeys.self)
            self.name = try container.decode(type(of: self.name), forKey: .name)
            self.age = try container.decode(type(of: self.age), forKey: .age)
        } catch {
            print("decoding error: \(error)")
        }
    }

    private override init(
        entity: NSEntityDescription,
        insertInto context: NSManagedObjectContext?
    ) {
        super.init(entity: entity, insertInto: context)
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(self.name, forKey: .name)
        try container.encode(self.age, forKey: .age)
    }

    enum CodingKeys: CodingKey {
        case name
        case age
    }
}
</code></pre>

`context` is an in-memory store (also useful for unit testing on models!) created by the following function:

<pre><code class="swift small-code">func getBackgroundContextForTesting(
    forModelType modelType: AnyClass
) -> NSManagedObjectContext {
    let managedObjectModel = NSManagedObjectModel.mergedModel(
        from: [Bundle(for: modelType)]
    )!

    let container = NSPersistentContainer(
        name: "PersonModel",
        managedObjectModel: managedObjectModel
    )
    let description = NSPersistentStoreDescription()
    description.type = NSInMemoryStoreType

    container.persistentStoreDescriptions = [description]
    container.loadPersistentStores { (description, error) in
        precondition( description.type == NSInMemoryStoreType )

        if let error = error {
            fatalError("Creating in-memory coordinator failed \(error)")
        }
    }
    return container.newBackgroundContext()
}
</code></pre>

Then finally, encoding the database model class:

<pre><code class="swift small-code">static func encodeModelAsJSON() {
    let obj = NSEntityDescription.insertNewObject(
        forEntityName: "PersonModel",
        into: context
        ) as! PersonModel

    obj.name = "Robin"
    obj.age = 30

    do {
        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        let data = try encoder.encode(obj)
        let json = String(data: data, encoding: .utf8)!
        print("json: \(json)")
    } catch {
        print("encoding error: \(error)")
    }
}</code></pre>

output:

<pre class="plaintext"><code class="plaintext small-code">json: {
  "name" : "Robin",
  "age" : 30
}
</code></pre>


### Decoding a Database model class

<pre><code class="swift small-code">static func decodeModelFromJSON() {
    let json = "{\"name\": \"Robin\",\"age\": 30}"
    do {
        let person = try JSONDecoder().decode(
            PersonModel.self,
            from: json.data(using: .utf8)
        !)
        try context.save()
        print("person.name: \(person.name!)")
        print("person.age: \(String(person.age))")
    } catch {
        print("decoding error: \(error)")
    }
}
</pre></code>

output:

<pre class="plaintext"><code class="plaintext small-code">obj.name: Robin
person.age: 30
</code></pre>
