import { Question, QuestionType, Difficulty } from "./types";

export const SEEDED_QUESTIONS: Question[] = [
  // Programming Fundamentals
  {
    id: "prog_01",
    category: "Programming Fundamentals",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Medium,
    questionText: "How many times is the phrase \"In the loop\" printed when the following C++ code is executed?",
    codeSnippet: `int i, j = 8;
for (i = 0; i < j; i++, j--) {
  if (i % 2 != 0) continue;
  cout << "In the loop" << endl;
}`,
    options: ["20", "10", "3", "2"],
    correctAnswer: "D",
    explanation: "Let's trace the loop step-by-step:\n- Iteration 1: i=0, j=8 (0 < 8 is true). i%2 is 0, so 'continue' is skipped. Prints 'In the loop'. i becomes 1, j becomes 7.\n- Iteration 2: i=1, j=7 (1 < 7 is true). i%2 is 1 (non-zero), so 'continue' triggers. i becomes 2, j becomes 6.\n- Iteration 3: i=2, j=6 (2 < 6 is true). i%2 is 0. Prints 'In the loop'. i becomes 3, j becomes 5.\n- Iteration 4: i=3, j=5 (3 < 5 is true). i%2 is 1. 'continue' triggers. i becomes 4, j becomes 4.\n- Iteration 5: i=4, j=4 (4 < 4 is false). The loop terminates. 'In the loop' is printed exactly twice.",
    wrongOptionsExplanation: {
      "A": "This is a random large number and assumes typical infinite run mistake.",
      "B": "This represents mistake of thinking j does not decrease.",
      "C": "This incorrectly includes the odd iterations."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["For Loops", "Control Flow", "Modulo Arithmetic", "Continue Statement"]
  },
  {
    id: "prog_02",
    category: "Programming Fundamentals",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Hard,
    questionText: "What is the console output of the following C++ code fragment?",
    codeSnippet: `int a = 5, x = 1, y = 0, z = 4;
a = (x && y) || ++z;
std::cout << z << endl << a;`,
    options: ["5\n1", "5\n2", "4\n1", "4\n2"],
    correctAnswer: "A",
    explanation: "In C++, logical operations have short-circuit evaluation. The statement evaluates `(x && y)`. Since x = 1 (true) but y = 0 (false), `(x && y)` reduces to false. Since the first operand of logical OR (`||`) is false, C++ must evaluate the second operand, `++z`, to discover the overall result. `++z` increments z to 5 and returns 5 (true). Therefore, the OR expression evaluates to true (represented as 1), so `a` receives the value 1. When printed, `z` is 5 and `a` is 1.",
    wrongOptionsExplanation: {
      "B": "Incorrectly assumes the value of logical OR evaluates to some other value.",
      "C": "Incorrectly assumes the ++z operand wasn't executed due to short-circuiting.",
      "D": "Incorrectly assumes both short-circuiting and value of OR are different."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Short-circuit Evaluation", "Increment Operators", "Logical Operators"]
  },
  {
    id: "prog_03",
    category: "Programming Fundamentals",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What is a function called that invokes itself?",
    options: ["Recursive function", "Inline function", "Built in function", "User defined function"],
    correctAnswer: "A",
    explanation: "A recursive function is a function that calls itself directly or indirectly in order to solve smaller instances of a problem, stopping at a base case.",
    wrongOptionsExplanation: {
      "B": "An inline function is expanded in-place by the compiler to save function call overhead.",
      "C": "A built-in function is provided natively by the language/compiler.",
      "D": "A user-defined function is written by the programmer to modularize code, but doesn't necessarily call itself."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Recursion", "Function Calls", "Stack Frames"]
  },

  // Object-Oriented Programming
  {
    id: "oop_01",
    category: "Object-Oriented Programming",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which object-oriented principle refers to hiding the internal implementation details of an object and exposing only a public interface?",
    options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
    correctAnswer: "C",
    explanation: "Encapsulation is the bundling of data and methods into a single unit (class) while restricting direct access to the fields (usually via private variables and public getters/setters). This keeps implementation details hidden and exposes a clean interface.",
    wrongOptionsExplanation: {
      "A": "Inheritance allows a subclass to inherit properties and behavior from a parent class.",
      "B": "Polymorphism allows objects of different classes to respond differently to the exact same method call signature.",
      "D": "Abstraction focuses on modeling the general structure without unnecessary concrete details."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Encapsulation", "Access Modifiers", "Information Hiding"]
  },
  {
    id: "oop_02",
    category: "Object-Oriented Programming",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Hard,
    questionText: "What is the console output of the following Java program?",
    codeSnippet: `class Animal {
  void sound() { System.out.print("Animal "); }
}
class Dog extends Animal {
  void sound() { System.out.print("Bark "); }
}
public class Main {
  public static void main(String[] args) {
    Animal obj = new Dog();
    obj.sound();
  }
}`,
    options: ["Animal", "Bark", "Compile Error", "Runtime Exception"],
    correctAnswer: "B",
    explanation: "This program illustrates Java's runtime dynamic polymorphism (method overriding). Even though the reference variable 'obj' is of type 'Animal', the actual runtime object it points to is of type 'Dog'. At runtime, the virtual machine resolves the method call to the overridden implementation in the instantiated sub-class 'Dog', outputting 'Bark'.",
    wrongOptionsExplanation: {
      "A": "Incorrect as method overriding is determined dynamically at runtime, not statically by the reference type.",
      "C": "Java completely supports dynamic referencing sub-classes with parent references, so it compiles perfectly.",
      "D": "No exception is thrown as the cast and dynamic dispatch is safe."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Method Overriding", "Dynamic Dispatch", "Polymorphism"]
  },

  // Database Systems
  {
    id: "db_01",
    category: "Database Systems",
    type: QuestionType.ScenarioBased,
    difficulty: Difficulty.Hard,
    questionText: "Consider the following relationship: 'Department(Dept_Name, Manager)' where Dept_Name is the primary key. If we attempt to execute: 'INSERT INTO Department VALUES (null, 107);', which constraint is violated?",
    options: ["Domain constraint", "Key constraint", "Entity Integrity constraint", "Referential Integrity constraint"],
    correctAnswer: "C",
    explanation: "The Entity Integrity constraint of the relational model states that no primary key value can be NULL. This is because primary keys are used to uniquely identify individual tuples in a relation. Setting 'Dept_Name' (the PK) to null directly violates this constraint.",
    wrongOptionsExplanation: {
      "A": "Domain constraint restricts the data types and allowable values inside a column, not null keys specifically.",
      "B": "Key constraint ensures uniqueness of key attributes, but null goes beyond uniqueness.",
      "D": "Referential integrity would be violated if the manager ID was an invalid foreign key matching the Employee table, but primary key nullification takes logical precedence as an Entity Integrity failure."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Relational Integrity", "Primary Keys", "Entity Integrity"]
  },
  {
    id: "db_02",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which normal form is achieved when we eliminate transitive functional dependencies (where a non-key attribute determines another non-key attribute)?",
    options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
    correctAnswer: "C",
    explanation: "Third Normal Form (3NF) is satisfied if it is in 2NF and there are zero transitive dependencies. In other words, every non-key column must depend on the primary key, the whole primary key, and nothing but the primary key.",
    wrongOptionsExplanation: {
      "A": "1NF requires atomic values (no repeating groups/arrays).",
      "B": "2NF requires 1NF and additionally that there are no partial key dependencies (no non-key attribute is dependent on only a part of a composite primary key).",
      "D": "BCNF is a stronger version of 3NF where every determinant column must be a candidate key."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Normalization", "Functional Dependencies", "Transitive Dependency"]
  },

  // Operating Systems
  {
    id: "os_01",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which hardware device is responsible for mapping logical/virtual memory addresses generated by the CPU to physically addressable RAM?",
    options: ["DMA Controller", "Memory Management Unit (MMU)", "Cache Controller", "Interrupt Register"],
    correctAnswer: "B",
    explanation: "The Memory Management Unit (MMU) is the hardware component located on the CPU (or between CPU and bus) that translates virtual memory addresses to physical ones on the fly using page tables.",
    wrongOptionsExplanation: {
      "A": "DMA Controller allows context transfers between devices and memory without CPU overhead.",
      "C": "Cache Controller manages translation and lines inside rapid L1/L2 SRAM caches.",
      "D": "Interrupt Register tracks inbound peripheral signals requesting immediate processor cycle attention."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Virtual Memory", "MMU", "Address Translation", "Paging"]
  },
  {
    id: "os_02",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "What are the four necessary and concurrent conditions that must be present in a system for a deadlock to occur?",
    options: [
      "Mutual exclusion, hold and wait, preemption, and circular wait",
      "Mutual exclusion, hold and wait, no preemption, and circular wait",
      "Mutual inclusion, hold and wait, no preemption, and circular wait",
      "Mutual exclusion, allocation, preemption, and resource starvation"
    ],
    correctAnswer: "B",
    explanation: "Coffman's deadlock conditions state that a deadlock can arise if and only if all four conditions hold true simultaneously:\n1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.\n2. Hold and Wait: A process must be holding at least one resource and waiting to acquire additional resources that are currently being held by other processes.\n3. No Preemption: Resources cannot be preempted; a resource can be released only voluntarily by the process holding it.\n4. Circular Wait: A set of processes must exist such that each process is waiting for a resource held by the next process in the cycle.",
    wrongOptionsExplanation: {
      "A": "If there is 'preemption', the OS can forcibly take a resource back and break deadlocks, violating the rule.",
      "C": "Deadlock requires resources to be exclusive, so 'Mutual inclusion' is incorrect.",
      "D": "Incorrect condition list, 'allocation' and 'starvation' are not part of the standard Coffman formulation."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Deadlock Conditions", "Process Synchronization", "Coffman Conditions"]
  },

  // Computer Networks
  {
    id: "net_01",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which Medium Access Control (MAC) protocol is standard and supported by wireless LAN (WLAN / IEEE 802.11s)?",
    options: ["ALOHA", "CSMA/CD", "CSMA/CA", "Token Passing"],
    correctAnswer: "C",
    explanation: "Wireless LAN (802.11) uses CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance). Unlike wired networks, wireless radios cannot easily transmit and detect collisions at the exact same time (hidden terminal problem), so they actively try to avoid collisions beforehand using RTS/CTS frames and random back-off times.",
    wrongOptionsExplanation: {
      "A": "ALOHA is an older, purely random access protocol with high collision probability.",
      "B": "CSMA/CD (Collision Detection) is used in classical wired Ethernet, where collisions are actively sensed during transmission.",
      "D": "Token Passing is used in legacy network topologies like Ring or FDDI, not standard WLAN."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["MAC Layer Protocols", "CSMA/CA", "Wireless Networks", "IEEE 802.11"]
  },
  {
    id: "net_02",
    category: "Computer Networks",
    type: QuestionType.ScenarioBased,
    difficulty: Difficulty.Hard,
    questionText: "An administrator subnets a Class B block using a 255.255.255.0 /24 mask. What is the default subnet mask of a Class B network and how many subnets are created manually?",
    options: [
      "Default is 255.255.0.0; 256 subnets are created.",
      "Default is 255.0.0.0; 256 subnets are created.",
      "Default is 255.255.255.0; 128 subnets are created.",
      "Default is 255.255.0.0; 16 subnets are created."
    ],
    correctAnswer: "A",
    explanation: "Class B networks have a default prefix of /16 (or subnet mask 255.255.0.0). Subnetting Class B to /24 (255.255.255.0) borrows 8 host bits for subnetting (24 - 16 = 8). 2^8 = 256 manually created subnets.",
    wrongOptionsExplanation: {
      "B": "Class A is the one using a default mask of /8 (255.0.0.0).",
      "C": "Class B's default mask is /16, and the subnets calculated would be incorrect.",
      "D": "Provides incorrect subnet sizing."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Classful Addressing", "IP Subnetting", "Subnet Masks"]
  },

  // Compiler Design
  {
    id: "comp_01",
    category: "Compiler Design",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which phase of a compiler is responsible for scanning the input source characters, pairing them into lexemes, and generating a stream of tokens?",
    options: ["Syntax Analysis", "Lexical Analysis", "Semantic Analysis", "Code Generation"],
    correctAnswer: "B",
    explanation: "Lexical Analysis (performed by the Lexer/Scanner) scans the raw stream of characters, removes whitespaces/comments, identifies keywords, identifiers, literals, and transforms them into standard syntactic units called tokens.",
    wrongOptionsExplanation: {
      "A": "Syntax Analysis (Parsing) takes tokens and builds hierarchical parse trees conforming to a CFG.",
      "C": "Semantic Analysis performs static type checking and scope resolution on the parse tree.",
      "D": "Code Generation converts structural IR statements into assembly/machine directions."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Lexical Analysis", "Tokens", "Compiling Phases"]
  },

  // Theory of Computation
  {
    id: "theory_01",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "Which of the following is true about context-free grammars and languages?",
    options: [
      "Every context-free language is also a regular language.",
      "A nondeterministic pushdown automaton can recognize any context-free language.",
      "A finite automaton is powerful enough to recognize 0^n 1^n languages.",
      "Context-free languages require Turing machines for basic recognition."
    ],
    correctAnswer: "B",
    explanation: "By definition, the class of Context-Free Languages (CFLs) corresponds exactly to the languages accepted by Pushdown Automata (PDA). Nondeterministic PDAs are required, since some CFLs (such as even-length palindromes) are inherently nondeterministic.",
    wrongOptionsExplanation: {
      "A": "CFL is a parent category of regular languages, not a subset.",
      "C": "Finite automata lack memory/stacks, so they cannot count matching occurrences of symbol lists like 0^n 1^n.",
      "D": "A parser with a stack (PDA) is sufficient; a full Turing machine is not strictly necessary."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Chomsky Hierarchy", "Context-Free Languages", "Automata Theory"]
  },

  // Artificial Intelligence
  {
    id: "ai_01",
    category: "Artificial Intelligence",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What represents a heuristic in the context of informed state-space searches?",
    options: [
      "An exact calculation of the shortest path to the goal",
      "An evaluation function that estimates the cost/distance from the current state to the goal",
      "A guarantee of finding the absolute optimal path first",
      "A random walk across the neighboring tree structures"
    ],
    correctAnswer: "B",
    explanation: "A heuristic function, h(n), estimates the lowest-cost path from node 'n' to a goal state. It incorporates domain-specific 'know-how' or rules-of-thumb rather than calculating exact mathematical combinations (which might be computationally intractable).",
    wrongOptionsExplanation: {
      "A": "Exact calculations represent exhaustive algorithms, not heuristics.",
      "C": "Heuristics are estimates and, unless matching strict requirements like admissibility, do not mathematically guarantee optimal paths.",
      "D": "A random walk represents pure uninformed stochastic exploration."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Heuristic Search", "Informed Search", "Graph Traversal", "AI Search Algorithms"]
  },

  // === MoE Exit Exam Scanned Real Questions ===
  {
    id: "moe_01",
    category: "Artificial Intelligence",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "Which one of the following lists of environments is the hardest for an agent?",
    options: [
      "Fully observable, sequential, deterministic",
      "Partially observable, static, continuous",
      "Deterministic, fully observable, static",
      "Sequential, non-deterministic, dynamic"
    ],
    correctAnswer: "D",
    explanation: "A sequential, non-deterministic, and dynamic environment is the hardest for any agent. Non-deterministic means actions have unpredictable outcomes, sequential means decisions have cumulative long-term effects, and dynamic means the state of the environment can change during the agent's computation.",
    wrongOptionsExplanation: {
      "A": "This is the easiest class of environment (e.g., standard puzzles like Chess) where everything is visible and completely predictable.",
      "B": "Static environments are much easier than dynamic ones because nothing changes while the agent decides.",
      "C": "This describes a extremely predictable and easy-to-solve sandbox situation."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Agent Environments", "Deterministic vs Stochastic", "Static vs Dynamic"]
  },
  {
    id: "moe_02",
    category: "Programming Fundamentals",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Medium,
    questionText: "What is the output of the following C++ fragment code?",
    codeSnippet: `int a = 6, b = 8;
int x = 2, y = 4;
int c = (x > y ? (a--, x) : (b--, y));
cout << "a= " << a;
cout << " b= " << b;
cout << " c= " << c;`,
    options: [
      "a= 5 b= 8 c= 4",
      "a= 6 b= 7 c= 4",
      "a= 6 b= 8 c= 4",
      "a= 5 b= 7 c= 2"
    ],
    correctAnswer: "B",
    explanation: "Let's trace the expression:\n- The condition (x > y) is (2 > 4), which is false.\n- Therefore, the ternary operator evaluates ONLY the false branch: (b--, y).\n- Since the true branch (a--, x) is skipped, 'a' remains 6.\n- The comma expression (b--, y) is evaluated. It decrements b from 8 to 7, and returns y (4).\n- Thus, c becomes 4.\n- Output: a= 6 b= 7 c= 4.",
    wrongOptionsExplanation: {
      "A": "Incorrect as it executes the decrement on 'a' instead of 'b'.",
      "C": "Incorrect because it fails to evaluate b-- in the false branch.",
      "D": "Incorrect as it erroneously evaluates both code branches."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Ternary Operators", "Comma Operator", "Post-decrement"]
  },
  {
    id: "moe_03",
    category: "Web Development",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which one of the following is not a delimiter of PHP code?",
    options: [
      "<? ................. ?>",
      "<?php ................. ?>",
      "<caption> ................. </caption>",
      "<script language=\"PHP\"> ................. </script>"
    ],
    correctAnswer: "C",
    explanation: "The tag <caption> is an HTML element used exclusively to define a table caption. All other options are historically valid open-close delimiters in PHP (short open tags, standard open tags, and legacy script tags).",
    wrongOptionsExplanation: {
      "A": "This is the short-open PHP tag, which can be enabled in php.ini configuration.",
      "B": "This is the standard, standard-compliant PHP delimiter.",
      "D": "This is a legacy, older style of inserting PHP blocks supported in early versions."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["PHP Basics", "HTML Tags", "Script Delimiters"]
  },
  {
    id: "moe_04",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which one of the following is not correct about threads?",
    options: [
      "Threads are the entities scheduled for execution on the CPU",
      "Threads have program counters",
      "It is a group of processes",
      "Threads have registers to hold its working memory"
    ],
    correctAnswer: "C",
    explanation: "A thread is not an accumulation of processes; rather, it is a lightweight unit of instruction execution residing *within* a single parent process. A process contains one or more threads which share its address space and operating system resources.",
    wrongOptionsExplanation: {
      "A": "This is true; threads are the basic units of scheduler dispatch in modern operating systems.",
      "B": "This is true; since threads execute independently, they must maintain their own Program Counters.",
      "D": "This is true; threads maintain their own register states and stack space to manage executing context."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Process vs Thread", "CPU Scheduling", "Thread Context"]
  },
  {
    id: "moe_05",
    category: "Cybersecurity",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which one of the following computers can be most secured compared to the rest?",
    options: [
      "A computer connected to the Internet and the latest anti-virus installed on it",
      "A computer connected to the Internet having strong intrusion detection",
      "A computer connected to the Internet with the latest firewall system",
      "A computer that is not connected to the Internet"
    ],
    correctAnswer: "D",
    explanation: "A computer that is completely disconnected from the Internet is 'air-gapped'. This eliminates remote external network attacks, malware injection routes, or data leakage vectors, rendering it far more secure than any internet-enabled machine, regardless of anti-virus or firewall levels.",
    wrongOptionsExplanation: {
      "A": "Anti-virus cannot protect against 0-day network intrusions on an active internet node.",
      "B": "Intrusion detection can alert and notify administrators, but does not render the systems physically impenetrable.",
      "C": "Firewalls can block unauthorized ports, but remote software exposures and phishing still represent vulnerabilities."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Air Gapping", "Attack Surface Reduction", "Network Isolation"]
  },
  {
    id: "moe_06",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which layer uses port numbers to identify applications?",
    options: [
      "Application layer",
      "Physical layer",
      "Network layer",
      "Transport layer"
    ],
    correctAnswer: "D",
    explanation: "The Transport Layer (Layer 4) of the OSI or TCP/IP reference model uses port numbers (e.g., port 80/443 for HTTP/S, or port 22 for SSH) to multiplex network sockets and deliver packets to correct host application processes.",
    wrongOptionsExplanation: {
      "A": "The Application Layer contains the specific protocols (DNS, HTTP) but relies on Transport Layer ports for stream demultiplexing.",
      "B": "The Physical Layer handles physical bits, encoding signals, line speeds, and media access interfaces.",
      "C": "The Network Layer uses IP addresses for packets routing between distributed subnets."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["OSI Model Layers", "Port Multiplexing", "TCP & UDP Protocols"]
  },
  {
    id: "moe_07",
    category: "Computer Architecture",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which one of the following is not correct about computer architecture and organization?",
    options: [
      "An organization can last for long time as an architecture does",
      "An architecture can remain for long time but its organization can change",
      "Manufacturers offer computer with same architecture but different organization",
      "An architecture can be used for long time encompassing different computer models"
    ],
    correctAnswer: "A",
    explanation: "Computer architecture behaves as the software-visible interface (ISA instruction sets, addressing schemes) and stays unchanged for decades to guarantee software compatibility. In contrast, computer organization represents hardware details (circuits, bus configurations, clock speeds) which change extremely fast. Hence, organization does NOT last as long as architecture.",
    wrongOptionsExplanation: {
      "B": "This is completely true; x86 architecture remained identical for decades despite massive internal changes.",
      "C": "This is true; Intel and AMD offer processors with the generic x86 architecture but distinct internal cache and execution pipelines.",
      "D": "This is true; standard instruction architectures successfully bridge multiple generational processing models."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Computer Architecture", "Computer Organization", "Instruction Set Architecture (ISA)"]
  },
  {
    id: "moe_08",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which one of the following is false about project planning stage?",
    options: [
      "Preparing time schedule is done during project planning",
      "Cost estimation is done during project planning",
      "Risk analysis is done during project planning",
      "Project planning is a one-time task in software development life cycle"
    ],
    correctAnswer: "D",
    explanation: "Project planning is an iterative, continuous activity, not a static, one-off phase. As the software development cycle progresses, risk profiles change, timelines adjust, and new requirements or roadblocks surface, necessitating constant real-time planning updates.",
    wrongOptionsExplanation: {
      "A": "This is true; creating milestones and timelines (Gantt charts) is standard during project planning.",
      "B": "This is true; resources and overall budgets are estimated during planning.",
      "C": "This is true; risk identification and mitigation playbooks are drafted early in the cycle."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Agile Planning", "Software Development Life Cycle (SDLC)", "Project Scope"]
  },
  {
    id: "moe_09",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "Advancement of operating system is closely tied to computer architectures. Which one of the following generation and advancement is wrongly coupled?",
    options: [
      "Second generation -> multiprogramming",
      "Fourth generation -> real time systems",
      "First generation -> single user",
      "Third generation -> batch system"
    ],
    correctAnswer: "A",
    explanation: "The second generation of operating systems (approx. 1955-1965) used transistors and operated on single-stream 'batch systems' (such as FMS or IBSYS). It did not support 'multiprogramming', which was introduced in the third generation (1965-1980) along with integrated circuits (e.g., OS/360).",
    wrongOptionsExplanation: {
      "B": "Fourth-generation systems fully encompass modern embedded real-time and distributed networks.",
      "C": "First generational computers lacked complex OS layers entirely, executing a single user's punched cards.",
      "D": "Third generation, while introducing multiprogramming, still frequently ran batch processing subsystems."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Generations of Operating Systems", "History of Computing", "Multiprogramming Basics"]
  },
  {
    id: "moe_10",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "Which one of the following is not correct about transaction failure?",
    options: [
      "Catastrophes can be cause of transaction failure",
      "Concurrency control enforcement avoids transaction failure",
      "Transactions fail if disk blocks lose their data",
      "Transactions fail if logical errors are detected"
    ],
    correctAnswer: "B",
    explanation: "Concurrency control enforcement (such as locking or 2-phase locking) manages overlapping transaction queues to preserve ACID serialization. It does not prevent transaction failures; in fact, concurrency control systems frequently abort/fail transactions themselves to break deadlocks or prevent inconsistent states.",
    wrongOptionsExplanation: {
      "A": "This is correct; physical power outages or system disasters inevitably disrupt transaction commit loops.",
      "C": "This is correct; physical disk surface problems lead to immediate disk block failures, aborting execution.",
      "D": "This is correct; if pre-compiled constraints or logical integrity are violated, transactions abort."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Transaction Failures", "Concurrency Control", "ACID Properties"]
  },
  {
    id: "moe_11",
    category: "Data Structures & Algorithms",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What is the time complexity order of binary searching algorithm?",
    options: [
      "O(1)",
      "O(log_2 n)",
      "O(n)",
      "O(n^3)"
    ],
    correctAnswer: "B",
    explanation: "At every decision cycle, the binary search algorithm divides the sorted array search space exactly in half. This logarithmically reduces the complexity to O(log_2 n) lookup operations.",
    wrongOptionsExplanation: {
      "A": "This represents constant time (such as array index lookup or hash table lookup).",
      "C": "This represents linear complexity (such as basic sequential search).",
      "D": "This represents cubic complexity search patterns."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Asymptotic Bounds", "Binary Search", "Divide & Conquer"]
  },
  {
    id: "moe_12",
    category: "Object-Oriented Programming",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "If you want to allow subclasses to access data fields or methods defined in the superclass, but not to allow non-subclasses to access them, which access modifier is appropriate?",
    options: [
      "public",
      "protected",
      "default",
      "private"
    ],
    correctAnswer: "B",
    explanation: "The 'protected' access modifier restricts access exclusively to elements inside the same package or any subclasses (even across different packages). This keeps standard non-subclasses outside.",
    wrongOptionsExplanation: {
      "A": "public variables are visible everywhere across the runtime scope.",
      "C": "default (package-private) only allows package-level matching, missing subclasses in outer packages.",
      "D": "private isolates variables purely inside the scope of the local class itself."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Access Modifiers", "Inheritance", "Information Hiding"]
  },
  {
    id: "moe_13",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In which situation does using a database management system (DBMS) become costly and not recommended?",
    options: [
      "In situations where more than one user should access the database",
      "In embedded systems having too small storage space",
      "To control redundancy",
      "To deny access to unauthorized users"
    ],
    correctAnswer: "B",
    explanation: "A robust DBMS adds heavy CPU, memory, and storage footprints for catalog management, transaction logging, and access control. In tiny embedded microcontrollers or resource-constrained devices, this overhead is too high, making compact local custom structures more appropriate.",
    wrongOptionsExplanation: {
      "A": "Multi-user access is the primary scenario where a DBMS is highly recommended.",
      "C": "Controlling redundancy is a major core function of using a relational database schema.",
      "D": "Enforcing data protection schemas is an excellent reason to use safe database management engines."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Relational Database Overhead", "Embedded SQLite", "Storage Management"]
  },
  {
    id: "moe_14",
    category: "Data Structures & Algorithms",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "Which statement is false about the universal hashing technique?",
    options: [
      "In universal hashing a hash function is selected from a set of hash functions independent of keys",
      "Universal hashing reduces the chance of data collision",
      "In universal hashing a hash function is selected randomly from a set of hash functions for each key",
      "Single fixed hash function technique is better than universal hashing technique in terms of collision reduction"
    ],
    correctAnswer: "D",
    explanation: "Using a single fixed hash function allows an attacker to choose adversarial keys that all hash to the same bucket, forcing O(n) lookup times. Universal hashing solves this by selecting a hash function randomly from a designed mathematical family at runtime, reducing the expected collision rate dynamically.",
    wrongOptionsExplanation: {
      "A": "This is true; the function is drawn randomly and completely independent of the keys of the elements.",
      "B": "This is true; mathematical bounds show that universal hashing provides low average collision rates.",
      "C": "This is true; a function is drawn randomly to handle all key structures recursively."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Universal Hashing", "Collisions", "Worst-case Complexity Bounds"]
  },
  {
    id: "moe_15",
    category: "Programming Fundamentals",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Easy,
    questionText: "What is the output of the following C++ fragment code?",
    codeSnippet: `int a, b;
a = 13;
b = 9;
while( (20 && 0) && (a > b) )
{
    cout << "Plants are our life";
}`,
    options: [
      "It displays message \"Plants are our life\" infinitely",
      "It displays message \"Plants are our life\" 20 times",
      "No message will be displayed",
      "It displays message \"Plants are Our life\" 4 times"
    ],
    correctAnswer: "C",
    explanation: "Let's evaluate the condition of the while loop step by step:\n- (20 && 0): Under C++ rules, 20 is true but 0 is false. This reduces to false (0).\n- false && (a > b): Because of short-circuit evaluation, this is instantly false (0).\n- Since the overall condition is false, the body of the loop is skipped completely. No print statements execute.",
    wrongOptionsExplanation: {
      "A": "Assumes the loop triggers infinitely, ignoring the false logical conditions.",
      "B": "Incorrectly assumes the numeric 20 is evaluated as a loop count ticker.",
      "D": "Miscalculates the difference between numeric a and b directly."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["While Loops", "Boolean Expressions", "Short-circuit Logic"]
  },
  {
    id: "moe_16",
    category: "Programming Fundamentals",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Medium,
    questionText: "What is the output of the following Java fragment code?",
    codeSnippet: `int[] list = new int[4];
int sum = 0;
for(int i = 0; i < list.length; i++)
{
    list[i] = i * 3;
    sum += list[i];
}
System.out.print(sum);`,
    options: [
      "18",
      "6",
      "3",
      "36"
    ],
    correctAnswer: "A",
    explanation: "Let's trace the loop execution:\n- list.length is 4.\n- Iteration 1 (i=0): list[0] = 0 * 3 = 0. sum += 0 (sum is 0).\n- Iteration 2 (i=1): list[1] = 1 * 3 = 3. sum += 3 (sum is 3).\n- Iteration 3 (i=2): list[2] = 2 * 3 = 6. sum += 6 (sum is 9).\n- Iteration 4 (i=3): list[3] = 3 * 3 = 9. sum += 9 (sum is 18).\n- The loop terminates. System.out.print prints 18.",
    wrongOptionsExplanation: {
      "B": "Incorrectly assumes the values are not indexed correctly.",
      "C": "Calculates only the single increment loop step.",
      "D": "Miscalculates overall array boundary bounds multiplication limits."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Arrays", "For Loops", "Trace Tables"]
  },
  {
    id: "moe_17",
    category: "Programming Fundamentals",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Medium,
    questionText: "What is the output of the following fragment C++ code?",
    codeSnippet: `for(int n = 1; n <= 18; n = n + 2)
{
    if(n % 7 != 0)
        cout << n << " ";
    else
        break;
}`,
    options: [
      "1 2 3 4 5 6",
      "1 3 5 7 9 11 13 15 17",
      "3 5 7",
      "1 3 5"
    ],
    correctAnswer: "D",
    explanation: "Let's trace the loop incrementing n by 2:\n- n = 1: 1 % 7 is 1 (not 0), prints '1 '.\n- n = 3: 3 % 7 is 3 (not 0), prints '3 '.\n- n = 5: 5 % 7 is 5 (not 0), prints '5 '.\n- n = 7: 7 % 7 is 0, which enters the 'else' branch and executes 'break'.\n- The loop exits immediately. Result: '1 3 5 '.",
    wrongOptionsExplanation: {
      "A": "Assumes sequential increment of 1 and prints basic count index limits.",
      "B": "Assumes the loop did not execute the break block upon hitting index n=7.",
      "C": "Misses the baseline starting integers of the system trace logic."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Loops with Conditions", "Modulo Operations", "Break Statements"]
  },
  {
    id: "moe_18",
    category: "Programming Fundamentals",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which one of the following is false about arrays in C++?",
    options: [
      "We use [ ] square bracket at the time of array declaration",
      "Size of an array should be constant at the time of array declaration",
      "An array is a collection of similar data objects",
      "We can access elements of arrays without using index numbers or pointer offsets"
    ],
    correctAnswer: "D",
    explanation: "In C++, to access any particular element inside an array block, you *must* provide either an index subscript (e.g., `arr[i]`) or a pointer offset (e.g., `*(arr + i)`). It is mathematically not possible to dereference individual elements without an offset tracker.",
    wrongOptionsExplanation: {
      "A": "This is true; arrays are declared using the standard square bracket notation.",
      "B": "This is true in standard C++; statically declared arrays require compile-time constant bounds.",
      "C": "This is true; arrays represent homogenous sequential structures containing elements of the same data type."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["C++ Arrays", "Pointers", "Memory Contiguity"]
  },
  {
    id: "moe_19",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "If you plan a software test to be done by clients to demonstrate that the system satisfies their requirements, which phase of software testing is appropriate?",
    options: [
      "System testing",
      "Unit testing",
      "Integration testing",
      "Acceptance testing"
    ],
    correctAnswer: "D",
    explanation: "Acceptance testing is the final phase of software testing, performed by clients or end-users, to evaluate if the application conforms to initial business agreements and is ready for rollout production.",
    wrongOptionsExplanation: {
      "A": "System testing is conducted by developers or testers to analyze full integration states, not client delivery.",
      "B": "Unit testing validates individual classes or functions in isolation.",
      "C": "Integration testing inspects data flows and interaction APIs between modular systems."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Software Testing Levels", "User Acceptance Testing (UAT)", "Software Validation"]
  },
  {
    id: "moe_20",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "At which layer of the OSI model are devices such as bridges, switches, and Network Interface Cards (NICs) primarily used?",
    options: [
      "Physical layer",
      "Data link layer",
      "Application layer",
      "Network layer"
    ],
    correctAnswer: "B",
    explanation: "Layer 2 switches, bridges, and network cards operate primarily at the Data Link Layer. They use MAC addresses encoded inside physical hardware frames to direct traffic to appropriate destinations.",
    wrongOptionsExplanation: {
      "A": "Physical Layer components consist of hubs, cables, repeaters, and raw bit connectors.",
      "C": "The Application Layer runs on high-level software stacks (DNS, HTML, FTP).",
      "D": "The Network Layer hosts routers managing packet movements using IP definitions."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Layer 2 devices", "OSI Architecture", "Ethernet Frames"]
  },
  {
    id: "moe_21",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which one of the following is not correct about packet and circuit switching?",
    options: [
      "In Packet switching an end-to-end connection has to be established",
      "In circuit switching a channel is dedicatedly used",
      "Packet switching is more efficient than circuit switching",
      "In packet switching messages are sent in small blocks"
    ],
    correctAnswer: "A",
    explanation: "In packet switching, communication is connectionless; packets travel independently using alternate optimal routes, meaning no static end-to-end connections are established prior to transmission (unlike circuit-switched phone lines).",
    wrongOptionsExplanation: {
      "B": "This is correct; circuit switching locks a dedicated physical channel between source and destination.",
      "C": "This is correct; packet switching allows sharing lines among millions, resulting in massive bandwidth efficiency.",
      "D": "This is correct; packet switching breaks long data blocks into manageable bytes with headers."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Packet Switching vs Circuit Switching", "Network Routing Protocols"]
  },
  {
    id: "moe_22",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "A computer expert would like to know the number of processes that are completed per hour to assess the performance of a machine. Which metric best describes the expert's assessment?",
    options: [
      "System throughput",
      "Response time",
      "Turnaround time",
      "Waiting time"
    ],
    correctAnswer: "A",
    explanation: "System throughput is defined as the amount of work completed by the operating system CPU scheduler per unit of time (e.g., number of processes completed per code hour).",
    wrongOptionsExplanation: {
      "B": "Response time is the duration between process request submittal and the generation of its first response.",
      "C": "Turnaround time measures the exact lifespan from submission to final shutdown completes.",
      "D": "Waiting time is the total cumulative time a process spends idle inside scheduler queues."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["OS Scheduling Metrics", "Throughput Bounds", "Scheduler Efficiency"]
  },
  {
    id: "moe_23",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What does program-data independence in the database approach entail?",
    options: [
      "Data and applications are defined separately",
      "Both program and data are defined together",
      "Programs can create redundant data independently",
      "The application may be affected when data changes"
    ],
    correctAnswer: "A",
    explanation: "Program-data independence ensures database structural catalogs are stored in DBMS catalog system files separately from the application's executable programs, so a change to the physical storage does not require updates to the layout of user application codes.",
    wrongOptionsExplanation: {
      "B": "Defining programs and data schemas tightly together represents legacy file-processing limitations.",
      "C": "Programs creating random overlapping redundancy wastes spaces and ruins database integrity.",
      "D": "This describes a lack of program-data independence."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Database Schema Abstraction", "Program-Data Independence"]
  },
  {
    id: "moe_24",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "Which branch of study deals with whether a problem can be solved at all or not, regardless of the physical computing resources required?",
    options: [
      "Complexity theory",
      "Computability theory",
      "Set theory",
      "Automata theory"
    ],
    correctAnswer: "B",
    explanation: "Computability theory class studies whether problems are mathematically decidable / solvable at all (e.g., the Halting Problem on Turing Machines) regardless of speed, while Complexity theory focuses on CPU/memory resource limits.",
    wrongOptionsExplanation: {
      "A": "Complexity theory classifies solvable problems based on resources (e.g., P vs NP class).",
      "C": "Set theory is a branch of logic detailing structural collections of properties.",
      "D": "Automata theory studies abstract mathematical machines and models of execution."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Decidability", "Computability Theory", "Halting Problem"]
  },
  {
    id: "moe_25",
    category: "Data Structures & Algorithms",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which of the following algorithms can be used to extract a Minimum Spanning Tree (MST) from an input graph?",
    options: [
      "Dijkstra's algorithm",
      "Prim's algorithm",
      "Merge sort algorithm",
      "Huffman encoding algorithm"
    ],
    correctAnswer: "B",
    explanation: "Prim's algorithm (along with Kruskal's algorithm) is a greedy algorithm designed to find a Minimum Spanning Tree for a weighted undirected graph, connecting all nodes with the lowest aggregate weight.",
    wrongOptionsExplanation: {
      "A": "Dijkstra's calculates shortest path spanning trees from a single source node, which differs from general MSTs.",
      "C": "Merge sort is a divide-and-conquer algorithm to organize sequential linear arrays.",
      "D": "Huffman coding is used for compression."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Minimum Spanning Tree (MST)", "Greedy Algorithms", "Kruskal & Prim"]
  },
  {
    id: "moe_26",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "Which deadlock prevention mechanism does not require transaction timestamps?",
    options: [
      "Wait-die",
      "Wound-wait",
      "No-wait",
      "Wait-wait"
    ],
    correctAnswer: "C",
    explanation: "Under the 'No-wait' non-blocking policy, if a transaction requests a lock held by another transaction, it is aborted and restarted immediately without waiting. Because no transaction is ever allowed to wait, a deadlock cycle cannot form, which eliminates the need to calculate transaction timestamps.",
    wrongOptionsExplanation: {
      "A": "Wait-die relies strictly on comparing transaction timestamps (older waits, younger dies).",
      "B": "Wound-wait relies on timestamps to let older transaction wound/preempt younger ones.",
      "D": "This is a dummy term and not a standard transaction policy."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Deadlock Prevention", "Two-Phase Locking", "Database Schedulers"]
  },
  {
    id: "moe_27",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which concurrency anomaly is described below? 'Two transactions access the same database items, and their operations are interleaved in a way that makes the value of some database item incorrect because one overwrite directly deletes the other update.'",
    options: [
      "Temporary read problem",
      "Dirty read problem",
      "Lost update problem",
      "Incorrect summary problem"
    ],
    correctAnswer: "C",
    explanation: "The lost update problem occurs when two transactions read the exact same item, update it locally, and both write back. The transaction that commits last overwrites and completely loses the update performed by the first transaction.",
    wrongOptionsExplanation: {
      "A": "Temporary read (dirty read) happens when a transaction reads data that has been modified by an uncommitted transaction which eventually rolls back.",
      "B": "Dirty read is a synonym for temporary read anomalies.",
      "D": "Incorrect summary happens when an aggregate function calculates totals while other transactions are actively modifying those records."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Concurrency Anomalies", "Levels of Isolation", "Lost Update Anomaly"]
  },
  {
    id: "moe_28",
    category: "Data Structures & Algorithms",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "A linked list is a ___________ type of data structure.",
    options: [
      "Dynamic data structure",
      "Fixed size data structure",
      "Non-linear data structure",
      "Static data structure"
    ],
    correctAnswer: "A",
    explanation: "Linked lists are linear, dynamic structures. Memory is allocated on the fly for individual node wrappers at runtime, allowing the structure to grow and shrink dynamically without requiring contiguous memory blocks.",
    wrongOptionsExplanation: {
      "B": "Linked lists can fluctuate in size, unlike fixed arrays.",
      "C": "Linked lists are structurally linear (one successor per node), unlike Trees or Graphs.",
      "D": "Static data structures require compilation-set layout locks (such as static arrays)."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Dynamic Memory Allocation", "Linked List Basics", "Linear Structures"]
  },
  {
    id: "moe_29",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which network type is the largest compared to the rest?",
    options: [
      "Metropolitan Area Network",
      "Local Area Network",
      "Wide Area Network",
      "The Internet"
    ],
    correctAnswer: "D",
    explanation: "The Internet is a global network of interconnected computer networks spanning countries and hemispheres, which is exponentially larger than Metropolitan Area Networks (MANs), Local Area Networks (LANs), or basic Wide Area Networks (WANs).",
    wrongOptionsExplanation: {
      "A": "MANs span limited municipal geographical regions like a city.",
      "B": "LANs are confined within tight physical boundaries like a school, office, or home.",
      "C": "WANs span states or countries, but form components of the global Internet."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Network Classifications", "Scope of Networks", "Global Networking"]
  },
  {
    id: "moe_30",
    category: "Artificial Intelligence",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Let x represent the complete sequence of everything that an intelligent agent has observed so far in its environment. What is the standard scientific term for x?",
    options: [
      "Action history",
      "Knowledge state",
      "Percept sequence",
      "Performance measure"
    ],
    correctAnswer: "C",
    explanation: "In AI terminology (Russell & Norvig), a 'percept sequence' is the complete history of everything the agent has perceived/received from its sensors over time. An agent's action choice can depend mathematically on its entire percept sequence.",
    wrongOptionsExplanation: {
      "A": "Action history tracks output efforts made by the actuators, not inbound observations.",
      "B": "Knowledge state represents internal data structures, which is derived from the percept sequence.",
      "D": "Performance measure is the test metric assessing the success of agent actions."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["AI Agent Primitives", "Percept Sequence", "Rational Action"]
  }
];

