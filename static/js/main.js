(() => {
    const app = {
        init() {
            this.cacheElements();
            this.generateUI();
        },
        cacheElements() {
            this.$background = document.querySelector('.header-box');
            this.$randomEvents = document.querySelector('.random-events');
            this.$mainEvents = document.querySelector('.main-events');
            this.$hamburger = document.querySelector('.hamburger-menu');
        },
        generateUI() {
            this.generateRandomBackground();
            this.fetchEventsJSON();
            this.fetchNewsJSON();
            this.registerListeners();
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
                const images = event.image
                for (const img in images) {
                    // console.log(event.image)
                return `
                <div class="box-text--random">
                    <img src="${event.image === null ? "No image found!" : images.full}">
                    <span class="box-date--main">${event.day_of_week[0]}${event.day_of_week[1]} ${event.day} Jul ${event.start} u.</span>
                </div>
                <div class="box-text--main">
                    <h2>${event.title}</h2>
                    <span>${event.location}</span>
                </div>` 
            }});
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
        async fetchNewsJSON() {
            await fetch(`https://www.pgm.gent/data/gentsefeesten/news.json`, {
                method: 'GET'
            })
                .then(result => {
                    if (!result.ok) {
                        throw Error('ERROR! this JSON-file is not found!');
                    }
                    return result.json()
            })
                .then(data => {
                    this.generateEvent(data)
                })
        },
        generateEvent(events) {
            const mainEvents = events.slice(0,3).map((ev) => {
                const images = ev.picture;
                for (const img in images) {
                return `
                <div class="event">
                    <div class="box-image">
                        <img src="https://www.pgm.gent/data/gentsefeesten/${images.medium}" alt="${ev.title}">
                        <p class="event-date">08/07</p>
                    </div>
                    <div class="box-text">
                        <h3>${ev.title}</h3>
                        <p>${ev.synopsis}</p>
                        <a href="#" class="event-arrow"></a>
                    </div>
                </div>`
            }}).join('');

            this.$mainEvents.innerHTML = mainEvents;
        },
        registerListeners() {
            this.$hamburger.addEventListener('click', this.listener)
        },
        listener() {
            this.$hamburgerItems = document.querySelector('.hamburger-menu--items');
            this.$hamburgerItems.classList.toggle('hamburger-selected');
        }
        }
    app.init()
})();