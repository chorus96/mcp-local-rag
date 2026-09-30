# Title-prefix benchmark

Model `Xenova/paraphrase-multilingual-MiniLM-L12-v2`, 20 files, 39 queries, top 10.

Excluded from metrics, answer not inside any stored chunk in at least one variant: c05, b03, b06, s04.

## Hybrid (default weight)

| group | n | variant | hit@1 | hit@3 | hit@10 | MRR | nDCG@10 |
|---|---|---|---|---|---|---|---|
| context | 12 | body | 0.500 | 0.500 | 0.833 | 0.573 | 0.625 |
| context | 12 | title | 0.583 | 0.917 | 1.000 | 0.743 | 0.821 |
| body | 12 | body | 0.500 | 0.750 | 0.833 | 0.639 | 0.687 |
| body | 12 | title | 0.583 | 0.750 | 0.833 | 0.679 | 0.716 |
| distractor | 6 | body | 0.667 | 0.667 | 0.833 | 0.708 | 0.738 |
| distractor | 6 | title | 0.667 | 0.667 | 1.000 | 0.713 | 0.776 |
| scoped | 5 | body | 0.600 | 0.600 | 1.000 | 0.690 | 0.764 |
| scoped | 5 | title | 0.600 | 0.600 | 1.000 | 0.700 | 0.772 |
| all | 35 | body | 0.543 | 0.629 | 0.857 | 0.635 | 0.686 |
| all | 35 | title | 0.600 | 0.771 | 0.943 | 0.710 | 0.770 |

### Per-query diff (hybrid)

Rank = first answer-bearing chunk (– = not in top 10). "New top-5 noise" lists non-answer chunks that entered the top 5 with titles on; `*` marks a chunk from the answer document.

| id | group | body rank | title rank | new top-5 noise | dropped top-5 noise |
|---|---|---|---|---|---|
| c01 | context | 4 | 4 |  |  |
| c02 | context | 1 | 1 | *ontano/Support Rotation.md#1 | larice/Ticket triage.md#2 |
| c03 | context | – | 3 | *ontano/tickets/OPS 2318.md#4<br>ontano/Support Rotation.md#3 | ontano/Support Rotation.md#10<br>ontano/Support Rotation.md#5<br>ontano/Support Rotation.md#9 |
| c04 | context | 1 | 1 | *ontano/tickets/OPS 2318.md#2<br>*ontano/tickets/OPS 2318.md#0<br>*ontano/tickets/OPS 2318.md#6<br>*ontano/tickets/OPS 2318.md#5 | roadmap.md#2<br>ontano/hld/data masking/Data Masking.md#12<br>ontano/hld/reference data/Reference lookups in batch.md#1<br>larice/19-04-2022.md#3 |
| c06 | context | – | 2 | *faggio/Sensors/Water meters.md#1<br>*faggio/Sensors/Water meters.md#0 | ontano/Support Rotation.md#10<br>roadmap.md#0<br>ontano/Support Rotation.md#5 |
| c07 | context | 4 | 2 | roadmap.md#3 | ontano/planning.md#0 |
| c08 | context | 1 | 1 | ontano/Support Rotation.md#0<br>ontano/Support Rotation.md#10 | ontano/tickets/OPS 2318.md#1<br>ontano/hld/data masking/Data Masking.md#7 |
| c09 | context | 4 | 1 | *faggio/Sensors/Alert routing.md#1 | ontano/planning.md#0 |
| c10 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#11 | ontano/Support Rotation.md#8 |
| c11 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#12<br>*ontano/hld/data masking/Data Masking.md#7<br>*ontano/hld/data masking/Data Masking.md#2 | larice/05-04-2022.md#1<br>larice/12-04-2022.md#2<br>larice/Ticket triage.md#3 |
| c12 | context | 1 | 1 | *roadmap.md#0<br>*roadmap.md#3 | larice/12-04-2022.md#1<br>ontano/Support Rotation.md#5 |
| c13 | context | 8 | 3 |  | ontano/tickets/OPS 2318.md#7<br>ontano/Support Rotation.md#0<br>faggio/Sensors/Water meters.md#1 |
| b01 | body | 1 | 1 | larice/Ticket triage.md#2 | *ontano/Support Rotation.md#8 |
| b02 | body | 1 | 1 |  |  |
| b04 | body | 2 | 2 |  |  |
| b05 | body | 1 | 1 | ontano/Support Rotation.md#3 | *ontano/tickets/OPS 2318.md#0 |
| b07 | body | – | – | faggio/Sensors/Alert routing.md#0 | larice/12-04-2022.md#0 |
| b08 | body | – | – | larice/05-04-2022.md#3 | faggio/Sensors/Water meters.md#1 |
| b09 | body | 1 | 1 | ontano/hld/data masking/Data Masking.md#12<br>larice/Data Masking.md#0 | ontano/hld/data masking/Data Masking.md#3<br>ontano/tickets/OPS 2318.md#0 |
| b10 | body | 1 | 1 | *larice/Ticket triage.md#1<br>*larice/Ticket triage.md#0 | workshop/draft.md#4<br>larice/19-04-2022.md#1 |
| b11 | body | 2 | 1 | ontano/tickets/OPS 2318.md#0 | faggio/Sensors/Water meters.md#1 |
| b12 | body | 6 | 7 | *ontano/hld/data masking/Data Masking.md#2<br>*ontano/hld/data masking/Data Masking.md#6 | *ontano/hld/data masking/Data Masking.md#3<br>*ontano/hld/data masking/Data Masking.md#7 |
| b13 | body | 2 | 2 | ontano/tickets/OPS 2318.md#1 | faggio/Sensors/Water meters.md#1 |
| b14 | body | 1 | 1 | ontano/tickets/OPS 2318.md#1<br>ontano/tickets/OPS 2318.md#0 | ontano/Support Rotation.md#8<br>ontano/Support Rotation.md#2 |
| d01 | distractor | 1 | 1 | *ontano/hld/data masking/Data Masking.md#11<br>*ontano/hld/data masking/Data Masking.md#2 | ontano/tickets/OPS 2318.md#0<br>*ontano/hld/data masking/Data Masking.md#3 |
| d02 | distractor | 1 | 1 | *ontano/hld/data masking/Data Masking.md#12<br>ontano/tickets/OPS 2318.md#4 | ontano/Support Rotation.md#8<br>roadmap.md#3 |
| d03 | distractor | – | 9 | ontano/hld/data masking/Data Masking.md#2 | ontano/hld/data masking/Data Masking.md#7 |
| d04 | distractor | 1 | 1 | roadmap.md#2 | larice/05-04-2022.md#0 |
| d05 | distractor | 4 | 6 | *larice/19-04-2022.md#3 |  |
| d06 | distractor | 1 | 1 | *larice/Ticket triage.md#0<br>*larice/Ticket triage.md#2<br>faggio/Sensors/Alert routing.md#1 | workshop/draft.md#4<br>Personal.md#0<br>ontano/Support Rotation.md#5 |
| s01 | scoped | 4 | 4 |  |  |
| s02 | scoped | 1 | 1 |  |  |
| s03 | scoped | 1 | 1 | *larice/Data Masking.md#1<br>larice/Ticket triage.md#2 | larice/05-04-2022.md#6<br>larice/19-04-2022.md#3 |
| s05 | scoped | 1 | 1 | larice/12-04-2022.md#4 | larice/19-04-2022.md#2 |
| s06 | scoped | 5 | 4 | *ontano/tickets/OPS 2318.md#3 | *ontano/tickets/OPS 2318.md#0 |

## Vector only (hybridWeight=0)

| group | n | variant | hit@1 | hit@3 | hit@10 | MRR | nDCG@10 |
|---|---|---|---|---|---|---|---|
| context | 12 | body | 0.500 | 0.500 | 0.833 | 0.562 | 0.604 |
| context | 12 | title | 0.667 | 0.917 | 1.000 | 0.794 | 0.847 |
| body | 12 | body | 0.500 | 0.667 | 0.833 | 0.615 | 0.667 |
| body | 12 | title | 0.500 | 0.667 | 0.833 | 0.618 | 0.671 |
| distractor | 6 | body | 0.667 | 0.667 | 0.833 | 0.700 | 0.731 |
| distractor | 6 | title | 0.667 | 0.667 | 1.000 | 0.722 | 0.785 |
| scoped | 5 | body | 0.600 | 0.800 | 1.000 | 0.689 | 0.760 |
| scoped | 5 | title | 0.800 | 0.800 | 1.000 | 0.840 | 0.877 |
| all | 35 | body | 0.543 | 0.629 | 0.857 | 0.622 | 0.670 |
| all | 35 | title | 0.629 | 0.771 | 0.943 | 0.728 | 0.780 |

### Per-query diff (vector)

Rank = first answer-bearing chunk (– = not in top 10). "New top-5 noise" lists non-answer chunks that entered the top 5 with titles on; `*` marks a chunk from the answer document.

| id | group | body rank | title rank | new top-5 noise | dropped top-5 noise |
|---|---|---|---|---|---|
| c01 | context | – | 5 |  | Personal.md#0 |
| c02 | context | 1 | 1 | *ontano/Support Rotation.md#10<br>*ontano/Support Rotation.md#1 | ontano/tickets/OPS 2318.md#3<br>larice/Ticket triage.md#2 |
| c03 | context | 4 | 1 | *ontano/tickets/OPS 2318.md#3<br>*ontano/tickets/OPS 2318.md#0 | larice/19-04-2022.md#1<br>faggio/Sensors/Water meters.md#1 |
| c04 | context | 1 | 1 | *ontano/tickets/OPS 2318.md#2<br>*ontano/tickets/OPS 2318.md#0<br>*ontano/tickets/OPS 2318.md#6<br>*ontano/tickets/OPS 2318.md#5 | roadmap.md#2<br>ontano/planning.md#0<br>ontano/hld/data masking/Data Masking.md#12<br>larice/Ticket triage.md#3 |
| c06 | context | – | 2 | *faggio/Sensors/Water meters.md#1<br>*faggio/Sensors/Water meters.md#0 | larice/19-04-2022.md#1<br>ontano/Support Rotation.md#2<br>roadmap.md#0 |
| c07 | context | 5 | 1 | roadmap.md#2 | ontano/tickets/OPS 2318.md#0 |
| c08 | context | 1 | 2 | ontano/Support Rotation.md#0<br>larice/05-04-2022.md#0 | faggio/Sensors/Water meters.md#1<br>ontano/tickets/OPS 2318.md#0 |
| c09 | context | 8 | 1 | *faggio/Sensors/Alert routing.md#1<br>*faggio/Sensors/Alert routing.md#0 | ontano/planning.md#0<br>larice/19-04-2022.md#0<br>roadmap.md#2 |
| c10 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#10<br>*ontano/hld/data masking/Data Masking.md#6 | ontano/Support Rotation.md#8<br>roadmap.md#3 |
| c11 | context | 1 | 1 | *ontano/hld/data masking/Data Masking.md#2<br>*ontano/hld/data masking/Data Masking.md#0 | larice/12-04-2022.md#2<br>*ontano/hld/data masking/Data Masking.md#3 |
| c12 | context | 1 | 1 | *roadmap.md#0<br>*roadmap.md#3 | ontano/Support Rotation.md#10<br>workshop/draft.md#2 |
| c13 | context | 6 | 3 | larice/12-04-2022.md#2 | ontano/Support Rotation.md#0<br>ontano/tickets/OPS 2318.md#7<br>ontano/Support Rotation.md#1 |
| b01 | body | 1 | 1 |  |  |
| b02 | body | 1 | 1 | *ontano/Support Rotation.md#3 | workshop/draft.md#0 |
| b04 | body | 2 | 2 | *ontano/Snapshot tables.md#2 | ontano/hld/data masking/Data Masking.md#6 |
| b05 | body | 1 | 1 | *ontano/tickets/OPS 2318.md#1<br>ontano/Support Rotation.md#10 | workshop/draft.md#3<br>*ontano/tickets/OPS 2318.md#0 |
| b07 | body | – | – | ontano/hld/data masking/Data Masking.md#8 | larice/19-04-2022.md#3 |
| b08 | body | – | – | larice/05-04-2022.md#3 | faggio/Sensors/Water meters.md#1 |
| b09 | body | 1 | 1 | ontano/hld/data masking/Data Masking.md#12<br>ontano/hld/data masking/Data Masking.md#11 | faggio/Sensors/Water meters.md#1<br>ontano/tickets/OPS 2318.md#0 |
| b10 | body | 1 | 1 | *larice/Ticket triage.md#1<br>*larice/Ticket triage.md#0<br>ontano/tickets/OPS 2318.md#7 | larice/19-04-2022.md#1<br>ontano/Support Rotation.md#10<br>larice/19-04-2022.md#2 |
| b11 | body | 2 | 2 |  |  |
| b12 | body | 8 | 6 | *ontano/hld/data masking/Data Masking.md#10<br>*ontano/hld/data masking/Data Masking.md#2<br>larice/Data Masking.md#1 | *ontano/hld/data masking/Data Masking.md#3<br>ontano/tickets/OPS 2318.md#0<br>roadmap.md#3 |
| b13 | body | 4 | 4 | ontano/hld/data masking/Data Masking.md#0 | faggio/Sensors/Water meters.md#1 |
| b14 | body | 1 | 1 | ontano/hld/data masking/Data Masking.md#12<br>ontano/tickets/OPS 2318.md#1 | ontano/Support Rotation.md#8<br>larice/19-04-2022.md#2 |
| d01 | distractor | 1 | 1 | *ontano/hld/data masking/Data Masking.md#4<br>*ontano/hld/data masking/Data Masking.md#11<br>*larice/Data Masking.md#1 | ontano/tickets/OPS 2318.md#0<br>*ontano/hld/data masking/Data Masking.md#3<br>faggio/Sensors/Water meters.md#1 |
| d02 | distractor | 1 | 1 | *ontano/hld/data masking/Data Masking.md#12<br>ontano/planning.md#1 | ontano/Support Rotation.md#8<br>ontano/tickets/OPS 2318.md#0 |
| d03 | distractor | – | 6 | ontano/hld/data masking/Data Masking.md#11<br>ontano/hld/data masking/Data Masking.md#6<br>ontano/hld/data masking/Data Masking.md#2 | ontano/Snapshot tables.md#2<br>ontano/tickets/OPS 2318.md#0<br>larice/19-04-2022.md#0 |
| d04 | distractor | 1 | 1 | roadmap.md#2 | *ontano/hld/data masking/Data Masking.md#8 |
| d05 | distractor | 5 | 6 | larice/05-04-2022.md#6 |  |
| d06 | distractor | 1 | 1 | *larice/Ticket triage.md#0<br>*larice/Ticket triage.md#2<br>faggio/Sensors/Alert routing.md#1<br>*larice/Ticket triage.md#3 | ontano/tickets/OPS 2318.md#3<br>ontano/Support Rotation.md#5<br>Personal.md#0<br>ontano/tickets/OPS 2318.md#7 |
| s01 | scoped | 9 | 5 |  | ontano/tickets/OPS 2318.md#1 |
| s02 | scoped | 1 | 1 | *ontano/hld/data masking/Data Masking.md#10<br>*ontano/hld/data masking/Data Masking.md#4 | *ontano/hld/data masking/Data Masking.md#3<br>*ontano/hld/data masking/Data Masking.md#7 |
| s03 | scoped | 1 | 1 | *larice/Data Masking.md#1<br>larice/19-04-2022.md#2 | larice/05-04-2022.md#4<br>larice/19-04-2022.md#3 |
| s05 | scoped | 1 | 1 | *larice/Ticket triage.md#0<br>*larice/Ticket triage.md#3<br>larice/05-04-2022.md#2 | larice/19-04-2022.md#1<br>larice/19-04-2022.md#2<br>larice/12-04-2022.md#3 |
| s06 | scoped | 3 | 1 |  |  |

