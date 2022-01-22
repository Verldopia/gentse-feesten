(() => {
    const app = {
        init() {
            this.cacheElements();
            this.generateUI();
        },
        cacheElements() {
            this.$mainEvents = document.querySelector('.main-events');
            this.$mainEvents = document.querySelector('.main-events');
            this.$hamburger = document.querySelector('.hamburger-menu');
        },
        generateUI() {
            this.fetchNewsJSON();
            this.registerListeners();
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
            console.log(events)
            const mainEvents = events.map((ev) => {
                const images = ev.picture
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