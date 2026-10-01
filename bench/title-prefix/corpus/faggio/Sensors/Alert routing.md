Gli avvisi partono dai sensori degli edifici e arrivano al gateway MQTT di ogni sede.
Adesso vanno tutti nella stessa casella senza alcun raggruppamento: un piano che resta senza rete produce centinaia di messaggi.
Proposta: raggruppare per edificio in finestre di 5 minuti e aprire una sola segnalazione, con l'elenco dei messaggi allegato.
