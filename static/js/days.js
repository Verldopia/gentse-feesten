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
            this.$mainCategories = document.querySelector('.main-events__list');
        },
        generateUI() {
            this.fetchEventsJSON();
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
                    this.generateListeners(data)
                    this.fetchCategoriesJSON(data)
                })
        },
        generateRandomEvent(events) {
            const singularDay = events.filter(ev => ev.day === this.day);
            this.generateHtmlPerCategory(singularDay)
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
            this.$randomEvents.innerHTML = `<li class="random-event">${randomEvent[0]}</li>`
            this.$randomEvents.innerHTML += `<li class="random-event">${randomEvent[1]}</li>`
            this.$randomEvents.innerHTML += `<li class="random-event">${randomEvent[2]}</li>`
        },
        async fetchCategoriesJSON(singularDay) {
            await fetch(`https://www.pgm.gent/data/gentsefeesten/categories.json`, {
                method: 'GET'
            })
                .then(result => {
                    if (!result.ok) {
                        throw Error('ERROR! this JSON-file is not found!');
                    }
                    return result.json()
            })
                .then(data => {
                    this.generateCategories(data)
                })
        },
        generateCategories(data) {
            this.listItem = data.map((cat) => `<li class="filter-btn" data-category="${cat}"><button>${cat}</button></li>`).join('');
            this.$filter.innerHTML = `<ul>${this.listItem}</ul>`;
        },
        generateListeners(event) {
            this.$filterBtn = document.querySelectorAll('.filter-btn');
            for (const button of this.$filterBtn) {
                button.addEventListener("click", this.clickListener);
            }
        },
        generateHtmlPerCategory(data) {
            console.log(data)
            this.categoryItem = data.map((ev) => {
                return `
                <li class="main-event--item">
                    <div class="box-text--random">
                        <img src="../static/media/images/main-random/random-(1).jpg">
                        <span class="box-date--main">${ev.day_of_week[0]}${ev.day_of_week[1]} ${ev.day} Jul ${ev.start} u.</span>
                    </div>
                    <div class="box-text--main">
                        <h2>${ev.title}</h2>
                        <span>${ev.location}</span>
                    </div>
                </li>` 
            }).join('')
            this.$mainCategories.innerHTML = `<ul class="main-events">${this.categoryItem}</ul>`
            

        },
        clickListener() {
            console.log('clicks!')
        }
        }
    app.init()
})();