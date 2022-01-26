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
            await fetch(`https://www.pgm.gent/data/gentsefeesten/events.json`, {
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
            const randomEvent = events.map((ev) => {
                randomNumber = Math.floor(Math.random() * 17);
                return `
                <div class="box-text--random">
                    <img src="${ev.image === null? '' : ev.image.full}" alt="${ev.title}">
                    <span class="box-date--main">${ev.day_of_week[0]}${ev.day_of_week[1]} ${ev.day} Jul ${ev.start} u.</span>
                </div>
                <div class="box-text--main" id="${ev.id}">
                    <a href="events/details.html?slug=${ev.slug}">${ev.title}</a>
                    <span>${ev.location}</span>
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
                return `
                <div class="event" id="${ev.id}">
                    <div class="box-image">
                        <img src="https://www.pgm.gent/data/gentsefeesten/${ev.picture.medium}" alt="${ev.title}">
                        <p class="event-date">08/07</p>
                    </div>
                    <div class="box-text">
                        <a href="events/details.html?slug=${ev.id}">${ev.title}</a>
                        <p>${ev.synopsis}</p>
                        <a href="#" class="event-arrow"></a>
                    </div>
                </div>`
            }).join('');

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