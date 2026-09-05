/* ============================================================
   D.A.B.s.y STATE MACHINE
   ============================================================ */

window.DABSy = window.DABSy || {};

DABSy.State = (() => {

  const states = {
    IDLE: "IDLE",
    LISTENING: "LISTENING",
    THINKING: "THINKING",
    SPEAKING: "SPEAKING",

    CURIOUS: "CURIOUS",
    HAPPY: "HAPPY",
    FOCUSED: "FOCUSED",
    SLEEPY: "SLEEPY",
    SURPRISED: "SURPRISED",
    CONCERNED: "CONCERNED",
    PLAYFUL: "PLAYFUL",

    STUDY_FOCUS: "STUDY_FOCUS",
    EXPLAINING: "EXPLAINING"
  };


  let current = states.IDLE;


  const transitions = {

    IDLE: [
      "LISTENING",
      "CURIOUS",
      "PLAYFUL",
      "STUDY_FOCUS",
      "SLEEPY"
    ],

    LISTENING: [
      "THINKING",
      "IDLE",
      "SURPRISED"
    ],

    THINKING: [
      "SPEAKING",
      "CURIOUS",
      "CONCERNED",
      "IDLE"
    ],

    SPEAKING: [
      "IDLE",
      "HAPPY",
      "FOCUSED",
      "CONCERNED"
    ],

    CURIOUS: [
      "IDLE",
      "LISTENING",
      "THINKING"
    ],

    HAPPY: [
      "IDLE",
      "SPEAKING"
    ],

    FOCUSED: [
      "IDLE",
      "THINKING",
      "SPEAKING"
    ],

    SLEEPY: [
      "IDLE",
      "LISTENING"
    ],

    SURPRISED: [
      "IDLE",
      "CURIOUS"
    ],

    CONCERNED: [
      "THINKING",
      "SPEAKING",
      "IDLE"
    ],

    PLAYFUL: [
      "IDLE",
      "LISTENING",
      "HAPPY"
    ],

    STUDY_FOCUS: [
      "THINKING",
      "EXPLAINING",
      "IDLE"
    ],

    EXPLAINING: [
      "STUDY_FOCUS",
      "SPEAKING",
      "IDLE"
    ]

  };


  function enter(next) {

    if (!states[next]) return false;

    if (
      current !== next &&
      !transitions[current]?.includes(next)
    ) {
      return false;
    }

    current = next;

    const expression =
      stateExpression(next);

    DABSy.Expression.apply(
      expression
    );

    document.dispatchEvent(
      new CustomEvent(
        "dabsy:state",
        {
          detail: {
            state: next
          }
        }
      )
    );

    return true;

  }


  function force(next) {

    if (!states[next]) return;

    current = next;

    DABSy.Expression.apply(
      stateExpression(next)
    );

  }


  function stateExpression(state) {

    const map = {
      IDLE: "neutral",
      LISTENING: "listening",
      THINKING: "thinking",
      SPEAKING: "focused",
      CURIOUS: "curious",
      HAPPY: "happy",
      FOCUSED: "focused",
      SLEEPY: "sleepy",
      SURPRISED: "surprised",
      CONCERNED: "concerned",
      PLAYFUL: "playful",
      STUDY_FOCUS: "focused",
      EXPLAINING: "focused"
    };

    return map[state] || "neutral";

  }


  return {
    states,
    enter,
    force,

    get current() {
      return current;
    }
  };

})();
