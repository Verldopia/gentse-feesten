(() => {
    const app = {
        init() {
            this.cacheElements();
            this.generateUI();
        },
        cacheElements() {
            this.$background = document.querySelector('.header-box');
            this.$randomEvents = document.querySelector('.random-events')
        },
        generateUI() {
            this.generateRandomBackground();
            this.fetchEventsJSON();
        },
        generateRandomBackground() {
            randomNumber = Math.floor(Math.random() * 9);
            this.$background.style.backgroundImage = `url("static/media/images/background-images/Gentse-feesten-0${++randomNumber}.jpg")`;
        },
        async fetchEventsJSON() {
            await fetch(`https://www.pgm.gent/data/gentsefeesten/events_500.json`, {
                method: 'GET'
            })
                .then(result => {
                    if (!result.ok) {
                        throw Error('ERROR! this JSON-file is not found!');
                    }
                    return result.json()
            })
                .then(data => this.generateRandomEvent(data))
        },
        generateRandomEvent(events) {
            const randomEvent = events.map((event) => {
                randomNumber = Math.floor(Math.random() * 17);
                return `
                <div class="box-text--random">
                    <img src="static/media/images/main-random/random-(${++randomNumber}).jpg">
                    <span class="box-date--main">${event.day_of_week[0]}${event.day_of_week[1]} ${event.day} Jul ${event.start} u.</span>
                </div>
                <div class="box-text--main">
                    <h2>${event.title}</h2>
                    <span>${event.location}</span>
                </div>` 
            });
            randomNumber = Math.floor(Math.random() * events.length);
            this.eventHTML = randomEvent[randomNumber];
            this.$randomEvents.innerHTML = `<li class="random-event">${this.eventHTML}</li>`
            randomNumber = Math.floor(Math.random() * events.length);
            this.eventHTML = randomEvent[randomNumber];
            this.$randomEvents.innerHTML += `<li class="random-event">${this.eventHTML}</li>`
            randomNumber = Math.floor(Math.random() * events.length);
            this.eventHTML = randomEvent[randomNumber];
            this.$randomEvents.innerHTML += `<li class="random-event">${this.eventHTML}</li>`
        },

        }
    app.init()
})();