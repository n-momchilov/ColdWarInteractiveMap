document.addEventListener('DOMContentLoaded', function() {
    let currentStop = 0;
    
    const tourStops = [
        { element: '#event2', info: 'Start of Cold War - The beginning of a major global conflict.', link: 'https://www.britannica.com/event/Cold-War' },
        { element: '#event4', info: 'NATO - Formation of a military alliance in Western Europe.', link: 'https://www.youtube.com/embed/8MQ59Ij5fkM' },
        { element: '#event3', info: 'Warsaw Pact - Formation of a military alliance in Eastern Europe.', link: 'https://www.youtube.com/embed/-OMvRNFTrbM' },
        { element: '#event1', info: 'Cuban Missile Crisis - A pivotal incident in the Cold War.', link: 'https://www.youtube.com/watch?v=XbKCyQn5oTc' }
    ];

    function startTour() {
        goToStop(currentStop);
    }

    function nextStop() {
        if (currentStop < tourStops.length - 1) {
            currentStop++;
            goToStop(currentStop);
        } else {
            endTour();
        }
    }

    function goToStop(stopIndex) {
        clearActiveCircles();
        const stop = tourStops[stopIndex];
        const eventCircle = document.querySelector(stop.element);
        eventCircle.classList.add('active');
        let infoBox = document.createElement('div');
        infoBox.className = 'info-box';
        infoBox.style.cssText = 'position: absolute; background-color: black; color: white; padding: 10px; border-radius: 5px; left: 100%; margin-left: 10px; top: 50%; transform: translateY(-50%);';
        infoBox.textContent = stop.info;
        eventCircle.appendChild(infoBox);
        eventCircle.addEventListener('click', nextStop);
    }

    function clearActiveCircles() {
        const activeCircles = document.querySelectorAll('.circle.active .info-box');
        activeCircles.forEach(box => box.parentNode.removeChild(box));
        document.querySelectorAll('.circle.active').forEach(circle => circle.classList.remove('active'));
    }

    function endTour() {
        clearActiveCircles();
        tourHasEnded = true;
    }

    let tourHasEnded = false;

    const timeline = document.getElementById('mapContainer');
    const events = [
        { id: 'event1', year: 1962, info: 'Cuban Missile Crisis', link: 'https://www.youtube.com/watch?v=XbKCyQn5oTc', x: 38, y: 44 },
        { id: 'event2', year: 1945, info: 'Start of Cold War', link: 'https://www.britannica.com/event/Cold-War', x: 50, y: 30 },
        { id: 'event3', year: 1947, info: 'Warsaw Pact', link: 'https://www.youtube.com/embed/-OMvRNFTrbM', x: 55, y: 25 },
        { id: 'event4', year: 1947, info: 'NATO', link: 'https://www.youtube.com/embed/8MQ59Ij5fkM', x: 35, y: 35 }
    ];

    events.forEach(event => {
        const circle = document.createElement('div');
        circle.id = event.id;
        circle.className = 'circle';
        if (event.id === 'event4') { // Adding specific class for NATO circle
            circle.classList.add('nato-circle');
        }
        circle.style.cssText = `position: absolute; left: ${event.x}%; top: ${event.y}%;`;
        circle.innerHTML = `<span>${event.info}</span>`;
        circle.addEventListener('click', function() {
            if (tourHasEnded) {
                window.open(event.link);
            }
        });
        timeline.appendChild(circle);
    });

    // Start the tour on initial event click
    document.getElementById('event2').addEventListener('click', function() {
        this.classList.remove('flashing');
        if (!tourHasEnded) {
            startTour();
        }
    });

    document.getElementById('event2').classList.add('flashing');










    // Video popup controls
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const leftVideo = document.getElementById('leftVideo');
    const rightVideo = document.getElementById('rightVideo');

    leftButton.addEventListener('click', function () {
        leftVideo.style.display = (leftVideo.style.display === 'none' || !leftVideo.style.display) ? 'block' : 'none';
        rightVideo.style.display = 'none';  // Close right video if open
    });

    rightButton.addEventListener('click', function () {
        rightVideo.style.display = (rightVideo.style.display === 'none' || !rightVideo.style.display) ? 'block' : 'none';
        leftVideo.style.display = 'none';  // Close left video if open
    });

    // Setup video close buttons
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.parentElement.style.display = 'none';
        });
    });

    // Year slider interaction to show or hide events based on the year
    const yearSlider = document.getElementById('yearSlider');
    const selectedYear = document.getElementById('selectedYear');
    yearSlider.addEventListener('input', function () {
        selectedYear.textContent = this.value;
        events.forEach(event => {
            const eventElement = document.getElementById(event.id);
            eventElement.style.display = parseInt(this.value) >= event.year ? 'block' : 'none';
        });
    });
});
