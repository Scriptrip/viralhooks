// Sample package data (in a real application, this would come from a backend)
const packagesData = {
    "soundOnly": [
        {
            "id": 1,
            "package_id": "sound_ar_100",
            "name": "Mini Arabic Sound Package",
            "description": "100 Arabic sounds",
            "price": 1.99,
            "image": "images/100_soundd.png",
            "buy_link": "https://accept.paymobsolutions.com/standalone?ref=p_LRR2UGhBTjFWbnR4dDRPTTMzVnhPSGpFZz09X3loT2I1SUNaVjJQdHhuVWZQT2R0YUE9PQ"
        },
        {
            "id": 2,
            "package_id": "sound_en_100",
            "name": "Mini English Sound Package",
            "description": "100 English sounds",
            "price": 1.99,
            "image": "images/100_soundd.png",
            "buy_link": "https://accept.paymobsolutions.com/standalone?ref=p_LRR2ZlZJaVBXVExwOHE0cHF6djhHY1JTZz09X2RrNW9LTi9yWXZnaWlYMkdsYVJwbEE9PQ"
        }
    ],
    "videoOnly": [
        {
            "id": 4,
            "name": "Videos Premium Package",
            "description": "Up to 100 viral hooks",
            "price": 4.99,
            "image": "images/100_video.jpg",
            "buy_link": "https://accept.paymobsolutions.com/standalone?ref=p_LRR2a1luQWYrb2hrYVh6RGliWmlDNTZyQT09X3dVaGdNS2tkNkZRQ01CUitmYVVBV1E9PQ"
        },        {
            "id": 5,
            "name": "Videos Premium Package",
            "description": "Up to 1000 viral hooks",
            "price": 14.99,
            "image": "images/1000_video.jpg",
            "buy_link": "https://accept.paymobsolutions.com/standalone?ref=p_LRR2aWZpdFVTdGNEbEdTRlROTjhsc1N4UT09Xy9TbVRRK3FjNjc2b1d6eDlEdEJMNXc9PQ"
        
        }
    ],
    "mix": [
        {
            "id": 3,
            "name": "Mid Package",
            "description": "Random 100 videos and 200 sounds",
            "price": 4.99,
            "image": "images/mix_deal_100.png",
            "buy_link": "https://accept.paymobsolutions.com/standalone?ref=p_LRR2L0Z2MUJaMEtUUEpaSU05V1JhbFl1dz09X3FPQURYc2lrRWFPMkVIcDliMzBnWXc9PQ"
       
        },
        {
            "id": 6,
            "name": "Ultimate Package",
            "description": "Complete collection of 1000 viral video hooks & more than 3000 sounds multilingual",
            "price": 24.99,
            "image": "images/ultimate_mix.jpg",
            "buy_link": "https://accept.paymobsolutions.com/standalone?ref=p_LRR2S1gvT3RrdzlmcTRKM3Q4c3JoYkJ3Zz09X09nMWFFczNzaXVodHdZOXhsZHNnNnc9PQ"
        },
        {
            "id": 7,
            "name": "Custom Package",
            "description": "Customized collection including 1000 viral video hooks & 3000 multilingual sounds",
            "price": 55.99,
            "image": "images/ultimate-package.jpg"
        }
    ]
}

document.addEventListener('DOMContentLoaded', () => {
    displayPackages(packagesData);
});

function displayPackages(packages) {
    const container = document.createElement('div');
    container.className = 'packages-container';

    // Helper function to get tag class
    const getTagClass = (packageType) => {
        switch(packageType) {
            case 'soundOnly': return 'tag-sound';
            case 'videoOnly': return 'tag-video';
            case 'mix': return 'tag-mix';
            default: return '';
        }
    };

    // Helper function to get tag text
    const getTagText = (packageType) => {
        switch(packageType) {
            case 'soundOnly': return 'Sound Only';
            case 'videoOnly': return 'Video Only';
            case 'mix': return 'Sound & Video';
            default: return '';
        }
    };

    // Render all package types
    ['soundOnly', 'videoOnly', 'mix'].forEach(type => {
        packages[type].forEach(pkg => {
            // Ensure each package has a package_id
            if (!pkg.package_id) {
                pkg.package_id = `${type}_${pkg.id}`;
            }
            
            const card = document.createElement('div');
            card.className = 'package-card';
            card.innerHTML = `
                <span class="package-tag ${getTagClass(type)}">${getTagText(type)}</span>
                <img src="${pkg.image}" alt="${pkg.name}" class="package-image" 
                     onerror="this.src='images/placeholder.jpg'">
                <div class="package-content">
                    <h3 class="package-name">${pkg.name}</h3>
                    <p class="package-description">${pkg.description}</p>
                    <div class="package-price">
                        $${pkg.price.toFixed(2)}
                        <small>/one-time</small>
                    </div>
                    ${pkg.buy_link ? 
                        `<a href="#" onclick="handlePaymentRedirect('${pkg.package_id}', '${pkg.buy_link}')" class="buy-button">Buy Now</a>` :
                        `<button class="buy-button disabled" disabled>Coming Soon</button>`
                    }
                </div>
            `;
            container.appendChild(card);
        });
    });

    // Find the packages section and replace its content
    const packagesSection = document.querySelector('.packages-section');
    if (packagesSection) {
        packagesSection.innerHTML = ''; // Clear existing content
        packagesSection.appendChild(container);
    } else {
        console.error('Packages section not found in the DOM');
    }
}

function handlePaymentRedirect(packageId, buyLink) {
    // Store package ID before payment
    localStorage.setItem('current_package_id', packageId);
    
    // Log for debugging
    console.log('Storing package ID:', packageId);
    
    // Redirect to payment
    window.location.href = buyLink;
}

let currentlyPlaying = null;

document.addEventListener('DOMContentLoaded', function() {
    // Load Arabic sounds
    fetch('js/sounds_eg.json')
        .then(response => response.json())
        .then(data => {
            createSoundButtons(data, 'buttons');
        })
        .catch(error => console.error('Error loading Arabic sounds:', error));

    // Load English sounds
    fetch('js/sounds_eng.json')
        .then(response => response.json())
        .then(data => {
            createSoundButtons(data, 'buttons_eng');
        })
        .catch(error => console.error('Error loading English sounds:', error));

    // Add stop button functionality
    document.getElementById('stopButton').addEventListener('click', stopAllSounds);
});

function createSoundButtons(sounds, containerId) {
    const buttonsContainer = document.getElementById(containerId);
    
    sounds.forEach(sound => {
        const instantDiv = document.createElement('div');
        instantDiv.className = 'instant';
        
        instantDiv.innerHTML = `
            <div class="circle small-button-background" style="background-color:${getRandomColor()};"></div>
            <button class="small-button" title="Play ${sound.title}" type="button"></button>
            <div class="loader"></div>
            <div class="small-button-shadow"></div>
            <a href="#" class="instant-link">${sound.title}</a>
        `;
        
        const button = instantDiv.querySelector('.small-button');
        const audio = new Audio(sound.audio);
        
        audio.addEventListener('ended', () => {
            instantDiv.classList.remove('playing');
            currentlyPlaying = null;
        });

        button.addEventListener('click', () => {
            if (currentlyPlaying === audio) {
                stopAllSounds();
                return;
            }
            stopAllSounds();
            audio.play();
            instantDiv.classList.add('playing');
            currentlyPlaying = audio;
        });
        
        buttonsContainer.appendChild(instantDiv);
    });
}

function stopAllSounds() {
    document.querySelectorAll('.instant').forEach(instant => {
        instant.classList.remove('playing');
    });

    if (currentlyPlaying) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        currentlyPlaying = null;
    }
}

function getRandomColor() {
    // Use more vibrant colors similar to the image
    const colors = [
        '#00f2ff', // cyan
        '#ff00a0', // pink
        '#00ff2a', // green
        '#ff0055', // hot pink
        '#ffff00', // yellow
        '#7700ff', // purple
        '#ff00ff'  // magenta
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}