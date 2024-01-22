// CONTROLLO SE HO COLLEGATO VUE TRAMITE CONSOLE
console.log("Vue ok", Vue);

// FACCIO IL DESTRUCTURING DEL METODO CREATEAPP DA VUE
const { createApp } = Vue;

// CREO L'APPLICAZIONE
const app = createApp({
    // DO IL NOME ALL'APPLICAZIONE
    name: "Vue Slider",
    // USO LA FUNZIONE (DATA) PER FARMI RESTITUIRE L'OGGETTO
    data() {
        // CREO L'OGGETTO
        return {
            // PREDO GLI ELEMENTI NELLA PAGE DATA
            places,
            // IMPOSTO IL CURRENT INDEX A 0 DI BASE
            currentIndex: 0,
            // FACCIO IN MODO DI FAR VEDERE DAPPERTUTTO AUTOPLAY DANDO UN VALORE INIZIALE
            autoplay: null,
        }
    },
    computed: {
        // FUNZIONI DI APPOGGIO PER NON RIPETERE IL CODICE

        // RICAVO L'INDICE DELL'ULTIMO ELEMENTO
        lastElementIndex() {
            return this.places.length - 1;
        },

        // CREO UNA FUNZIONE CHE MI DICE SE L'INDICE DELL'ELEMENTO CORRENTE E' UGUALE A 0
        isFirstIndex() {
            return this.currentIndex === 0;
        },

        //CREO UNA FUNZIONE CHE MI DICE SE L'INDICE DELL'ELEMENTO CORRENTE E'UGUALE ALL'INDICE DELL'ULTIMO ELEMENTO
        isLastIndex() {
            return this.currentIndex === this.lastElementIndex;
        }
    },

    methods: {
        // CREO UNA FUNZIONE CHE GESTISCA L'INDICE CORRENTE
        setCurrentIndex(target) {
            // SE IL TARGET DELLA FUNZIONE E' NEXT
            if (target === "next") {

                // SE L'INDICE CORRENTE E' UGUALE ALL'INDICE DELL' ULTIMO ELEMENTO, FACCIO TORNARE L'INDICE CORRENTE A 0
                if (this.isLastIndex) this.currentIndex = 0;

                // ALTRIMENTI INCREMENTO L'INDICE CORRENTE
                else this.currentIndex++;

                // INVECE SE IL TARGET DELLA FUNZIONE E' PREV
            } else if (target === "prev") {

                // SE L'INDICE CORRENTE E' UGUALE A 0 FACCIO TORNARE L'INDICE CORRENTE ALL'INDICE DELL'ULTIMO ELEMENTO
                if (this.isFirstIndex) this.currentIndex = this.lastElementIndex;

                // ALTRIMENTI DECREMENTO L'INDICE CORRENTE
                else this.currentIndex--;

                // ALTRIMENTI L'INDICE CORRENTE DIVENTA IL TARGET DELLA FUNZIONE
            } else {
                this.currentIndex = target;
            }
        },

        // CREO LA FUNZIONE CHE MI FERMA L'AUTOPLAY
        stopAutoplay() {
            clearInterval(this.autoplay);
        },

        // CREO LA FUNZIONE CHE MI FA PARTIRE UN AUTOPLAY
        startAutoplay() {
            this.autoplay = setInterval(() => {
                this.setCurrentIndex("next");
            }, 3000);
        },

        // CREO LA FUNZIONE CHE MI FA PARTIRE L'AUTOPLAY APPENA L'APP VIENE MONTATA
        mounted() {
            startAutoplay();
        }
    },

})

// MONTO L'APPLICAZIONE NELL'ELEMENTO SELEZIONATO TRA PARENTESI
app.mount("#root");
