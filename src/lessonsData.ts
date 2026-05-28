import { Lesson } from "./types";

export const SEEDED_LESSONS: Lesson[] = [
  {
    id: "les_prog",
    category: "Programming Fundamentals",
    title: "Variables, Scopes, and Logical Short-Circuiting",
    summary: "Systematic control flow parsing, prefix/postfix operations, and lazy boolean evaluation templates for C++ and Java.",
    contentMarkdown: `
# Variables, Operators & short-circuiting

In the Ethiopian National Exit Exam, tracing C++ and Java code execution is a highly weighted section. You will frequently encounter tricky expressions involving increment operators, ternary operators, and logical short-circuit evaluations.

## 1. Postfix vs. Prefix Increments
Understanding the precise order of operations is vital for code tracing questions.

* **Prefix (\`++x\`, \`--x\`):** The value of the operand is changed *first*, and then the updated value is returned in the expression.
* **Postfix (\`x++\`, \`x--\`):** The original value of the operand is returned first for evaluation, and then the variable is incremented *second* in memory.

### Code Tracing Trap (C++):
\`\`\`cpp
int x = 5;
int y = ++x * 2; // Prefix: x becomes 6, y becomes 12
int z = x++ * 2; // Postfix: z becomes 6 * 2 = 12, then x becomes 7
\`\`\`

## 2. Comma Operator
In C/C++, a comma operator processes multiple expressions from left to right, but returns *only* the value of the rightmost expression.
\`\`\`cpp
int c = (a = 2, b = 4, a + b); // c receives the value of a + b, which is 6.
\`\`\`

## 3. Short-Circuit Evaluation
In complex conditionals, the compiler skips evaluating subsequent expressions if the overall logical outcome is already determined:
* **AND Short-circuit (\`A && B\`):** If \`A\` evaluates to \`false\`, the entire expression *must* be false. Thus, \`B\` is **never** evaluated.
* **OR Short-circuit (\`A || B\`):** If \`A\` evaluates to \`true\`, the entire expression *must* be true. Thus, \`B\` is **never** evaluated.

### Exam Trap Scenario:
\`\`\`cpp
int a = 5, b = 8;
int x = 2, y = 4;
// Evaluates x > y ? (2 > 4 -> false). 
// The ternary operator ONLY runs the false branch: (b--, y).
// Since the true branch is skipped, 'a' remains 5.
int c = (x > y ? (a--, x) : (b--, y)); 
// Result: a=5, b=7, c=4
\`\`\`

---

## 4. Scope Limits and Lifetime
* **Local Scope:** Variables declared inside a block \`{}\` exist only within that block (e.g., inside loop bodies or local functions).
* **Static Variables:** Declared with \`static\`. They are initialized **only once** and retain their values between function calls across the application lifecycle.
`,
    difficultyProgression: [
      "Basic Object Storage & Types",
      "Prefix/Postfix Sequence Timing",
      "Boolean Gate Short-Circuits",
      "Ternary and Comma Operators Tracing"
    ],
    keyFormulas: [
      "Short-Circuit AND: false && f() -> false (f is skipped/not executed)",
      "Short-Circuit OR: true || f() -> true (f is skipped/not executed)",
      "Comma operator: (expr1, expr2) -> executes both, yields value of expr2"
    ],
    tips: [
      "Keep a scratchpad: write down each variable when tracing compound increment questions to avoid off-by-one errors.",
      "Check pointer references: in C++, `int *p` reserves a pointer, while `&p` represents the address of the pointer itself."
    ]
  },
  {
    id: "les_oop",
    category: "Object-Oriented Programming",
    title: "Inheritance, Abstract Classes, and Dynamic Dispatch",
    summary: "Polymorphic method overrides, virtual method tables (VTables) in C++, dynamic dispatch in Java, and access modifiers.",
    contentMarkdown: `
# Object-Oriented Programming Foundations

The Ethiopian Ministry of Education curriculum emphasizes Java and C++ as core languages. The exit exam heavily tests your understanding of access control, class interactions, and dynamic runtime method resolution.

## 1. Access Modifiers: Visibility Matrix
Access control enforces the security principle of *least privilege*.

| Access Modifier | Within Class | Within Package | Subclasses Only | External Universe |
| :--- | :---: | :---: | :---: | :---: |
| **private** | Yes | No | No | No |
| **default** | Yes | Yes | No | No |
| **protected** | Yes | Yes | Yes (even if outside package) | No |
| **public** | Yes | Yes | Yes | Yes |

*Exam Tip:* If you want subclasses in other packages to access a field, but deny access to random external objects, choose **protected**.

## 2. Dynamic Dispatch (Runtime Polymorphism)
Dynamic dispatch is the mechanism by which a call to an overridden method is resolved at **runtime** rather than compile-time.

* **Method Overriding:** A subclass provides a specific implementation of a method that is already declared in its superclass. Signature must be identical.
* **Method Overloading:** Multiple methods in the same class have the same name but different parameter lists (compile-time polymorphism).

### The Dynamic Dispatch Trap:
\`\`\`java
class Parent {
    void show() { System.out.print("Parent "); }
}
class Child extends Parent {
    void show() { System.out.print("Child "); }
}
public class Main {
    public static void main(String[] args) {
        Parent obj = new Child(); 
        obj.show(); // Outputs "Child"
    }
}
\`\`\`
*Explanation:* The reference type is checked at compile-time (allowing compiler validations), but the actual object type (\`Child\`) dictates which method is invoked at runtime.

---

## 3. Abstract Classes vs. Interfaces
* **Abstract Class:** Can hold instance state variables and concrete methods. A class can extend only one parent abstract class (Single Inheritance).
* **Interface:** Can only contain public static final constants and abstract method signatures (or default/static methods in Java 8+). A class can implement multiple interfaces, allowing support for multiple inheritance behavior.
`,
    difficultyProgression: [
      "Encapsulation and Modifiers",
      "Overloading vs Overriding Signs",
      "Interface Rules & Implementation",
      "Dynamic Dispatch & VTables in C++"
    ],
    keyFormulas: [
      "Base Reference = Derived Instance() -> triggers Overridden methods at runtime",
      "C++ Virtual Destructor -> prevents memory leaks when deleting derived objects via parent pointers"
    ],
    tips: [
      "Remember: constructors are never inherited. They are called in sequence from base class down to derived class.",
      "In C++, to enable dynamic binding, the keyword 'virtual' must be explicitly declared on base class methods."
    ]
  },
  {
    id: "les_db",
    category: "Database Systems",
    title: "Relational Model, Joins, and Normalization Forms",
    summary: "Detailed diagnostic of relational structural algebra, ANSI SQL queries, and normalization from 1NF to BCNF.",
    contentMarkdown: `
# Relational Databases & Normalization

Relational databases are structured around mathematical sets. Expect questions on schema isolation, functional dependencies, normal forms, and SQL queries.

## 1. Keys and Relational Integrity Constraints
* **Primary Key:** Unique identifier for each tuple. Cannot contain any null values (**Entity Integrity Constraint**).
* **Foreign Key:** A attribute in a child table pointing to a primary key in a parent table. Must match an existing value or be null (**Referential Integrity Constraint**).
* **Superkey:** Any set of attributes that uniquely identifies a row.
* **Candidate Key:** A minimal superkey (contains no redundant attributes).

## 2. SQL Logical Execution Order
Knowing how SQL evaluates a query step-by-step is critical for predicting output:
1. \`FROM\` & \`JOIN\` (Gathers source datasets)
2. \`WHERE\` (Filters individual rows before grouping)
3. \`GROUP BY\` (Groups raw rows into summary rows)
4. \`HAVING\` (Applies filter conditions on aggregate results - e.g., COUNT, SUM)
5. \`SELECT\` (Extracts and computes target columns)
6. \`ORDER BY\` (Arranges the final displayed records)

*Exam Trap:* You cannot use an aggregate function (like \`SUM(Salary) > 5000\`) in the \`WHERE\` clause. It must be placed in a \`HAVING\` clause.

---

## 3. Database Normalization (Theory and Practice)
Normalization organizes columns to reduce redundant duplication and eliminate write, update, and deletion anomalies.

### First Normal Form (1NF)
All column attributes must be **atomic** (single, indivisible values). No repeating groups or nested arrays are allowed.

### Second Normal Form (2NF)
Must be in **1NF**, plus have **no partial dependencies**. 
* Every non-prime attribute must depend on the *entire* primary key, not just a subset of it. 
* Only applies when table has a composite primary key.

### Third Normal Form (3NF)
Must be in **2NF**, plus have **no transitive dependencies**.
* A non-prime attribute cannot depend on another non-prime attribute.
* Rule of Thumb: *"Every non-key attribute must depend on the key, the whole key, and nothing but the key (so help me Codd)."*

### Boyce-Codd Normal Form (BCNF)
Must be in **3NF**. For every functional dependency \`X -> Y\`, \`X\` must be a **superkey**. (Strictly stronger than 3NF to handle overlapping composite candidate keys).
`,
    difficultyProgression: [
      "Relational Integrity & Primary Keys",
      "Logical ANSI SQL Query Evaluation",
      "Identifying Functional Dependencies",
      "Decomposing schemas to 3NF/BCNF"
    ],
    keyFormulas: [
      "Entity Integrity Constraint: Primary Key attributes != NULL",
      "Referential Integrity Constraint: Foreign Key values in Child must exist in Parent PK or be NULL"
    ],
    tips: [
      "If you see multiple phone numbers inside a single cell in a schema diagram, it violates 1NF.",
      "A table is automatically in 2NF if its primary key consists of a single column."
    ]
  },
  {
    id: "les_os",
    category: "Operating Systems",
    title: "Virtual Memory, Paging, and Deadlock Coffman Rules",
    summary: "CPU scheduling algorithms, memory paging mechanics, virtual address translations, and deadlock handling.",
    contentMarkdown: `
# Operating Systems Architcture

An operating system acts as an intermediary between user software and hardware resources. Core exam concepts include process concurrency, page tables, and deadlock structures.

## 1. Process States and Lifecycle
Processes cycle through different states under operating system scheduling:
* **Ready:** The process is loaded in RAM and waiting for CPU allocation timeslice.
* **Running:** Instructions are actively executing on the hardware core.
* **Blocked/Waiting:** The process is paused waiting for an external event or I/O resource.

## 2. Virtual Memory address translation
Virtual memory maps logical program spaces to physical RAM blocks:
* **Pages:** Equal-sized blocks of logical program memory.
* **Frames:** Equal-sized blocks of physical internal RAM.
* **MMU mapping:** The Memory Management Unit translates Virtual Addresses into Physical Addresses:
  $$\\text{Virtual Address} = \\text{Page Number} + \\text{Offset}$$
* **Page Fault:** Triggered when the CPU requests a page that is not currently loaded in physical RAM.

---

## 3. CPU Scheduling Metrics
* **FCFS (First-Come First-Served):** Non-preemptive. Prone to the **Convoy Effect** (short tasks are delayed behind a massive process).
* **SJF (Shortest Job First):** Minimizes average waiting time.
* **Round Robin:** Cyclic, time-sliced scheduling. Relies on timer interrupts; handles interactive multi-user processes effectively.

## 4. Deadlock Management & Coﬀman Rules
A deadlock is a permanent state where processes hold resources and wait perpetually for resources held by other processes in a cycle.

### The Four Coffman Conditions:
All four must occur simultaneously for a deadlock to exist:
1. **Mutual Exclusion:** Resources can only be claimed by one process at a time.
2. **Hold and Wait:** Processes holding existing resources can request new ones.
3. **No Preemption:** Resources cannot be forcibly stripped from a process.
4. **Circular Wait:** A closed chain of processes exists where each waits for a resource held by the next.

### Deadlock Handling Strategies:
* **Prevention:** Design the system to make it impossible for at least one Coffman condition to occur (e.g., forcing all resources to be requested at once).
* **Avoidance:** Dynamically monitor resource requests using algorithms like the **Banker's Algorithm** to ensure the system is always in a "safe state".
* **Detection & Recovery:** Let deadlocks occur, detect them, and resolve the blockage (e.g., by aborting transactions or preempting resources).
`,
    difficultyProgression: [
      "Five-State Process Transition Map",
      "Paging and Page Replacement Policies",
      "CPU Gantt Scheduling Calculations",
      "Banker's Safe State Matrices"
    ],
    keyFormulas: [
      "FIFO/LRU Page Replacement: Tracks frame age or active use intervals.",
      "Turnaround Time = Completion Time - Submission Time",
      "Waiting Time = Turnaround Time - Burst Time"
    ],
    tips: [
      "Wait-Die and Wound-Wait are deadlock prevention strategies that use timestamps to prevent cyclic dependencies.",
      "No-Wait is a simple policy that aborts any transaction unable to obtain a lock immediately. Because waiting is forbidden, deadlocks cannot form."
    ]
  },
  {
    id: "les_net",
    category: "Computer Networks",
    title: "OSI Reference Layers, TCP/IP, and IPv4 Subnetting",
    summary: "Detailed overview of OSI layer roles, key protocols, transport flow controls, and IP subnet calculations.",
    contentMarkdown: `
# Computer Networks & Subnetting

Modern networking relies on layered architectures. To ace this section, you must understand both theoretical models (OSI) and practical math (IPv4 subnetting).

## 1. The OSI Reference Model
The standard International Organization for Standardization (ISO) OSI model consists of 7 protocol layers.

| OSI Layer | Protocol Data Unit (PDU) | Core Responsibilities & Devices | Key Protocols |
| :---: | :---: | :--- | :--- |
| **7. Application** | Data / Message | Human-computer interaction, app services | HTTP, HTTPS, DNS, FTP, SMTP |
| **6. Presentation** | Data / Message | Syntax formatting, encryption, compression | SSL/TLS, JSON, ASCII |
| **5. Session** | Data / Message | Inter-host dialogue, connection sessions | NetBIOS, RPC |
| **4. Transport** | Segment (TCP) / Datagram (UDP) | End-to-end reliability, flow control, port numbers | TCP, UDP |
| **3. Network** | Packet | Routing streams, logical addressing, routers | IPv4, IPv6, ICMP, OSPF |
| **2. Data Link** | Frame | Hop-to-hop physical framing, MAC addresses, switches | Ethernet, Wi-Fi (802.11) |
| **1. Physical** | Bits | Raw transmission of bits over wire, hubs, cables | RS-232, fiber optics |

---

## 2. Transport Protocol Mechanics: TCP vs. UDP
* **TCP (Transmission Control Protocol):** Connection-oriented, reliable (guaranteed delivery via ACKs), byte-stream, features congestion and flow control (Sliding Window).
* **UDP (User Datagram Protocol):** Connectionless, unreliable (best-effort delivery), lightweight, minimal overhead (excellent for voice, video, DNS queries).

---

## 3. IPv4 Addressing and Subnetting Math
An IPv4 address consists of 32 bits divided into four 8-bit octets.

### Subnetting Formulas:
1. **Total IP addresses in block:** $2^{(32 - N)}$, where $N$ is the CIDR prefix subnet slash number.
2. **Usable Host IP addresses in block:** $2^{(32 - N)} - 2$ (Subtracting one for the Network Address and one for the Broadcast Address).
3. **Number of created subnets:** $2^{S}$, where $S$ is the number of borrowed network bits.

### Subnetting Trace Example:
Calculate subnet details for IP \`192.168.1.130/26\`:
* CIDR prefix is \`/26\`. This leaves $32 - 26 = 6$ host bits.
* Subnet Mask: 26 ones in binary, representing \`255.255.255.192\`.
* Total IPs in this subnet block: $2^6 = 64$ addresses.
* Usable host IPs per subnet block: $64 - 2 = 62$ hosts.
* Subnet address boundaries: blocks of 64:
  * Subnet 0: \`192.168.1.0\` to \`192.168.1.63\`
  * Subnet 1: \`192.168.1.64\` to \`192.168.1.127\`
  * Subnet 2: \`192.168.1.128\` to \`192.168.1.191\`
* Since target IP is \`192.168.1.130\`, it belongs to **Subnet 2**:
  * **Network ID:** \`192.168.1.128\`
  * **Broadcast ID:** \`192.168.1.191\`
  * **First Usable IP:** \`192.168.1.129\`
  * **Last Usable IP:** \`192.168.1.190\`
`,
    difficultyProgression: [
      "7-Layer OSI & TCP/IP Model Mapping",
      "Network Device Operating Layers",
      "UDP vs TCP Port Multiplexing",
      "Classless Inter-Domain Routing (CIDR)"
    ],
    keyFormulas: [
      "Total Subnet Hosts = 2^(32 - HostBits)",
      "Usable Subnet Hosts = 2^(32 - HostBits) - 2"
    ],
    tips: [
      "The Network Address always has all host bits set to 0. The Broadcast Address always has all host bits set to 1.",
      "A standard Layer 2 switch directs packets using MAC addresses. A router (Layer 3) routes packets using IP addresses."
    ]
  },
  {
    id: "les_dsa",
    category: "Data Structures & Algorithms",
    title: "Algorithmic Complexity, Tree Traversals, and Graphs",
    summary: "Comprehensive guide to Big-O notation, binary trees, sorting algorithms, and shortest-path graph models.",
    contentMarkdown: `
# Data Structures & Core Algorithms

Data structures organize memory, while algorithms manipulate that data. The Exit Exam heavily tests code efficiency analysis, pointer structures, and trees/graphs.

## 1. Asymptotic Complexity (Big-O Notation)
Big-O notation describes the limiting behavior of an algorithm's execution time or storage space as the input size $n$ grows.

| Notation | Growth Class | Examples |
| :--- | :---: | :--- |
| **$O(1)$** | Constant | Array index access, Hash map bucket lookup |
| **$O(\\log n)$**| Logarithmic | Binary search on sorted lists, BST lookups (balanced) |
| **$O(n)$** | Linear | Linear search, Unsorted array traversal |
| **$O(n \\log n)$**| Linearithmic | Merge Sort, Quick Sort (best/average), Heap Sort |
| **$O(n^2)$** | Quadratic | Bubble Sort, Selection Sort, Insertion Sort (worst case) |

---

## 2. Non-Linear Structures: Binary Trees
A binary tree is a hierarchical node structure where each parent has at most two children.

### Depth-First Traversals (BST):
Consider a Node with left child (L), current parent (N), and right child (R).

* **Preorder Conversion (N -> L -> R):** Visit parent, traverse left, traverse right. (Used for copying trees).
* **Inorder Conversion (L -> N -> R):** Traverse left, visit parent, traverse right. (**Always delivers values in sorted ascending order in a Binary Search Tree (BST)**).
* **Postorder Conversion (L -> R -> N):** Traverse left, traverse right, visit parent. (Used for deleting trees).

### BST Traversal Trace:
Given array: \`[4, 2, 5]\` in a BST (node 4 is parent, 2 is left child, 5 is right child):
* **Inorder:** \`2, 4, 5\` (ascending!)
* **Preorder:** \`4, 2, 5\`
* **Postorder:** \`2, 5, 4\`

---

## 3. Graph Algorithms
Graphs model complex network topologies. Two major algorithms featured in the exit exam are:

### Prim's & Kruskal's Algorithms
Used to find a **Minimum Spanning Tree (MST)** (a subset of edges connecting all vertices with the minimum total weight, without cycles).
* **Prim's:** Starts at a root node and grows the tree greedily by adding the cheapest neighboring edge.
* **Kruskal's:** Sorts all edges globally and adds them one-by-one, skipping any edge that would create a cycle.

### Dijkstra's Algorithm
Finds the **shortest path** from a single source node to all other nodes in a graph with non-negative edge weights.
`,
    difficultyProgression: [
      "Stack/Queue LIFO & FIFO Operations",
      "Big-O Code Nested Loops Analysis",
      "Binary Search Tree Iterations",
      "Kruskal's Cycles and Disjoint Sets"
    ],
    keyFormulas: [
      "Inorder BST Traversal = Sorted Elements Result",
      "BST Height = O(log n) if balanced, O(n) if skewed/unbalanced"
    ],
    tips: [
      "Queue operations run in O(1) time if implemented with head/tail pointers in a linked list.",
      "To detect cycles in a graph before adding edges (important in Kruskal's), the Disjoint Set (Union-Find) data structure is used."
    ]
  },
  {
    id: "les_toc",
    category: "Theory of Computation",
    title: "Chomsky Hierarchy, Automata, and Decidability",
    summary: "DFA/NFA machines, Regular Expressions, Context-Free Grammars, and Turing computability limits.",
    contentMarkdown: `
# Theory of Computation

The Theory of Computation defines what can and cannot be mathematically solved using computer systems. It is divided into Automata Theory, Computability Theory, and Complexity Theory.

## 1. The Chomsky Hierarchy of Languages
Languages are classified by the complexity of the computational machines needed to recognize them.

| Language Class | Grammar | Automaton Model | Stack / Memory Capacity | Examples |
| :---: | :---: | :--- | :--- | :--- |
| **Regular** | Type-3 | Finite Automaton (DFA/NFA) | None | \`a*b+\`, identifier tokens |
| **Context-Free** | Type-2 | Pushdown Automaton (PDA) | 1 Infinite Stack | Match matching parentheses, HTML |
| **Context-Sensitive** | Type-1 | Linear-Bounded Automaton | Memory proportional to input | $a^n b^n c^n$ arrays |
| **Recursively Enumerable** | Type-0 | Turing Machine | Infinite flat linear Tape | Any executable program |

---

## 2. Deterministic Finite Automata (DFA)
A DFA is a 5-tuple machine defined as $M = (Q, \\Sigma, \\delta, q_0, F)$:
* $Q$: Finite set of states.
* $\\Sigma$: Input alphabet symbols.
* $\\delta$: Transition function ($Q \\times \\Sigma \\rightarrow Q$).
* $q_0$: Initial state.
* $F$: Set of accepting states.

*Exam Rule:* In a DFA, there is **exactly one** transition for every state and input symbol. In an NFA (Nondeterministic Finite Automata), transitions can map to zero, one, or multiple states, and can occur without consuming input via $\\epsilon$-transitions.

---

## 3. Computability & The Halting Problem
* **Decidability:** A problem is *decidable* if there exists an algorithm (a Turing Machine) that is guaranteed to stop and return the correct boolean answer for every possible input.
* **Undecidability:** Problems that cannot be solved by any computer program.
* **The Halting Problem (Turing, 1936):** Given a computer program and an input, determine if the program will eventually finish running or run forever. **The Halting Problem is proved to be undecidable** for any general computational engine.
`,
    difficultyProgression: [
      "Constructing DFAs for Binary Strings",
      "Synthesizing Regular Expression Rules",
      "Pushdown Automata Stack Operations",
      "Turing Tape Decidability Proofs"
    ],
    keyFormulas: [
      "DFA Transition: delta(q, a) -> returns single target state",
      "NFA Transition: delta(q, a) -> returns set of possible states (subset of Q)"
    ],
    tips: [
      "Regular languages *cannot* count arbitrary structures. For example, the language $a^n b^n$ is context-free, not regular, because it requires memory (a stack) to track matching counts.",
      "If a DFA has $N$ states, any string of length $\\geq N$ that is accepted must trigger a cycle. This is the foundation of the **Pumping Lemma**."
    ]
  },
  {
    id: "les_se",
    category: "Software Engineering",
    title: "SDLC Process Models, UML Blueprints, and Testing Strategies",
    summary: "SDLC methodologies, Unified Modeling Language (UML) structural layouts, and software testing procedures.",
    contentMarkdown: `
# Software Engineering Methods

Software Engineering applies engineering discipline to large-scale software design. Exit Exam questions frequently cover Software Development Life Cycle (SDLC) models, requirements analysis, UML diagrams, and testing methodologies.

## 1. SDLC Process Models Comparisons
Selecting an SDLC model depends heavily on project risk, clarity of requirements, and budget limits.

* **Waterfall Model:** Linear, sequential phases. Work flows strictly downward (Requirements -> Design -> Code -> Test). Highly structured, but rigid and poor for projects with evolving requirements.
* **Spiral Model:** Risk-focused iterative model. Spans multiple cycles through four main quadrants: planning, risk assessment, engineering, and evaluation. Highly recommended for expensive, mission-critical systems.
* **Agile (Scrum):** Iterative and incremental methodology. Delivers working software in short, fixed sprints (typically 2-4 weeks). Emphasizes collaboration and quick adaptation to change.

---

## 2. Unified Modeling Language (UML) Blueprints
UML diagrams provide standard blueprints representing software designs.

### Use Case Diagrams
Model **system requirements** and how external agents (actors) interact with the system boundary.
* **Include Relationship (\`<<include>>\`):** Reusable behavior. The base use case *requires* the included behavior to execute successfully (e.g., "Checkout" <<include>> "Verify Balance").
* **Extend Relationship (\`<<extend>>\`):** Optional behavior. Triggered only under specific conditions (e.g., "Calculate Discount" <<extend>> "Checkout").

### Class Diagrams
Show structural relationships (classes, properties, methods, inheritance, and links):
* **Aggregation (Empty Diamond):** "Has-a" relationship where the parts can exist independently of the whole (e.g., Class has-a Student).
* **Composition (Filled Diamond):** Strong "has-a" ownership. If the parent container is deleted, the parts are destroyed along with it (e.g., Building has-b Rooms).

---

## 3. Software Testing Architectures
Testing verifies that software meets requirements and operates without errors.

* **Levels of Testing:**
  1. **Unit Testing:** Tests individual functions or classes in isolation (usually by the developer).
  2. **Integration Testing:** Verifies data flows and interfaces between interacting subsystems.
  3. **System Testing:** Validates that the fully integrated system meets high-level requirements.
  4. **Acceptance Testing:** Performed by the client or end-users to confirm the product matches business agreements before final delivery.

* **Testing Methods:**
  * **Black-Box Testing:** Functional testing. Testers focus purely on the inputs and outputs without knowing the internal code structure.
  * **White-Box Testing:** Structural testing. Requires complete visibility of the code. Focuses on code path execution, loop boundaries, and decision coverage.
`,
    difficultyProgression: [
      "Requirements Elicitation (Functional vs Non-Functional)",
      "UML Static vs Dynamic Interactions",
      "Aggregation vs Composition Semantics",
      "Path Coverage Metric Diagnostics"
    ],
    keyFormulas: [
      "Cyclomatic Complexity: V(G) = E - V + 2P (used to plan white-box test cases)"
    ],
    tips: [
      "Non-functional requirements specify systemic qualities or constraints (e.g., 'The system must load in under 2 seconds' represents performance/scalability).",
      "Functional requirements describe specific features of the system (e.g., 'The user must be able to add an item to the shopping cart')."
    ]
  }
];
