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
  },
  {
    id: "moe_31",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "For an IP block of 192.168.10.0/27, what is the correct subnet mask and the maximum number of usable host addresses that can be assigned to active nodes?",
    options: [
      "255.255.255.224 and 30 usable host addresses",
      "255.255.255.192 and 62 usable host addresses",
      "255.255.255.240 and 14 usable host addresses",
      "255.255.255.128 and 32 usable host addresses"
    ],
    correctAnswer: "A",
    explanation: "A /27 subnet mask has 27 ones in binary, which is 255.255.255.224 in decimal notation. This leaves 32 - 27 = 5 bits for the host ID. The total IP block is 2^5 = 32 addresses. Subtracting 2 for the Network ID and Broadcast ID leaves 30 usable host addresses.",
    wrongOptionsExplanation: {
      "B": "This calculates a /26 subnet configuration (mask 255.255.255.192 with 62 hosts).",
      "C": "This calculates a /28 subnet configuration (mask 255.255.255.240 with 14 hosts).",
      "D": "This calculates a /25 subnet and omits subtracting the network and broadcast addresses."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Subnetting Math", "Usable Hosts", "CIDR Notation"]
  },
  {
    id: "moe_32",
    category: "Data Structures & Algorithms",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Given a Binary Search Tree (BST) containing integers. Which traversal sequence is guaranteed to visit the nodes and return these elements in sorted ascending order?",
    options: [
      "Postorder Traversal (L -> R -> N)",
      "Preorder Traversal (N -> L -> R)",
      "Inorder Traversal (L -> N -> R)",
      "Levelorder Breadth-First Traversal"
    ],
    correctAnswer: "C",
    explanation: "By mathematical design, an Inorder Traversal visits the left subtree, the root node, and then the right subtree. In a Binary Search Tree, all elements smaller than the root are in the left subtree, and all larger elements are in the right subtree. Therefore, Inorder traversal is guaranteed to output elements in sorted ascending order.",
    wrongOptionsExplanation: {
      "A": "Postorder is typically used for node deletion or postfix mathematical notations.",
      "B": "Preorder matches top-down recursive copies of tree structures.",
      "D": "Levelorder sweeps level by level using a queue, which does not output elements sorted."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Binary Search Tree", "Inorder Traversal", "Systematic Sorts"]
  },
  {
    id: "moe_33",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "Which of the following languages cannot be modeled and recognized by a Deterministic Finite Automaton (DFA)?",
    options: [
      "The set of all binary strings containing an even number of zeros.",
      "The language L = { a^n b^n | n >= 0 } of matching balances.",
      "The set of all strings over {a, b} that end in 'abb'.",
      "The language of all binary numbers divisible by 3."
    ],
    correctAnswer: "B",
    explanation: "The language L = { a^n b^n | n >= 0 } requires an arbitrary level of memory to count the number of 'a's and ensure that exactly that many 'b's follow. A Finite Automaton (DFA) has a finite state limit and no stack, so it cannot count to infinity. To recognize L, a Pushdown Automaton (PDA) with stack capability is required.",
    wrongOptionsExplanation: {
      "A": "This is a regular language which requires a simple 2-state switching DFA.",
      "C": "This is closed and finite, easily modeled with a 4-state transition DFA.",
      "D": "This can be modeled using a 3-state DFA representing remainder positions (0, 1, 2) when modular arithmetic is applied."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Pumping Lemma", "Regular Languages", "Chomsky Type-3 Limit"]
  },
  {
    id: "moe_34",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In UML class modeling, which structural relationship represents a strong ownership pattern where part objects are completely dependent on their container, meaning they are deleted along with it?",
    options: [
      "Aggregation (Empty Diamond Notation)",
      "Composition (Filled Diamond Notation)",
      "Dependency (Dashed Arrow Notation)",
      "Generalization (Solid Arrow with Hollow Triangle)"
    ],
    correctAnswer: "B",
    explanation: "Composition is a strict form of association representing a 'has-a' relationship. The lifecycle of the parts is governed by the container; if the container is destroyed, all its composite parts are likewise destroyed.",
    wrongOptionsExplanation: {
      "A": "Aggregation is a weak structural relationship; the parts can exist independently of the container (e.g., student in a department).",
      "C": "Dependency represent momentary usage relation, usually on local arguments.",
      "D": "Generalization represents inheritance structures (superclass vs subclass relationships)."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["UML Class Relationships", "Composition Ownership", "Aggregation Principles"]
  },
  {
    id: "moe_35",
    category: "Programming Fundamentals",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Hard,
    questionText: "What is the final value of the variable 'result' after executing this C++ code block?",
    codeSnippet: `int x = 4;
int result = ++x * 2 + x++ * 3;`,
    options: [
      "22",
      "25",
      "24",
      "20"
    ],
    correctAnswer: "B",
    explanation: "Let's trace the expression step-by-step:\n- ++x is a prefix increment. x is incremented in memory from 4 to 5, and then returns 5. The first operand evaluates to `5 * 2 = 10`.\n- Next, x stands at 5. x++ is a postfix increment. It evaluates to the current value of x, which is 5. So, the second operand evaluates to `5 * 3 = 15`. After this operation completes, x becomes 6 in memory.\n- The sum is `10 + 15 = 25`.",
    wrongOptionsExplanation: {
      "A": "This assumes the postfix value didn't execute immediately or was evaluated differently.",
      "C": "This mistakes the timing of the prefix increment multiplier.",
      "D": "This is based on an incorrect evaluation of both prefix and postfix rules."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Unary Operators Precedence", "Tracing Registers", "Pre-increment vs Post-increment"]
  },
  {
    id: "moe_36",
    category: "Object-Oriented Programming",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What occurs when a subclass in Java or C++ declares a method with the exact same name, return type, and argument list of an existing method in its superclass?",
    options: [
      "Method Overloading",
      "Method Hiding",
      "Method Overriding",
      "Dynamic Compilation Link Error"
    ],
    correctAnswer: "C",
    explanation: "Declaring a method in a subclass with the same signature (name, parameters, return type) is called Method Overriding. This enables dynamic dispatch, where the subclass's override method is executed at runtime based on the actual object instance.",
    wrongOptionsExplanation: {
      "A": "Overloading represents declaring methods with the same name but different argument counts or types (resolved at compile-time).",
      "B": "Method Hiding occurs when a subclass redefines static methods of its parent class.",
      "D": "There is no compilation error; this is a core OOP feature enabling virtual class structures."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Runtime Polymorphism", "Method Signatures", "Dynamic Dispatch"]
  },
  {
    id: "moe_37",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In a paged virtual memory system, the page size is 4KB (4096 bytes). If a process generates a logical address of 12300, what is the mapped Page Number and the corresponding Offset inside that page?",
    options: [
      "Page Number = 3, Offset = 12",
      "Page Number = 2, Offset = 8",
      "Page Number = 3, Offset = 12300",
      "Page Number = 2, Offset = 4108"
    ],
    correctAnswer: "A",
    explanation: "To find the Page Number, divide the logical address by the page size: `12300 / 4096 = 3.0029`, meaning we are on Page 3 (0-indexed: Page 0 is 0-4095, Page 1 is 4096-8191, Page 2 is 8192-12287, and Page 3 is 12288-16383). \nThe offset is the remainder: `12300 % 4096 = 12300 - (3 * 4096) = 12300 - 12288 = 12`.",
    wrongOptionsExplanation: {
      "B": "Incorrectly divides the address blocks, missing the offset remainder location.",
      "C": "Offset cannot exceed page size limit (4096).",
      "D": "This is mathematically wrong and places the offset outside the boundaries of a 4KB chunk."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Paging calculations", "Offset Limits", "Memory Management Unit"]
  },
  {
    id: "moe_38",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "A database table R(A, B, C, D) has a composite primary key consisting of attributes (A, B). If the functional dependency B -> C exists, which of the normal forms is violated?",
    options: [
      "First Normal Form (1NF)",
      "Second Normal Form (2NF)",
      "Third Normal Form (3NF)",
      "Boyce-Codd Normal Form (BCNF)"
    ],
    correctAnswer: "B",
    explanation: "The functional dependency B -> C is a Partial Key Dependency because non-key attribute C depends on a subset (B) of the complete composite primary key (A, B). Second Normal Form (2NF) prohibits partial key dependencies (all non-key fields must be fully functionally dependent on the entire primary key). Thus, 2NF is violated.",
    wrongOptionsExplanation: {
      "A": "1NF is not violated because the attributes are atomic.",
      "C": "A table must satisfy 2NF before being checked for 3NF transitive dependencies.",
      "D": "A schema cannot reach BCNF if it fails to satisfy the rules of 2NF first."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Relational Integrity Constraints", "Partial Dependencies", "2NF Violations"]
  },
  {
    id: "moe_39",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which layer of the standard ISO/OSI Reference Model is responsible for routing packets across interconnected networks using logical IP addresses?",
    options: [
      "Data Link Layer (Layer 2)",
      "Network Layer (Layer 3)",
      "Transport Layer (Layer 4)",
      "Physical Layer (Layer 1)"
    ],
    correctAnswer: "B",
    explanation: "The Network Layer (Layer 3) handles the logical addressing and routing of packets across networks. Standard devices operating at this layer include routers, which evaluate IP block targets to find optimal pathways.",
    wrongOptionsExplanation: {
      "A": "Data Link layer moves frames locally using hardware physical MAC addresses inside a single segment.",
      "C": "Transport layer manages end-to-end reliability, sequence numbers, and port addressing.",
      "D": "Physical layer works with raw sequence streams of physical electrical bits and copper lines."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["OSI Layer Models", "Logical Routing", "Routers and Switches"]
  },
  {
    id: "moe_40",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "The Halting Problem, which asks whether a general computer program will eventually finish running or execute infinitely for a given input, is scientifically proved to be:",
    options: [
      "Decidable for any Turing Machine.",
      "Undecidable for general computational systems.",
      "Decidable on deterministic systems only.",
      "Solvable in polynomial time (P)."
    ],
    correctAnswer: "B",
    explanation: "Alan Turing proved in 1936 that no general algorithm can exist that correctly solves the Halting Problem for all possible program-input pairs. Thus, the Halting Problem is one of the classic examples of an undecidable problem.",
    wrongOptionsExplanation: {
      "A": "It is proved to be undecidable on Turing machines.",
      "C": "Deterministic or non-deterministic systems make no difference; it cannot be decided generally.",
      "D": "Since it cannot be solved at all, it does not belong in class P or any other decidable complexity class."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Computability Theory", "Undecidable Languages", "Alan Turing Proof"]
  },
  {
    id: "moe_41",
    category: "Data Structures & Algorithms",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What is the asymptotic worst-case execution time (Big-O) of an algorithm with two nested loops, where the outer loop iterates n times and the inner loop iterates n/2 times?",
    options: [
      "O(n log n)",
      "O(n)",
      "O(n^2)",
      "O(2^n)"
    ],
    correctAnswer: "C",
    explanation: "The total iterations is computed as: n * (n / 2) = (n^2) / 2. In asymptotic Big-O notation, constant factors like 1/2 are ignored. The dominant growth term is quadratic, so the worst-case time complexity is O(n^2).",
    wrongOptionsExplanation: {
      "A": "This describes linearithmic algorithms (like Merge Sort).",
      "B": "This represents linear single-loop algorithms.",
      "D": "This represents exponential algorithms (like recursive solutions to towers of Hanoi)."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Quadratic Growth Rates", "Big-O Precedence Rules", "Code Nested Loops Analysis"]
  },
  {
    id: "moe_42",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which software testing methodology requires complete, fine-grained visibility into the internal code structures, control branches, loop conditions, and execution paths?",
    options: [
      "Black-Box Testing",
      "User Acceptance Testing",
      "White-Box Testing",
      "System Recovery Testing"
    ],
    correctAnswer: "C",
    explanation: "White-box testing (or structural testing) requires complete visibility into the source code. Testers design test inputs to ensure maximum coverage of lines, paths, conditions, and logical branches in the program.",
    wrongOptionsExplanation: {
      "A": "Black-box testing covers functional inputs and outputs without any access to the internal code structures.",
      "B": "User Acceptance testing mimics simple business use scenarios by clients, separate from code details.",
      "D": "System Recovery tests structural safety tolerances after artificial crashes or network losses."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Testing Methodologies", "Structural Coverage Analysis", "Whitebox Bounds"]
  },
  {
    id: "moe_43",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In Operating Systems concurrency design, Coffman's rules define four conditions that must occur simultaneously for a deadlock to build. What does the 'Circular Wait' condition imply?",
    options: [
      "Processes must cycle through states in ready, blocked, and active queues in a circular pattern.",
      "There is a closed chain of processes where each process holds resources and waits for resources held by the next process in the chain.",
      "Resources must be returned in a circular pipeline to prevent system crashes.",
      "If a lock is obtained, it must cycle back to the main CPU resource queue within a single thread tick."
    ],
    correctAnswer: "B",
    explanation: "The Circular Wait condition specifies that a closed loop of processes {P0, P1, ..., Pn} exists where P0 is waiting for a resource held by P1, P1 is waiting for P2, and Pn is waiting for a resource held by P0.",
    wrongOptionsExplanation: {
      "A": "This refers to process lifecycle management inside ready queues, not deadlock locking conditions.",
      "C": "Resource pipelining has nothing to do with Coffman's conditions.",
      "D": "Lock limits are governed by access variables, not cyclic thread rotations."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Coffman Conditions", "Concurrency Deadlocks", "Circular Dependency Structures"]
  },
  {
    id: "moe_44",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "The Entity Integrity rule in standard relational database systems specifies that:",
    options: [
      "A foreign key must refer to a valid primary key or be set to null.",
      "Every value in a column must satisfy a pre-defined range constraint.",
      "No primary key attribute (or prime attribute of a composite key) can contain a null value.",
      "Different tables must have distinct file locations on disk."
    ],
    correctAnswer: "C",
    explanation: "The Entity Integrity rule states that primary keys uniquely identify tuples in a relation. If primary key attributes were allowed to be null, tuples could not be distinguished from one another. Hence, primary keys must never be null.",
    wrongOptionsExplanation: {
      "A": "This defines the Referential Integrity constraint.",
      "B": "This defines domain-level values checklist constraints.",
      "D": "Storage boundaries belong to physical levels, not logical integrity constraints."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Entity Integrity Constraints", "Relational Model Integrity Rules", "Primary Key Constraints"]
  },
  {
    id: "moe_45",
    category: "Programming Fundamentals",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Medium,
    questionText: "Trace this C++ statement: 'int a = 0, b = 5; if (a && ++b) { b += 10; }'. What is the value of 'b' after execution completes?",
    options: [
      "15",
      "6",
      "5",
      "16"
    ],
    correctAnswer: "C",
    explanation: "This is a short-circuit AND evaluation trap. The expression evaluates `a && ++b`. Since `a == 0` (which is false), the logical AND operator already knows the overall condition must be false. Therefore, the compiler short-circuits and skips evaluating the second expression, `++b`. Thus, `b` is never incremented, and remains 5. The block inside the 'if' is skipped as well, leaving `b = 5`.",
    wrongOptionsExplanation: {
      "A": "This assumes both the increment and the interior block executed.",
      "B": "This assumes the increment executed but the interior block was skipped.",
      "D": "This is based on evaluating both components incorrectly."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Lazy Evaluation", "Short-Circuit AND Gates", "Logical Tracing Rules"]
  },
  {
    id: "moe_46",
    category: "Object-Oriented Programming",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "In Java, if a developer wants to make a class attribute visible to subclasses in other packages, but hide it from random unrelated classes in the application, which access modifier should be declared?",
    options: [
      "private",
      "default (no modifier specified)",
      "protected",
      "public"
    ],
    correctAnswer: "C",
    explanation: "The protected modifier specifies that elements are visible within classes of the same package, and additionally to any subclasses of that class, even if they reside in different packages.",
    wrongOptionsExplanation: {
      "A": "Private fields are visible ONLY within the declaring class itself.",
      "B": "Default scope (package-private) denies access to classes residing outside the package, including subclasses.",
      "D": "Public fields are exposed globally to all classes in the entire application scope, which violates information hiding."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Information Hiding", "Package Directories Mapping", "Access Modifiers Matrix"]
  },
  {
    id: "moe_47",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which software process model is structurally rigid and NOT suitable to accommodate changes during the software development lifecycle?",
    options: [
      "Waterfall model",
      "Scrum framework",
      "Rapid Application Development (RAD)",
      "Extreme Programming (XP)"
    ],
    correctAnswer: "A",
    explanation: "The Waterfall model flows in a single linear direction from requirements down to deployment and maintenance. Due to its sequential blocks and phase-completion gates, going back to accommodate changed client feedback can require restarting the lifecycle, making it extremely rigid compared to Agile techniques.",
    wrongOptionsExplanation: {
      "B": "Scrum is highly iterative and designed to handle rapid prioritization of features via Sprints.",
      "C": "RAD builds running prototypes continuously to support evolving systems designs.",
      "D": "XP includes continuous customer feedback and refactoring loops specifically to welcome requirements changes."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Process Models", "Waterfall Constraints", "Agile Flexibility"]
  },
  {
    id: "moe_48",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which Medium Access Control (MAC) protocol is supported and used by Wireless Local Area Networks (WLAN) operating under the IEEE 802.11 standard?",
    options: [
      "ALOHA",
      "CSMA/CA",
      "Token Passing",
      "CSMA/CD"
    ],
    correctAnswer: "B",
    explanation: "IEEE 802.11 (WLAN) uses CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance). Unlike wired Ethernet which utilizes Collision Detection (CSMA/CD), wireless radios cannot transmit and receive on the same channel simultaneously to reliably detect collisions. Therefore, they listen to the medium first and issue Request to Send (RTS) / Clear to Send (CTS) frames to *avoid* collisions beforehand.",
    wrongOptionsExplanation: {
      "A": "ALOHA is an older, purely random access protocol used mainly in legacy satellite packet transmissions.",
      "C": "Token Passing is used in Token Ring (802.5) or FDDI networks, utilizing a circulating frame token to coordinates accesses.",
      "D": "CSMA/CD is designed exclusively for wired Ethernet (802.3) where hardware can actively sense voltage spikes representing signal conflicts."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Medium Access Control", "Wireless Standards", "Carrier Sensing CSMA"]
  },
  {
    id: "moe_49",
    category: "Database Systems",
    type: QuestionType.ScenarioBased,
    difficulty: Difficulty.Medium,
    questionText: "In which of the following scenarios does deploying a full-scale Relational Database Management System (RDBMS) become historically costly and not recommended?",
    options: [
      "In situations where more than one concurrent user should access the database.",
      "In embedded systems having extremely small hardware storage and memory capacity.",
      "When developers design tables specifically to control redundant duplication.",
      "When security administrators need to deny data access to unauthorized users."
    ],
    correctAnswer: "B",
    explanation: "Full-scale database systems (like Oracle or PostgreSQL) carry high computational overhead, require considerable storage blocks, and consume significant random access memory. For embedded systems with severe storage limitations, writing data directly to flat files or using lightweight storage engines like SQLite is far more efficient.",
    wrongOptionsExplanation: {
      "A": "Concurrent access by multiple users is one of the main advantages of an RDBMS, easily justifying its cost.",
      "C": "RDBMS normalization techniques are specifically meant to control redundant duplication.",
      "D": "RDBMS access-control mechanisms (like GRANT/REVOKE) provide the necessary infrastructure to keep databases secure."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["DBMS Suitability Decisions", "Resource Constrained Systems", "SQLite vs. RDBMS"]
  },
  {
    id: "moe_50",
    category: "Web Development",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which of the following is NOT correct or supported as a standard code block delimiter in PHP scripts?",
    options: [
      "<? ... ?>",
      "<?php ... ?>",
      "<caption_name> ... </caption_name>",
      "<script language=\"PHP\"> ... </script>"
    ],
    correctAnswer: "C",
    explanation: "The HTML `<caption>` element is used to specify a table title and is completely unrecognized as a PHP code script delimiter. Delimiters like `<?php ... ?>`, `<? ... ?>` (short tags), or `<script language=\"PHP\"> ... </script>` are valid delimiters parsed by Web Servers.",
    wrongOptionsExplanation: {
      "A": "This represents PHP short tags, which are valid if enabled in the PHP ini directives.",
      "B": "This is the default, fully compliant PHP open and close tag script delimiter.",
      "D": "This is an alternative script Tag syntax historically used to embed PHP within older HTML templates."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["PHP Delimiters", "Server-side Parsing", "Dynamic Web Standards"]
  },
  {
    id: "moe_51",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which layer of the OSI reference model relies on port numbers (such as port 80 for HTTP or port 443 for HTTPS) to identify and distinguish distinct target applications on a host?",
    options: [
      "Application layer",
      "Physical layer",
      "Network layer",
      "Transport layer"
    ],
    correctAnswer: "D",
    explanation: "Port allocation is a Transport Layer (Layer 4) concept. Protocols like TCP and UDP append port source and destination fields in their headers so the receiver can route incoming datagram streams to the exact active software process (e.g., mail server vs. web server) listening on that socket.",
    wrongOptionsExplanation: {
      "A": "The Application layer handles application protocol messages like HTTP GET, but does not route packets using port indexes.",
      "B": "The Physical layer deals mechanically with voltages, cable counts, and raw binary streams.",
      "C": "The Network layer (Layer 3) handles end-to-end routing based on IP addresses, independent of local software ports."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["OSI Layer Headers", "Transport Sockets", "Multiplexing/Demultiplexing"]
  },
  {
    id: "moe_52",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which of the following statements is NOT correct concerning thread processing inside operating systems?",
    options: [
      "Threads have their own independent program counter values.",
      "Threads are the basic schedulable threads of execution on the CPU.",
      "A threat/thread is technically defined as a group of active processes.",
      "Each thread possesses individual registers to hold lightweight working memories."
    ],
    correctAnswer: "C",
    explanation: "This is false because a thread is a lightweight sub-unit *within* a single parent process, sharing its code space, global blocks, and file descriptor indices. It cannot be defined as a 'group of active processes' (which would actually be a process group or cluster).",
    wrongOptionsExplanation: {
      "A": "Every thread must track its own active instruction offset, so it keeps an independent CPU Program Counter record.",
      "B": "The OS dispatch scheduler schedules threads as its base unit of CPU execution.",
      "D": "To maintain register context switches, each thread has an individual register file and stack frame allocation."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Thread Attributes", "Process vs. Thread Architecture", "Context Switching Overhead"]
  },
  {
    id: "moe_53",
    category: "Programming Fundamentals",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Hard,
    questionText: "Trace this C++ code fragment and determine the console outputs:\n\nint a = 6, b = 8;\nint x = 2, y = 4;\nint c = (x > y ? (a--, x) : (b--, y));\ncout << \"a=\" << a << \" b=\" << b << \" c=\" << c;",
    options: [
      "a=5 b=8 c=4",
      "a=6 b=7 c=4",
      "a=6 b=8 c=4",
      "a=5 b=7 c=2"
    ],
    correctAnswer: "B",
    explanation: "Let's trace:\n1. The ternary conditional statement checks `x > y` which translates to `2 > 4` (false).\n2. Therefore, the ternary operator ignores the left expression `(a--, x)` and evaluates strictly the right expression `(b--, y)`.\n3. The right expression contains a comma operator. The left side of the comma is `b--` (postfix decrement of b). This decrements `b` from 8 to 7, but returns 8. The right side of the comma is `y`, which holds the value 4.\n4. The comma operator returns the rightmost element `y` (value 4), which is assigned to `c`.\n5. Since the left branch `(a--, x)` was completely skipped, `a` remains 6. `b` is 7 from decrement. `c` receives 4. Output: 'a=6 b=7 c=4'.",
    wrongOptionsExplanation: {
      "A": "Assumes the true branch `a--` was evaluated, which represents conditional flow errors.",
      "C": "Assumes the comma operator executed b-- but didn't actually decrement b (confusing postfix scopes with ternary branches).",
      "D": "Assumes both branches of the ternary operator where evaluated under compilation."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Ternary Execution Rules", "Comma Operator Properties", "Postfix De-incrementation"]
  },
  {
    id: "moe_54",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What does program-data independence in the modern database approach guarantee?",
    options: [
      "Data files and application software are defined and stored separately so that schema changes do not break programs.",
      "Both programs and data definitions are compiled together into a single self-contained application file.",
      "Different user programs can create redundant tables independently without centralized DBMS audits.",
      "Logical application code is permitted to directly bypass database servers and read physical blocks of tables."
    ],
    correctAnswer: "A",
    explanation: "Program-data independence ensures that the structure of the data (schema) is defined separately from the application code. It allows DBA modifications to the conceptual or internal database indexes without requiring updates to application user programs, resolving the extreme rigidities of legacy file system designs.",
    wrongOptionsExplanation: {
      "B": "Compiling program and data definitions together defines tightly-coupled legacy system models, not database approaches.",
      "C": "Database systems strictly restrict independent redundant table creations to maintain consistency.",
      "D": "Bypassing servers to read raw tables directly violates data independence and access-control boundaries."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Three-schema Architecture", "Program-Data Independence", "Logical Data Integrity"]
  },
  {
    id: "moe_55",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "An operating systems specialist measures the total number of processes that are fully executed and completed per hour to assess a CPU's general efficiency. Which scheduling metric is being assessed?",
    options: [
      "System throughput",
      "Response time",
      "Turnaround time",
      "Waiting time"
    ],
    correctAnswer: "A",
    explanation: "System throughput is defined as the number of processes completed per unit of time (such as per minute or per hour). High throughput indicates a highly efficient scheduler which maximizes active task executions.",
    wrongOptionsExplanation: {
      "B": "Response time measures the elapsed time from process submission until the CPU writes its first output.",
      "C": "Turnaround time is the total duration a process takes from initial submission to final completion.",
      "D": "Waiting time is the total cumulative time a process spends waiting inside ready queue frames."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Scheduling Metrics Comparison", "Operating System Scheduler Evaluation", "Throughput Standards"]
  },
  {
    id: "moe_56",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which branch of theoretical computer science deals with whether a mathematical problem can be solved at all by a computational model, independent of the physical resources required?",
    options: [
      "Complexity theory",
      "Computability theory",
      "Formal Set theory",
      "Automata grammar mapping"
    ],
    correctAnswer: "B",
    explanation: "Computability theory (or recursion theory) addresses whether a problem is decidable or solvable at all (e.g., the Halting Problem) by a complete Turing machine model. Complexity theory, on the other hand, deals with *how efficiently* a decidable problem can be solved given time and memory space constraint parameters.",
    wrongOptionsExplanation: {
      "A": "Complexity theory focuses on resource constraints (P vs. NP class runtimes).",
      "C": "Set theory is branch of mathematical logic containing collections of objects.",
      "D": "Automata grammar mapping translates symbol formats, not decidability bounds."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Computability Bounds", "Decidability Classes", "Halting Problem Implications"]
  },
  {
    id: "moe_57",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which phase of the software development life cycle is responsible for gathering and analyzing user requirements to define exactly what needs to be solved?",
    options: [
      "Analysis phase",
      "Design phase",
      "Development phase",
      "Testing phase"
    ],
    correctAnswer: "A",
    explanation: "The analysis phase of the software development life cycle is dedicated wholly to gathering and analyzing user requirements to understand what the software should accomplish and modeling domain needs.",
    wrongOptionsExplanation: {
      "B": "The design phase translates analyzed requirements into technical system blueprints and layouts.",
      "C": "The development phase compiles design documentation into operating high-quality source code.",
      "D": "The testing phase executes the program to discover structural logic or syntax defects."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Requirements Gathering", "SDLC Lifecycles", "Requirements Analysis"]
  },
  {
    id: "moe_58",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which design principle suggests that software components should be open for extension but closed for modification?",
    options: [
      "Liskov Substitution Principle (LSP)",
      "Open-Closed Principle (OCP)",
      "Single Responsibility Principle (SRP)",
      "Dependency Inversion Principle (DIP)"
    ],
    correctAnswer: "B",
    explanation: "The Open-Closed Principle (OCP) represents the 'O' in SOLID. It dictates that software modules (classes, classes structures, etc.) should be writable to expand behavior via subclasses/inheritance without editing existing, tested codebase frames.",
    wrongOptionsExplanation: {
      "A": "LSP states that subclass instances must be completely substitutable for their superclass without breaking system correctness.",
      "C": "SRP defines that a class should have exactly one reason to change, maximizing modularity.",
      "D": "DIP instructs that high-level modules should not depend on low-level modules; both should depend on abstract interfaces."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["SOLID Principles", "Open-Closed Systems", "Software Maintainability"]
  },
  {
    id: "moe_59",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which software testing technique seeks to pre-empt defects by analyzing and evaluating the codebase structure, syntax, and specs without executing the compiled executable binary?",
    options: [
      "White-box testing",
      "Black-box testing",
      "Static testing",
      "Integration testing"
    ],
    correctAnswer: "C",
    explanation: "Static testing involves reviewing, scanning, and linting document and code frames *without* actively executing the software. Walkthroughs, formal inspections, and static analysis tools are typical static practices.",
    wrongOptionsExplanation: {
      "A": "White-box testing involves executing code paths, branches, or conditions with full visibility of the source.",
      "B": "Black-box testing executes the live software on boundary inputs without viewing internal code paths.",
      "D": "Integration testing executes the integrated groups of modules to track dynamic data collisions on APIs."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Static Testing", "Dynamic Verification", "Walkthroughs & Inspections"]
  },
  {
    id: "moe_60",
    category: "Software Engineering",
    type: QuestionType.ScenarioBased,
    difficulty: Difficulty.Hard,
    questionText: "After carrying out deep analysis, a major telecommunications project determines that changes in market regulations require a radical transformation of the core centralized, data-centric system architecture into a decentralized client-server network. Which change strategy is most appropriate?",
    options: [
      "Preventative maintenance",
      "Software reengineering",
      "Adaptive maintenance",
      "Perfective maintenance"
    ],
    correctAnswer: "B",
    explanation: "Software reengineering involves a radical, deep transformation of an existing system, including reverse engineering its architecture and reorganizing code/databases into entirely new paradigms (e.g., centralized to client-server). Dynamic maintenance covers smaller, incremental changes while maintaining the architectural core.",
    wrongOptionsExplanation: {
      "A": "Preventative maintenance changes code to fix hidden issues and support long-term durability.",
      "C": "Adaptive maintenance modifies software to execute on new platforms without altering the core architectural structure.",
      "D": "Perfective maintenance implements minor unrequested enhancements or features requested by active stakeholders."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Software Evolution Strategy", "Legacy Reengineering", "System Evolution vs. Maintenance"]
  },
  {
    id: "moe_61",
    category: "Web Development",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which of the following describes the core purpose and utility of Cascading Style Sheets (CSS) in modern web development standards?",
    options: [
      "To declare document structure and outline layout grids.",
      "To inject client-side script behavior and validate forms.",
      "To specify and control the visual presentation and layout design of markup elements.",
      "To establish secure databases connection pipelines asynchronously."
    ],
    correctAnswer: "C",
    explanation: "CSS (Cascading Style Sheets) is strictly designed to control visual presentation, layout form, color pairings, spacing boundaries, and media queries of elements written inside standard HTML documents.",
    wrongOptionsExplanation: {
      "A": "HTML specifies document structure, not style presentation values.",
      "B": "JavaScript or server scripts validate forms and define behaviors.",
      "D": "Server-side platforms (PHP/Node) establish secure database connections."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Separation of Concerns", "Web Styling Presentation", "CSS Box Model"]
  },
  {
    id: "moe_62",
    category: "Web Development",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What does AJAX (Asynchronous JavaScript and XML) introduce to modern client-server browser communication architectures?",
    options: [
      "It compiles client scripting lines directly into binary code on browsers on the fly.",
      "It provides bi-directional dedicated socket streams operating on physical layers.",
      "It enables the client to load and render page resources asynchronously without forcing a full-screen reload.",
      "It encrypts payload files with public keys before sending files across networks."
    ],
    correctAnswer: "C",
    explanation: "AJAX allows web browsers to exchange small blocks of JSON or XML datasets with a server in the background, updating select DOM nodes in standard HTML pages asynchronously without full window reloads.",
    wrongOptionsExplanation: {
      "A": "JavaScript is parsed and interpreted, not compiled globally on client devices.",
      "B": "WebSockets support bi-directional socket streams, not AJAX.",
      "D": "HTTPS manages payload encryption, not the AJAX request mechanism."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Asynchronous Callbacks", "DOM Modification", "Single Page Applications"]
  },
  {
    id: "moe_63",
    category: "Web Development",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In which of the following lines of JavaScript code will implicit type coercion (or dynamic implicit casting) occur?",
    options: [
      "parseInt(\"4\" + \"4\")",
      "2 + 7.0",
      "4 + \"4\"",
      "4 + 4"
    ],
    correctAnswer: "C",
    explanation: "In JavaScript, the '+' operator is overloaded. If either operand is a string, JavaScript implicitly coerces/casts the numerical value (the number 4) into a string, returning '44'. Type coercion occurs dynamically during runtime evaluating this expression.",
    wrongOptionsExplanation: {
      "A": "This represents explicit string concatenation followed by an explicit integer cast.",
      "B": "Floating-point double arithmetic is evaluated directly in JavaScript double formats.",
      "D": "Standard numerical addition of integers yields the integer 8 without string coercion."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Type Coercion", "Overloaded Operators", "Type Safety in Scripting"]
  },
  {
    id: "moe_64",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which of the following represents a primary disadvantage associated with introducing redundant duplicated data columns inside corporate operational relational databases?",
    options: [
      "It significantly limits the maximum count of concurrent database users.",
      "It can lead to database updates, deletion, and insertion anomalies when records change.",
      "It forces applications to rely wholly on slower, unstructured, third-generation text arrays.",
      "It automatically blocks security administrators from applying GRANT access rules."
    ],
    correctAnswer: "B",
    explanation: "Data redundancy causes update, deletion, and insertion anomalies. If single data entries (such as a customer's address) are stored in multiple places, updating one record but missing others makes the entire database inconsistent.",
    wrongOptionsExplanation: {
      "A": "Data redundancy does not restrict concurrent connection pipelines.",
      "C": "RDBMS still relies on normal tables, not unparsed raw flat-file text arrays.",
      "D": "Grant rules operate on tables and users, completely unaffected by redundancy values."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Normalization Objectives", "Update Anomalies", "Logical Integrity Constraints"]
  },
  {
    id: "moe_65",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "In database schemas, which of the following constitutes an accurate SQL statement to delete the exact publisher named 'XWZ' from the PUBLISHER table?",
    options: [
      "DELETE FROM PUBLISHER WHERE Name = 'XWZ';",
      "DELETE FROM PUBLISHER WHERE Address = 'XWZ';",
      "REMOVE PUBLISHER WHERE Name = 'XWZ';",
      "DELETE Name = 'XWZ' FROM PUBLISHER;"
    ],
    correctAnswer: "A",
    explanation: "The standard SQL Syntax to remove rows is: `DELETE FROM <table_name> WHERE <condition>;`. Matching the Name field with the string literal 'XWZ' targets the correct condition.",
    wrongOptionsExplanation: {
      "B": "This deletes based on Address column contents (which contains addresses, not names).",
      "C": "REMOVE is not a recognized keyword in SQL DML specifications.",
      "D": "The syntax is malformed as fields are selected inside SELECT, not DELETE clauses."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["SQL DML Queries", "Data Deletion Commands", "Relational Filtering Clauses"]
  },
  {
    id: "moe_66",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "How does the Two-Phase Locking (2PL) protocol handle currency serialization? Specifically, what occurs in the 'Growing Phase'?",
    options: [
      "A transaction can release locks but can never acquire new locks.",
      "A transaction is allowed to perform rollback recovery on cached indexes.",
      "A transaction can acquire locks but is strictly forbidden from releasing any locks.",
      "Locks are automatically converted to shared lock status with zero checkpoints."
    ],
    correctAnswer: "C",
    explanation: "In 2PL, the 'Growing Phase' only allows a transaction to acquire locks and never release any. Once a transaction releases its first lock, it transitions immediately into the 'Shrinking Phase' where it can only release locks.",
    wrongOptionsExplanation: {
      "A": "This describes the Shrinking Phase guidelines of 2PL.",
      "B": "Locking protocols govern active locks, not log file rollbacks.",
      "D": "Shared lock transitions are governed by lock demotions, not 2PL phase limits."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Concurrency Control Protocols", "Two-Phase Locking (2PL)", "Serializability Guarantees"]
  },
  {
    id: "moe_67",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which standard Linux/Unix command-line program is used to read and print concatenate files to stdout?",
    options: [
      "pwd",
      "cat",
      "ls",
      "grep"
    ],
    correctAnswer: "B",
    explanation: "The 'cat' (truncate/concatenate) utility reads file streams sequentially, writing them straight to standard output, making it standard for showing file contents or joining streams.",
    wrongOptionsExplanation: {
      "A": "pwd prints the absolute system directory pathname (print working directory).",
      "C": "ls lists current active folder directories and file properties.",
      "D": "grep parses text streams utilizing regular expressions to filter keyword rows."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Unix File Commands", "Command Line Interfaces", "Standard Streams Output"]
  },
  {
    id: "moe_68",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which statement is NOT correct concerning operating system threads and processors?",
    options: [
      "Threads execute instructions within a single shared memory scope.",
      "Both threads and processes share the same logical capability to create sub-children.",
      "Threads belonging to the same active parent process always execute sequentially.",
      "If one thread in a process gets blocked, another thread inside the same process can be scheduled."
    ],
    correctAnswer: "C",
    explanation: "This statement is false because threads are specifically designed to execute concurrently or asynchronously rather than sequentially. While one thread waits for I/O, other threads in the process can execute instructions.",
    wrongOptionsExplanation: {
      "A": "Threads belong to the same parent process and share its heap, global space, and descriptors.",
      "B": "Both threads and processes are capable of spawning new child threads/processes.",
      "D": "Dynamic scheduling allows non-blocked threads to utilize CPU cores when other threads block."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["OS Context Scheduling", "Multi-threaded Systems", "Concurrent Operations"]
  },
  {
    id: "moe_69",
    category: "Computer Architecture",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which of the following internal CPU hardware registers holds the memory address of the next group/pair of instruction bytes to be fetched from RAM?",
    options: [
      "Instruction buffer register (IBR)",
      "Program counter (PC)",
      "Memory address register (MAR)",
      "Memory buffer register (MBR)"
    ],
    correctAnswer: "B",
    explanation: "The Program Counter (PC) register points to the virtual/physical memory address of the next instruction bytes sequence waiting to be fetched by control unit cycles.",
    wrongOptionsExplanation: {
      "A": "The IBR temporarily holds instructions fetched from the cache to keep pipelines full.",
      "C": "The MAR holds the precise raw memory address the bus is actively reading or writing currently.",
      "D": "The MBR contains the actual data word retrieved from or about to be written to memory."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Registers Block Architecture", "Instruction Fetch Stage", "Control Unit Coordination"]
  },
  {
    id: "moe_70",
    category: "Computer Architecture",
    type: QuestionType.ScenarioBased,
    difficulty: Difficulty.Medium,
    questionText: "Which micro-architectural technique allows high-speed input/output peripherals (such as direct network interface controllers) to transfer data straight into physical main memory blocks without involving the primary CPU?",
    options: [
      "Memory-mapped I/O",
      "Direct memory access (DMA)",
      "Interrupt-driven I/O",
      "I/O standard polling"
    ],
    correctAnswer: "b",
    explanation: "Direct Memory Access (DMA) allows hardware subsystems to bypass the main CPU completely to read/write memory directly, freeing up the CPU to execute instructions in parallel during large transfers.",
    wrongOptionsExplanation: {
      "A": "Memory-mapped I/O binds device registers straight to RAM addresses, but still requires CPU reads/writes.",
      "C": "Interrupt-driven I/O notifies the CPU that data is ready, but requires the CPU to transfer the bytes.",
      "D": "I/O polling consumes expensive CPU cycles continuously asking if data is ready."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["DMA Bus Operations", "Memory Architectures", "CPU Resource Optimization"]
  },
  {
    id: "moe_71",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Consider the Context-Free Grammar G = ({S}, {a, b}, P, S), where productions are P: S -> aSbb | ab. Which of the following strings is NOT an element of the language L(G) generated by this grammar?",
    options: [
      "ab",
      "aabbb",
      "aabbbb",
      "aaabbbbbb"
    ],
    correctAnswer: "B",
    explanation: "Tracing the recursive grammar S -> aSbb | ab reveals that every terminal 'a' added on the left always generates exactly two terminal 'b's on the right. This represents the language L = {aⁿb²ⁿ | n ≥ 1}. The string 'aabbb' has two 'a's and three 'b's, which violates the n vs. 2n rule.",
    wrongOptionsExplanation: {
      "A": "Represented by n = 1: 1 'a' and 2 'b's (ab).",
      "C": "Represented by n = 2: 2 'a's and 4 'b's (aabbbb).",
      "D": "Represented by n = 3: 3 'a's and 6 'b's (aaabbbbbb)."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Grammar Production Paths", "Language Representation", "Recursion Limits"]
  },
  {
    id: "moe_72",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Given an input Alphabet Σ = {a, b, c, d} and the standard empty string indicator λ, which of the following is mathematically equivalent to the language Σ⁰?",
    options: [
      "Σ*",
      "Σ+",
      "{λ}",
      "Σ"
    ],
    correctAnswer: "C",
    explanation: "Any alphabet set Σ raised to the power of 0 represents strings of length 0. The set of all strings of length 0 contains exactly one element: the empty string, {λ}.",
    wrongOptionsExplanation: {
      "A": "Σ* represents Kleene closure, covering strings of all lengths from 0 to infinity.",
      "B": "Σ+ is positive closure, excluding strings of length 0 (excluding the empty string λ).",
      "D": "Σ represents the set of all base single character strings of length 1."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Alphabet Operations", "Formal Language Powers", "Null Set Definitions"]
  },
  {
    id: "moe_73",
    category: "Compiler Design",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Among the distinct sequential execution phases of a compiler, in which phase are character stream files grouped into valid linguistic units called lexemes to produce a sequence of tokens?",
    options: [
      "Lexical analysis",
      "Syntax analysis",
      "Semantic analysis",
      "Code optimization"
    ],
    correctAnswer: "A",
    explanation: "The Lexical Analysis phase (often called the lexer/scanner) scans the characters of the source code, matches them to lexeme patterns using regular expressions, and produces a sequence of typed tokens.",
    wrongOptionsExplanation: {
      "B": "Syntax analysis checks if the order of tokens conforms to the grammar utilizing parsers.",
      "C": "Semantic analysis performs scope resolution, type checks, and enforces core language rules.",
      "D": "Code optimization restructures the intermediate representation to minimize runtimes."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Lexeme & Token Synthesis", "Finite Automata Compiler", "Source Parsing Start"]
  },
  {
    id: "moe_74",
    category: "Compiler Design",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which of the following compiler components reads tokens and checks if they match syntax rules before generating an Abstract Syntax Tree?",
    options: [
      "Loader",
      "Linker",
      "Scanner",
      "Parser"
    ],
    correctAnswer: "D",
    explanation: "The Parser is the component of a compiler executing the syntax analysis phase. It parses the token sequence using context-free grammar parsing tables and produces abstract syntax tree (AST) representations.",
    wrongOptionsExplanation: {
      "A": "Loader is an OS scheduling component that places executable bytes in RAM to run programs.",
      "B": "Linker combines independent compiled object files into a single runnable binary.",
      "C": "Scanner is the lexical analyzer that breaks down raw text into base token blocks."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Context-Free Parser", "Parse Trees", "Parsing Algorithms"]
  },
  {
    id: "moe_75",
    category: "Artificial Intelligence",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which of the following metrics is used to evaluate the overall performance and degree of success of an intelligent agent in its active environment?",
    options: [
      "Percept sequence",
      "Knowledge base",
      "Performance measure",
      "Action matrix"
    ],
    correctAnswer: "C",
    explanation: "The performance measure defines the criteria used to evaluate how successful an agent is. It captures the target output outcomes of the agent's behavior inside its environment.",
    wrongOptionsExplanation: {
      "A": "Percept sequence is the total historical log of all sensor inputs received.",
      "B": "Knowledge base represents the internal data facts stored by the agent to make decisions.",
      "D": "Action matrix represents the set of all operations the agent's actuators can perform."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Rationality & Performance", "PEAS Specifications", "Agent Architecture"]
  },
  {
    id: "moe_76",
    category: "Artificial Intelligence",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Why is the Greedy Best-First Search algorithm NOT guaranteed to find an optimal solution or ensure general completeness?",
    options: [
      "It completely ignores actual path costs g(n) and guides search choices strictly using heuristic cost h(n)",
      "It only expands nodes in first-in first-out parallel order",
      "It forces agents to evaluate every depth branch level-by-level sequentially",
      "It requires perfect knowledge of the goal state's exact location from start"
    ],
    correctAnswer: "A",
    explanation: "Greedy Best-First Search expansion is guided purely by h(n) (estimated cost to the goal), completely ignoring g(n) (path cost from start). This makes it prone to choosing locally optimal paths that can lead to infinite loops or non-optimal solutions.",
    wrongOptionsExplanation: {
      "B": "Breadth-First Search utilizes FIFO queues, not Best-First.",
      "C": "Depth-First Search explores sequential branches, not GBFS.",
      "D": "No search algorithm requires perfect start-to-goal paths; heuristics are always estimates."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Search Heuristics", "Heuristic Optimization Issues", "A* search vs. Greedy search"]
  },
  {
    id: "moe_77",
    category: "Artificial Intelligence",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Suppose you design a self-driving vehicle that operates on standard public streets using cameras and radar. Because it can only perceive visible elements, which of the following best describes its active environment?",
    options: [
      "Discrete",
      "Fully observable",
      "Partially observable",
      "Stochastic"
    ],
    correctAnswer: "C",
    explanation: "Driving is a partially observable environment. The camera cannot see behind corners, other block paths, or know what is inside another vehicle, meaning the agent lacks real-time complete state data.",
    wrongOptionsExplanation: {
      "A": "Driving involves fluid velocities and movements, making it continuous, not discrete.",
      "B": "Chess contains fully observable bounds; active driving does not.",
      "D": "Stochastic describes environment changes caused by non-deterministic factors."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Environment Dimensions", "Sensor Visibility", "Autonomous Vehicle Challenges"]
  },
  {
    id: "moe_78",
    category: "Computer Security",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which security service of the traditional CIA Triad prevents the unauthorized leakage and reads of sensitive folder files during storage or network transit?",
    options: [
      "Availability",
      "Integrity",
      "Confidentiality",
      "Non-repudiation"
    ],
    correctAnswer: "C",
    explanation: "Confidentiality ensures that sensitive information is kept secret from unauthorized access. Methods like encryption directly protect data confidentiality.",
    wrongOptionsExplanation: {
      "A": "Availability guarantees that authorized users have continuous access to systems and files.",
      "B": "Integrity guarantees that data has not been modified or corrupted by malicious actors.",
      "D": "Non-repudiation prevents senders from falsely denying sending messages."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["CIA Security Triad", "Information Safety Scope", "Protection Schemes"]
  },
  {
    id: "moe_79",
    category: "Computer Security",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which of the following describes a vulnerability as opposed to an active threat or attack in security architectures?",
    options: [
      "A malicious software program attempting to damage database structures.",
      "An active attempt by an outside hacker to guess passwords.",
      "An inherent weakness or flaw in network protocols, designs, or systems.",
      "A natural disaster like an electric power grid surge that corrupts files."
    ],
    correctAnswer: "C",
    explanation: "A vulnerability is an inherent flaw, loop, or weakness in code (such as buffer overflow) or systems. An attack actively exploits vulnerabilities, and a threat is any potential risk (human or environmental).",
    wrongOptionsExplanation: {
      "A": "Malware is an active malicious agent, which classifies it as a threat.",
      "B": "Active brute-forcing of passwords represents an active attack.",
      "D": "Natural power grid surges are environmental threats."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Threat vs. Vulnerability", "Security Risk Models", "Common Weakness Enumeration"]
  },
  {
    id: "moe_80",
    category: "Computer Security",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What type of internet/network attackers are motivated by economic espionage, stealing intellectual property (IP), and sabotaging competitor companies?",
    options: [
      "Stealers",
      "Hacktivists",
      "Competitors",
      "Activists"
    ],
    correctAnswer: "C",
    explanation: "Competitors are corporate or industrial rivals who deploy cyber attacks specifically to perform commercial sabotage, steal industrial models/IP, and disrupt competing market operations.",
    wrongOptionsExplanation: {
      "A": "Stealers are automated trojans or software bots tasked solely with grabbing user browser cookies or login sessions.",
      "B": "Hacktivists are politically motivated activists using digital tools to display protest statements.",
      "D": "Activists are standard civilian groups advocating for social causes without utilizing malicious code paths."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Threat Actor Profiles", "Industrial Espionage", "Cyber Security Intel"]
  },
  {
    id: "moe_81",
    category: "Programming Fundamentals",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What is the best-case time complexity of the standard Quick Sort algorithm when the partition element continuously divides the list into roughly equal halves?",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
    correctAnswer: "B",
    explanation: "When partitions split the array in half, the recurrence relation is T(n) = 2T(n/2) + O(n). According to the Master Theorem, this evaluates to O(n log n).",
    wrongOptionsExplanation: {
      "A": "This is the worst-case time complexity of Quick Sort, occurring when the array is already sorted and the pivot is the extreme element.",
      "C": "This is linear time complexity, typical of algorithms like Counting Sort but unreachable for general comparison sorts.",
      "D": "This is logarithmic time, typical of binary search, which does not process all elements."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Quick Sort Complexity", "Master Theorem", "Algorithm Analysis"]
  },
  {
    id: "moe_82",
    category: "Programming Fundamentals",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which of the following data structures operates on the Last-In, First-Out (LIFO) access mechanism?",
    options: ["Queue", "Tree", "Stack", "Linked List"],
    correctAnswer: "C",
    explanation: "A Stack is a standard linear structure restricted to insertions (push) and deletions (pop) from a single end (the top), adhering strictly to Last-In, First-Out behavior.",
    wrongOptionsExplanation: {
      "A": "A Queue operates on First-In, First-Out (FIFO) standards.",
      "B": "A Tree is a non-linear, hierarchical structure representing nodes linked by parent-child relations.",
      "D": "A Linked List can insert and delete elements at any position, not restricted to LIFO."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Stack Structures", "Abstract Data Types", "LIFO Mechanism"]
  },
  {
    id: "moe_83",
    category: "Programming Fundamentals",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What is the primary operational advantage of implementing a singly-linked list structure over a standard sequential physical array?",
    options: [
      "Linked lists support constant-time O(1) random access utilizing numeric indexes.",
      "Linked lists guarantee continuous sequential physical allocation of memory blocks.",
      "Linked lists support dynamic capacity expansion and constant-time O(1) insertions at known node pointers.",
      "Linked lists inherently consume absolute minimal memory space by eliminating links."
    ],
    correctAnswer: "C",
    explanation: "Unlike static arrays with fixed memory blocks, linked lists allocate memory dynamically for individual nodes. Inserting elements at a known position requires only adjusting node pointer references, which executes in O(1) time.",
    wrongOptionsExplanation: {
      "A": "Accessing an arbitrary index in singly linked lists requires O(n) traversal from the head, whereas arrays are O(1).",
      "B": "Linked list nodes are scattered throughout the memory heap, not allocated in contiguous blocks.",
      "D": "Linked lists consume *more* memory than arrays because they must store pointer reference fields alongside data values."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Dynamic Memory Allocation", "Linked List vs Array", "Algorithm Efficiency"]
  },
  {
    id: "moe_84",
    category: "Programming Fundamentals",
    type: QuestionType.CodeTracing,
    difficulty: Difficulty.Medium,
    questionText: "What is the final printed console output when the following C++ program fragment is executed?",
    codeSnippet: `void modifier(int &x, int y) {
  x += 10;
  y += 20;
}
int main() {
  int a = 5, b = 5;
  modifier(a, b);
  cout << a << " " << b;
}`,
    options: ["5 5", "15 25", "15 5", "5 25"],
    correctAnswer: "C",
    explanation: "In C++, `x` is declared as a reference parameter (`int &x`), meaning the pass-by-reference mechanism modifies the original variable `a` in `main`. `y` is passed by value (`int y`), creating a local copy, so modifications to `y` do not affect `b`. `a` is incremented by 10 (becoming 15), while `b` remains 5.",
    wrongOptionsExplanation: {
      "A": "Assumes both parameters are pass-by-value and no variables change.",
      "B": "Assumes both parameters are pass-by-reference.",
      "D": "Assumes the first parameter is pass-by-value and the second is pass-by-reference."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Parameter Passing", "References in C++", "Memory Scope Mapping"]
  },
  {
    id: "moe_85",
    category: "Programming Fundamentals",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What is the worst-case lookup time cost for searching for an element in an un-balanced Binary Search Tree (BST) of size N?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctAnswer: "C",
    explanation: "If elements are inserted into a BST in sorted order, the tree degenerates into a linear structure similar to a linked list (skewed tree). In this worst-case scenario, searching requires traversing all elements, yielding a time complexity of O(N).",
    wrongOptionsExplanation: {
      "A": "O(1) is the search complexity in ideal hash tables, never BSTs.",
      "B": "O(log N) is the average-case and balanced-case lookup complexity, but not the worst-case for unbalanced trees.",
      "D": "O(N log N) is the time complexity of sorting, not lookup traversal."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Binary Trees", "Worst-case Complexity", "Tree Balancing"]
  },
  {
    id: "moe_86",
    category: "Object-Oriented Programming",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In C++ object-oriented inheritance contexts, when an instantiated Child subclass object goes out of scope and is deleted, in what exact order are the class destructors executed?",
    options: [
      "The Base superclass destructor runs first, followed immediately by the Child subclass destructor.",
      "The Child subclass destructor runs first, followed immediately by the Base superclass destructor.",
      "Both destructors execute concurrently across separate system thread vectors.",
      "Only the Child subclass destructor runs; the Base destructor must be manually called."
    ],
    correctAnswer: "B",
    explanation: "In OOP, constructors are called in order of derivation (Base then Child) so that the child can use base assets. Destructors execute in the exact reverse order (Child then Base), safe in the knowledge that base components remain valid during the child's destruction process.",
    wrongOptionsExplanation: {
      "A": "This describes constructor execution order, not destructor order.",
      "C": "Destruction is synchronous and executed sequentially, not on concurrent threads.",
      "D": "The compiler automatically chains destructor calls; manual invocation is not required."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Destructor Chaining", "Object Lifecycles", "Inheritance Mechanics"]
  },
  {
    id: "moe_87",
    category: "Object-Oriented Programming",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which keyword or syntax in C++ is utilized to declare a pure virtual function, rendering its containing class Abstract?",
    options: [
      "virtual void show() = 0;",
      "virtual void show() = abstract;",
      "abstract void show();",
      "void virtual show() = NULL;"
    ],
    correctAnswer: "A",
    explanation: "In C++, a pure virtual function is declared using the `= 0` syntax in its signature. Any class containing at least one pure virtual function is an Abstract class, which cannot be instantiated and forces subclasses to implement the function.",
    wrongOptionsExplanation: {
      "B": "The word 'abstract' is not a valid modifier or initializer in C++ declarations.",
      "C": "This syntax is standard in Java, but illegal in standard C++ compilers.",
      "D": "Initializing a virtual function to NULL is syntactically invalid in C++."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Pure Virtual Functions", "Abstract Classes", "Class Interfaces"]
  },
  {
    id: "moe_88",
    category: "Object-Oriented Programming",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "How does 'Composition' differ from 'Aggregation' within standard UML object relationship specifications?",
    options: [
      "In composition, child objects can belong to multiple parent objects simultaneously.",
      "In composition, the child object's life cycle is bound to the parent's: modifying or deleting the parent automatically deletes the child.",
      "Composition represents a weak structural reference, whereas aggregation is the strongest reference.",
      "Aggregation is indicated by solid diamond lines, and composition by unfilled hollow diamonds."
    ],
    correctAnswer: "B",
    explanation: "Composition is a strong 'has-a' relationship where child components cannot exist independently of the parent container. When the parent object is destroyed, all of its composition components are destroyed as well. Aggregation is a weaker association where children can exist independently.",
    wrongOptionsExplanation: {
      "A": "This refers to association or aggregation, where children exist independently of any parent.",
      "C": "Composition is the strongest association; aggregation is weaker.",
      "D": "Composition is represented by a solid filled diamond symbol, while aggregation is represented by a hollow diamond."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["UML Class Relationships", "Object Composition", "UML Aggregation"]
  },
  {
    id: "moe_89",
    category: "Object-Oriented Programming",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What is the primary effect of declaring a class data member using the 'static' keyword in an object-oriented language like Java or C++?",
    options: [
      "The static variable cannot be modified once instantiated.",
      "A single instance of the variable is shared across all instantiated object copies of the class.",
      "The variable is visible only within static member functions nested in the same folder.",
      "The variable is stored on the stack rather than the heap for speed."
    ],
    correctAnswer: "B",
    explanation: "A static class member is associated with the class itself rather than individual instances. Only one copy of the static variable is allocated in memory, and this shared state is accessed by all object instances of that class.",
    wrongOptionsExplanation: {
      "A": "This describes read-only or constant variables (`const` in C++, `final` in Java), not static variables.",
      "C": "Static variables can be accessed by both static and non-static member functions, subject to access controls.",
      "D": "Static variables reside in global/static memory, not on dynamic execution stacks."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Static Members", "Memory Architecture", "Shared Class State"]
  },
  {
    id: "moe_90",
    category: "Object-Oriented Programming",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Who can access the private members of a class inside C++ under friendship rules?",
    options: [
      "Only public inherited subclasses.",
      "Any function or class specifically declared as a 'friend' inside the target class body.",
      "Any function in the same physical runtime package.",
      "Only the main compiler program thread."
    ],
    correctAnswer: "B",
    explanation: "In C++, the `friend` keyword allows external classes or functions to access the `private` and `protected` members of the class that declares the friendship.",
    wrongOptionsExplanation: {
      "A": "By default, derived subclasses cannot directly access private members of their superclass.",
      "C": "C++ does not support package-private visibility boundaries by default (unlike Java's package-private visibility).",
      "D": "The main thread has no special built-in visibility bypass rules unless declared as a friend."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Friend Functions", "C++ Access Encapsulation", "Information Hiding"]
  },
  {
    id: "moe_91",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which Data Flow Diagram (DFD) element represents external entities that supply or consume system information outside the software scope boundaries?",
    options: ["Process circles", "Data stores", "Sources/Sinks", "Flow arrows"],
    correctAnswer: "C",
    explanation: "In structured analysis systems (DFD), sources and sinks are external entities (such as users, other systems, or hardware devices) that sit on the system boundary, acting as input sources or output destinations.",
    wrongOptionsExplanation: {
      "A": "Processes convert input data flows to output data flows (circles or rounded rectangles).",
      "B": "Data stores represent internal repositories of data resting inside the system boundaries.",
      "D": "Data flows (arrows) indicate the direction of traveling information blocks."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Data Flow Diagrams", "Structured Analysis", "System Boundaries"]
  },
  {
    id: "moe_92",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In software design, what are the goals for cohesion and coupling metrics to produce high-quality, maintainable codebases?",
    options: [
      "High Coupling and High Cohesion",
      "Low Coupling and Low Cohesion",
      "High Cohesion and Low Coupling",
      "Low Cohesion and High Coupling"
    ],
    correctAnswer: "C",
    explanation: "Good software architecture targets high cohesion and low coupling. High Cohesion ensures that each module does one well-defined job, while Low Coupling minimizes interdependencies between modules, allowing them to be modified independently.",
    wrongOptionsExplanation: {
      "A": "High coupling creates fragile code where change in one module breaks other unlinked modules.",
      "B": "Low cohesion scattered across modules reduces logical order and readability.",
      "D": "This is the worst possible architecture, creating chaotic, fragile spaghetti structures."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Cohesion and Coupling", "Modular Software Design", "SOLID Architectures"]
  },
  {
    id: "moe_93",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which software process planning lifecycle model is best characterized by its explicit, central emphasis on iterative Risk Assessment and analysis?",
    options: ["Waterfall Model", "V-Model", "Spiral Model", "Iterative Prototyping"],
    correctAnswer: "C",
    explanation: "The Spiral Model, created by Barry Boehm, is an evolutionary SDLC model configured in key quadrants. Each loop around the spiral includes a formal task step to identify and mitigate risks prior to starting code implementation.",
    wrongOptionsExplanation: {
      "A": "The Waterfall model is linear and document-driven, ignoring risk assessments until deployment phases.",
      "B": "The V-Model pairs development phases directly with corresponding testing phases, lacking iterative risk loops.",
      "D": "Prototyping displays mockup views to gather feedback, but lacks structured risk analysis quadrants."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Spiral Model", "Risk Management Lifecycle", "Boehm Models"]
  },
  {
    id: "moe_94",
    category: "Software Engineering",
    type: QuestionType.ScenarioBased,
    difficulty: Difficulty.Hard,
    questionText: "You are the project manager for a software team. During project scheduling, what does a task's 'Slack Time' (or float) equal to zero signify inside the Critical Path Method?",
    options: [
      "The associated task can be delayed indefinitely with zero consequences.",
      "The task is on the critical path, and delaying it past its start boundary immediately delays the overall project completion date.",
      "The task has zero complexity and can be skipped during coding.",
      "The task represents an external dependency outside the development team's control."
    ],
    correctAnswer: "B",
    explanation: "In CPM, the 'Critical Path' is the longest sequence of dependent tasks that determines the shortest possible project duration. Tasks on this path have zero slack (float = 0), meaning they have no scheduling buffer; any delay in their execution directly pushes back the final project completion date.",
    wrongOptionsExplanation: {
      "A": "Positive slack allows tasks to slide without affecting the project; zero slack offers no such buffer.",
      "C": "Slack relates strictly to scheduling placement, completely independent of task logical difficulty.",
      "D": "Internal and external tasks alike can lie on the critical path, regardless of who controls them."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Critical Path Method", "Project Scheduling", "PERT & CPM Analysis"]
  },
  {
    id: "moe_95",
    category: "Software Engineering",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What is the primary objective of performing code 'Refactoring' on an active application codebase?",
    options: [
      "To compile raw script statements into fast, platform-specific binaries.",
      "To design and add three new high-priority functional request requirements for stakeholders.",
      "To improve internal code quality, readability, and structure without altering the system's external functional behavior.",
      "To verify system compatibility under heavy simulated user loads."
    ],
    correctAnswer: "C",
    explanation: "Code refactoring is the process of cleaning up and restructuring existing source code without changing how it behaves from the user's perspective. It reduces technical debt, improves readability, and makes future updates easier.",
    wrongOptionsExplanation: {
      "A": "This refers to the compilation phase of toolchains, not refactoring.",
      "B": "Adding new features is not refactoring; refactoring is strictly behavior-preserving.",
      "D": "Testing concurrency limits is the goal of performance testing, not static code cleaning."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Technical Debt", "Code Refactoring", "Software Maintainability"]
  },
  {
    id: "moe_96",
    category: "Web Development",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which of the following is NOT a valid, standard delimiter used to enclose blocks of code inside active PHP web programming files?",
    options: ["<?php ... ?>", "<script language=\"php\"> ... </script>", "<? ... ?>", "<% ... %>"],
    correctAnswer: "D",
    explanation: "The ASP-style delimiter `<% ... %>` is deprecated and disabled in modern PHP. It is not supported by standard engines, unlike `<?php ... ?>` or `<? ... ?>` (short open tags, if enabled in php.ini).",
    wrongOptionsExplanation: {
      "A": "This is the canonical PHP open and close delimiter tag structure.",
      "B": "This represents the legal HTML-compatible tag syntax supported in PHP 5.x contexts.",
      "C": "This is the short open tag format, which is valid and common in codebases when enabled."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["PHP Delimiters", "Server-Side Scripting", "Web Syntax Standards"]
  },
  {
    id: "moe_97",
    category: "Web Development",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What is the semantic purpose of the standard HTML5 '<address>' tag?",
    options: [
      "To configure IP network router addresses inside HTTP protocol frames.",
      "To display a computer's physical MAC card settings to web pages.",
      "To provide contact information for the author or owner of a document or article.",
      "To format home shipping fields inside secure checkout billing forms."
    ],
    correctAnswer: "C",
    explanation: "In HTML5, the `<address>` tag is a semantic element designed to supply contact information (such as email, phone numbers, or physical address details) for the author or owner of a specific document or page section.",
    wrongOptionsExplanation: {
      "A": "HTML runs in application space, completely isolated from IP transport socket frames.",
      "B": "Web sandbox constraints prevent JavaScript/HTML from reading physical MAC addresses.",
      "D": "Standard billing forms use `<form>` and `<input>` blocks, not the `<address>` metadata construct."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["HTML5 Semantic Elements", "Markup Clean Standards", "Metadata Scopes"]
  },
  {
    id: "moe_98",
    category: "Web Development",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Consider the following CSS rules applied to an element. Which rule has the highest selector specificity precedence?",
    options: [
      "h1 { color: blue; }",
      ".header { color: red; }",
      "#main-title { color: green; }",
      "body h1 { color: orange; }"
    ],
    correctAnswer: "C",
    explanation: "CSS specificity is calculated using a scoring system: inline styles (1000), ID selectors (100), class/attribute selectors (10), and element selectors (1). `#main-title` is an ID selector, giving it a specificity score of 100, which overrides class and element selectors.",
    wrongOptionsExplanation: {
      "A": "This is a basic element selector, scoring 1 point.",
      "B": "This is a class selector, scoring 10 points.",
      "D": "This combines two element selectors, scoring 2 points."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["CSS Specificity Precedence", "Cascade Rules", "Selector Types"]
  },
  {
    id: "moe_99",
    category: "Web Development",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "How do dynamic HTTP GET requests differ from standard HTTP POST requests?",
    options: [
      "GET requests can only carry secure, encrypted binary payloads.",
      "GET is used to retrieve data and appends query parameters to the URL, whereas POST sends data nested inside the HTTP request body.",
      "POST requests are limited to a maximum length of 256 characters inside the URL bar.",
      "GET requests bypass browser caching layers entirely, forcing server reads."
    ],
    correctAnswer: "B",
    explanation: "HTTP GET requests are intended to retrieve resources. They append parameters to the URL query string, which makes them visible, book-markable, and subject to length limits. POST requests send payload parameters in the HTTP request body, which is suitable for submitting data.",
    wrongOptionsExplanation: {
      "A": "GET parameters are appended to the URL in plain text, making them insecure for sensitive payloads.",
      "C": "GET requests are limited by the browser's URL maximum limits, whereas POST has no such structural boundaries.",
      "D": "GET requests are cached by default, whereas POST requests are not."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["HTTP Methods", "RESTful APIs", "Client-Server Requests"]
  },
  {
    id: "moe_100",
    category: "Web Development",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What is the default Document Object Model (DOM) node structure generated by browsers to represent page components?",
    options: ["Linear Linked Queue", "Hierarchical Tree", "Fully Connected Graph", "Two-dimensional Matrix"],
    correctAnswer: "B",
    explanation: "The DOM represents web documents as a hierarchical nested tree structure. The root node is the `html` document element, and nested elements branch off as parent-child nodes.",
    wrongOptionsExplanation: {
      "A": "The DOM is nested and hierarchical, which a single flat linear queue cannot represent.",
      "C": "Elements have exactly one parent (except the root), which prevents arbitrary loop graphs.",
      "D": "Web layouts can expand dynamically, which a static 2D matrix cannot adapt to."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Document Object Model", "Tree Structures", "Browser Rendering Engines"]
  },
  {
    id: "moe_101",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What is the relationship between a Candidate Key and a primary key in database tables?",
    options: [
      "Any foreign key must be declared as a candidate key first.",
      "The primary key is chosen by the DBA from the set of candidate keys, which are minimal superkeys that uniquely identify each row.",
      "Candidate keys are keys containing random string placeholders.",
      "Primary keys are stored on physical files, whereas candidate keys reside only in cache memory."
    ],
    correctAnswer: "B",
    explanation: "Candidate keys represent the minimal set of columns that uniquely identify each row in a table. The database designer selects one of these candidate keys to serve as the table's Primary Key.",
    wrongOptionsExplanation: {
      "A": "Foreign keys reference primary or unique keys in another table, independent of local candidate status.",
      "C": "Candidate keys consist of real, valid schema columns, not random string placeholders.",
      "D": "Both are logical constraints defined in the schema, which has nothing to do with memory caching."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Database Keys", "Relational Integrity Constraints", "Database Design"]
  },
  {
    id: "moe_102",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "A relation is in Third Normal Form (3NF) if it is in Second Normal Form (2NF) and satisfies which of the following conditions?",
    options: [
      "There are zero multi-valued columns in the schema.",
      "There are no transitive functional dependencies where a non-prime attribute determines another non-prime attribute.",
      "Every determinant is a candidate key.",
      "The table must contain fewer than ten thousand storage files."
    ],
    correctAnswer: "B",
    explanation: "To be in 3NF, a relation must have no transitive dependencies. That is, no non-prime attribute should functionally determine another non-prime attribute; they must depend strictly and directly on the primary key itself.",
    wrongOptionsExplanation: {
      "A": "Eliminating multi-valued columns is the requirement to satisfy 1NF.",
      "C": "This is the stricter requirement for Boyce-Codd Normal Form (BCNF).",
      "D": "Normal forms are logical schema structures, completely independent of the number of rows."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Database Normalization", "Third Normal Form (3NF)", "Functional Dependencies"]
  },
  {
    id: "moe_103",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In database schemas, if you configure a Foreign Key constraint with 'ON DELETE CASCADE', what occurs when a row in the parent table is deleted?",
    options: [
      "The database blocks the deletion to prevent orphaned records.",
      "The corresponding rows in the child table are automatically deleted as well.",
      "The child table foreign key values are converted to NULL.",
      "A warning notification is printed, leaving child rows completely unchanged."
    ],
    correctAnswer: "B",
    explanation: "'ON DELETE CASCADE' is a referential integrity action. When a row in the parent table is deleted, the database automatically deletes any corresponding rows in the child table that reference the deleted parent row.",
    wrongOptionsExplanation: {
      "A": "This describes the RESTRICT or NO ACTION referential constraint behavior.",
      "C": "This describes the SET NULL constraint action.",
      "D": "Leaving child rows unchanged with mismatched foreign keys violates referential integrity."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Referential Integrity", "Foreign Key constraints", "SQL Cascading Actions"]
  },
  {
    id: "moe_104",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which of the following database paradigms is non-relational, storing information blocks in flexible JSON-like documents rather than rigid rows and columns?",
    options: ["Relational Database", "Document-Oriented NoSQL Database", "Sub-directory Flat File System", "Object Relational Mapping (ORM)"],
    correctAnswer: "B",
    explanation: "Document-oriented NoSQL databases (such as MongoDB) store data in flexible, semi-structured formats (JSON or BSON) rather than defining static, rigid table columns.",
    wrongOptionsExplanation: {
      "A": "Relational databases use structured, two-dimensional tables with strict schemas.",
      "C": "Flat files are unindexed raw text files managed by the OS, not a database paradigm.",
      "D": "ORM is software used to translate objects in code to rows in relational databases."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["NoSQL Databases", "MongoDB storage", "Schema-less Designs"]
  },
  {
    id: "moe_105",
    category: "Database Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "Which ACID transaction property guarantees that一旦 a transaction commits, its data modifications will remain saved even in the event of an abrupt system power failure?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    correctAnswer: "D",
    explanation: "Durability guarantees that once a transaction completes and commits, its changes are written to non-volatile storage (such as disk or SSD) so that they survive any subsequent system crashes or power losses.",
    wrongOptionsExplanation: {
      "A": "Atomicity ensures 'all-or-nothing' execution of transaction steps.",
      "B": "Consistency ensures that transactions transition the database from one valid state to another.",
      "C": "Isolation ensures that concurrent transactions execute without interfering with one another."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["ACID Properties", "Transaction Durability", "Crash Recovery Logs"]
  },
  {
    id: "moe_106",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "According to Coffman specifications, which of the following is NOT a necessary condition for a Deadlock to occur within an operating system?",
    options: ["Mutual exclusion", "Hold and wait", "Preemption allowed", "Circular wait"],
    correctAnswer: "C",
    explanation: "The fourth condition is 'No preemption', meaning resources cannot be forcibly seized from a process holding them. If preemption *is* allowed, the OS can resolve the deadlock by reclaiming resources, which breaks the deadlock criteria.",
    wrongOptionsExplanation: {
      "A": "Mutual Exclusion is required: at least one resource must be held in non-shareable mode.",
      "B": "Hold and Wait is required: processes must hold allocated resources while waiting for others.",
      "D": "Circular Wait is required: a chain of processes must exist where each process waits for a resource held by the next."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Deadlock Conditions", "Coffman Conditions", "Resource Allocation"]
  },
  {
    id: "moe_107",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What event occurs within an operating system when a running process attempts to reference a virtual memory page that is not currently loaded in physical RAM?",
    options: ["Keyboard interrupt", "Page fault", "System halt", "Stack overflow"],
    correctAnswer: "B",
    explanation: "A Page Fault occurs when an address reference lacks a valid bit in the page table, indicating the target page is not loaded in RAM. The CPU then triggers a trap, prompting the OS kernel to load the page from disk.",
    wrongOptionsExplanation: {
      "A": "A keyboard interrupt is an asynchronous hardware signal triggered by user keys.",
      "C": "System halt is a severe CPU command that stops all instruction execution.",
      "D": "Stack overflow occurs when a program exceeds its allocated call stack space, typically due to infinite recursion."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Virtual Memory", "Page Fault Handling", "Demand Paging"]
  },
  {
    id: "moe_108",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What OS data structure contains vital information about an active process (such as its current state, program counter, and register values)?",
    options: ["File Allocation Table (FAT)", "Process Control Block (PCB)", "Routing Table", "Stack segment"],
    correctAnswer: "B",
    explanation: "The Process Control Block (PCB) is a kernel data structure that stores all metadata needed to track and manage an active process, enabling context switching by saving and restoring the process state.",
    wrongOptionsExplanation: {
      "A": "The File Allocation Table is a legacy file system storage layout, not a process tracker.",
      "C": "A Routing Table is used by network devices to determine where to forward packets.",
      "D": "A Stack segment is a memory region allocated to store a program's local execution scopes."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Process Control Block", "Context Switching", "Kernel Data Structures"]
  },
  {
    id: "moe_109",
    category: "Operating Systems",
    type: QuestionType.ScenarioBased,
    difficulty: Difficulty.Medium,
    questionText: "A virtual memory manager allocates three physical page frames in RAM to a process. Under an LRU (Least Recently Used) page replacement policy, which page is selected for eviction when a page fault occurs?",
    options: [
      "The page that was loaded into memory first, regardless of usage.",
      "The page that has not been referenced for the longest period of time.",
      "The page that is smallest in physical file byte size.",
      "A random page selected by a hardware noise generator."
    ],
    correctAnswer: "B",
    explanation: "LRU (Least Recently Used) page replacement tracks usage history. When evicted, it targets the page that has not been accessed for the longest period of time, operating on the heuristic that it is the least likely to be needed soon.",
    wrongOptionsExplanation: {
      "A": "This describes the first-in, first-out (FIFO) replacement algorithm.",
      "C": "Pages are fixed-size blocks (e.g. 4KB), meaning they all consume identical memory space.",
      "D": "Random replacement is a separate algorithm, not LRU."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Page Replacement Algorithms", "Caching Heuristics", "Least Recently Used (LRU)"]
  },
  {
    id: "moe_110",
    category: "Operating Systems",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Why contains operating systems separate 'Kernel mode' and 'User mode' execution scopes?",
    options: [
      "To separate compilation tasks from runtime interpreter tasks.",
      "To protect the system and prevent user applications from directly accessing critical hardware or memory resources.",
      "To double the processor speed by running programs on separate threads.",
      "To support multi-lingual application localization settings."
    ],
    correctAnswer: "B",
    explanation: "Dual-mode operation provides basic system protection. User programs run in restricted 'User mode' and must request system services via 'system calls' to switch to privileged 'Kernel mode', which prevents applications from crashing the entire system.",
    wrongOptionsExplanation: {
      "A": "Compilers and interpreters are user-space programs, completely unrelated to CPU privilege rings.",
      "C": "Privilege modes restrict instruction capabilities, having no direct impact on execution speed.",
      "D": "Language localization is handled by application-level libraries, entirely in user space."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Cpu Privilege Levels", "System Calls", "Kernel Protection Schemes"]
  },
  {
    id: "moe_111",
    category: "Computer Architecture",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In direct-mapped CPU cache architectures, what type of cache miss occurs when multiple memory addresses repeatedly map to the same cache block location and evict each other?",
    options: ["Compulsory miss", "Conflict miss", "Capacity miss", "Coherence miss"],
    correctAnswer: "B",
    explanation: "A Conflict Miss occurs when multiple memory blocks map to the same cache slot in direct-mapped or set-associative caches. They evict one another even though the cache has plenty of empty space elsewhere. This issue can be resolved using fully-associative caches.",
    wrongOptionsExplanation: {
      "A": "Compulsory (cold start) misses occur when a memory block is accessed for the absolute first time.",
      "C": "Capacity misses occur when the working dataset exceeds the physical size of the cache.",
      "D": "Coherence misses occur when memory blocks are invalidated by write operations on other processor cores."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Direct Cache Mapping", "Cache Miss Classifications", "Memory Hierarchies"]
  },
  {
    id: "moe_112",
    category: "Computer Architecture",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which type of instruction pipelining hazard occurs when a required hardware resource is busy or cannot support execution of two instructions simultaneously?",
    options: ["Data hazard", "Control hazard", "Structural hazard", "Instruction hazard"],
    correctAnswer: "C",
    explanation: "A Structural Hazard occurs when the processor hardware lacks sufficient resources to execute multiple instructions in parallel (e.g., if a processor has only one write port to the register file and two pipeline stages attempt to write at once).",
    wrongOptionsExplanation: {
      "A": "Data hazards occur when an instruction depends on the output of a preceding instruction that hasn't completed yet.",
      "B": "Control (branch) hazards occur when the pipeline cannot determine the next instruction to fetch due to conditional branches.",
      "D": "Instruction hazard is a generic term that doesn't identify a specific micro-architectural pipelining conflict."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Pipelining Hazards", "CPU Architectures", "Instruction Pipeline Stages"]
  },
  {
    id: "moe_113",
    category: "Computer Architecture",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "According to Flynn's Taxonomy, which classification represents standard single-core CPUs executing a single streamline of instructions on a single stream of data?",
    options: ["SISD", "SIMD", "MISD", "MIMD"],
    correctAnswer: "A",
    explanation: "SISD (Single Instruction Stream, Single Data Stream) is the architecture of standard single-processor Von Neumann computers. They execute instructions sequentially on one data point at a time.",
    wrongOptionsExplanation: {
      "B": "SIMD (Single Instruction, Multiple Data) represents parallel vector processors like GPUs, which execute a single instruction across an entire array of data simultaneously.",
      "C": "MISD (Multiple Instruction, Single Data) is a rare architecture, sometimes used for fault-tolerant system setups (like flight control systems).",
      "D": "MIMD (Multiple Instruction, Multiple Data) represents modern multi-core processors running separate threads."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Flynn's Taxonomy", "Parallel Architectures", "SISD Computers"]
  },
  {
    id: "moe_114",
    category: "Computer Architecture",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "How do RISC architectures compare to CISC architectures concerning instructions complexity and register count?",
    options: [
      "RISC has larger instruction sets with complex addressing modes and fewer registers.",
      "RISC uses simple, fixed-length instructions, compiles complex operations into software, and relies on a large register file.",
      "CISC architectures completely eliminate the need for an ALU register block.",
      "RISC instruction sets rely on microprogram control tables rather than hardware decoders."
    ],
    correctAnswer: "B",
    explanation: "Reduced Instruction Set Computer (RISC) architectures focus on simple, single-cycle instructions that execute quickly. They maximize speed by executing operations register-to-register and relying on compilers to optimize software paths, which requires a larger register file.",
    wrongOptionsExplanation: {
      "A": "This describes Complex Instruction Set Computer (CISC) design principles.",
      "C": "All processor architectures require an ALU to execute mathematical instructions.",
      "D": "RISC instructions are decoded directly in hardware, whereas CISC often uses microprogram control units to handle complex instructions."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["RISC vs CISC", "Instruction Set Architecture", "Register Allocation"]
  },
  {
    id: "moe_115",
    category: "Computer Architecture",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What is the primary operational advantage of implementing a Hardwired Control Unit over a Microprogrammed Control Unit?",
    options: [
      "Hardwired control units are significantly easier to update and reprogram using software updates.",
      "Hardwired control units are much faster because they utilize dedicated logic gates to generate control signals directly.",
      "Hardwired control units consume less physical space on CPU silicon chips.",
      "Hardwired control units support a much larger number of complex instruction sets."
    ],
    correctAnswer: "B",
    explanation: "Hardwired control units utilize physical sequential logic gates and decoders to generate electrical control signals. This design is highly optimized and faster than microprogrammed units, which must retrieve instructions from private control ROM.",
    wrongOptionsExplanation: {
      "A": "Microprogrammed units are much easier to update because adjustments involve changing values in control ROM, whereas hardwired units require physical circuit redesign.",
      "C": "As instruction sets grow, hardwired logic gates quickly expand and consume more silicon space than compact microprogram ROMs.",
      "D": "Microprogrammed units are preferred for highly complex CISC instruction sets."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Control Unit Designs", "Hardwired Logic Control", "Microprogrammed Rom"]
  },
  {
    id: "moe_116",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In formal Automata theory, how does a Deterministic Finite Automaton (DFA) differ from a Non-Deterministic Finite Automaton (NFA)?",
    options: [
      "A DFA has infinite memory stacks, whereas an NFA has zero memory.",
      "For any state in a DFA, there is exactly one transition arrow for each symbol in the alphabet, and DFAs do not allow lambda/epsilon transitions.",
      "DFAs accept a much larger class of formal languages than NFAs.",
      "An NFA executes faster in physical hardware circuits because it explores paths in parallel."
    ],
    correctAnswer: "B",
    explanation: "A DFA is strictly deterministic: for any state-symbol pair, there is exactly one state transition. Additionally, DFAs do not allow epsilon/lambda (empty string) transitions. NFAs can branch to multiple states or follow empty transitions.",
    wrongOptionsExplanation: {
      "A": "Both DFAs and NFAs are finite state machines with zero external memory stacks.",
      "C": "Both accept the exact same class of languages (Regular Languages, Type 3 on the Chomsky hierarchy). Each NFA can be converted to an equivalent DFA using subset construction.",
      "D": "DFAs are faster because they track a single state, whereas simulating an NFA requires tracking multiple active states at once."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Finite Automata Comparison", "Regular Languages", "DFA and NFA Equivalency"]
  },
  {
    id: "moe_117",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "What does Turing's proof of the Undecidability of the Halting Problem state?",
    options: [
      "No computer can execute a recursive function containing more than ten loops.",
      "It is mathematically impossible to write a general algorithm that can determine, for any arbitrary program-input pair, whether that program will eventually stop running or run forever.",
      "Any program running on a computer with infinite memory will halt in finite time.",
      "The halting problem can be solved by adding multi-threading controls to Turing machines."
    ],
    correctAnswer: "B",
    explanation: "In computability theory, the Halting Problem is the premier undecidable problem. Alan Turing proved that no general algorithm can exist that correctly decodes whether any arbitrary program will halt or loop indefinitely, demonstrating that some computing boundaries are mathematically unsolvable.",
    wrongOptionsExplanation: {
      "A": "Recursive functions can loop infinitely; they are restricted by physical memory, not a hard mathematical loop limit.",
      "C": "Infinite memory does not prevent a program from entering an infinite loop.",
      "D": "Since the problem is mathematically undecidable, no amount of computing power or parallelism can solve it."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Halting Problem Theory", "Computability Bounds", "Unsolvable Problems"]
  },
  {
    id: "moe_118",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "Which of the following formal computing models is capable of recognizing Context-Sensitive Languages?",
    options: ["Finite Automata", "Pushdown Automata", "Linear Bounded Automata", "Universal Turing Machines"],
    correctAnswer: "C",
    explanation: "Context-Sensitive Languages (Type 1 on the Chomsky hierarchy) are recognized by Linear Bounded Automata (LBA). LBAs are non-deterministic Turing machines whose tape head is restricted to the bounds of the input string length.",
    wrongOptionsExplanation: {
      "A": "Finite Automata recognize Regular Languages (Type 3).",
      "B": "Pushdown Automata recognize Context-Free Languages (Type 2) by using an external stack.",
      "D": "Turing Machines recognize Recursively Enumerable Languages (Type 0)."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Chomsky Hierarchy", "Automata Memory Bounds", "Linear Bounded Automata"]
  },
  {
    id: "moe_119",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "How are the complexity classes P and NP defined in theoretical computer science?",
    options: [
      "P contains problems solvable by parallel logic, NP contains problems requiring serial CPUs.",
      "P contains decision problems solvable in polynomial time on deterministic Turing machines; NP contains decision problems solvable in polynomial time on non-deterministic Turing machines.",
      "P contains problems requiring infinite storage, NP contains problems with finite storage.",
      "P stands for 'Practical' and NP stands for 'Non-practical' computing limits."
    ],
    correctAnswer: "B",
    explanation: "The class P contains decision problems that can be solved in polynomial time (O(nᵏ)) on a standard deterministic Turing machine. The class NP (Non-deterministic Polynomial) contains problems whose solutions can be validated in polynomial time, or solved in polynomial time on non-deterministic machines.",
    wrongOptionsExplanation: {
      "A": "Both classes relate to sequential Turing machines, differing only in determinism.",
      "C": "Both classes are restricted to polynomial time bounds, which limits their memory consumption.",
      "D": "P stands for Polynomial and NP stands for Non-deterministic Polynomial."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["P vs NP Question", "Complexity Classes", "Turing Machine Models"]
  },
  {
    id: "moe_120",
    category: "Theory of Computation",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What type of auxiliary memory storage is integrated into a Pushdown Automaton (PDA) to enable it to parse Context-Free Languages?",
    options: ["A randomly accessible memory matrix", "An infinite index array", "A single Last-In, First-Out (LIFO) stack", "A bidirectional tape track"],
    correctAnswer: "C",
    explanation: "A Pushdown Automaton is a finite state machine enhanced with an external Stack. This LIFO memory allows it to track nested structures (such as matching parentheses) to parse Context-Free Languages.",
    wrongOptionsExplanation: {
      "A": "Randomly accessible memories are not part of standard PDA definitions.",
      "B": "An index array is a static data structure and does not provide formal PDA grammar tracking.",
      "D": "A bidirectional tape is the memory system of a Turing Machine, which is more powerful than a PDA."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Pushdown Automata", "Context-Free Grammars", "Stack Operations"]
  },
  {
    id: "moe_121",
    category: "Compiler Design",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "During bottom-up LR parsing in a compiler, when the parsing table indicates that the parser can either shift an input token onto the stack or reduce a stack sequence to a non-terminal, what conflict arises?",
    options: ["Reduce-reduce conflict", "Shift-reduce conflict", "Syntax mismatch hazard", "Semantic type breach"],
    correctAnswer: "B",
    explanation: "A Shift-Reduce conflict occurs in bottom-up parsing when the grammar parsing table rules provide two valid choices for a given state-token pair: shifting the token onto the stack or reducing the current stack elements.",
    wrongOptionsExplanation: {
      "A": "A Reduce-Reduce conflict occurs when the stack contents match two separate production rules, leaving the parser with two valid reductions.",
      "C": "Syntax mismatch is a generic parser error, not a parsing table conflict.",
      "D": "Semantic checks occur during semantic analysis, long after the parser builds the AST."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["LR Parsing Conflicts", "Bottom-Up Parsers", "Ambiguous Grammars"]
  },
  {
    id: "moe_122",
    category: "Compiler Design",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which compiler optimization phase seeks to maximize program speed by keeping frequently accessed variables inside high-speed silicon registers rather than RAM?",
    options: ["Loop unrolling", "Register allocation", "Dead code elimination", "Constant folding"],
    correctAnswer: "B",
    explanation: "Register Allocation is a critical compiler task. It uses graph-coloring heuristics to assign the program's variables to the hardware's limited registers, minimizing slower RAM accesses.",
    wrongOptionsExplanation: {
      "A": "Loop unrolling replicates loop bodies to minimize jump overhead, independent of register selection.",
      "C": "Dead code elimination removes code blocks that are evaluated but never executed.",
      "D": "Constant folding evaluates mathematical constants at compile time rather than generating instructions."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Register Allocation", "Graph Coloring Heuristic", "Compiler Optimizations"]
  },
  {
    id: "moe_123",
    category: "Compiler Design",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "What compiler data structure is used to store names, types, and scope boundaries of identifiers declared in source programs?",
    options: ["Segment Table", "Register File", "Symbol Table", "Syntax Tree"],
    correctAnswer: "C",
    explanation: "The Symbol Table is a central hash table used throughout the compiling process. It tracks identifiers along with their types, memory footprints, and scope boundaries.",
    wrongOptionsExplanation: {
      "A": "A Segment Table is an OS memory structure used to manage memory segments, not a compiler table.",
      "B": "A register file is the CPU's physical array of CPU registers.",
      "D": "A Syntax Tree represents the grammatical hierarchical structure of the program's statements."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Symbol Table Structure", "Scope Resolution", "Lexical Scopes"]
  },
  {
    id: "moe_124",
    category: "Artificial Intelligence",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "In game theory andadversarial search, how does Alpha-Beta pruning optimize the standard minimax search tree?",
    options: [
      "It expands the tree search depth to infinity using dynamic heap allocations.",
      "It cuts off and ignores branches that are guaranteed to yield worse outcomes than branches already evaluated, without changing the final result.",
      "It replaces heuristic scoring systems with random coin tosses to save time.",
      "It forces the opponent to play sub-optimal search paths."
    ],
    correctAnswer: "B",
    explanation: "Alpha-beta pruning is an optimization technique for minimax search. It tracks two bounds: alpha (maximum score guaranteed to Maximizer) and beta (minimum score guaranteed to Minimizer). If a branch's score is worse than the currently guaranteed limit, it is pruned, saving CPU cycles while yielding the exact same output.",
    wrongOptionsExplanation: {
      "A": "Physical limits prevent searching to infinity on deep trees (such as Chess). Pruning reduces search width, not depth constraints.",
      "C": "Minimax is entirely deterministic, attempting to find optimal moves rather than relying on randomized algorithms.",
      "D": "Minimax assumes the opponent will always make optimal plays, planning for the worst-case scenario."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Minimax Optimizations", "Alpha-Beta Pruning", "Adversarial Search"]
  },
  {
    id: "moe_125",
    category: "Artificial Intelligence",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "How does a Model-Based Reflex Agent track environmental changes that are not currently visible to its sensors?",
    options: [
      "By requesting state updates from other agents via network connections.",
      "By maintaining an internal state model representing how the environment shifts over time and how the agent's actions affect it.",
      "By guessing random values using a Monte Carlo heuristic.",
      "By halting execution until sensors clear."
    ],
    correctAnswer: "B",
    explanation: "A Model-Based Reflex Agent handles partial observability by maintaining an 'internal state' (or model). It uses this model to track elements of the environment that its sensors cannot perceive in real time, updating it based on historical logs.",
    wrongOptionsExplanation: {
      "A": "Model-based agents can operate in isolation, without needing network connections to query third-party states.",
      "C": "An internal state is predictive and structured, which is more reliable than random guessing.",
      "D": "Self-driving cars cannot halt execution in the middle of a highway; they must rely on predictive internal models to stay safe."
    },
    source: "Seeded (Aman Nigussu)",
    relatedConcepts: ["Agent Architectures", "Model-based Agents", "Sensor Observability Limits"]
  },
  {
    id: "moe_126",
    category: "Artificial Intelligence",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "During neural network training, how does the Backpropagation algorithm optimize prediction accuracy?",
    options: [
      "It adds new layers to the neural network randomly.",
      "It calculates the gradient of the loss function with respect to the network's weights, updating those weights from output back to input to minimize error.",
      "It converts positive numerical inputs into negative values.",
      "It eliminates classification values completely."
    ],
    correctAnswer: "B",
    explanation: "Backpropagation is a training technique for neural networks. It calculates the error (loss) at the output layer and propagates the gradient of the loss function back through the network's layers using the chain rule, adjusting the weights to minimize prediction error.",
    wrongOptionsExplanation: {
      "A": "Backpropagation optimizes the weights of an existing network structure; it does not dynamically add layers.",
      "C": "Weight changes can be positive or negative depending on the computed gradient.",
      "D": "It improves classification accuracy, which requires tracking target values."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Neural Network Training", "Backpropagation Algorithm", "Gradient Descent Optimization"]
  },
  {
    id: "moe_127",
    category: "Artificial Intelligence",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "In machine learning, what is the key difference between Supervised Learning and Unsupervised Learning?",
    options: [
      "Supervised learning requires human engineers to sit next to the hardware continuously.",
      "Supervised learning trains models on labeled training data with known correct outputs, whereas unsupervised learning analyzes unlabeled data to discover hidden patterns.",
      "Unsupervised learning is restricted to running on older mainframe hardware.",
      "Supervised models cannot make predictions on new, unseen test data."
    ],
    correctAnswer: "B",
    explanation: "Supervised learning models train on a labeled dataset (containing inputs paired with target outputs) to learn a mapping rule. Unsupervised models work on unlabeled datasets, attempting to group or cluster data points to discover inherent patterns without guidance.",
    wrongOptionsExplanation: {
      "A": "Both methods are automated and execute on computers without requiring constant human monitoring.",
      "C": "Dynamic unsupervised algorithms run on modern cloud infrastructure, not old mainframes.",
      "D": "The main goal of supervised models is generalizability, which is their ability to make accurate predictions on new data."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Machine Learning Paradigms", "Supervised Classifications", "Unsupervised Clustering"]
  },
  {
    id: "moe_128",
    category: "Computer Security",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "If five business partners want to establish a secure, private communication channel using Symmetric Key cryptography, how many shared keys must be generated and distributed in total?",
    options: ["5 keys", "10 keys", "20 keys", "2 keys"],
    correctAnswer: "B",
    explanation: "In a fully connected symmetric network of N users, the number of keys required is calculated using the formula N(N-1)/2. For 5 partners, this is 5 * (4) / 2 = 10 shared keys.",
    wrongOptionsExplanation: {
      "A": "If there were only 5 keys, partners would have to share keys across channels, enabling eavesdropping.",
      "C": "This is too many key pairs, which represents a calculation oversight.",
      "D": "Two keys are insufficient to provide isolated private channels between all five users."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Symmetric Encryption", "Key Distribution Math", "Cryptography Limits"]
  },
  {
    id: "moe_129",
    category: "Computer Security",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "Which of the following practices represents the most effective client-side security defense to prevent Cross-Site Scripting (XSS) attacks in web applications?",
    options: [
      "Banning active query cookies entirely.",
      "Sanitizing, escaping, and encoding all user-supplied inputs and outputs before rendering them inside HTML layers.",
      "Enabling a hardware firewall in front of database servers.",
      "Forcing page redirects to a static index page on every keypress."
    ],
    correctAnswer: "B",
    explanation: "Cross-Site Scripting occurs when an application renders malicious script tags supplied by users. It can be prevented by sanitizing inputs and escaping outputs, converting characters like `<` to `&lt;` so that the browser treats them as text rather than runnable script instructions.",
    wrongOptionsExplanation: {
      "A": "Banning cookies does not prevent script injection; malicious code can still steal local storage data.",
      "C": "Database firewalls check SQL injections, but are ineffective against front-end browser scripts.",
      "D": "Redirecting on every keypress breaks usability without fixing the underlying script execution vulnerability."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Cross-Site Scripting Defenses", "Sanitization and Escaping", "Web Sandbox Protections"]
  },
  {
    id: "moe_130",
    category: "Computer Security",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "An email attacker sends fake messages claiming to be a financial institution, prompting users to click a link to log in and steal their passwords. What is this social engineering attack called?",
    options: ["Phishing", "Man-in-the-middle", "SQL injection", "Smurf attack"],
    correctAnswer: "A",
    explanation: "Phishing is a social engineering attack where bad actors masquerade as trustworthy entities in digital communications, tricking targets into clicking malicious links or submitting sensitive information.",
    wrongOptionsExplanation: {
      "B": "Man-in-the-middle attacks intercept communication lines between two active systems.",
      "C": "SQL injection exploits input field vulnerabilities to execute unauthorized queries on databases.",
      "D": "A Smurf attack is a type of Distributed Denial of Service (DDoS) attack that floods a target with spoofed ICMP ping packets."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Social Engineering", "Phishing Scams", "Security Awareness Training"]
  },
  {
    id: "moe_131",
    category: "Computer Security",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "To protect a REST API or backend service from SQL Injection (SQLi) attacks, which coding technique should developers implement in their database query logic?",
    options: [
      "MD5 hashing of all SQL strings.",
      "Direct string concatenation of user input parameters.",
      "Parameterized queries (Prepared Statements) with bound inputs.",
      "Converting queries to dynamic XML documents."
    ],
    correctAnswer: "C",
    explanation: "Prepared Statements or Parameterized Queries separate the query structure from the user data parameters. The database engine compiles the SQL command structure first, treating user input strictly as parameters rather than executable SQL commands, which prevents SQL injection templates.",
    wrongOptionsExplanation: {
      "A": "MD5 hash values cannot be parsed as valid SQL instructions by database engines.",
      "B": "Direct string concatenation of inputs is the primary vulnerability that enables SQL Injection.",
      "D": "XML formats are for data transport, not SQL command compilation."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["SQL Injection", "Prepared Statements", "Securing Backends"]
  },
  {
    id: "moe_132",
    category: "Computer Security",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Hard,
    questionText: "What does 'Air-Gapping' a secure system refer to in physical security contexts?",
    options: [
      "Mounting systems next to cooling fans to prevent heat damage.",
      "Isolating a secure computer physically and logically from all external networks (including the Internet), preventing any network connections.",
      "Allowing only lightweight wireless connections over small geographical limits.",
      "Securing building vents to prevent acoustic eavesdropping."
    ],
    correctAnswer: "B",
    explanation: "An air-gapped system is a physical security measure. The system has zero physical or logical network connections to the outside world, creating a security barrier that prevents remote hacking and malware propagation.",
    wrongOptionsExplanation: {
      "A": "Physical cooling is critical, but does not provide logical security isolation.",
      "C": "Any wireless connection (even short-range Wi-Fi or Bluetooth) violates the air-gap isolation standard.",
      "D": "Acoustic shielding is a separate, specialized TEMPEST protection standard, not air-gapping."
    },
    source: "AAU Exit Model Paper 2023",
    relatedConcepts: ["Physical Isolation", "Air-gapped Security", "Critical Infrastructure Protections"]
  },
  {
    id: "moe_133",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Easy,
    questionText: "How does the Transmission Control Protocol (TCP) differ from the User Datagram Protocol (UDP) at the Transport OSI layer?",
    options: [
      "TCP is connectionless and does not guarantee packet delivery, whereas UDP is connection-oriented.",
      "TCP is connection-oriented, guarantees packet delivery, and implements flow control, whereas UDP is connectionless, prioritizing speed over reliability.",
      "TCP operates at the physical layer, whereas UDP operates at the network layer.",
      "TCP is limited to local networks, whereas UDP routes packets across the global Internet."
    ],
    correctAnswer: "B",
    explanation: "TCP is a connection-oriented, reliable protocol that uses three-way handshakes, sequence numbers, flow control (sliding window), and error recovery to guarantee delivery of all data segments. UDP is a connectionless, minimal protocol that has lower overhead, which is ideal for real-time video streaming or gaming where speed is preferred over complete reliability.",
    wrongOptionsExplanation: {
      "A": "This statement is the exact opposite of the protocols' actual behaviors.",
      "C": "Both TCP and UDP are Transport Layer (Layer 4) protocols.",
      "D": "Both protocols can route packets globally across the Internet using IP headers."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Transport Layer Protocols", "TCP Reliability Features", "UDP Performance"]
  },
  {
    id: "moe_134",
    category: "Computer Networks",
    type: QuestionType.ScenarioBased,
    difficulty: Difficulty.Hard,
    questionText: "An network administrator is assigned the Class C network block 192.168.10.0 and applies the subnet mask 255.255.255.224. How many usable host IP addresses are available inside each sub-directory network partition?",
    options: ["32 hosts", "30 hosts", "16 hosts", "14 hosts"],
    correctAnswer: "B",
    explanation: "The subnet mask 255.255.255.224 corresponds to a Prefix of /27. Since the octet is 8 bits, we have 32 - 27 = 5 bits allocated for host addresses. This yields 2⁵ = 32 possibilities. However, we must subtract 2 addresses: the Network Address (all host bits 0) and the Broadcast Address (all host bits 1). This leaves 32 - 2 = 30 usable host IP addresses.",
    wrongOptionsExplanation: {
      "A": "This is the total number of IP addresses in each block, which incorrectly includes the network and broadcast addresses.",
      "C": "This is the host capacity of a /28 subnet (16 - 2 = 14 hosts), not a /27.",
      "D": "This is the number of usable hosts under a /28 subnet."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["IP Subnetting", "Host Bit Allocation", "Network and Broadcast Addresses"]
  },
  {
    id: "moe_135",
    category: "Computer Networks",
    type: QuestionType.MCQ,
    difficulty: Difficulty.Medium,
    questionText: "What protocol is used to translate user-friendly domain names (like www.google.com) into physical IP addresses that route across networks?",
    options: ["DHCP", "DNS", "FTP", "SMTP"],
    correctAnswer: "B",
    explanation: "The Domain Name System (DNS) is an application-layer network protocol that translates human-readable domain names into logical IP addresses, acting as the directory of the Internet.",
    wrongOptionsExplanation: {
      "A": "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and network settings to devices on startup.",
      "C": "FTP (File Transfer Protocol) is used to upload and download files between clients and servers.",
      "D": "SMTP (Simple Mail Transfer Protocol) is used to transmit emails between mail servers."
    },
    source: "MoE License Prep Blueprint",
    relatedConcepts: ["Domain Name System", "Application Layer Protocols", "DNS Record Resolution"]
  }
];

