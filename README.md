This project doubles up as a fun Flappy bird clone and a genetic algorithm demo. It was one of my 6th semester's goals to finish this. But due to the unexpectedly hectic conditions, I had to leave it midway. Finding some time in the COVID-19 lockdown, I finally managed to finish it 🔥🔥.

And since today is May 4, I have technically finished it before my original deadline 😅(May 15; the final day of the semester).

Running
---
To run the project you need to setup a local server. You can try using Python 3's bundled one. Simply do `python -m http.server`. Follow the displayed link and you're done :)

Since GAs incorporate randomness at their core, results may vary everytime you run the demo. In worst cases, I've seen birds failing to navigate >4 pipes after 40 generations. In the best case, I've seen a "perfect" bird after just 23 generations. If you feel that the birds are progressing very slowly, it may be worth it to start again(`Ctrl+Shift+R`).

How it works??
---
Each bird has a brain which tells it whether to flap or not given its current situation. Brains are small neural nets. The GA is used to optimize the net's parameters to enable the birds to stay airborne for a longer duration.

Tweaking stuff
---
One of the design goals I had was to make this thing as customizable as possible. So, each part of the code makes minimal assumptions about the other parts and each part is replaceable. As a result, it is pretty easy to customize nearly anything:
* gravity
* bird's speed
* pipe's sizes and positions
    * Go to `src/pipe-generator.js`. There are no assumptions(like each pipe having a fixed gap or fixed separation from the next pipe). This gives you great flexibility. 
* method of controlling the bird
    * Just add a new `Controller` class. Look in `src/controller.js` for examples.
* neural net
* GA
    * Go to `src/evolver.js`. All the GA code is present there.

Pending work
---
I was focussed on getting the GA demo onto the screen. So, it meant that I took some things "lite".
- [ ] Improve mate selection and population composition
- [ ] Allow persisting a neural net to a downloadable file 
- [ ] Allow user to choose b/w the game and the demo
- [ ] Allow user to speed up the demo
- [ ] Display basic info(like generation number, current max fitness etc) in a GUI
