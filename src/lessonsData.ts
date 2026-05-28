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
  },
  {
    id: "les_web",
    category: "Web Development",
    title: "HTTP Protocol, REST APIs, and React Core Mechanics",
    summary: "State tracking, RESTful resource constraints, cookies/sessions, and client-side lifecycle execution models.",
    contentMarkdown: `
# Web Architecture & Modern client frameworks

Modern web systems rely on distributed client-server communication. The exit exam frequently targets network requests, REST constraints, state preservation, and modern frontend engines like React.

## 1. The HTTP Protocol: Stateless but Interactive
The Hypertext Transfer Protocol (HTTP) is a stateless application-layer protocol. This means every request is treated as independent — the server does not retain memory of previous client interactions.

### Core Methods and Status Codes:
* **GET:** Retrieve a resource safely (Idempotent and safe - read only).
* **POST:** Create a new resource (Not idempotent - running it twice creates two resources).
* **PUT/PATCH:** Update/modify resources (PUT replaces entire resource; PATCH applies partial edits).
* **DELETE:** Delete a resource (Idempotent).

### HTTP Status Code Families:
* **1xx (Informational):** Request received, continuing process.
* **2xx (Success):** Action successfully received and accepted (e.g., \`200 OK\`, \`201 Created\`).
* **3xx (Redirection):** Further action must be completed (e.g., \`301 Moved Permanently\`, \`304 Not Modified\`).
* **4xx (Client Error):** Request contains bad syntax or unauthorized targets (e.g., \`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\`).
* **5xx (Server Error):** Server failed to fulfill an otherwise valid request (e.g., \`500 Internal Server Error\`, \`503 Service Unavailable\`).

---

## 2. REST API Architectural Constraints
Representational State Transfer (REST) is an architectural style defined by 6 guiding constraints. Adhering to these makes APIs scalable and predictable:

1. **Client-Server Separation:** Decouples user concerns (frontend) from storage/data concerns (backend).
2. **Statelessness:** No client context is stored on the server. Every single request must contain all credentials and parameters needed to authorize and fulfill it.
3. **Cacheability:** Responses must define themselves as cacheable or not to improve system performance.
4. **Layered System:** A client cannot tell whether it is connected directly to the end server, or to intermediate systems (proxies, load balancers).
5. **Uniform Interface:** Standardizes interaction rules (using URIs for resources and HTTP verbs for actions).
6. **Code on Demand (Optional):** Servers can transfer executable scripts (like JavaScript or Java applets) directly to clients.

---

## 3. React Frontend State Engine
React uses virtual state synchronization and a reactive component architecture to render robust user interfaces efficiently.

### State vs. Props:
* **Props (Properties):** Immutable parameters passed down from a parent component to a child. They cannot be changed by the child component.
* **State:** Local, mutable data maintained privately inside active hook scopes. Modifying state triggers React's reconciliation engine.

### The Virtual DOM Reconciliation:
To avoid expensive direct writes to the browser's raw Document Object Model (DOM), React maintains a lightweight representation in memory — the **Virtual DOM**. 
* When state changes, a new virtual representation is computed.
* React performs a "diffing" algorithm to identify the minimal changes required.
* Only those specific changes are patched into the real browser DOM (efficient update rendering).
`,
    difficultyProgression: [
      "Client-Server HTTP Request Pipeline",
      "RESTful API Resource Constraints",
      "Stateless Sessions and JWT Credentials",
      "React Reconciliation Diffing Algorithm"
    ],
    keyFormulas: [
      "Idempotency: f(f(x)) = f(x) -> GET, PUT, and DELETE operations are idempotent; POST is not.",
      "Statelessness: Session context rests entirely on client side (e.g., tokens in local storage)."
    ],
    tips: [
      "JWT (JSON Web Signatures) are decoded client-side but secure because their cryptographic signatures cannot be forged without the server's private secret key.",
      "Always set unique keys on React mapped loop lists to optimize Virtual DOM comparison processes."
    ]
  },
  {
    id: "les_arch",
    category: "Computer Architecture",
    title: "Von Neumann Model, Instruction Pipelines, and Cache Mapping",
    summary: "ALU/Control unit flow registers, execution speedups, structural dependency hazards, and spatial associativity memory policies.",
    contentMarkdown: `
# Computer Architecture & Memory Hierarchies

Computer architecture explores how abstract instruction sets interface directly with hardware gates. Be prepared for processor design, cache organization, and pipelining questions.

## 1. The Von Neumann Architecture
The classic Von Neumann model relies on a unified storage system containing both instruction code and program data:
* **Processing Unit:** Houses the ALU (Arithmetic Logic Unit) and processor registers.
* **Control Unit:** Houses the Instruction Register (IR) and Program Counter (PC).
* **Memory Unit:** Temporary RAM storing values and instructions.
* **System Bus:** Facilitates communication: Data Bus, Address Bus, Control Bus.

*Bottleneck warning:* The **Von Neumann Bottleneck** refers to the data throughput limitation caused by having to fetch both data and instructions over a single shared memory bus.

---

## 2. Processor Instruction Pipelining
Pipelining overlaps the execution of multiple instructions to increase throughput. A typical pipeline consists of 5 stages:
1. **Instruction Fetch (IF):** Retrieve statement from memory.
2. **Instruction Decode (ID):** Parse register references and instruction code.
3. **Execute (EX):** Compute arithmetic inside the ALU.
4. **Memory Access (MEM):** Read or write RAM blocks.
5. **Write Back (WB):** Record mathematical results into active registers.

### Pipeline Hazards (Disruptions to Smooth Flow):
* **Structural Hazards:** A hardware resource is requested by two active instructions at the same time (e.g., single memory bus accessed during IF and MEM stages simultaneously).
* **Data Hazards:** An instruction depends on the result of an earlier instruction that is still in-flight through the pipeline (e.g., Read after Write).
* **Control Hazards:** Branching conditions or jumps disrupt sequential loading sequences, requiring flushing of fetched instructions in the pipeline buffer.

---

## 3. Cache Memory Organization & Mapping
The CPU cache resides between registers and RAM to bridge speed gaps.

### Mapping Strategies:
* **Direct-Mapped Cache:** Each memory address maps to exactly one fixed location in the cache. Simple and cheap, but prone to **conflict misses** if two variables map to the exact same slot.
* **Fully Associative Cache:** Any memory block can reside in any slot. Highly flexible with fewer misses, but requires complex parallel searching hardware.
* **Set-Associative Cache:** A compromise. The cache is divided into sets, and blocks map to a single set, but can be placed in any slot *within* that set (e.g., 2-way or 4-way associative).
`,
    difficultyProgression: [
      "Von Neumann vs Harvard Bus Structures",
      "CPU Clock cycle Instruction Tracking",
      "Resolving Pipeline Hazards, Forwarding, and Stalls",
      "Direct vs Associative Cache Mapping Math"
    ],
    keyFormulas: [
      "Speedup ratio = PipelineDepth / (1 + (Stalls / InstructionsCount))",
      "Average Memory Access Time (AMAT) = Hit Time + (Miss Rate * Miss Penalty)"
    ],
    tips: [
      "Forwarding (or bypassing) feeds the ALU result directly to the EX stage of the next instruction, avoiding data hazard stalls.",
      "RISC (Reduced Instruction Set Computer) focuses on single-cycle, simple instruction execution. CISC (Complex Instruction Set Computer) relies on hardware microcode to execute highly variable, multi-cycle instructions."
    ]
  },
  {
    id: "les_ai",
    category: "Artificial Intelligence",
    title: "State-Space Agents, Search Heuristics, and Machine Learning",
    summary: "Uninformed vs informed graph searches, agent modeling layers, cost-to-goal calculations, and classification boundaries.",
    contentMarkdown: `
# Artificial Intelligence & Search Methods

Artificial Intelligence focuses on building rational agents that perceive their environment and act to maximize success.

## 1. Intelligent Agent Typologies
An agent is defined mathematically as mapping **Percept Sequences** directly to **Actions**.

* **Simple Reflex Agent:** Base actions purely on the current percept, ignoring historic state (re-evaluates rules immediately using condition-action tables).
* **Model-Based Reflex Agent:** Maintains an internal state representing aspects of the unobserved environment to make decisions.
* **Goal-Based Agent:** Knows its target goals and selects actions that actively bring it closer to those goals.
* **Utility-Based Agent:** Uses utility functions to measure how desirable a particular state is (balancing trade-offs to choose the *best* action path).

---

## 2. Searching State Spaces
In AI, many problems are formulated as searching state-space graphs from an initial state to a goal state.

### Uninformed Searches (No domain knowledge):
* **Breadth-First Search (BFS):** Explores level-by-level. Guaranteed to find the shallowest goal in a graph. Uses a **FIFO Queue**. Space complexity is high ($O(b^d)$) because it must store all active frontier nodes in memory.
* **Depth-First Search (DFS):** Explores deep down a single branch before backtracking. Uses a **LIFO Stack** (or recursion). Memory overhead is small ($O(b \\cdot d)$). Not guaranteed to find optimal paths.

### Informed Searches (Uses domain heuristics):
* **A* Search:** Integrates path cost to reach a node and heuristic estimates to destination:
  $$f(n) = g(n) + h(n)$$
  where $g(n)$ is the cost from start to $n$, and $h(n)$ is the estimated cost from $n$ to goal.
* **Admissibility Constraint:** To guarantee A* is optimal, the heuristic function $h(n)$ must be **admissible** — meaning it *never overestimates* the true cost to reach the goal.

---

## 3. Basic Machine Learning Principles
* **Supervised Learning:** Training models on labeled datasets containing input-output pairs (e.g., Classification, Linear Regression).
* **Unsupervised Learning:** Grouping unlabeled data to find hidden structures (e.g., K-Means Clustering, Principal Component Analysis).
* **Reinforcement Learning:** Training agents through systems of rewards and punishments to discover optimal sequential policies.
`,
    difficultyProgression: [
      "Agent Rationality and Environments",
      "BFS/DFS Node Expansion Orders",
      "Designing Admissible Search Heuristics",
      "Supervised vs Unsupervised ML Decisions"
    ],
    keyFormulas: [
      "A* Evaluation: f(n) = g(n) + h(n) (where recursive sum g(n) tracks cost spent)",
      "Admissibility Metric: 0 <= h(n) <= h*(n) (the true target remaining cost)"
    ],
    tips: [
      "Manhattan distance is an admissible heuristic for routing grids on 4-way orthographic moves.",
      "K-Means clustering is highly sensitive to the initial placement of random centroids and can easily get stuck in local optima."
    ]
  },
  {
    id: "les_cyber",
    category: "Cybersecurity",
    title: "CIA Triad, Encryption Protocols, and Defensive Paradigms",
    summary: "Asymmetric key mechanics, signature validations, AAA controls, and web vulnerability mitigation (SQLi/XSS).",
    contentMarkdown: `
# Principles of Cryptography & Safety

Cybersecurity protects information assets from unauthorized actions. Standard topics include encryption algorithms, basic architectural safety triads, and common security attacks.

## 1. The CIA Security Triad & AAA
The foundations of security are built upon three core pillars:
* **Confidentiality:** Restricting access to authorized users (enforced using encryption protocols).
* **Integrity:** Ensuring data remains accurate and unaltered during transit or storage (enforced using cryptographic hashes or checksums).
* **Availability:** Guaranteeing reliable access to systems and information (enforced using network redundancy and server load balancing).

### AAA Foundations:
* **Authentication:** Verifying who you are (e.g., entering passwords, checking biometrics).
* **Authorization:** Verifying what you are allowed to do (checking user permission roles).
* **Accounting (Auditing):** Tracking user actions with system logs.

---

## 2. Cryptography: Symmetric vs. Asymmetric
Encryption hides plain-text messages under mathematical layers to secure communication channels.

* **Symmetric Cryptography:** The *same* key is used for both encryption and decryption. Fast and efficient, but key distribution is challenging (e.g., AES, DES).
* **Asymmetric Cryptography:** Uses a mathematically-linked **Key Pair** consisting of a public key (distributed globally) and a private key (kept secret by the owner). 

### How Key Pairs Work:
* **To Encrypt a Message:** Use the recipient's **Public Key**. Only the matching key owner can decrypt it using their **Private Key**.
* **To Digitally Sign a Document (Non-Repudiation):** Use your **Private Key** to sign a hash of the document. Anyone can verify your signature using your public key, proving the message originated from you and was not modified.

---

## 3. High-Risk Web Vulnerabilities
Exam questions frequently present web forms and database vulnerabilities:

### SQL Injection (SQLi)
* **What it is:** An attacker inputs malicious SQL fragments into input fields (such as using ' OR '1'='1) to manipulate database queries.
* **Mitigation:** Use **Prepared Statements** and parameterized queries to treat inputs strictly as parameters, never as executable code.

### Cross-Site Scripting (XSS)
* **What it is:** Injecting malicious client-side JavaScript into trustable web pages viewed by other users.
* **Mitigation:** Sanitize and escape all user-generated content before rendering it in the browser.
`,
    difficultyProgression: [
      "CIA Security Failures Classification",
      "Symmetric AES vs Asymmetric RSA Keys",
      "Digital Certificate PKI Trust Chains",
      "Mitigating OWASP Top 10 Security Risks"
    ],
    keyFormulas: [
      "Asymmetric Keys: Decrypt(Encrypt(M, Public_A), Private_A) = M",
      "Signature verification: Decrypt(Signature, Public_A) = Original Document Hash"
    ],
    tips: [
      "HTTPS uses asymmetric key pairs to establish a session, but switches to symmetric cryptography for actual data transmission to save CPU cycles.",
      "Adding a random sequence called a 'salt' to passwords before hashing them prevents attackers from using pre-computed tables (Rainbow Tables) to crack passwords."
    ]
  },
  {
    id: "les_math",
    category: "Discrete Mathematics",
    title: "Propositional Logic, Sets, Combinatorics, and Graph Theory",
    summary: "Truth table validations, equivalence relations, pigeonhole counts, and traversals.",
    contentMarkdown: `
# Discrete Mathematical Foundations

Discrete Mathematics is the study of mathematical structures that are countable and separated rather than continuous. It underpins computer science proofs, logic circuits, and algorithm complexity.

## 1. Propositional & Predicate Logic
* **Implication ($p \\rightarrow q$):** Translates to "if $p$, then $q$". It evaluates as **false** *only* when the premise $p$ is true and the conclusion $q$ is false. Otherwise, it is true.
* **Converse ($q \\rightarrow p$):** Swaps the positions of the premise and the conclusion.
* **Inverse ($\\neg p \\rightarrow \\neg q$):** Negates both the premise and the conclusion.
* **Contrapositive ($\\neg q \\rightarrow \\neg p$):** Swaps and negates both. **Crucial:** The contrapositive is logically equivalent to the original implication ($p \\rightarrow q \\equiv \\neg q \\rightarrow \\neg p$).

---

## 2. Relations and Set Theory
A mathematical binary relation $R$ on a set $A$ defines relationships between elements.

### Properties of Relations:
* **Reflexive:** Every element relates to itself ($aRa$ for all $a \\in A$).
* **Symmetric:** If $a$ relates to $b$, then $b$ relates to $a$ ($aRb \\rightarrow bRa$).
* **Transitive:** If $aRb$ and $bRc$, then $aRc$.
* **Equivalence Relation:** A relation that is simultaneously **reflexive**, **symmetric**, and **transitive** (e.g., partition boundaries).

---

## 3. Combinatorics: Counting Elements
* **Permutations ($P(n, r)$):** Sorting subset paths where **order matters** (e.g., arrangements in a line):
  $$P(n, r) = \\frac{n!}{(n - r)!}$$
* **Combinations ($C(n, r)$):** Selecting subsets where **order does not matter** (e.g., forming committees):
  $$C(n, r) = \\frac{n!}{r!(n - r)!}$$
* **Pigeonhole Principle:** If $N$ items are distributed into $k$ boxes where $N > k$, then at least one box must contain 2 or more items. (Used for collision and bounds checking proofs).
`,
    difficultyProgression: [
      "Implications, Contrapositives, and Logical Equivalence",
      "Equivalence Relations and Partial Orders",
      "Permutation vs Combination Counting Bounds",
      "Eulerian vs Hamiltonian Graph Cycles"
    ],
    keyFormulas: [
      "Contrapositive Rule: (p -> q) equivalent to (~q -> ~p)",
      "Pigeonhole proof: ceiling(N / k) items inside the dense target cells"
    ],
    tips: [
      "An implication `p -> q` is logically equivalent to its contrapositive `~q -> ~p`. Its converse and inverse are NOT equivalent to the original implication.",
      "An Eulerian path visits every edge in a graph exactly once. It exists if and only if the graph has exactly 0 or 2 vertices of odd degree."
    ]
  },
  {
    id: "les_compiler",
    category: "Compiler Design",
    title: "Phases of Compilation, Grammars, and Top-Down/Bottom-Up Parsing",
    summary: "Lexical scan tokens, syntax trees, symbol collection structures, and optimization logic.",
    contentMarkdown: `
# Compiler Design & Language Processing

A compiler translates high-level code into low-level machine instructions. Expect questions on parsing models, grammars, and compiler phases.

## 1. The 6 Major Compiler Phases
Compilation proceeds through sequential analysis and synthesis phases:

1. **Lexical Analysis (Scanner):** Converts source characters into **tokens** (e.g., keywords, identifiers, operators). Prunes whitespace and comments. Implemented using Finite Automata.
2. **Syntax Analysis (Parser):** Validates tokens against language grammar rules to build a **Syntax Tree**. Uses Context-Free Grammars (CFGs).
3. **Semantic Analysis:** Checks for type compatibility and semantic errors (e.g., undeclared variables, matching parameter counts).
4. **Intermediate Code Generation:** Translates code into a platform-independent representation (e.g., Three-Address Code).
5. **Code Optimization:** Restructures code to run faster or consume less memory (e.g., loop unrolling, dead-code elimination).
6. **Code Generation:** Converts optimized intermediate code into target computer machine assembly code.

### The Symbol Table:
A shared data structure storing identifiers, types, scopes, and memory locations, updated throughout all compiler phases.

---

## 2. Formal Grammars and Lexical Parsing
Grammars define language syntax rules under context criteria:
* **Ambiguous Grammar:** A grammar that can produce more than one unique parse tree for a single string. compilers require *unambiguous* grammars to prevent code interpretation discrepancies.

### Top-Down vs. Bottom-Up Parsers:
* **Top-Down Parsers (e.g., LL(1)):** Builds the parse tree downward from the start symbol. LL(1) reads Left-to-right, uses Leftmost derivation, with 1 lookahead token. **Must not** contain **left recursion** (e.g., $A \\rightarrow A \\alpha$) to prevent infinite loops.
* **Bottom-Up Parsers (e.g., LR(1)):** Builds the tree upward from leaves to root. LR reads Left-to-right, uses Rightmost derivation in reverse. Can handle more general grammars, including left recursive ones.
`,
    difficultyProgression: [
      "Lexical Tokens and Regular Scanning",
      "Eliminating Left Recursion in LL Grammars",
      "Shift-Reduce Bottom-Up Parsing States",
      "Intermediate Code Conversion Frameworks"
    ],
    keyFormulas: [
      "LL(1) parsing table entry requires FIRST and FOLLOW sets computational calculations.",
      "Left Recursion Elimination: A -> A alpha | beta is replaced by A -> beta A' and A' -> alpha A' | epsilon"
    ],
    tips: [
      "Left recursion causes Top-Down (Recursive Descent) parsers to loop infinitely. Always eliminate it before parser configuration.",
      "Syntactic analyzers use context-free grammars (Type-2), whereas lexical analyzers rely on regular grammars (Type-3)."
    ]
  },
  {
    id: "les_dist",
    category: "Distributed Systems",
    title: "CAP Theorem, Consensus Models, and MapReduce Workflows",
    summary: "Consistency and availability trade-offs, Raft/Paxos replicated logs, and parallel data divisions.",
    contentMarkdown: `
# Distributed Computing Systems

A distributed system is a collection of autonomous computers that appear to the end-user as a single coherent system.

## 1. The CAP Theorem (Brewer's Theorem)
For any shared-data system in a distributed environment, it is mathematically impossible to simultaneously guarantee more than two of these three pillars:

* **Consistency (C):** Every read receive the most recent write, or an error.
* **Availability (A):** Every non-failing node returns a non-error response for every request (no guarantee it's the latest write).
* **Partition Tolerance (P):** The system continues to operate despite arbitrary network partition blocks or messages being delayed or lost.

### The Trade-off Under Partition:
Since physical networks *will* experience partition partitions (making **P** mandatory), distributed designs must choose:
* **CP Systems (Consistency + Partition Tolerance):** If network partitions build up, the system halts writes or returns errors to preserve strict consistency (e.g., relational databases).
* **AP Systems (Availability + Partition Tolerance):** The system accepts local updates across partition bounds, returning stale values temporarily, achieving eventual consistency (e.g., Cassandra).

---

## 2. Distributed Consensus Models (Raft & Paxos)
Consensus guarantees that a set of independent servers agree on a single data value or sequence of operations. This is vital for replicated databases.

* **Paxos:** Formally proved, highly complex, hard-to-implement traditional consensus model.
* **Raft:** Designed for readability and ease of implementation. Raft decomposes consensus into three subproblems:
  1. **Leader Election:** If the active leader fails, nodes vote to elect a new leader.
  2. **Log Replication:** The leader receives client writes and replicates them onto follower logs.
  3. **Safety:** Keeps database state machine modifications consistently applied across nodes.

---

## 3. Parallel Big-Data: MapReduce Architecture
MapReduce is a programming model for processing massive datasets in parallel across clusters.

* **Map phase:** Each master worker node processes input blocks to generate local intermediate Key-Value pairs.
* **Shuffle/Sort phase:** Network nodes redistribute and group values sharing identical keys.
* **Reduce phase:** Workers aggregate or count grouped values to produce final summarized results.
`,
    difficultyProgression: [
      "Distributed Fallacies and Network Realities",
      "AP vs CP Brewer CAP Decisions",
      "Raft Consensus Log Term Voting States",
      "MapReduce Parallel WordCount Workflows"
    ],
    keyFormulas: [
      "Consensus Quorum Calculation: Q = floor(N / 2) + 1 (minimum nodes required for write safety)",
      "Brewer's CAP Constraint: (Consistency XOR Availability) given Partition (P)"
    ],
    tips: [
      "Eventual consistency guarantees that in the absence of new updates, all replicas will eventually converge to match.",
      "The 'Two Generals Problem' illustrates the impossibility of reaching absolute consensus over an unreliable connection channel."
    ]
  }
];

