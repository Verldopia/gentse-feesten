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
            this.slug = this.params.get('slug')
        },
        cacheElements() {
            this.$mainEvents = document.querySelector('.main-events');
            this.$hamburger = document.querySelector('.hamburger-menu');
        },
        generateUI() {
            this.fetchEventsJSON();
            this.registerListeners();
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
                    this.generateEvent(data)
                })
        },
        generateEvent(events) {
            this.filteredData = events.filter((el) => {
                if (this.slug === el.slug) {
                    return el.slug
                }
            });
            ev = this.filteredData[0];
            this.categoryItem = `
                    <div class="box-text--img">
                        <img class="img-search" src="${ev.image === null? '' : ev.image.full}" alt="${ev.title}">
                        <span class="box-date--main box-date--search">${ev.day_of_week} ${ev.day} juli ${ev.start} tot ${ev.end} u.</span>
                    </div>
                    <div class="box-text--main">
                        <a href="details.html?slug=${ev.slug}">${ev.title}</a>
                        <span>Locatie: ${ev.location}</span>
                        <p>${ev.description === undefined ? 'Geen verdere info beschikbaar.' : ev.description}</p>
                        <p>Georganiseerd door ${ev.organizer}</p>
                    </div>`
            this.$mainEvents.innerHTML = this.categoryItem
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