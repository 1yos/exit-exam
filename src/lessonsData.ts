import { Lesson } from "./types";

export const SEEDED_LESSONS: Lesson[] = [
  {
    id: "les_prog",
    category: "Programming Fundamentals",
    title: "Variables, Scopes, and Logical Short-Circuiting",
    summary: "Systematic control flow parsing, prefix/postfix operations, and lazy boolean evaluation strategies.",
    contentMarkdown: `
# Variables, Operators & short-circuiting

## 1. Postfix vs Prefix Increments
Understanding the timing of operand changes is vital for code tracing questions.
- **Prefix (\`++x\`):** Increments the variable value first, then returns the reference of the variable.
- **Postfix (\`x++\`):** Evaluates/returns the original value first, and then increments the variable internally.

### Code Tracing Trap:
\`\`\`cpp
int x = 5;
cout << x++ << " " << ++x; // Postfix first yields 5, then increments. Try parsing with order!
\`\`\`

## 2. Short-Circuit Evaluation
In complex conditionals, the compiler skips parsing the second expression if the final outcome is mathematically guaranteed by the first:
- **AND short-circuit (\`A && B\`):** If \`A\` is evaluated as false, the entire expression must be false, so \`B\` is **never** executed.
- **OR short-circuit (\`A || B\`):** If \`A\` is evaluated as true, the entire expression must be true, so \`B\` is **never** executed.

### trap scenario:
\`\`\`cpp
int x = 0, y = 10;
if (x && (++y > 5)) { ... }
// y retains its value of 10 because (++y > 5) short-circuits and is skipped!
\`/
`,
    difficultyProgression: ["Basic Types", "Prefix/Postfix Expressions", "Boolean Evaluation", "Short-Circuit Traps"],
    keyFormulas: [
      "Short-Circuit AND: false && f() -> false (f is skipped)",
      "Short-Circuit OR: true || f() -> true (f is skipped)"
    ],
    tips: [
      "Trace carefully! Always write variable columns on scratchpad during increment cascades.",
      "Check loops! Watch out for off-by-one errors where loops terminate prematurely (< vs <=)."
    ]
  },
  {
    id: "les_oop",
    category: "Object-Oriented Programming",
    title: "Inheritance, Abstract Classes, and Dynamic Dispatch",
    summary: "Deep study of polymorphic method overrides, super keywords, interfaces, and virtual method resolution.",
    contentMarkdown: `
# Core OOP Pillars

## 1. Hiding and Encapsulation
- Protect internal structures by utilizing the \`private\` accessor on data variables.
- Expose access only via well-controlled, validated \`public\` wrappers (Getters/Setters).

## 2. Dynamic Polymorphism (Overriding)
- Occurs when a subclass defines its own version of a parent method with **identical** signatures.
- **Resolution:** Resolved at **runtime** based on the actual object instance being held, rather than compile-time reference limits.

\`\`\`java
Animal myPet = new Dog();
myPet.sound(); // resolved at runtime to Dog's override sound()
\`\`\`

## 3. Abstract Classes vs. Interfaces
- **Abstract Class:** Can have both partial, concrete implemented methods and pure abstract methods. Supports single class inheritance.
- **Interface:** Defines pure blueprints. Elements can be implemented multiple times by a single class to support pseudo-multiple inheritance.
`,
    difficultyProgression: ["Encapsulation", "Inheritance Mechanisms", "Method Overriding VS Overloading", "Dynamic Dispatch Resolution"],
    keyFormulas: [
      "Dynamic Dispatch: ReferenceType variable = new ConcreteInstance() -> resolves methods on ConcreteInstance."
    ],
    tips: [
      "In overloading, compilers determine methods via argument signatures at Compile-Time.",
      "In overriding, modern runtimes determine methods via dynamic structures (v-tables) at Runtime."
    ]
  },
  {
    id: "les_db",
    category: "Database Systems",
    title: "Relational Model, Joins, and Normalization Forms",
    summary: "Reviewing DB constraints, SQL query composition, and normal form mappings (1NF to BCNF).",
    contentMarkdown: `
# Relational Databases & Normalization

## 1. Relational Integrity Rules
- **Entity Integrity:** No primary key column attributes can yield a null value. Nulls break tuple uniqueness definitions.
- **Referential Integrity:** foreign keys in child tables must match either an existing, valid parent primary key, or be null.

## 2. SQL Query Order of Execution
Logical parsing proceeds as:
1. \`FROM\` & \`JOIN\`
2. \`WHERE\` (Eliminates rows)
3. \`GROUP BY\` (Groups rows)
4. \`HAVING\` (Eliminates group subsets - must strictly depend on aggregate computations)
5. \`SELECT\` (Extracts specified columns)
6. \`ORDER BY\` (Arranges final rows)

## 3. Normalization Form Criteria
- **1NF:** Atomic attributes. No multi-valued nests or repeating groups.
- **2NF:** 1NF + No partial key dependencies (all non-key fields must be fully dependent on the complete primary key).
- **3NF:** 2NF + No transitive dependencies (no non-key column can depend on other non-key columns).
`,
    difficultyProgression: ["SQL Basics", "Core Constraints", "Table Joins", "Normalization Mappings"],
    keyFormulas: [
      "3NF: If X -> Y is a functional dependency, then X is superkey, or Y is prime."
    ],
    tips: [
      "Never put group criteria or aggregates directly in the WHERE clause; always route aggregate filters to HAVING.",
      "Use JOIN tables when modeling complex Many-to-Many relationships to prevent anomalies."
    ]
  },
  {
    id: "les_os",
    category: "Operating Systems",
    title: "Virtual Memory, Paging, and Deadlock Coffman Rules",
    summary: "System architecture memory pages, MMU address maps, context swaps, and Deadlock resolution.",
    contentMarkdown: `
# Virtual Memory & Synchronization

## 1. Memory and Paging Translation
The operating system abstracts physical RAM into a virtual grid structure.
- **Pages:** Equal-sized blocks of virtual memory addresses.
- **Frames:** Equal-sized blocks of physical address blocks.
- **Translation:** The MMU maps page indices to physical frame addresses using the Page Table. If a required page isn't in physical memory, a **Page Fault** triggers.

## 2. CPU Scheduling Policies
- **First-Come, First-Served (FCFS):** Cooperative policy. Prone to convoy effects where short tasks suffer starvation behind large jobs.
- **Shortest Job First (SJF):** Mathematically optimal average wait-time score. Requires advance knowledge of burst times.
- **Round-Robin (RR):** Preemptive policy utilizing cyclical timer quantums. Excellent interactive response performance.

## 3. Deadlocks
Deadlock occurs when processes are blocked waiting for resources held by other processes in a cyclic dependancy structure.
- **Coffman conditions:** Mutual exclusion, Hold & Wait, No preemption, and Circular wait.
`,
    difficultyProgression: ["Process Concepts", "Memory Allocations", "Paging Architecture", "Deadlock Prevention & Recovery"],
    keyFormulas: [
      "Indexed Frame Calculation: Virtual Address = Page Number + Offset",
      "Page Fault Frequency: Faults / Total accesses (Assess memory adequacy)"
    ],
    tips: [
      "Be careful to differentiate between Deadlock Avoidance (Banker's Algorithm checking safe state) and Deadlock Prevention (breaking Coffman conditions).",
      "Short quantums in Round-Robin increase CPU context switching overhead. Choose values carefully."
    ]
  }
];
