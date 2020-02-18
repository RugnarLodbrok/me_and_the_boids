let flock = [];
let sk;

new p5(function (sketch) {
    sk = sketch;
    sketch.setup = () => {
        sketch.createCanvas(800, 600);
        sketch.background(20);
        sketch.stroke(220);
        sketch.strokeWeight(8);
        sketch.fill(255);
        sketch.ellipseMode(sketch.CENTER);
        for (let i = 0; i < 100; ++i)
            flock.push(new Boid())

    };
    sketch.draw = () => {
        sketch.background(20);
        for (let boid of flock) {
            boid.flock(flock);
            boid.update(.015);
            boid.draw();
        }
    };
}, document.getElementById("sketch"));
