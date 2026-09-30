# Title-prefix benchmark

Model `Xenova/all-MiniLM-L6-v2`, 20 files, 39 queries, top 10.

Excluded from metrics, answer not inside any stored chunk in at least one variant: c06, b03, b06.

## Hybrid (default weight)

| group | n | variant | hit@1 | hit@3 | hit@10 | MRR | nDCG@10 |
|---|---|---|---|---|---|---|---|
| context | 12 | body | 0.417 | 0.500 | 0.583 | 0.479 | 0.496 |
| context | 12 | title | 0.500 | 0.750 | 0.917 | 0.667 | 0.712 |
| body | 12 | body | 0.500 | 0.750 | 0.833 | 0.623 | 0.675 |
| body | 12 | title | 0.583 | 0.833 | 0.917 | 0.719 | 0.767 |
| distractor | 6 | body | 0.667 | 0.667 | 0.833 | 0.708 | 0.704 |
| distractor | 6 | title | 0.667 | 0.667 | 0.833 | 0.708 | 0.706 |
| scoped | 6 | body | 0.333 | 0.833 | 1.000 | 0.583 | 0.686 |
| scoped | 6 | title | 0.667 | 0.833 | 1.000 | 0.774 | 0.827 |
| all | 36 | body | 0.472 | 0.667 | 0.778 | 0.583 | 0.622 |
| all | 36 | title | 0.583 | 0.778 | 0.917 | 0.709 | 0.749 |

### Per-query diff (hybrid)

Rank = first answer-bearing chunk (– = not in top 10). "New top-5 noise" lists non-answer chunks that entered the top 5 with titles on; `*` marks a chunk from the answer document.

| id | group | body rank | title rank | new top-5 noise | dropped top-5 noise |
|---|---|---|---|---|---|
| c01 | context | 2 | 2 |  |  |
| c02 | context | 1 | 1 |  |  |
| c03 | context | – | – | Excalidraw/Drawing 2022-06-08 15.42.19.excalidraw.md#0 | ontano/hld/data masking/Data Masking.md#5 |
| c04 | context | – | 2 | ontano/Snapshot tables.md#2<br>ontano/Support Rotation.md#3 | ontano/hld/data masking/Data Masking.md#7<br>ontano/hld/data masking/Data Masking.md#4<br>ontano/hld/data masking/Data Masking.md#9 |
| c05 | context | – | 2 | *faggio/Sensors/Water meters.md#2<br>*faggio/Sensors/Water meters.md#1 | ontano/hld/data masking/Data Masking.md#6<br>ontano/Support Rotation.md#2<br>ontano/Support Rotation.md#6 |
| c07 | context | – | 4 |  | ontano/hld/data masking/Data Masking.md#8 |
| c08 | context | 1 | 1 | *ontano/hld/reference data/Reference lookups in batch.md#0<br>ontano/Support Rotation.md#7 | ontano/hld/data masking/Data Masking.md#1<br>ontano/hld/data masking/Data Masking.md#7 |
| c09 | context | – | 4 | *faggio/Sensors/Alert routing.md#0 | ontano/Support Rotation.md#11<br>ontano/Support Rotation.md#6 |
| c10 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#4 | ontano/Support Rotation.md#9 |
| c11 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#2 | ontano/Support Rotation.md#11 |
| c12 | context | 1 | 1 | *roadmap.md#2 | ontano/Support Rotation.md#2 |
| c13 | context | 4 | 1 |  | faggio/Sensors/Water meters.md#1<br>ontano/tickets/OPS 2318.md#4 |
| b01 | body | 1 | 1 |  |  |
| b02 | body | 1 | 1 |  |  |
| b04 | body | 2 | 2 | *ontano/Snapshot tables.md#5 | *ontano/Snapshot tables.md#4 |
| b05 | body | 1 | 1 | larice/12-04-2022.md#0 | larice/05-04-2022.md#6 |
| b07 | body | 7 | 8 | *larice/05-04-2022.md#1 | *larice/05-04-2022.md#5 |
| b08 | body | – | – | larice/05-04-2022.md#3 | larice/12-04-2022.md#0 |
| b09 | body | 1 | 1 | ontano/tickets/OPS 2318.md#0 | *larice/12-04-2022.md#1 |
| b10 | body | – | 2 | ontano/Support Rotation.md#4 | ontano/Support Rotation.md#7<br>ontano/Support Rotation.md#6 |
| b11 | body | 2 | 1 | *ontano/hld/data masking/Data Masking.md#6 | ontano/Support Rotation.md#10 |
| b12 | body | 3 | 2 | *ontano/hld/data masking/Data Masking.md#2 | *ontano/hld/data masking/Data Masking.md#10 |
| b13 | body | 1 | 1 | ontano/tickets/OPS 2318.md#0<br>larice/05-04-2022.md#0 | larice/Data Masking.md#0<br>larice/Ticket triage.md#3 |
| b14 | body | 1 | 1 | ontano/Support Rotation.md#5 | ontano/hld/data masking/Data Masking.md#1 |
| d01 | distractor | 1 | 1 | *ontano/hld/data masking/Data Masking.md#6 | *ontano/hld/data masking/Data Masking.md#5 |
| d02 | distractor | 1 | 1 | *ontano/hld/data masking/Data Masking.md#0<br>*ontano/hld/data masking/Data Masking.md#3 | roadmap.md#2<br>roadmap.md#0 |
| d03 | distractor | 4 | 4 | ontano/hld/data masking/Data Masking.md#6 | ontano/hld/data masking/Data Masking.md#7 |
| d04 | distractor | 1 | 1 | roadmap.md#2 | *ontano/hld/data masking/Data Masking.md#6 |
| d05 | distractor | – | – | faggio/Sensors/Alert routing.md#1<br>ontano/tickets/OPS 2318.md#3<br>ontano/tickets/OPS 2318.md#1 | *larice/19-04-2022.md#2<br>ontano/hld/reference data/Reference lookups in batch.md#0<br>*larice/19-04-2022.md#1 |
| d06 | distractor | 1 | 1 | *larice/Ticket triage.md#0<br>*larice/Ticket triage.md#3 | faggio/Sensors/Water meters.md#1<br>larice/05-04-2022.md#5 |
| s01 | scoped | 2 | 2 |  |  |
| s02 | scoped | 1 | 1 | *ontano/hld/data masking/Data Masking.md#4 | *ontano/hld/data masking/Data Masking.md#10 |
| s03 | scoped | 1 | 1 |  |  |
| s04 | scoped | 3 | 1 | *faggio/Sensors/Water meters.md#3 | faggio/Sensors/Alert routing.md#1 |
| s05 | scoped | 2 | 1 | *larice/Ticket triage.md#1<br>*larice/Ticket triage.md#3 | larice/12-04-2022.md#2<br>larice/05-04-2022.md#1 |
| s06 | scoped | 6 | 7 |  |  |

## Vector only (hybridWeight=0)

| group | n | variant | hit@1 | hit@3 | hit@10 | MRR | nDCG@10 |
|---|---|---|---|---|---|---|---|
| context | 12 | body | 0.500 | 0.583 | 0.583 | 0.542 | 0.518 |
| context | 12 | title | 0.583 | 0.833 | 0.833 | 0.708 | 0.739 |
| body | 12 | body | 0.500 | 0.750 | 0.833 | 0.642 | 0.690 |
| body | 12 | title | 0.667 | 0.833 | 0.917 | 0.759 | 0.797 |
| distractor | 6 | body | 0.667 | 0.667 | 0.833 | 0.700 | 0.667 |
| distractor | 6 | title | 0.667 | 0.667 | 0.833 | 0.708 | 0.705 |
| scoped | 6 | body | 0.333 | 0.667 | 0.833 | 0.528 | 0.603 |
| scoped | 6 | title | 0.667 | 0.833 | 1.000 | 0.778 | 0.831 |
| all | 36 | body | 0.500 | 0.667 | 0.750 | 0.599 | 0.614 |
| all | 36 | title | 0.639 | 0.806 | 0.889 | 0.737 | 0.768 |

### Per-query diff (vector)

Rank = first answer-bearing chunk (– = not in top 10). "New top-5 noise" lists non-answer chunks that entered the top 5 with titles on; `*` marks a chunk from the answer document.

| id | group | body rank | title rank | new top-5 noise | dropped top-5 noise |
|---|---|---|---|---|---|
| c01 | context | 2 | 2 |  |  |
| c02 | context | 1 | 1 |  |  |
| c03 | context | – | – | ontano/Support Rotation.md#4<br>ontano/Support Rotation.md#12 | ontano/Support Rotation.md#1<br>ontano/hld/data masking/Data Masking.md#4 |
| c04 | context | – | – | roadmap.md#2<br>ontano/Support Rotation.md#9<br>ontano/Support Rotation.md#2 | ontano/hld/data masking/Data Masking.md#5<br>ontano/hld/data masking/Data Masking.md#9<br>ontano/Support Rotation.md#10 |
| c05 | context | – | 1 | *faggio/Sensors/Water meters.md#1<br>*faggio/Sensors/Water meters.md#2<br>*faggio/Sensors/Water meters.md#3 | ontano/Support Rotation.md#12<br>roadmap.md#2<br>ontano/Support Rotation.md#6<br>faggio/Sensors/Alert routing.md#0 |
| c07 | context | – | 2 | roadmap.md#2 | ontano/hld/data masking/Data Masking.md#1<br>ontano/hld/data masking/Data Masking.md#8 |
| c08 | context | 1 | 1 | *ontano/hld/reference data/Reference lookups in batch.md#0<br>ontano/Support Rotation.md#7 | ontano/hld/data masking/Data Masking.md#7<br>ontano/Support Rotation.md#6 |
| c09 | context | – | 2 | ontano/Support Rotation.md#3 | ontano/Support Rotation.md#0<br>ontano/Support Rotation.md#6 |
| c10 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#4<br>*ontano/hld/data masking/Data Masking.md#6<br>*ontano/hld/data masking/Data Masking.md#10 | ontano/Support Rotation.md#9<br>*ontano/hld/data masking/Data Masking.md#11<br>*ontano/hld/data masking/Data Masking.md#3 |
| c11 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#2 | *ontano/hld/data masking/Data Masking.md#8 |
| c12 | context | 1 | 1 | *roadmap.md#2 | ontano/Support Rotation.md#1 |
| c13 | context | 1 | 1 | larice/19-04-2022.md#2 | faggio/Sensors/Water meters.md#1<br>larice/Ticket triage.md#1<br>faggio/Sensors/Water meters.md#2<br>workshop/draft.md#1 |
| b01 | body | 1 | 1 |  |  |
| b02 | body | 1 | 1 |  |  |
| b04 | body | 2 | 1 |  |  |
| b05 | body | 1 | 1 | *ontano/tickets/OPS 2318.md#0 | larice/19-04-2022.md#2 |
| b07 | body | 5 | 9 | larice/12-04-2022.md#0<br>*larice/05-04-2022.md#1 | faggio/Sensors/Water meters.md#0 |
| b08 | body | – | – |  |  |
| b09 | body | 1 | 1 | ontano/tickets/OPS 2318.md#0<br>ontano/tickets/OPS 2318.md#6 | workshop/draft.md#6<br>larice/05-04-2022.md#5 |
| b10 | body | – | 2 | ontano/Support Rotation.md#9 | ontano/Support Rotation.md#7<br>ontano/Support Rotation.md#6 |
| b11 | body | 2 | 1 |  |  |
| b12 | body | 1 | 1 | *ontano/hld/data masking/Data Masking.md#2<br>*ontano/hld/data masking/Data Masking.md#1 | roadmap.md#2<br>*ontano/hld/data masking/Data Masking.md#10 |
| b13 | body | 2 | 2 | ontano/tickets/OPS 2318.md#0<br>ontano/tickets/OPS 2318.md#5 | larice/Data Masking.md#0<br>larice/Ticket triage.md#3 |
| b14 | body | 1 | 1 |  |  |
| d01 | distractor | 1 | 1 | *ontano/hld/data masking/Data Masking.md#6 | *ontano/hld/data masking/Data Masking.md#0 |
| d02 | distractor | 1 | 1 | *ontano/hld/data masking/Data Masking.md#10<br>*ontano/hld/data masking/Data Masking.md#3 | ontano/Support Rotation.md#7<br>roadmap.md#2 |
| d03 | distractor | 5 | 4 | ontano/hld/data masking/Data Masking.md#6 | ontano/hld/data masking/Data Masking.md#7 |
| d04 | distractor | 1 | 1 | roadmap.md#2 | *ontano/hld/data masking/Data Masking.md#6 |
| d05 | distractor | – | – | workshop/draft.md#6<br>ontano/tickets/OPS 2318.md#1<br>faggio/Sensors/Alert routing.md#1 | *larice/19-04-2022.md#2<br>faggio/Sensors/Water meters.md#1<br>faggio/Sensors/Water meters.md#0 |
| d06 | distractor | 1 | 1 | *larice/Ticket triage.md#3<br>*larice/Ticket triage.md#0 | faggio/Sensors/Water meters.md#1<br>workshop/draft.md#4 |
| s01 | scoped | 2 | 2 |  |  |
| s02 | scoped | 1 | 1 | *ontano/hld/data masking/Data Masking.md#4<br>*ontano/hld/data masking/Data Masking.md#6 | *ontano/hld/data masking/Data Masking.md#11<br>*ontano/hld/data masking/Data Masking.md#3 |
| s03 | scoped | 1 | 1 | larice/05-04-2022.md#3 | larice/12-04-2022.md#1 |
| s04 | scoped | 2 | 1 | *faggio/Sensors/Water meters.md#2 | faggio/Authentication.md#0 |
| s05 | scoped | – | 1 | *larice/Ticket triage.md#0<br>*larice/Ticket triage.md#3<br>*larice/Ticket triage.md#1 | larice/12-04-2022.md#0<br>larice/05-04-2022.md#4<br>larice/12-04-2022.md#3<br>larice/05-04-2022.md#1 |
| s06 | scoped | 6 | 6 |  |  |

