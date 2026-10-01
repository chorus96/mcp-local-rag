Scope: SQL access, batch exports and the event bus must enforce identical rules, regardless of the client a consumer uses.

## User identification
Each call includes the identity issued by the company login service. Accounts used by scheduled jobs are mapped to the owning team, never to a person. An account that no team claims is refused at registration.

## Access Control (hide/clear)
The dataset owner picks one of three levels per column: visible, hidden or cleared. A hidden column is removed from the schema the caller sees. A cleared column keeps its place in the schema but every value is replaced with null, so existing queries keep working.

## Hot Data Masking
Live data flows through the event bus. A broker plugin masks each message before it reaches the subscriber, with the policy kept in memory for up to ten minutes.

## Cold Data Masking
Historical data is stored as parquet files in the archive bucket and is read in two ways.

### SQL access
The query engine wraps the table in a masking view generated from the policy, so the work happens while the query is planned and adds almost no cost when it runs.

### Batch exports
Spark jobs read through the export API, which applies the policy to each file it serves. This is the one path that still needs a dedicated test suite, because every job can pass its own reader settings.

## Open points
- who signs off on a policy change while the dataset owner is on leave
- whether cleared columns should hold null or a fixed marker such as "***"
- audit log retention: 2 years proposed, compliance asks for 7
