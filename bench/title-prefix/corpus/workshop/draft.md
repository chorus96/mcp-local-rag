Ciao, ecco le domande dopo il workshop

1. Squash o merge commit quando si chiude una pull request? Noi facciamo squash perché la storia resta leggibile.
2. Quante approvazioni servono? Oggi ne basta una, ma per il codice condiviso tra più team mi sembra poco.
3. Chi deve approvare le migrazioni del database?
4. I formattatori li fate girare in locale con un hook o solo in CI?

---

1. Squash va bene, purché il titolo della pull request descriva la modifica e non il ticket.
2. Una per i singoli servizi, due per le librerie condivise, e una delle due deve venire da un altro team.
3. Almeno una persona che ha già gestito un rollback in produzione, non chi ha scritto la migrazione.
4. Entrambi: l'hook per avere un riscontro veloce, la CI come unica regola che conta.
