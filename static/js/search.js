(() => {
    const app = {
        init() {
            this.cacheURLElements();
            this.cacheElements();
            this.generateUI();
        },
        cacheURLElements() {
            this.searched = window.location.search;
            this.params = new URLSearchParams(this.searched);
            this.search = this.params.get('search');
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
                    this.generateEvents(data)
                })
        },
        generateEvents(data) {
            this.filteredData = data.filter((ev) => {
                if (ev.title.toLowerCase().includes(this.search) && ev) {
                    return ev
                }
            })
            
            this.event = this.filteredData.map((ev) => {
                return `
                <div class="event">
                    <div class="box-image">
                        <img src="${ev.image === null? '' : ev.image.full}" alt="${ev.title}">
                        <p class="event-date">${ev.day_of_week}</p>
                    </div>
                    <div class="box-text">
                        <a href="details.html?slug=${ev.slug}">${ev.title}</a>
                        <p>${ev.category.join(' / ')}</p>
                        <a class="event-arrow"></a>
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