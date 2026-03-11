 // --- Configuration ---
        const loveMessage = `I am truly sorry for my actions and for the pain that I caused you. I know that what I did hurt you, and I deeply regret it. You did not deserve to feel that way because of me, and I take full responsibility for what happened.

Please know that hurting you was never my intention. Still, I understand that intentions do not erase the impact of my actions. I should have been more thoughtful and careful with my words and behavior. I realize now how important it is to value your feelings and treat you with the love and respect you deserve.

I want you to know that I am reflecting on my mistakes and learning from them. I promise to do better, to be more understanding, and to be someone who brings you happiness instead of pain. You mean so much to me, and losing your trust is something I truly regret.

I hope that in time you can find it in your heart to forgive me. I am willing to prove through my actions that I can change and become a better person. No matter what happens, I will always appreciate you and the moments we shared.

Once again, I am deeply sorry.
With All My Heart ❤️`;

        // --- Elements ---
        const bottle = document.getElementById('bottle');
        const cork = document.getElementById('cork');
        const letter = document.getElementById('letter');
        const typewriter = document.getElementById('typewriter');
        const instruction = document.getElementById('instruction');
        const closeBtn = document.getElementById('close-letter');
        const musicBtn = document.getElementById('music-btn');
        const starsContainer = document.getElementById('stars-container');

        // --- State ---
        let isOpen = false;
        let isTyping = false;
        let typingInterval;
        let audioStarted = false;
        let synth, loop;

        // --- Initialization ---
        
        // Generate Stars
        function createStars() {
            for(let i=0; i<100; i++) {
                const star = document.createElement('div');
                star.className = 'absolute bg-white rounded-full opacity-70 animate-pulse';
                const size = Math.random() * 3 + 1;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.top = `${Math.random() * 60}%`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.animationDuration = `${Math.random() * 3 + 2}s`;
                starsContainer.appendChild(star);
            }
        }
        createStars();

        // --- Audio (Tone.js) ---
        async function initAudio() {
            if (audioStarted) return;
            await Tone.start();
            
            // Create a dreamy synth
            synth = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: "sine" },
                envelope: { attack: 2, decay: 1, sustain: 0.5, release: 3 }
            }).toDestination();
            
            // Add some reverb for the "ocean/magical" feel
            const reverb = new Tone.Reverb({ decay: 5, wet: 0.5 }).toDestination();
            synth.connect(reverb);

            // Simple romantic chord progression loop
            const chords = [
                ["C4", "E4", "G4", "B4"], 
                ["F3", "A3", "C4", "E4"], 
                ["G3", "B3", "D4", "F4"], 
                ["C3", "G3", "B3", "E4"]
            ];
            
            let index = 0;
            loop = new Tone.Loop(time => {
                synth.triggerAttackRelease(chords[index], "4n", time);
                index = (index + 1) % chords.length;
            }, "2n");

            Tone.Transport.bpm.value = 60;
            audioStarted = true;
        }

        function toggleMusic() {
            if (!audioStarted) {
                initAudio().then(() => {
                    Tone.Transport.start();
                    loop.start(0);
                    musicBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>`;
                });
            } else {
                if (Tone.Transport.state === 'started') {
                    Tone.Transport.pause();
                    musicBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>`;
                } else {
                    Tone.Transport.start();
                    musicBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>`;
                }
            }
        }

        musicBtn.addEventListener('click', toggleMusic);

        // --- Particle Effects ---
        function createParticle(x, y, type) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            if (type === 'heart') {
                particle.innerHTML = '❤';
                particle.style.color = '#ff6b6b';
                particle.style.fontSize = Math.random() * 20 + 10 + 'px';
            } else if (type === 'sparkle') {
                particle.innerHTML = '✨';
                particle.style.fontSize = Math.random() * 15 + 5 + 'px';
            } else if (type === 'glow') {
                particle.style.width = '10px';
                particle.style.height = '10px';
                particle.style.background = 'radial-gradient(circle, #fff, transparent)';
                particle.style.borderRadius = '50%';
            }

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Randomize trajectory slightly
            const randomX = (Math.random() - 0.5) * 100;
            particle.style.transform = `translateX(${randomX}px)`;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 4000);
        }

        function burstParticles(x, y) {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const type = Math.random() > 0.5 ? 'heart' : (Math.random() > 0.5 ? 'sparkle' : 'glow');
                    createParticle(x + (Math.random() - 0.5) * 50, y + (Math.random() - 0.5) * 50, type);
                }, i * 50);
            }
        }

        // --- Typing Effect ---
        function typeMessage(text) {
            typewriter.innerHTML = '';
            let i = 0;
            isTyping = true;
            
            // Auto scroll to bottom as text appears
            letter.scrollTop = letter.scrollHeight;

            typingInterval = setInterval(() => {
                if (i < text.length) {
                    // Handle newlines
                    if (text.charAt(i) === '\n') {
                        typewriter.innerHTML += '<br>';
                    } else {
                        typewriter.innerHTML += text.charAt(i);
                    }
                    i++;
                    // Keep scrolling
                    letter.scrollTop = letter.scrollHeight;
                } else {
                    clearInterval(typingInterval);
                    isTyping = false;
                }
            }, 50); // Typing speed
        }

        // --- Interactions ---

        bottle.addEventListener('click', (e) => {
            if (isOpen) return;
            isOpen = true;

            // 1. Play sound effect if audio enabled
            if(audioStarted && synth) {
                synth.triggerAttackRelease(["C5", "E5", "G5", "C6"], "8n");
            }

            // 2. Animate Cork
            cork.classList.add('open');

            // 3. Get coordinates for particles
            const rect = bottle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // 4. Burst Particles
            burstParticles(centerX, centerY);

            // 5. Hide Instruction
            instruction.style.opacity = '0';

            // 6. Show Letter with delay
            setTimeout(() => {
                letter.classList.add('unroll');
                bottle.style.opacity = '0'; // Fade out bottle to focus on letter
                bottle.style.pointerEvents = 'none';
                
                // Start typing after unroll animation (approx 1s)
                setTimeout(() => {
                    typeMessage(loveMessage);
                }, 800);
            }, 600);
        });

        closeBtn.addEventListener('click', () => {
            // Reset
            letter.classList.remove('unroll');
            cork.classList.remove('open');
            bottle.style.opacity = '1';
            bottle.style.pointerEvents = 'auto';
            instruction.style.opacity = '1';
            typewriter.innerHTML = '';
            clearInterval(typingInterval);
            isOpen = false;
            isTyping = false;
        });

        // Ambient floating hearts
        setInterval(() => {
            if(!isOpen) {
                const x = Math.random() * window.innerWidth;
                const y = window.innerHeight;
                createParticle(x, y, 'heart');
            }
        }, 2000);
