// Logos research: free, legal, open sources only.
// type: "SEP" (Stanford Encyclopedia of Philosophy), "IEP" (Internet Encyclopedia of Philosophy),
//       "Classic paper" (public domain), "Open hub" (open-access journals and archives)
const SEP = (slug) => "https://plato.stanford.edu/entries/" + slug + "/";
const IEP = (slug) => "https://iep.utm.edu/" + slug + "/";
const WS = (q) => "https://en.wikisource.org/w/index.php?search=" + encodeURIComponent(q);

window.LOGOS_RESEARCH = [
  // ---- Encyclopedia entries: start here on any topic ----
  { id: "sep-freewill", type: "SEP", title: "Free Will", url: SEP("freewill"), topics: ["Free will"], note: "The map of the whole debate. Read sections 1-2 first." },
  { id: "sep-compatibilism", type: "SEP", title: "Compatibilism", url: SEP("compatibilism"), topics: ["Free will"], note: "How freedom might survive determinism." },
  { id: "iep-freewill", type: "IEP", title: "Free Will", url: IEP("freewill"), topics: ["Free will"], note: "A gentler intro than the SEP." },
  { id: "sep-ontological", type: "SEP", title: "Ontological Arguments", url: SEP("ontological-arguments"), topics: ["God", "Religion"], note: "Anselm's 'proof' from the very idea of God." },
  { id: "sep-cosmological", type: "SEP", title: "Cosmological Argument", url: SEP("cosmological-argument"), topics: ["God", "Religion"], note: "Why is there something rather than nothing?" },
  { id: "sep-teleological", type: "SEP", title: "Teleological Arguments for God's Existence", url: SEP("teleological-arguments"), topics: ["God", "Religion"], note: "Design arguments, including fine-tuning." },
  { id: "sep-evil", type: "SEP", title: "The Problem of Evil", url: SEP("evil"), topics: ["God", "Evil", "Religion"], note: "The strongest argument against God, and the replies." },
  { id: "sep-pascal-wager", type: "SEP", title: "Pascal's Wager", url: SEP("pascal-wager"), topics: ["God", "Faith"], note: "Is betting on God rational?" },
  { id: "sep-dualism", type: "SEP", title: "Dualism", url: SEP("dualism"), topics: ["Mind"], note: "Mind and body as two different things." },
  { id: "sep-physicalism", type: "SEP", title: "Physicalism", url: SEP("physicalism"), topics: ["Mind", "Metaphysics"], note: "Everything is physical. But what does that even mean?" },
  { id: "sep-consciousness", type: "SEP", title: "Consciousness", url: SEP("consciousness"), topics: ["Mind"], note: "Includes the 'hard problem'." },
  { id: "sep-qualia", type: "SEP", title: "Qualia", url: SEP("qualia"), topics: ["Mind"], note: "Mary's room, inverted spectrum, the redness of red." },
  { id: "sep-chinese-room", type: "SEP", title: "The Chinese Room Argument", url: SEP("chinese-room"), topics: ["Mind", "AI"], note: "Can a computer that follows rules understand anything? Very relevant to AI." },
  { id: "sep-moral-realism", type: "SEP", title: "Moral Realism", url: SEP("moral-realism"), topics: ["Ethics", "Metaethics"], note: "Are there objective moral facts?" },
  { id: "sep-moral-anti-realism", type: "SEP", title: "Moral Anti-Realism", url: SEP("moral-anti-realism"), topics: ["Ethics", "Metaethics"], note: "The other side: error theory, expressivism, relativism." },
  { id: "iep-relativism", type: "IEP", title: "Moral Relativism", url: IEP("moral-re"), topics: ["Ethics", "Metaethics"], note: "Is right and wrong just relative to culture?" },
  { id: "sep-consequentialism", type: "SEP", title: "Consequentialism", url: SEP("consequentialism"), topics: ["Ethics"], note: "Only outcomes matter." },
  { id: "sep-deontology", type: "SEP", title: "Deontological Ethics", url: SEP("ethics-deontological"), topics: ["Ethics"], note: "Some things you must never do, whatever the outcome." },
  { id: "sep-virtue", type: "SEP", title: "Virtue Ethics", url: SEP("ethics-virtue"), topics: ["Ethics", "Virtue"], note: "Ask 'what kind of person should I be?' not 'what should I do?'" },
  { id: "sep-kant-moral", type: "SEP", title: "Kant's Moral Philosophy", url: SEP("kant-moral"), topics: ["Ethics", "Kant"], note: "Best companion to the Groundwork." },
  { id: "sep-doing-allowing", type: "SEP", title: "Doing vs. Allowing Harm", url: SEP("doing-allowing"), topics: ["Ethics"], note: "Why the trolley problem is hard." },
  { id: "sep-personal-identity", type: "SEP", title: "Personal Identity", url: SEP("identity-personal"), topics: ["Personal identity", "Self"], note: "What makes you the same person over time?" },
  { id: "sep-identity-ethics", type: "SEP", title: "Personal Identity and Ethics", url: SEP("identity-ethics"), topics: ["Personal identity", "Ethics"], note: "Parfit's ideas without buying his book." },
  { id: "sep-life-meaning", type: "SEP", title: "The Meaning of Life", url: SEP("life-meaning"), topics: ["Meaning"], note: "Supernaturalism, naturalism, nihilism, laid out clearly." },
  { id: "iep-meaning", type: "IEP", title: "Meaning of Life: Contemporary Analytic Perspectives", url: IEP("mean-ana"), topics: ["Meaning"], note: "A second angle on the same question." },
  { id: "sep-existentialism", type: "SEP", title: "Existentialism", url: SEP("existentialism"), topics: ["Meaning", "Freedom"], note: "Kierkegaard to Sartre and Beauvoir." },
  { id: "sep-camus", type: "SEP", title: "Albert Camus", url: SEP("camus"), topics: ["Meaning", "Absurd"], note: "The absurd and Sisyphus, since his books aren't free." },
  { id: "sep-stoicism", type: "SEP", title: "Stoicism", url: SEP("stoicism"), topics: ["Ethics", "Stoicism"], note: "Beyond the self-help version." },
  { id: "sep-epicurus", type: "SEP", title: "Epicurus", url: SEP("epicurus"), topics: ["Ethics", "Death", "Happiness"], note: "Pleasure, done wisely, is simple." },
  { id: "sep-contractarianism", type: "SEP", title: "Contractarianism", url: SEP("contractarianism"), topics: ["Politics", "Ethics"], note: "Hobbes' line of thought, modernized." },
  { id: "sep-political-obligation", type: "SEP", title: "Political Obligation", url: SEP("political-obligation"), topics: ["Politics"], note: "Why (if at all) must we obey the law?" },
  { id: "sep-civil-disobedience", type: "SEP", title: "Civil Disobedience", url: SEP("civil-disobedience"), topics: ["Politics", "Ethics"], note: "When breaking the law is right." },
  { id: "sep-anarchism", type: "SEP", title: "Anarchism", url: SEP("anarchism"), topics: ["Politics"], note: "The case that no state is legitimate." },
  { id: "sep-rawls", type: "SEP", title: "John Rawls", url: SEP("rawls"), topics: ["Politics", "Justice"], note: "The veil of ignorance, since his book isn't free." },
  { id: "sep-skepticism", type: "SEP", title: "Skepticism", url: SEP("skepticism"), topics: ["Knowledge"], note: "Can you know anything at all?" },
  { id: "sep-knowledge-analysis", type: "SEP", title: "The Analysis of Knowledge", url: SEP("knowledge-analysis"), topics: ["Knowledge"], note: "Justified true belief and Gettier cases." },
  { id: "sep-induction", type: "SEP", title: "The Problem of Induction", url: SEP("induction-problem"), topics: ["Knowledge", "Science"], note: "Why expect the sun to rise tomorrow?" },
  { id: "sep-confucius", type: "SEP", title: "Confucius", url: SEP("confucius"), topics: ["Ethics", "Eastern"], note: "" },
  { id: "sep-laozi", type: "SEP", title: "Laozi", url: SEP("laozi"), topics: ["Eastern", "Metaphysics"], note: "" },
  { id: "sep-zhuangzi", type: "SEP", title: "Zhuangzi", url: SEP("zhuangzi"), topics: ["Eastern", "Self"], note: "" },
  { id: "sep-buddha", type: "SEP", title: "The Buddha", url: SEP("buddha"), topics: ["Eastern", "Self", "Suffering"], note: "" },
  { id: "sep-nietzsche", type: "SEP", title: "Friedrich Nietzsche", url: SEP("nietzsche"), topics: ["Values", "Meaning"], note: "" },
  { id: "sep-hume", type: "SEP", title: "David Hume", url: SEP("hume"), topics: ["Knowledge", "Ethics"], note: "" },
  { id: "sep-kant", type: "SEP", title: "Immanuel Kant", url: SEP("kant"), topics: ["Knowledge", "Ethics"], note: "Read before trying the Critique." },
  { id: "sep-wittgenstein", type: "SEP", title: "Ludwig Wittgenstein", url: SEP("wittgenstein"), topics: ["Language"], note: "" },

  // ---- Classic papers in the public domain ----
  { id: "paper-clifford", type: "Classic paper", title: "The Ethics of Belief (W. K. Clifford, 1877)", url: WS("The Ethics of Belief Clifford"), topics: ["Faith", "Knowledge", "Ethics"], note: "'It is wrong always, everywhere, and for anyone, to believe anything upon insufficient evidence.' Pair with James's 'The Will to Believe'." },
  { id: "paper-russell-denoting", type: "Classic paper", title: "On Denoting (Bertrand Russell, 1905)", url: WS("On Denoting Russell"), topics: ["Language", "Logic"], note: "'The present king of France is bald': true, false, or neither? Founded analytic philosophy." },
  { id: "paper-james-wtb", type: "Classic paper", title: "The Will to Believe (William James, 1896)", url: "https://www.gutenberg.org/ebooks/26659", topics: ["Faith", "Knowledge"], note: "The title essay of the book in the Library." },
  { id: "paper-russell-free-mans-worship", type: "Classic paper", title: "A Free Man's Worship (Bertrand Russell, 1903)", url: WS("A Free Man's Worship"), topics: ["Meaning", "Religion"], note: "How to live well in a universe that doesn't care about us." },

  // ---- Open-access research hubs ----
  { id: "hub-1000word", type: "Open hub", title: "1000-Word Philosophy", url: "https://1000wordphilosophy.com/", topics: ["Intro"], note: "Free 1,000-word intro essays by philosophers. Perfect for one coffee." },
  { id: "hub-philarchive", type: "Open hub", title: "PhilArchive", url: "https://philarchive.org/", topics: ["Papers"], note: "Free open-access archive of philosophy papers and preprints." },
  { id: "hub-imprint", type: "Open hub", title: "Philosophers' Imprint", url: "https://www.philosophersimprint.org/", topics: ["Papers"], note: "A top philosophy journal that is 100% free to read." },
  { id: "hub-ergo", type: "Open hub", title: "Ergo: An Open Access Journal of Philosophy", url: "https://journals.publishing.umich.edu/ergo/", topics: ["Papers"], note: "Peer-reviewed and free." },
  { id: "hub-sep", type: "Open hub", title: "Stanford Encyclopedia of Philosophy (full table of contents)", url: "https://plato.stanford.edu/contents.html", topics: ["Intro"], note: "1,800+ expert entries. The best free resource in philosophy." },
  { id: "hub-iep", type: "Open hub", title: "Internet Encyclopedia of Philosophy", url: "https://iep.utm.edu/", topics: ["Intro"], note: "Often easier to read than the SEP." },
];
