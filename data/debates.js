// Logos debates: steelmanned positions, arguments, objections and replies.
// books / research = ids from data/books.js and data/research.js
window.LOGOS_DEBATES = [
  {
    id: "free-will",
    title: "Do we have free will?",
    topics: ["Free will", "Mind", "Ethics"],
    hook: "Every choice you make might have been fixed before you were born. If so, can you be blamed for anything?",
    setup: "Determinism says every event, including your choices, is the result of earlier causes plus the laws of nature. The question is whether that leaves any room for freedom and moral responsibility.",
    positions: [
      { name: "Hard determinism", thesis: "Determinism is true and it rules out free will. Nobody truly deserves praise or blame.",
        thinkers: ["Spinoza (close to it)", "Paul Holbach", "Derek Pereboom (hard incompatibilism)"],
        arguments: [
          { claim: "The consequence argument", detail: "You didn't choose the past or the laws of nature. If those determine your choices, then your choices are consequences of things outside your control." },
          { claim: "The brain is a physical system", detail: "Your decisions are neurons firing according to physics. There is no extra 'you' that steps outside the causal chain." },
          { claim: "Better ethics without it", detail: "Dropping deserved blame makes us more compassionate: punishment becomes about protection and rehabilitation, not revenge." }
        ],
        objections: [
          { objection: "You can't live this way. Deliberating already assumes your choice is open.", reply: "Feeling free doesn't make it so. We also feel the Earth is still." },
          { objection: "If no one is responsible, why argue for anything? You're trying to change my mind as if I could choose.", reply: "Arguments are causes too. Reasons can determine beliefs without any freedom beyond causation." }
        ] },
      { name: "Compatibilism", thesis: "Free will and determinism fit together. Being free means acting from your own reasons without coercion, not escaping causation.",
        thinkers: ["Hobbes", "Hume", "Daniel Dennett", "Harry Frankfurt"],
        arguments: [
          { claim: "This is what freedom means in real life", detail: "When we ask 'did she do it freely?' we mean: was she forced, drugged, threatened? Not: did she escape physics?" },
          { claim: "Randomness wouldn't help", detail: "If your choices were uncaused, they'd be random, and random isn't free either. Freedom needs choices caused by you." },
          { claim: "Frankfurt cases", detail: "Imagine someone who would have forced you to choose X, but you choose X on your own. You couldn't have done otherwise, yet you seem responsible." }
        ],
        objections: [
          { objection: "It's a word trick. You've just redefined 'free' to mean something weaker.", reply: "The 'stronger' sense might be incoherent anyway. Compatibilism describes the freedom worth wanting." },
          { objection: "The manipulation argument: a person programmed by neuroscientists to reason 'normally' doesn't seem free. How is ordinary determinism different?", reply: "Some compatibilists bite the bullet; others say history matters. This is the weakest spot, so press here." }
        ] },
      { name: "Libertarian free will", thesis: "Determinism is false, at least for human choices. We are genuinely the originators of our actions.",
        thinkers: ["Kant (in a sense)", "Thomas Reid", "Robert Kane", "Roderick Chisholm"],
        arguments: [
          { claim: "Direct experience", detail: "In deliberation I experience multiple options as really open. That's evidence, and it needs overwhelming counter-evidence to overturn." },
          { claim: "Moral responsibility requires it", detail: "Deep desert, real blame and real praise, only make sense if we could have done otherwise." },
          { claim: "Physics isn't deterministic anyway", detail: "Quantum mechanics suggests the universe is not strictly deterministic, so the door isn't closed." }
        ],
        objections: [
          { objection: "Quantum randomness gives luck, not control.", reply: "Kane: indeterminism during hard choices is where effort happens. You make it yours by trying." },
          { objection: "Where's this 'agent cause' in the brain? It looks like magic.", reply: "Agent causation is unusual but not incoherent. Consciousness itself is unexplained." }
        ] }
    ],
    sharpen: [
      "Think of the worst thing you've done. Do you deserve blame for it, or just to learn from it?",
      "If a perfect brain scan predicted your next choice, would that make it any less yours?",
      "Would you want to live in a society with no retributive punishment at all?",
      "Is 'could have done otherwise' really required for responsibility? Test it with a Frankfurt case."
    ],
    books: ["hume-enquiry", "spinoza-ethics", "boethius-consolation", "epictetus-enchiridion"],
    research: ["sep-freewill", "sep-compatibilism", "iep-freewill"]
  },
  {
    id: "god",
    title: "Does God exist?",
    topics: ["God", "Religion", "Metaphysics"],
    hook: "Billions of people say yes, billions say no. Can reason settle it, or does it come down to faith?",
    setup: "Here 'God' means the classical God: all-powerful, all-knowing, perfectly good, creator of everything. The debate is about arguments, not about which religion is right.",
    positions: [
      { name: "Theism", thesis: "There are good reasons to believe God exists.",
        thinkers: ["Anselm", "Aquinas", "Leibniz", "Richard Swinburne"],
        arguments: [
          { claim: "Cosmological argument", detail: "Everything contingent needs an explanation. The universe is contingent. So something necessary must explain it: God." },
          { claim: "Fine-tuning", detail: "Physical constants fall in a tiny range that allows life. Design explains this better than chance." },
          { claim: "Moral argument", detail: "If objective moral truths exist, they need a foundation. God is the best one." },
          { claim: "Religious experience", detail: "Millions report experiencing God. We usually trust experience unless we have reason not to." }
        ],
        objections: [
          { objection: "What caused God? If God needs no cause, maybe the universe doesn't either.", reply: "The argument is about contingent things. God is defined as necessary, the universe doesn't seem to be." },
          { objection: "Fine-tuning could be explained by a multiverse.", reply: "A multiverse is also unobserved, and needs fine-tuned laws of its own." }
        ] },
      { name: "Atheism", thesis: "God does not exist, or at least the evidence strongly points against it.",
        thinkers: ["Hume (skeptic)", "Nietzsche", "Bertrand Russell", "J. L. Mackie"],
        arguments: [
          { claim: "The problem of evil", detail: "A perfectly good and all-powerful God would prevent pointless suffering. There is pointless suffering (a fawn burning slowly in a forest fire). So no such God." },
          { claim: "Divine hiddenness", detail: "A loving God would make itself clear to people open to it. Many sincere seekers find nothing." },
          { claim: "Simplicity", detail: "Science explains more and more without God. The God hypothesis adds a huge, unexplained being." }
        ],
        objections: [
          { objection: "Free will defense: a world with free creatures who can do evil is better than robots.", reply: "Maybe for moral evil, but earthquakes and diseases aren't caused by free choices." },
          { objection: "We can't see the whole picture. Evil we find pointless might serve a purpose we can't grasp (skeptical theism).", reply: "Then we also can't judge that the world looks designed or good. The skepticism cuts both ways." }
        ] },
      { name: "Agnosticism / fideism", thesis: "Reason can't settle it. Either suspend judgment, or believe by faith without proof.",
        thinkers: ["Kant", "Kierkegaard", "Pascal", "William James", "Montaigne"],
        arguments: [
          { claim: "The arguments cancel out", detail: "Both sides have serious arguments and serious objections. Honest uncertainty is the rational response." },
          { claim: "Pascal's Wager", detail: "If you can't know, bet on God: infinite gain if right, small loss if wrong." },
          { claim: "The will to believe", detail: "For live, forced, momentous choices that evidence can't settle, it's legitimate to let your passions decide." }
        ],
        objections: [
          { objection: "Clifford: it is wrong always to believe on insufficient evidence.", reply: "James: that rule itself is a passionate bet, a fear of error over hope for truth." },
          { objection: "The Wager: which God? Many gods, many wagers.", reply: "It still shows belief can be rational for practical reasons, if not which belief." }
        ] }
    ],
    sharpen: [
      "What evidence would change your mind? If nothing would, is your view based on evidence?",
      "Is there any suffering in the world that you can't imagine serving a purpose?",
      "Does morality need God, or would cruelty be wrong even if God didn't exist? (Plato's Euthyphro problem)",
      "Is 'believing by faith' a virtue or a vice?"
    ],
    books: ["aquinas-summa", "hume-dialogues", "pascal-pensees", "james-will-to-believe", "leibniz-theodicy", "nietzsche-zarathustra"],
    research: ["sep-cosmological", "sep-teleological", "sep-ontological", "sep-evil", "sep-pascal-wager", "paper-clifford"]
  },
  {
    id: "mind",
    title: "Is the mind just the brain?",
    topics: ["Mind", "Metaphysics", "AI"],
    hook: "When you see red, neurons fire. But is the redness itself, the experience, just neurons? And could an AI ever have it?",
    setup: "The 'hard problem' of consciousness: we can explain what the brain does, but why does any of it feel like anything from the inside?",
    positions: [
      { name: "Physicalism", thesis: "The mind is entirely physical: brain states and what they do.",
        thinkers: ["Hobbes", "Daniel Dennett", "Patricia Churchland"],
        arguments: [
          { claim: "Brain damage changes the mind", detail: "Damage, drugs, and stimulation change memory, personality and experience in precise ways. The mind tracks the brain perfectly." },
          { claim: "Causal closure", detail: "Every physical event has a sufficient physical cause. If the mind moves your body, it must be physical too." },
          { claim: "History of science", detail: "Life once seemed to need a special 'vital spirit'. It didn't. Consciousness will likely go the same way." }
        ],
        objections: [
          { objection: "Mary's room: a scientist who knows every physical fact about color, but has lived in a black-and-white room, learns something new when she sees red.", reply: "She gains a new ability or a new way of knowing the same fact, not a new non-physical fact." },
          { objection: "Zombies: we can imagine a physical copy of you with no inner experience at all.", reply: "Imaginable doesn't mean possible. We can 'imagine' water not being H2O too." }
        ] },
      { name: "Dualism", thesis: "The mind (or its conscious properties) is something beyond the physical.",
        thinkers: ["Plato", "Descartes", "David Chalmers (property dualism)"],
        arguments: [
          { claim: "The conceivability argument", detail: "I can clearly conceive my mind existing without my body (Descartes). So they're not the same thing." },
          { claim: "The knowledge argument", detail: "Mary's room: physical facts leave out what it's like." },
          { claim: "The explanatory gap", detail: "No amount of neuroscience even begins to explain why processing feels like something." }
        ],
        objections: [
          { objection: "Interaction problem: how does a non-physical mind push physical neurons?", reply: "Property dualism avoids this; or causation may be more mysterious than we think anyway." },
          { objection: "If consciousness doesn't cause anything physical, why are we talking about it?", reply: "This is a real problem for epiphenomenalism. Push dualists on it." }
        ] },
      { name: "Functionalism / AI-friendly view", thesis: "A mind is what it does, its functional organization, so it could run on silicon as well as neurons.",
        thinkers: ["Hilary Putnam", "Alan Turing", "Jerry Fodor"],
        arguments: [
          { claim: "Multiple realizability", detail: "Octopuses feel pain with very different brains. Pain must be a role, not a specific tissue." },
          { claim: "Gradual replacement", detail: "Replace your neurons one by one with chips that do the same job. When exactly would your experience vanish?" }
        ],
        objections: [
          { objection: "Searle's Chinese Room: a person following rules can produce perfect Chinese without understanding a word. So can a computer.", reply: "Systems reply: the person doesn't understand, but the whole system (person + rulebook) does." },
          { objection: "Today's AI chatbots behave intelligently. Does functionalism say they're conscious?", reply: "Not unless they have the right functional organization, which is exactly what's disputed." }
        ] }
    ],
    sharpen: [
      "Could a perfect AI copy of you be conscious? Would it be you?",
      "What would count as evidence that something (a dog, a fish, a chatbot) is conscious?",
      "If physicalism is true, is there any meaningful sense in which you are more than a machine?",
      "Is the 'hard problem' a real problem, or a confusion of language?"
    ],
    books: ["descartes-meditations", "descartes-discourse", "plato-phaedo", "hobbes-leviathan", "dhammapada"],
    research: ["sep-consciousness", "sep-dualism", "sep-physicalism", "sep-qualia", "sep-chinese-room"]
  },
  {
    id: "moral-realism",
    title: "Is morality objective?",
    topics: ["Ethics", "Metaethics"],
    hook: "Was slavery wrong even when everyone thought it was fine? If yes, what made it wrong?",
    setup: "Not 'what is right?' but 'what kind of thing is rightness?' Facts like math, feelings, or cultural rules?",
    positions: [
      { name: "Moral realism", thesis: "There are objective moral facts, true regardless of what anyone believes.",
        thinkers: ["Plato", "Kant", "Derek Parfit", "Russ Shafer-Landau"],
        arguments: [
          { claim: "Moral progress", detail: "Abolishing slavery wasn't just a change in fashion. It was an improvement. Improvement needs a standard." },
          { claim: "Moral disagreement makes sense", detail: "When we argue about ethics we act as if one side is right, unlike arguing about favorite ice cream." },
          { claim: "Companions in guilt", detail: "We accept objective facts about logic and good reasoning, which are also not physical. Why not ethics?" }
        ],
        objections: [
          { objection: "Mackie's queerness argument: objective values would be bizarre entities, with 'to-be-pursuedness' built in. And how would we detect them?", reply: "Mathematical truths are 'queer' too, and we know those through reasoning." },
          { objection: "Evolution explains our moral beliefs without them being true. We'd believe in caring for kin either way.", reply: "Evolution also shaped our reasoning, yet we trust it about logic." }
        ] },
      { name: "Anti-realism (error theory / expressivism)", thesis: "There are no objective moral facts. Moral talk expresses attitudes, or is systematically false.",
        thinkers: ["Hume", "Nietzsche", "J. L. Mackie", "A. J. Ayer", "Simon Blackburn"],
        arguments: [
          { claim: "Is/ought gap", detail: "No set of facts about how the world is can logically imply how it ought to be (Hume)." },
          { claim: "Genealogy", detail: "Nietzsche: moral values have a history of power, resentment and guilt. Knowing where they came from deflates them." },
          { claim: "Simplest explanation", detail: "Feelings plus culture plus evolution explain all moral belief. Objective facts add nothing." }
        ],
        objections: [
          { objection: "So torturing babies for fun isn't really wrong?", reply: "Expressivists can still say it's wrong, and mean it fully. They just explain what that saying is differently." },
          { objection: "Frege-Geach problem: 'If lying is wrong, getting your brother to lie is wrong' is valid logic. How, if 'wrong' is just an attitude?", reply: "Technical, ongoing. Blackburn and Gibbard have answers; judge for yourself." }
        ] },
      { name: "Relativism", thesis: "Right and wrong are relative to cultures or individuals.",
        thinkers: ["Herodotus", "Montaigne ('Of Cannibals')", "Gilbert Harman"],
        arguments: [
          { claim: "Deep disagreement", detail: "Cultures disagree radically about ethics, more than about physics. Best explanation: no single truth." },
          { claim: "Tolerance", detail: "Relativism stops us from imposing our values on others." }
        ],
        objections: [
          { objection: "Then the reformer is always wrong. Abolitionists went against their culture.", reply: "This is the biggest problem. Most philosophers think it's fatal." },
          { objection: "'Be tolerant' is itself a universal moral claim.", reply: "Hard to answer without becoming a realist about at least one value." }
        ] }
    ],
    sharpen: [
      "Name one moral claim you are as sure of as 2+2=4. What makes you sure?",
      "If an alien species valued cruelty, would they be mistaken, or just different?",
      "Could you be morally better than everyone in your culture? What would that mean?",
      "Does it matter for how you live which theory is true?"
    ],
    books: ["plato-republic", "hume-treatise", "nietzsche-genealogy", "kant-groundwork", "montaigne-essays"],
    research: ["sep-moral-realism", "sep-moral-anti-realism", "iep-relativism"]
  },
  {
    id: "right-action",
    title: "Do the ends justify the means?",
    topics: ["Ethics"],
    hook: "A runaway trolley will kill five people. You can push one large man onto the tracks to stop it. Most people won't. Are they wrong?",
    setup: "The big three ethical theories disagree about what makes an action right: its consequences, the rule it follows, or the character it expresses.",
    positions: [
      { name: "Utilitarianism", thesis: "The right act is whatever produces the most well-being for everyone affected.",
        thinkers: ["Jeremy Bentham", "John Stuart Mill", "Peter Singer"],
        arguments: [
          { claim: "What else could matter?", detail: "Suffering is bad and happiness good, for anyone. Ethics should count everyone equally." },
          { claim: "It gets hard cases right", detail: "It explains why animal suffering matters and why we should give much more to effective charities." },
          { claim: "Rules are shortcuts", detail: "'Don't lie' is a great rule because lying usually causes harm. When it doesn't, the rule loses its point." }
        ],
        objections: [
          { objection: "The surgeon case: kill one healthy patient to give organs to five. Utilitarianism seems to say yes.", reply: "Rule-utilitarians say a world where doctors do this is far worse. Act-utilitarians may bite the bullet." },
          { objection: "It's too demanding: you should give away almost everything.", reply: "Maybe morality is demanding, and we just don't like hearing it." }
        ] },
      { name: "Kantian deontology", thesis: "Some acts are wrong no matter the outcome. Persons must never be used merely as means.",
        thinkers: ["Immanuel Kant", "W. D. Ross", "Christine Korsgaard"],
        arguments: [
          { claim: "Dignity", detail: "Pushing the man treats him as an object, a trolley-stopper. The five dying is a tragedy; killing him is a wrong." },
          { claim: "Universalizability", detail: "Ask: could everyone act on my rule? 'Lie when convenient' destroys trust and so undermines itself." },
          { claim: "Doing vs. allowing", detail: "There's a real moral difference between killing and letting die. Our intuitions track it everywhere." }
        ],
        objections: [
          { objection: "The murderer at the door: Kant says don't lie even to a murderer asking where your friend is hiding.", reply: "Most Kantians reject Kant here; the formula of humanity can allow it." },
          { objection: "Rule worship: if one lie saves a million lives, refusing is fetishizing your clean hands.", reply: "Some deontologists allow thresholds; at catastrophe level, consequences take over." }
        ] },
      { name: "Virtue ethics", thesis: "Ask what a good person (wise, kind, courageous, just) would do. Character comes before rules.",
        thinkers: ["Aristotle", "Confucius", "the Stoics", "Philippa Foot"],
        arguments: [
          { claim: "Real moral life", detail: "Most ethics is not dilemmas but daily habits: patience, honesty, friendship. Theories built on trolleys miss this." },
          { claim: "Practical wisdom", detail: "No formula can replace judgment. Good people see situations rightly." }
        ],
        objections: [
          { objection: "It gives no clear guidance. 'Do what the virtuous person would do' doesn't help when I'm not virtuous.", reply: "Neither do the formulas, in practice. Virtue ethics tells you how to become someone who knows." },
          { objection: "Whose virtues? Cultures disagree.", reply: "There's overlap: Aristotle and Confucius agree on more than you'd expect." }
        ] }
    ],
    sharpen: [
      "Why is pulling a lever (to divert the trolley) different from pushing a man? Is it?",
      "Would you lie to protect a friend from a murderer? Then what rule are you following?",
      "How much should you give to charity? What's your real answer, and can you justify it?",
      "Who's the most virtuous person you know? What makes them so?"
    ],
    books: ["mill-utilitarianism", "kant-groundwork", "aristotle-ethics", "confucius-analects", "machiavelli-prince"],
    research: ["sep-consequentialism", "sep-deontology", "sep-virtue", "sep-kant-moral", "sep-doing-allowing"]
  },
  {
    id: "personal-identity",
    title: "What makes you, you?",
    topics: ["Personal identity", "Self", "Mind"],
    hook: "A teleporter scans you, destroys you, and builds a perfect copy on Mars. Did you travel, or did you die?",
    setup: "Almost every cell in your body has been replaced since childhood, and your memories and personality have changed. So what makes you the same person as that child?",
    positions: [
      { name: "Psychological continuity", thesis: "You are the same person as long as there's a chain of memory, personality and psychological connection.",
        thinkers: ["John Locke", "Derek Parfit (with a twist)"],
        arguments: [
          { claim: "Body swap", detail: "If your memories and personality woke up in another body, you'd say 'I'm in a new body', not 'I'm a new person'." },
          { claim: "It's what we care about", detail: "Someone with your body but none of your mind feels like a stranger." }
        ],
        objections: [
          { objection: "Fission: what if two copies of you are made? Both are continuous with you, but they can't both be you.", reply: "Parfit: identity isn't what matters. Survival as two people is about as good as surviving as one." },
          { objection: "The brave officer: the old general remembers being the officer, the officer remembered the boy, but the general doesn't remember the boy.", reply: "Use chains of overlapping memory, not direct memory." }
        ] },
      { name: "Animalism / bodily view", thesis: "You are a human animal. You persist as long as that living organism does.",
        thinkers: ["Eric Olson", "Aristotle (roughly)"],
        arguments: [
          { claim: "You were once a fetus", detail: "That fetus had no psychology at all, yet it seems true that you were once it." },
          { claim: "The too-many-thinkers problem", detail: "If you're not the animal, then there are two thinkers in your chair: you and the animal. Absurd." }
        ],
        objections: [
          { objection: "Transplant: if your brain goes into another body, you go with it, not with the brainless body.", reply: "Maybe the animal goes with the brain stem. Details matter." }
        ] },
      { name: "No-self", thesis: "There is no persisting self, just a stream of experiences we label 'me'.",
        thinkers: ["The Buddha", "David Hume", "Parfit (reductionism)"],
        arguments: [
          { claim: "Look inside", detail: "Hume: when I look for my 'self' I only ever find particular perceptions, never a self having them." },
          { claim: "It's liberating", detail: "Buddhism and Parfit agree: letting go of the self lessens fear of death and widens care for others." }
        ],
        objections: [
          { objection: "Who is having the experiences, then?", reply: "Maybe 'who' is grammar, not metaphysics. 'It's raining' has no rainer." },
          { objection: "Then why should I care about my future at all? Or save for retirement?", reply: "Parfit: you have reason to care, to the degree you'll be connected, which is less than you think." }
        ] }
    ],
    sharpen: [
      "Would you step into the teleporter? Why or why not?",
      "Are you the same person you were ten years ago? Should you be punished for what they did?",
      "If you lost all your memories, would you have died?",
      "Does believing in no-self make death less scary for you?"
    ],
    books: ["locke-essay", "hume-treatise", "dhammapada", "plato-phaedo", "zhuangzi"],
    research: ["sep-personal-identity", "sep-identity-ethics", "sep-buddha"]
  },
  {
    id: "meaning",
    title: "Does life have meaning?",
    topics: ["Meaning", "Death", "Religion"],
    hook: "In a few billion years the sun will swallow the Earth and nothing you did will remain. Does that make it all pointless?",
    setup: "Three broad answers: meaning comes from God, it can be found in the world, or there is none, and that might be okay.",
    positions: [
      { name: "Supernaturalism", thesis: "Life has meaning only if God or a spiritual realm exists and gives it a purpose.",
        thinkers: ["Augustine", "Pascal", "Tolstoy", "Kierkegaard"],
        arguments: [
          { claim: "Only the infinite can give lasting meaning", detail: "Everything finite ends. If death is final, every achievement is eventually erased." },
          { claim: "Purpose needs a purposer", detail: "A tool has a purpose because someone made it for something. Without a maker, we have no 'for'." }
        ],
        objections: [
          { objection: "Being made for someone else's purpose sounds like being a tool, not having meaning.", reply: "Being loved and called by God isn't like being a hammer." },
          { objection: "Why would infinite duration add meaning? A pointless thing that lasts forever is still pointless.", reply: "Fair. The supernaturalist needs more than just 'it lasts'." }
        ] },
      { name: "Naturalism", thesis: "Life can be meaningful without God, through love, creating, knowing, and helping others.",
        thinkers: ["Aristotle", "Epicurus", "Susan Wolf", "Mill"],
        arguments: [
          { claim: "Meaning is local", detail: "Raising a child, making art, or ending suffering matters now, to real beings. It doesn't need to matter to the universe." },
          { claim: "Subjective attraction meets objective worth", detail: "Wolf: meaning arises when you're passionate about something genuinely worthwhile." }
        ],
        objections: [
          { objection: "From the cosmic point of view, it's all trivial.", reply: "Why adopt that point of view? From it, nothing matters, including the view itself (Nagel)." }
        ] },
      { name: "Nihilism / the absurd", thesis: "Life has no given meaning. We can despair, create our own values, or rebel with joy.",
        thinkers: ["Schopenhauer", "Nietzsche", "Camus", "Sartre"],
        arguments: [
          { claim: "The absurd", detail: "Camus: we crave meaning and the universe answers with silence. That clash is the absurd." },
          { claim: "Create values", detail: "Nietzsche: after the death of God, we must become creators of values, not just followers." },
          { claim: "Sisyphus", detail: "Pushing a rock up a hill forever. 'One must imagine Sisyphus happy.'" }
        ],
        objections: [
          { objection: "If I 'create' my meaning, I could create anything, even cruelty. That's too arbitrary.", reply: "Existentialists say choices still face others' freedom (Beauvoir). Not everything goes." },
          { objection: "If life has no meaning, why not suicide? Camus himself said that's the only real philosophical question.", reply: "Camus: no. Revolt, freedom and passion are the answer, not escape." }
        ] }
    ],
    sharpen: [
      "What in your life would you still do if no one ever found out?",
      "If you knew humanity would go extinct 30 days after your death, would your work still matter?",
      "Is a meaningful life the same as a happy life? Name someone who had one without the other.",
      "Can you imagine Sisyphus happy? What would make him so?"
    ],
    books: ["pascal-pensees", "nietzsche-zarathustra", "schopenhauer-world", "aurelius-meditations", "seneca-dialogues", "thoreau-walden", "augustine-confessions"],
    research: ["sep-life-meaning", "iep-meaning", "sep-existentialism", "sep-camus", "paper-russell-free-mans-worship"]
  },
  {
    id: "state",
    title: "Why should anyone obey the state?",
    topics: ["Politics", "Justice", "Freedom"],
    hook: "You never signed a social contract. So why do you owe obedience to laws you never agreed to?",
    setup: "Governments claim the right to tax you, jail you, and send you to war. What, if anything, gives them that right?",
    positions: [
      { name: "Social contract", thesis: "Authority is legitimate because rational people would agree (or did agree) to it, to escape the chaos of no government.",
        thinkers: ["Hobbes", "Locke", "Rousseau", "Rawls"],
        arguments: [
          { claim: "The state of nature", detail: "Without government: constant fear, no trust, no trade, 'nasty, brutish, and short'. Anyone rational would accept a state to escape that." },
          { claim: "Tacit consent", detail: "Locke: by living here and using roads and protection, you tacitly agree." },
          { claim: "Hypothetical consent", detail: "Rawls: a just state is one you'd choose behind a veil of ignorance, not knowing who you'd be." }
        ],
        objections: [
          { objection: "Hume: telling a poor peasant he consents by not leaving is like telling a man carried onto a ship asleep that he consents to the captain by not jumping overboard.", reply: "Move to hypothetical consent: not what you did agree to, but what you'd have reason to." },
          { objection: "A hypothetical contract isn't worth the paper it's not written on.", reply: "It shows what's reasonable, which may be enough to justify authority." }
        ] },
      { name: "Philosophical anarchism", thesis: "No state has genuine authority. You may follow good laws, but because they're good, not because the state commands them.",
        thinkers: ["Thoreau", "William Godwin", "Robert Paul Wolff", "Michael Huemer"],
        arguments: [
          { claim: "Autonomy", detail: "A morally responsible person must decide for themselves. Obeying because you're told is giving up your conscience." },
          { claim: "The double standard", detail: "If your neighbor took your money 'for public services' without asking, it would be theft. Why is it different when the state does it?" }
        ],
        objections: [
          { objection: "Without authority, public goods (roads, defense, courts) collapse.", reply: "Philosophical anarchists don't want to abolish the state tomorrow, only to deny it automatic moral authority." }
        ] },
      { name: "Civil disobedience", thesis: "We generally should obey, but must openly break unjust laws and accept punishment.",
        thinkers: ["Socrates (Crito, sort of)", "Thoreau", "Gandhi", "Martin Luther King Jr."],
        arguments: [
          { claim: "Conscience over law", detail: "Thoreau: 'Under a government which imprisons any unjustly, the true place for a just man is also a prison.'" },
          { claim: "Respecting the system by accepting punishment", detail: "King: breaking an unjust law openly and accepting the penalty shows the highest respect for law." }
        ],
        objections: [
          { objection: "Everyone thinks their cause is just. If everyone disobeys what they disagree with, order collapses.", reply: "That's why it must be public, non-violent, and accept punishment. Those limits filter out mere convenience." }
        ] }
    ],
    sharpen: [
      "Did you consent to your government? When, and how?",
      "Name a law you'd break. Would you accept the punishment?",
      "Is paying taxes more like paying rent, or more like being robbed? Defend your answer.",
      "Behind the veil of ignorance, what society would you choose?"
    ],
    books: ["hobbes-leviathan", "locke-second-treatise", "rousseau-social-contract", "thoreau-civil", "plato-apology", "mill-liberty", "rousseau-inequality"],
    research: ["sep-political-obligation", "sep-contractarianism", "sep-civil-disobedience", "sep-anarchism", "sep-rawls"]
  },
  {
    id: "knowledge",
    title: "Can you know anything at all?",
    topics: ["Knowledge", "Skepticism"],
    hook: "You could be dreaming right now. Or in a simulation. Can you prove you're not?",
    setup: "Skeptics argue that since we can't rule out radical deception, we don't really know even ordinary things like 'I have hands'.",
    positions: [
      { name: "Skepticism", thesis: "We don't know (most of) what we think we know.",
        thinkers: ["Pyrrho", "Sextus Empiricus", "Montaigne", "Hume (on induction)"],
        arguments: [
          { claim: "The dream/simulation argument", detail: "If you know you have hands, you know you're not a brain in a vat. You can't know you're not. So you don't know you have hands." },
          { claim: "Problem of induction", detail: "Every belief about the future assumes nature stays the same. That assumption can't be proven without circular reasoning." }
        ],
        objections: [
          { objection: "Moore: I know I have hands better than I know any premise of your argument. So your argument must be flawed.", reply: "That's a stubborn refusal, not a refutation. Which premise is false, exactly?" },
          { objection: "Skepticism is self-refuting: do you know that we can't know?", reply: "Pyrrhonists don't claim to know it. They suspend judgment, even about skepticism." }
        ] },
      { name: "Rationalist foundations", thesis: "Some things are certain, and knowledge can be built on them by reason.",
        thinkers: ["Descartes", "Leibniz", "Plato"],
        arguments: [
          { claim: "The cogito", detail: "Even if I'm deceived, I must exist to be deceived. 'I think, therefore I am' survives all doubt." },
          { claim: "Math and logic", detail: "2+2=4 doesn't depend on my senses, so the dream argument can't touch it." }
        ],
        objections: [
          { objection: "From 'I think' you can't get back to the external world without bringing in God, which is shaky.", reply: "This is the Cartesian circle. Most people think it fails, so other foundations are needed." }
        ] },
      { name: "Pragmatism / fallibilism", thesis: "Knowledge doesn't need certainty. It's well-justified belief that works and can be revised.",
        thinkers: ["William James", "C. S. Peirce", "John Dewey", "Hume (in practice)"],
        arguments: [
          { claim: "Certainty is the wrong standard", detail: "Science advances by fallible but reliable beliefs. Demanding certainty would mean no one knows anything, which makes 'know' useless." },
          { claim: "Doubt needs a reason", detail: "Peirce: real doubt arises from real problems, not from philosophers' imagination. Don't pretend to doubt in philosophy what you don't doubt in your heart." }
        ],
        objections: [
          { objection: "Gettier cases: you can have a justified true belief that's only true by luck. So 'justified true belief' isn't knowledge.", reply: "Add a condition: the belief must come from a reliable process, not luck. The debate continues." }
        ] }
    ],
    sharpen: [
      "What's one belief you'd bet your life on? What makes it so solid?",
      "If you were in a perfect simulation, would anything you know be false?",
      "How do you know the sun will rise tomorrow, without assuming the future is like the past?",
      "Is 'I know' just 'I'm really sure and I'm right'?"
    ],
    books: ["descartes-meditations", "descartes-discourse", "hume-enquiry", "montaigne-essays", "russell-problems", "james-pragmatism", "plato-meno", "berkeley-principles"],
    research: ["sep-skepticism", "sep-knowledge-analysis", "sep-induction"]
  }
];
