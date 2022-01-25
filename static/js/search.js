(() => {
    const app = {
        init() {
            this.cacheURLElements();
            this.cacheElements();
            this.generateUI();
            this.registerListeners();
        },
        cacheURLElements() {
            this.search = window.location.search;
            this.params = new URLSearchParams(this.search)
            this.search = this.params.get('search')
        },
        cacheElements() {
            this.$randomEvents = document.querySelector('.random-events');
            this.$filter = document.querySelector('.filter-categories');
            this.$mainCategories = document.querySelector('.main-events__list');
            this.$mainEvents = document.querySelector('.main-events');
            this.$hamburger = document.querySelector('.hamburger-menu');
        },
        generateUI() {
            this.fetchEventsJSON();
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
                .then(data => {
                    this.generateEvents(data)
                })
        },
        generateEvents(data) {
            this.filteredData = data.filter((ev) => {
                if (ev.title.toLowerCase().includes(this.search)) {
                    return `${ev.slug}`
                }
            })
            this.event = this.filteredData.map((ev) => {
                return `
                <div class="event">
                    <div class="box-image">
                        <p class="event-date">${ev.day_of_week}</p>
                    </div>
                    <div class="box-text">
                        <h3>${ev.title}</h3>
                        <p>${ev.description}</p>
                        <a href="#" class="event-arrow"></a>
                    </div>
                </div>` 
            }).join('');

            this.$mainEvents.innerHTML = this.event
        },
        registerListeners() {
            this.$hamburger.addEventListener('click', this.listenerHamburger)
        },
        listenerHamburger() {
            this.$hamburgerItems = document.querySelector('.hamburger-menu--items');
            this.$hamburgerItems.classList.toggle('hamburger-selected');
        },
        }
    app.init()
})();