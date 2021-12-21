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
            this.$background.style.backgroundImage = `url('static/media/images/background-images/Gentse-feesten-0${++randomNumber}.jpg')`;
        },
        async fetchEventsJSON() {
            await fetch("static/data/events.json", {
                headers: {
                    'Content-Type': 'application/json'
                }
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
        //         randomNumber = Math.floor(Math.random() * users.length);
        //         this.eventHTML = users.map((user) => {
        //             return `<li>${user.title}</li>`
        //         }).join('')
        //         console.log(this.eventHTML);
        //         this.$randomEvents.innerHTML = `<ul>${this.eventHTML}</ul>`

        }         
        }
    app.init()
})();