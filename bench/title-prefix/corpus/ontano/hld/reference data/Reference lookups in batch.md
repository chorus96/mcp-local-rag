
quando serve:
1. il riferimento è un servizio e non una tabella (es. normalizzazione indirizzi, una chiamata per ogni riga)
2. la tabella di riferimento è grandissima ma le righe che servono sono poche, quindi caricarla tutta in spark per scartarne quasi tutto non ha senso

```scala
// lookup su richiesta
// 1) GET /lookup/plan -> {batchSize, maxConcurrency, keySchema, valueSchema}
// 2) POST /lookup/rows inviando solo le chiavi di join
// nella configurazione del job si elencano i lookup: [referenceName, stagingPath]

def joinReference(input: DataFrame, keys: Seq[String]): DataFrame = ???
```

![[Reference lookup.svg]]
