/* ============================================================
   D.A.B.s.y EXPRESSION ENGINE
   ============================================================ */

window.DABSy = window.DABSy || {};

DABSy.Expression = (() => {

  const world =
    document.getElementById("dabsyWorld");

  const expressions = {

    neutral: {
      gazeX: 0,
      gazeY: 0,
      focusX: 0,
      focusY: 0,
      scale: 1,
      energy: 0.78
    },

    curious: {
      gazeX: 12,
      gazeY: -4,
      focusX: 4,
      focusY: -2,
      scale: 1.04,
      energy: 0.9
    },

    happy: {
      gazeX: 0,
      gazeY: -2,
      focusX: 0,
      focusY: -2,
      scale: 1.015,
      energy: 1
    },

    excited: {
      gazeX: 0,
      gazeY: 0,
      focusX: 0,
      focusY: 0,
      scale: 1.09,
      energy: 1
    },

    thinking: {
      gazeX: -9,
      gazeY: -5,
      focusX: -4,
      focusY: -3,
      scale: 0.98,
      energy: 0.65
    },

    focused: {
      gazeX: 0,
      gazeY: 2,
      focusX: 0,
      focusY: 3,
      scale: 0.96,
      energy: 0.86
    },

    sleepy: {
      gazeX: 0,
      gazeY: 5,
      focusX: 0,
      focusY: 7,
      scale: 0.92,
      energy: 0.42
    },

    surprised: {
      gazeX: 0,
      gazeY: -5,
      focusX: 0,
      focusY: -5,
      scale: 1.12,
      energy: 1
    },

    concerned: {
      gazeX: -4,
      gazeY: 3,
      focusX: -3,
      focusY: 3,
      scale: 0.97,
      energy: 0.7
    },

    playful: {
      gazeX: 15,
      gazeY: -5,
      focusX: 7,
      focusY: -4,
      scale: 1.035,
      energy: 0.95
    },

    listening: {
      gazeX: 0,
      gazeY: 0,
      focusX: 0,
      focusY: 0,
      scale: 1.02,
      energy: 1
    }

  };


  let current = "neutral";


  function apply(name) {

    const expression =
      expressions[name] ||
      expressions.neutral;

    current = name;

    DABSy.Motion.set(
      "gazeX",
      expression.gazeX,
      {
        stiffness: 190,
        damping: 23,
        mass: 0.75
      }
    );

    DABSy.Motion.set(
      "gazeY",
      expression.gazeY,
      {
        stiffness: 190,
        damping: 23,
        mass: 0.75
      }
    );

    DABSy.Motion.set(
      "focusX",
      expression.focusX,
      {
        stiffness: 220,
        damping: 25,
        mass: 0.7
      }
    );

    DABSy.Motion.set(
      "focusY",
      expression.focusY,
      {
        stiffness: 220,
        damping: 25,
        mass: 0.7
      }
    );

    DABSy.Motion.set(
      "faceScale",
      expression.scale,
      {
        stiffness: 150,
        damping: 20,
        mass: 0.8
      }
    );

    DABSy.Motion.set(
      "energy",
      expression.energy,
      {
        stiffness: 120,
        damping: 18,
        mass: 1
      }
    );

    world.classList.remove(
      ...[
        "is-listening",
        "is-thinking",
        "is-speaking",
        "is-curious",
        "is-happy",
        "is-sleepy",
        "is-surprised"
      ]
    );

    if (name !== "neutral") {
      world.classList.add(
        `is-${name}`
      );
    }

  }


  function blink(type = "normal") {

    world.classList.add("blinking");

    const duration =
      type === "slow"
        ? 330
        : type === "quick"
          ? 95
          : 145;

    setTimeout(() => {
      world.classList.remove("blinking");
    }, duration);

  }


  function lookAt(x, y) {

    DABSy.Motion.set(
      "gazeX",
      x,
      {
        stiffness: 260,
        damping: 26,
        mass: 0.65
      }
    );

    DABSy.Motion.set(
      "gazeY",
      y,
      {
        stiffness: 260,
        damping: 26,
        mass: 0.65
      }
    );

  }


  return {
    apply,
    blink,
    lookAt,

    get current() {
      return current;
    }
  };

})();
