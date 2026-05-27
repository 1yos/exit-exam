import { Flashcard } from "./types";

export const SEEDED_FLASHCARDS: Flashcard[] = [
  {
    id: "fc_01",
    category: "Programming Fundamentals",
    front: "What is short-circuit evaluation in logic operators?",
    back: "The compiler skips evaluating the second operand in `&&` or `||` expressions if the first operand is sufficient to guarantee the final result (e.g. false in AND, true in OR)."
  },
  {
    id: "fc_02",
    category: "Object-Oriented Programming",
    front: "What is the difference between overriding and overloading?",
    back: "Overridden methods have identical signatures and occur in inheritance parent/child hierarchies (dynamic compile-time binding). Overloaded methods have identical names but different parameter lists within the same domain (resolved statically)."
  },
  {
    id: "fc_03",
    category: "Database Systems",
    front: "What is the Entity Integrity constraint?",
    back: "A relational model rule stating that no primary key attribute/column can ever be assigned a null value."
  },
  {
    id: "fc_04",
    category: "Operating Systems",
    front: "Name the 4 Coffman conditions required for Deadlock.",
    back: "1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait"
  },
  {
    id: "fc_05",
    category: "Computer Networks",
    front: "Why does Wireless LAN (Wi-Fi) use CSMA/CA instead of CSMA/CD?",
    back: "Wireless transceivers cannot reliably send and detect packet collisions simultaneously on the same frequency (Hidden Terminal Problem), so they use collision avoidance protocols instead of active collision detection."
  },
  {
    id: "fc_06",
    category: "Database Systems",
    front: "What states does the 3NF Normal Form resolve?",
    back: "It resolves and eliminates transitive dependencies among non-key columns (so attributes only depend directly on the primary key)."
  },
  {
    id: "fc_07",
    category: "Software Engineering",
    front: "What is the main drawback of the Waterfall model?",
    back: "It is rigid and sequential, which makes it highly unsuitable for projects where requirements change frequently or carry high risks of design iterations."
  },
  {
    id: "fc_08",
    category: "Theory of Computation",
    front: "Which automaton is designed to recognize context-free languages?",
    back: "The Pushdown Automaton (PDA), which uses a stack structure for infinite symbol counting or paired matching tasks."
  }
];
