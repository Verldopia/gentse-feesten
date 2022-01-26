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
            this.day = this.params.get('day')
        },
        cacheElements() {
            this.$randomEvents = document.querySelector('.random-events');
            this.$filter = document.querySelector('.filter-categories');
            this.$mainCategories = document.querySelector('.main-events__list');
            this.$mainEvents = document.querySelector('.main-events');
            this.$hamburger = document.querySelector('.hamburger-menu');
            this.$listView = document.querySelector('#list');
            this.$boxView = document.querySelector('#box');
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
                    this.generateRandomEvent(data)
                })
        },
        generateRandomEvent(events) {
            const singularDay = events.filter(ev => ev.day === this.day);
            const randomEvent = singularDay.map((ev) => {
                return `
                <div class="box-text--random">
                    <img src="${ev.image === null? '' : ev.image.full}" loading="lazy" alt="${ev.title}">
                    <span class="box-date--main">${ev.day_of_week[0]}${ev.day_of_week[1]} ${ev.day} Jul ${ev.start} u.</span>
                </div>
                <div class="box-text--main">
                    <a href="details.html?slug=${ev.slug}">${ev.title}</a>
                    <span>${ev.location}</span>
                </div>` 
            });
            this.$randomEvents.innerHTML = `<li class="random-event">${randomEvent[0]}</li>`
            this.$randomEvents.innerHTML += `<li class="random-event">${randomEvent[1]}</li>`
            this.$randomEvents.innerHTML += `<li class="random-event">${randomEvent[2]}</li>`
            
            this.generateHtmlPerCategory(singularDay);
            this.fetchCategoriesJSON();
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
                .then(data => {
                    this.generateCategories(data)
                    this.registerListeners(data)
                })
        },
        generateCategories(data) {
            this.listItem = data.map((cat) => `<li class="filter-btn" data-category="${cat}"><button>${cat}</button></li>`).join('');
            this.$filter.innerHTML = `<ul>${this.listItem}</ul>`;
        },
        generateHtmlPerCategory(data) {
            this.categoryItem = data.map((ev) => {
                return `
                <li class="main-event--item">
                    <div class="box-text--random">
                        <img src="${ev.image === null? '' : ev.image.full}" alt="${ev.title}">
                        <span class="box-date--main">${ev.day_of_week[0]}${ev.day_of_week[1]} ${ev.day} Jul ${ev.start} u.</span>
                    </div>
                    <div class="box-text--main">
                        <a href="details.html?slug=${ev.slug}">${ev.title}</a>
                        <span>${ev.location}</span>
                    </div>
                </li>` 
            }).join('')
            this.$mainCategories.innerHTML = `<ul class="main-events">${this.categoryItem}</ul>`
        },
        registerListeners() {
            this.$hamburger.addEventListener('click', this.listenerHamburger)
            this.$listView.addEventListener('click', this.toggleOn);
            this.$boxView.addEventListener('click', this.toggleOff);
        },
        listenerHamburger() {
            this.$hamburgerItems = document.querySelector('.hamburger-menu--items');
            this.$hamburgerItems.classList.toggle('hamburger-selected');
        },
        toggleOn() {
            this.$boxViewBtn = document.querySelector('.boxes');
            this.$listViewBtn = document.querySelector('.list');
            this.$listViewItem = document.querySelector('.main-events');
            this.$boxViewBtn.classList.remove('selected');
            this.$listViewBtn.classList.add('list-selected');
            this.$listViewItem.classList.add('list-selected--item');
        },
        toggleOff() {
            this.$boxViewBtn = document.querySelector('.boxes');
            this.$listViewBtn = document.querySelector('.list');
            this.$listViewItem = document.querySelector('.main-events');
            this.$boxViewBtn.classList.add('selected');
            this.$listViewBtn.classList.remove('list-selected');
            this.$listViewItem.classList.remove('list-selected--item');

        }
        }
    app.init()
})();