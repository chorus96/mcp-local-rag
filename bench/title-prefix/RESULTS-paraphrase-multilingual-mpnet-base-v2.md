# Title-prefix benchmark

Model `Xenova/paraphrase-multilingual-mpnet-base-v2`, 20 files, 39 queries, top 10.

Excluded from metrics, answer not inside any stored chunk in at least one variant: c05, b06, s04.

## Hybrid (default weight)

| group | n | variant | hit@1 | hit@3 | hit@10 | MRR | nDCG@10 |
|---|---|---|---|---|---|---|---|
| context | 12 | body | 0.500 | 0.667 | 0.750 | 0.595 | 0.626 |
| context | 12 | title | 0.667 | 0.750 | 1.000 | 0.744 | 0.818 |
| body | 13 | body | 0.462 | 0.769 | 0.923 | 0.650 | 0.719 |
| body | 13 | title | 0.462 | 0.692 | 0.846 | 0.599 | 0.660 |
| distractor | 6 | body | 0.667 | 0.667 | 0.833 | 0.700 | 0.731 |
| distractor | 6 | title | 0.667 | 0.667 | 0.833 | 0.690 | 0.722 |
| scoped | 5 | body | 0.600 | 0.600 | 1.000 | 0.673 | 0.749 |
| scoped | 5 | title | 0.600 | 0.600 | 1.000 | 0.690 | 0.764 |
| all | 36 | body | 0.528 | 0.694 | 0.861 | 0.643 | 0.694 |
| all | 36 | title | 0.583 | 0.694 | 0.917 | 0.675 | 0.737 |

### Per-query diff (hybrid)

Rank = first answer-bearing chunk (– = not in top 10). "New top-5 noise" lists non-answer chunks that entered the top 5 with titles on; `*` marks a chunk from the answer document.

| id | group | body rank | title rank | new top-5 noise | dropped top-5 noise |
|---|---|---|---|---|---|
| c01 | context | – | 5 |  | ontano/tickets/OPS 2318.md#3 |
| c02 | context | 1 | 1 | *ontano/Support Rotation.md#1<br>*ontano/Support Rotation.md#6 | workshop/draft.md#3<br>ontano/tickets/OPS 2318.md#3 |
| c03 | context | – | 5 | *ontano/tickets/OPS 2318.md#4 | workshop/draft.md#4<br>ontano/Snapshot tables.md#3 |
| c04 | context | 1 | 1 | *ontano/tickets/OPS 2318.md#1<br>*ontano/tickets/OPS 2318.md#6<br>*ontano/tickets/OPS 2318.md#5 | ontano/Snapshot tables.md#3<br>roadmap.md#2<br>larice/19-04-2022.md#3 |
| c06 | context | – | 3 | *faggio/Sensors/Water meters.md#1<br>ontano/Support Rotation.md#3 | roadmap.md#0<br>larice/05-04-2022.md#2<br>ontano/Support Rotation.md#6 |
| c07 | context | 1 | 1 | larice/05-04-2022.md#0 | ontano/planning.md#0 |
| c08 | context | 1 | 1 | roadmap.md#3<br>larice/05-04-2022.md#1 | ontano/hld/data masking/Data Masking.md#8<br>ontano/hld/data masking/Data Masking.md#7 |
| c09 | context | 2 | 1 | *faggio/Sensors/Alert routing.md#0 | ontano/hld/data masking/Data Masking.md#5 |
| c10 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#11 | ontano/Support Rotation.md#11 |
| c11 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#2<br>*ontano/hld/data masking/Data Masking.md#12 | ontano/Support Rotation.md#10<br>larice/05-04-2022.md#4 |
| c12 | context | 2 | 1 | *roadmap.md#0<br>*roadmap.md#3 | ontano/Support Rotation.md#0<br>ontano/Support Rotation.md#6 |
| c13 | context | 7 | 5 | larice/12-04-2022.md#1 | faggio/Sensors/Water meters.md#1<br>ontano/tickets/OPS 2318.md#0 |
| b01 | body | 1 | 1 | ontano/tickets/OPS 2318.md#3 | *ontano/Support Rotation.md#9 |
| b02 | body | 1 | 1 | *ontano/Support Rotation.md#4 | larice/Ticket triage.md#2 |
| b03 | body | 2 | – | ontano/Support Rotation.md#1 |  |
| b04 | body | 2 | 2 |  |  |
| b05 | body | 1 | 1 | ontano/Support Rotation.md#4 | workshop/draft.md#3 |
| b07 | body | 4 | 4 |  |  |
| b08 | body | – | – | *larice/19-04-2022.md#3 | larice/Data Masking.md#0 |
| b09 | body | 1 | 1 | roadmap.md#3<br>*larice/12-04-2022.md#2 | faggio/Sensors/Water meters.md#1<br>larice/05-04-2022.md#1 |
| b10 | body | 1 | 1 | *larice/Ticket triage.md#3<br>*larice/Ticket triage.md#0<br>*larice/Ticket triage.md#1<br>*larice/Ticket triage.md#4 | workshop/draft.md#4<br>larice/19-04-2022.md#1<br>ontano/Support Rotation.md#9<br>ontano/Support Rotation.md#11 |
| b11 | body | 2 | 2 | ontano/Support Rotation.md#9 | ontano/Snapshot tables.md#1 |
| b12 | body | 2 | 3 | *ontano/hld/data masking/Data Masking.md#6<br>*ontano/hld/data masking/Data Masking.md#10 | larice/Data Masking.md#0<br>*ontano/hld/data masking/Data Masking.md#3 |
| b13 | body | 5 | 5 |  |  |
| b14 | body | 1 | 1 | ontano/tickets/OPS 2318.md#2<br>ontano/Support Rotation.md#4<br>ontano/tickets/OPS 2318.md#0 | ontano/Support Rotation.md#11<br>ontano/Support Rotation.md#2<br>larice/19-04-2022.md#1 |
| d01 | distractor | 1 | 1 | *ontano/hld/data masking/Data Masking.md#8 | *ontano/hld/data masking/Data Masking.md#3 |
| d02 | distractor | 1 | 1 |  |  |
| d03 | distractor | – | – |  |  |
| d04 | distractor | 1 | 1 | ontano/hld/reference data/Reference lookups in batch.md#0 | ontano/Snapshot tables.md#4 |
| d05 | distractor | 5 | 7 | larice/05-04-2022.md#3 |  |
| d06 | distractor | 1 | 1 | *larice/Ticket triage.md#3<br>*larice/Ticket triage.md#0<br>*larice/Ticket triage.md#4 | workshop/draft.md#4<br>ontano/tickets/OPS 2318.md#1<br>Personal.md#0 |
| s01 | scoped | 6 | 5 |  | ontano/tickets/OPS 2318.md#3 |
| s02 | scoped | 1 | 1 |  |  |
| s03 | scoped | 1 | 1 | *larice/Data Masking.md#1 | larice/05-04-2022.md#4 |
| s05 | scoped | 1 | 1 | *larice/Ticket triage.md#1<br>*larice/Ticket triage.md#4 | larice/19-04-2022.md#1<br>larice/12-04-2022.md#2 |
| s06 | scoped | 5 | 4 | *ontano/tickets/OPS 2318.md#7 | *ontano/tickets/OPS 2318.md#1 |

## Vector only (hybridWeight=0)

| group | n | variant | hit@1 | hit@3 | hit@10 | MRR | nDCG@10 |
|---|---|---|---|---|---|---|---|
| context | 12 | body | 0.417 | 0.500 | 0.833 | 0.501 | 0.561 |
| context | 12 | title | 0.583 | 0.833 | 1.000 | 0.720 | 0.790 |
| body | 13 | body | 0.538 | 0.692 | 0.846 | 0.644 | 0.693 |
| body | 13 | title | 0.538 | 0.692 | 0.846 | 0.639 | 0.688 |
| distractor | 6 | body | 0.667 | 0.667 | 0.833 | 0.700 | 0.731 |
| distractor | 6 | title | 0.667 | 0.667 | 1.000 | 0.715 | 0.779 |
| scoped | 5 | body | 0.600 | 0.600 | 0.800 | 0.650 | 0.686 |
| scoped | 5 | title | 0.600 | 0.800 | 1.000 | 0.689 | 0.760 |
| all | 36 | body | 0.528 | 0.611 | 0.833 | 0.606 | 0.654 |
| all | 36 | title | 0.583 | 0.750 | 0.944 | 0.686 | 0.747 |

### Per-query diff (vector)

Rank = first answer-bearing chunk (– = not in top 10). "New top-5 noise" lists non-answer chunks that entered the top 5 with titles on; `*` marks a chunk from the answer document.

| id | group | body rank | title rank | new top-5 noise | dropped top-5 noise |
|---|---|---|---|---|---|
| c01 | context | – | 9 | *ontano/Support Rotation.md#4<br>*ontano/Support Rotation.md#5 | ontano/tickets/OPS 2318.md#3<br>larice/Ticket triage.md#1 |
| c02 | context | 1 | 1 | *ontano/Support Rotation.md#1<br>*ontano/Support Rotation.md#11<br>*ontano/Support Rotation.md#6 | workshop/draft.md#3<br>ontano/tickets/OPS 2318.md#3<br>larice/Ticket triage.md#2 |
| c03 | context | 8 | 3 | *ontano/tickets/OPS 2318.md#2<br>*ontano/tickets/OPS 2318.md#1<br>*ontano/tickets/OPS 2318.md#7 | larice/19-04-2022.md#1<br>workshop/draft.md#4<br>faggio/Sensors/Water meters.md#1<br>ontano/Support Rotation.md#1 |
| c04 | context | 8 | 1 | *ontano/tickets/OPS 2318.md#1<br>*ontano/tickets/OPS 2318.md#6<br>*ontano/tickets/OPS 2318.md#5<br>*ontano/tickets/OPS 2318.md#0 | roadmap.md#2<br>ontano/planning.md#2<br>larice/19-04-2022.md#1<br>ontano/Snapshot tables.md#2<br>larice/Ticket triage.md#2 |
| c06 | context | – | 2 | larice/12-04-2022.md#3<br>larice/12-04-2022.md#1 | ontano/tickets/OPS 2318.md#7<br>roadmap.md#0<br>ontano/tickets/OPS 2318.md#1 |
| c07 | context | 1 | 1 | larice/05-04-2022.md#1<br>larice/12-04-2022.md#2 | ontano/planning.md#0<br>larice/19-04-2022.md#1 |
| c08 | context | 2 | 2 | roadmap.md#3 | larice/19-04-2022.md#0 |
| c09 | context | 1 | 1 | larice/Ticket triage.md#0 | ontano/tickets/OPS 2318.md#0 |
| c10 | context | 1 | 1 | roadmap.md#3<br>*ontano/hld/data masking/Data Masking.md#9 | ontano/tickets/OPS 2318.md#4<br>ontano/Support Rotation.md#9 |
| c11 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#12<br>*ontano/hld/data masking/Data Masking.md#2 | larice/05-04-2022.md#4<br>ontano/planning.md#2 |
| c12 | context | 6 | 1 | *roadmap.md#0<br>*roadmap.md#3<br>*roadmap.md#2 | ontano/Support Rotation.md#11<br>workshop/draft.md#2<br>larice/Ticket triage.md#1<br>ontano/Support Rotation.md#0 |
| c13 | context | 10 | 5 | larice/12-04-2022.md#3<br>larice/12-04-2022.md#1<br>larice/19-04-2022.md#1 | faggio/Sensors/Water meters.md#1<br>roadmap.md#0<br>ontano/Support Rotation.md#0<br>larice/Ticket triage.md#3 |
| b01 | body | 1 | 1 | *ontano/Support Rotation.md#7 | *ontano/Support Rotation.md#9 |
| b02 | body | 1 | 1 |  |  |
| b03 | body | 6 | – |  |  |
| b04 | body | 2 | 2 |  |  |
| b05 | body | 1 | 1 | ontano/Support Rotation.md#4<br>ontano/Support Rotation.md#11 | *ontano/tickets/OPS 2318.md#1<br>workshop/draft.md#3 |
| b07 | body | 5 | 5 |  |  |
| b08 | body | – | – | larice/05-04-2022.md#1 | ontano/tickets/OPS 2318.md#1 |
| b09 | body | 1 | 1 | roadmap.md#3<br>ontano/hld/data masking/Data Masking.md#12 | faggio/Sensors/Water meters.md#1<br>ontano/hld/data masking/Data Masking.md#10 |
| b10 | body | 1 | 1 | *larice/Ticket triage.md#0<br>*larice/Ticket triage.md#4 | larice/19-04-2022.md#1<br>workshop/draft.md#4 |
| b11 | body | 2 | 2 | larice/12-04-2022.md#4<br>ontano/Support Rotation.md#10 | ontano/planning.md#2<br>ontano/Snapshot tables.md#3 |
| b12 | body | 1 | 1 | larice/Data Masking.md#1<br>*ontano/hld/data masking/Data Masking.md#1 | ontano/tickets/OPS 2318.md#1<br>*ontano/hld/data masking/Data Masking.md#3 |
| b13 | body | – | 9 | ontano/hld/data masking/Data Masking.md#0 | ontano/Support Rotation.md#0 |
| b14 | body | 1 | 1 | ontano/tickets/OPS 2318.md#2<br>ontano/tickets/OPS 2318.md#5 | larice/19-04-2022.md#1<br>ontano/Support Rotation.md#2 |
| d01 | distractor | 1 | 1 | *larice/Data Masking.md#1<br>*ontano/hld/data masking/Data Masking.md#8 | *ontano/hld/data masking/Data Masking.md#5<br>workshop/draft.md#0 |
| d02 | distractor | 1 | 1 |  |  |
| d03 | distractor | – | 8 | ontano/hld/data masking/Data Masking.md#11 | ontano/Snapshot tables.md#2 |
| d04 | distractor | 1 | 1 | ontano/hld/reference data/Reference lookups in batch.md#0 | ontano/Snapshot tables.md#4 |
| d05 | distractor | 5 | 6 | larice/05-04-2022.md#3 |  |
| d06 | distractor | 1 | 1 | *larice/Ticket triage.md#3<br>*larice/Ticket triage.md#0<br>*larice/Ticket triage.md#4<br>*larice/Ticket triage.md#2 | ontano/Support Rotation.md#2<br>roadmap.md#0<br>ontano/Support Rotation.md#6<br>ontano/planning.md#2 |
| s01 | scoped | – | 9 | *ontano/Support Rotation.md#4<br>*ontano/Support Rotation.md#5 | ontano/tickets/OPS 2318.md#3<br>ontano/tickets/OPS 2318.md#2 |
| s02 | scoped | 1 | 1 | *ontano/hld/data masking/Data Masking.md#9<br>*ontano/hld/data masking/Data Masking.md#6 | *ontano/hld/data masking/Data Masking.md#7<br>*ontano/hld/data masking/Data Masking.md#3 |
| s03 | scoped | 1 | 1 | *larice/Data Masking.md#1<br>larice/05-04-2022.md#1 | larice/19-04-2022.md#1<br>larice/Ticket triage.md#4 |
| s05 | scoped | 1 | 1 | *larice/Ticket triage.md#0<br>*larice/Ticket triage.md#4 | larice/19-04-2022.md#1<br>larice/12-04-2022.md#4 |
| s06 | scoped | 4 | 3 | *ontano/tickets/OPS 2318.md#7 | *ontano/tickets/OPS 2318.md#0 |

