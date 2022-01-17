(() => {
    const app = {
        init() {
            this.cacheURLElements();
            this.cacheElements();
            this.generateUI();
        },
        cacheURLElements() {
            this.search = window.location.search;
            this.params = new URLSearchParams(this.search)
            if (this.params.has('day')) {
                this.day = this.params.get('day')
            } else {
                window.alert('No day defined!')
            }
        },
        cacheElements() {
            this.$randomEvents = document.querySelector('.random-events');
            this.$filter = document.querySelector('.filter-categories');
        },
        generateUI() {
            this.fetchEventsJSON();
            this.fetchCategoriesJSON();
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
                .then(data => {
                    this.generateRandomEvent(data)
                    this.generateHtmlPerCategory(data)
                })
        },
        generateRandomEvent(events) {
            const singularDay = events.filter(ev => ev.day === this.day);
            const randomEvent = singularDay.map((ev) => {
                randomNumber = Math.floor(Math.random() * 17);
                return `
                <div class="box-text--random">
                    <img src="../static/media/images/main-random/random-(${++randomNumber}).jpg">
                    <span class="box-date--main">${ev.day_of_week[0]}${ev.day_of_week[1]} ${ev.day} Jul ${ev.start} u.</span>
                </div>
                <div class="box-text--main">
                    <h2>${ev.title}</h2>
                    <span>${ev.location}</span>
                </div>` 
            });
            // this.$randomEvents.innerHTML = `<ul class="random-event">${randomEvent[0]}</ul>`
            // this.$randomEvents.innerHTML += `<ul class="random-event">${randomEvent[1]}</ul>`
            // this.$randomEvents.innerHTML += `<ul class="random-event">${randomEvent[2]}</ul>`
        },
        async fetchCategoriesJSON() {
            await fetch(`https://www.pgm.gent/data/gentsefeesten/categories.json`, {
                method: 'GET'
            })
                .then(result => {
                    if (!result.ok) {
                        throw Error('ERROR! this JSON-file is not found!');
                    }
                    return result.json()
            })
                .then(data => this.generateCategories(data))
        },
        generateCategories(data) {
            this.listItem = data.map((cat) => `<li><button>${cat}</button></li>`).join('');
            this.$filter.innerHTML = `<ul>${this.listItem}</ul>`;
        },
        generateHtmlPerCategory(data) {
            console.log('hello')
        }
        }
    app.init()
})();