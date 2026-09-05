/* ============================================================
   D.A.B.s.y MOTION ENGINE
   Spring-based physical movement.
   ============================================================ */

window.DABSy = window.DABSy || {};

DABSy.Motion = (() => {

  const values = new Map();
  const targets = new Map();
  const velocities = new Map();

  const springs = new Map();

  let running = false;

  function define(name, value = 0, config = {}) {

    values.set(name, value);
    targets.set(name, value);
    velocities.set(name, 0);

    springs.set(name, {
      stiffness: config.stiffness ?? 180,
      damping: config.damping ?? 22,
      mass: config.mass ?? 0.8
    });

  }


  function set(name, target, config = {}) {

    if (!values.has(name)) {
      define(name, target, config);
    }

    targets.set(name, target);

    if (config.stiffness ||
        config.damping ||
        config.mass) {

      springs.set(name, {
        ...springs.get(name),
        ...config
      });

    }

    start();

  }


  function get(name) {
    return values.get(name) ?? 0;
  }


  function update(dt) {

    let active = false;

    for (const [name, current] of values) {

      const target = targets.get(name);
      const velocity = velocities.get(name);
      const spring = springs.get(name);

      const displacement =
        target - current;

      const force =
        displacement * spring.stiffness;

      const damping =
        velocity * spring.damping;

      const acceleration =
        (force - damping) / spring.mass;

      let nextVelocity =
        velocity + acceleration * dt;

      let nextValue =
        current + nextVelocity * dt;

      if (
        Math.abs(displacement) < 0.001 &&
        Math.abs(nextVelocity) < 0.001
      ) {

        nextValue = target;
        nextVelocity = 0;

      } else {

        active = true;

      }

      values.set(name, nextValue);
      velocities.set(name, nextVelocity);

    }

    return active;

  }


  function frame(time) {

    const dt =
      Math.min(
        0.032,
        (time - (frame.last || time)) / 1000
      );

    frame.last = time;

    const active = update(dt);

    DABSy.Motion.onFrame?.(
      Object.fromEntries(values)
    );

    if (active) {
      requestAnimationFrame(frame);
    } else {
      running = false;
      frame.last = null;
    }

  }


  function start() {

    if (running) return;

    running = true;

    requestAnimationFrame(frame);

  }


  return {
    define,
    set,
    get,

    start,

    onFrame: null
  };

})();
