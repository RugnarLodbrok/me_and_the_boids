class Boid {
    constructor() {
        this.pos = new sk.createVector(sk.random(sk.width), sk.random(sk.height));
        this.v = p5.Vector.random2D();
        this.v.setMag(sk.random(40, 70));
        // this.v = new sk.createVector(0, 10);
        // this.v.setMag(50);
        this.a = new sk.createVector(0, 0);
        this.sight_r = 60;
        this.align_c = 10;
        this.cohesion_c = 10;
        this.separation_c = 200;
    }

    * neighbours(boids) {
        for (let boid of boids) {
            if (boid === this) {
                continue;
            }
            let d = sk.dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
            if (d < this.sight_r)
                yield [boid, d];
        }
    }

    flock(boids) {
        let n = Array.from(this.neighbours(boids));
        this.a.mult(0);
        if (n.length) {
            this.a.add(this.align(n));
            this.a.add(this.cohesion(n));
            this.a.add(this.separation(n));
        }
    }

    align(boids) {
        let desired_delta_v = new sk.createVector();
        for (let [b, d] of boids)
            desired_delta_v.add(b.v);
        desired_delta_v.div(boids.length);
        desired_delta_v.sub(this.v);
        desired_delta_v.mult(this.align_c);
        return desired_delta_v;
    }

    cohesion(boids) {
        let desired_delta_x = new sk.createVector();
        for (let [b, d] of boids)
            desired_delta_x.add(b.pos);
        desired_delta_x.div(boids.length);
        desired_delta_x.sub(this.pos);
        desired_delta_x.mult(this.cohesion_c);
        return desired_delta_x;
    }

    separation(boids) {
        let steer = new sk.createVector();
        for (let [b, d] of boids) {
            if (!d) {
                continue
            }
            let p = p5.Vector.sub(this.pos, b.pos);
            p.div(d);
            steer.add(p);
        }
        steer.div(boids.length);
        steer.mult(this.separation_c);
        return steer;
    }


    update(dt) {
        let dx = p5.Vector.mult(this.v, dt);
        this.pos.add(dx);
        let dv = p5.Vector.mult(this.a, dt);
        this.v.add(dv);
        this.v.setMag(60);

        if (this.pos.x < 0)
            this.pos.x += sk.width;
        if (this.pos.x > sk.width)
            this.pos.x -= sk.width;
        if (this.pos.y < 0)
            this.pos.y += sk.height;
        if (this.pos.y > sk.height)
            this.pos.y -= sk.height;
    }

    draw() {
        sk.point(this.pos.x, this.pos.y);
    }
}
