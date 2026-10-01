{
	Parcel(
		tracking: String
		weightKg: Double
	) location s3://archive/parcel
	history = snapshot: String
	partitionBy = []
}

s3://archive/parcel/snapshot=2022-06-01/part0000.parquet

parcel_v1 location s3://archive/parcel/snapshot=2022-06-01 partitioningColumns = []

parcel_v1_history location s3://archive/parcel partitioningColumns = [snapshot]

----

aggiungendo una colonna di partizionamento:

s3://archive/parcel/snapshot=2022-06-01/depot=D07/part0000.parquet

parcel_v1_history location s3://archive/parcel partitioningColumns = [snapshot, depot]

caricamento:

rows = [{tracking: PK0000123, weightKg: 2.4, depot: D07}]
rowsWithSnapshot = rows + {snapshot: 2022-06-02}
rowsWithSnapshot.write("parcel_v1_history")
// su s3 restano sia snapshot=2022-06-01 sia snapshot=2022-06-02
spark.sql("ALTER TABLE parcel_v1 SET LOCATION 's3://archive/parcel/snapshot=2022-06-02'")
// parcel_v1 guarda solo l'ultima cartella, la history tutte
