import { QuestionType, Difficulty } from "./types";

export interface CheckpointQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string; // "A", "B", "C", "D"
  explanation: string;
}

export interface DetailedChapter {
  chapterId: string;
  chapterNumber: number;
  title: string;
  summary: string;
  contentMarkdown: string;
  checkpointQuestions: CheckpointQuestion[];
}

export interface DetailedCategoryNotes {
  category: string;
  chapters: DetailedChapter[];
}

export const DETAILED_NOTES: DetailedCategoryNotes[] = [
  {
    category: "Programming Fundamentals",
    chapters: [
      {
        chapterId: "prog_ch1",
        chapterNumber: 1,
        title: "Introduction to Variables, Memory Layouts, and Basic Multi-type Arithmetic",
        summary: "Understand how variables map to system registers, heap vs. stack differences, and type coercion rules in C++ and Java.",
        contentMarkdown: `
# 1. Variables and Computer Memory Architecture

In standard compiled languages like C++, declaring a variable reserves a specific number of bytes in the computer's memory. For the exit exam, you must understand where variables reside and how they are handled.

### Memory Layout of a Process:
When a compiled program is executed by the OS, it is allocated a virtual address space split into distinct regions:
1. **Text Segment (Code):** Read-only block containing the compiled machine instructions.
2. **Data Segment:** Holds global and compiler-initialized static variables.
3. **BSS Segment:** Holds uninitialized global and static variables.
4. **Stack (LIFO):** Automatically managed fast block of memory. Stores local function variables, parameter frames, and return addresses.
5. **Heap (Dynamic Allocation):** Managed manually by the programmer (via \`new\` / \`delete\` in C++ or automatically with garbage collection in Java). Prone to memory leaks if memory is allocated but never cleared.

\`\`\`
+-----------------------------------+  Low Memory Addresses (0x000000)
|          Text Segment             |  (Read-only compiled machine code)
+-----------------------------------+
|     Data & BSS Segments           |  (Global and static registers)
+-----------------------------------+
|               Stack               |  (Local variables, grows downwards)
|                 |                 |
|                 v                 |
|                                   |
|                 ^                 |
|                 |                 |
|               Heap                |  (Dynamic elements, grows upwards)
+-----------------------------------+  High Memory Addresses (0xFFFFFF)
\`\`\`

---

# 2. Type Systems and Dynamic Coercion Limits
When operands of different types are combined in mathematical operations, compilers perform **Implicit Type Promotion (Coercion)** to prevent precision loss.

* **Integer Promotion Rule:** Types smaller than the register size are automatically converted. (\`char\` and \`short\` are promoted to \`int\`).
* **Mixed Mode Arithmetic Hierarchy:**
  $$\\text{char} \\rightarrow \\text{int} \\rightarrow \\text{unsigned int} \\rightarrow \\text{long} \\rightarrow \\text{float} \\rightarrow \\text{double}$$
  If you compute \`5 / 2.0\`, the integer \`5\` is promoted to a float/double status, evaluating correctly as \`2.5\`. If you compute \`5 / 2\` (both integers), the fractional part is truncated, yielding exactly \`2\`.
`,
        checkpointQuestions: [
          {
            id: "chk_prog_1_1",
            questionText: "Which segment of computer virtual memory stores dynamically allocated structures initialized via the C++ 'new' operator?",
            options: [
              "Stack Segment",
              "BSS Segment",
              "Heap Segment",
              "Text Segment"
            ],
            correctAnswer: "C",
            explanation: "The heap supports runtime dynamic memory allocations using 'new' or 'malloc'. The stack handles automatic compiler-allocated scopes, while BSS holds uninitialized global states."
          },
          {
            id: "chk_prog_1_2",
            questionText: "What is the result of the C++ expression 'double val = 7 / 2 + 1.5;'?",
            options: [
              "5.0",
              "4.5",
              "3.5",
              "3.0"
            ],
            correctAnswer: "B",
            explanation: "First, '7 / 2' is calculated as integer division because both operands are integers, yielding '3'. Next, '3' is added to the real number '1.5'. The '3' is promoted to double (3.0), sum matches 4.5, which is then assigned to variable val."
          }
        ]
      },
      {
        chapterId: "prog_ch2",
        chapterNumber: 2,
        title: "Tricky Unary Operators, Prefix vs. Postfix Precedence and Comma Sequences",
        summary: "Trace how compilers process ++x and x++ expressions inside dense assignments and nested brackets expression trees.",
        contentMarkdown: `
# 1. Math Mechanics of Unary Increment and Decrement Operators

Tricky increment questions are a signature element of the MoE computer science exit exam. Let's formalize their behavior step-by-step:

* **Prefix Increment (\`++x\`):** The compiler increases the value of \`x\` in the physical storage register first, and then returns the updated reference to the active expression pool.
* **Postfix Increment (\`x++\`):** The compiler copies the current value of \`x\` to a temporary buffer, increments the real storage register in memory, and then returns the value inside the *buffer* (the original value) to the expressions.

### Real Tracing Trace Scenario:
Let's evaluate \`int x = 5; int r = ++x * x++;\`.
1. \`++x\` evaluates first. \`x\` is incremented from 5 to 6. It returns the value **6**.
2. \`x++\` evaluates second. It returns the current value of x, which is **6**. In the background, it increments the variable from 6 to 7 in memory.
3. The multiplication is performed: \`6 * 6 = 36\`.
4. The assignment lands: \`r = 36\` and \`x = 7\`.

---

# 2. The Comma Operator Under evaluation
In C/C++, the comma operator (\`,\`) has the lowest operator precedence of all. It processes expressions from left to right, but yields *only* the result of the rightmost expression:

\`\`\`cpp
int result = (a = 3, b = 4, a + b); // Evaluates a=3, then b=4, then yields 3+4=7. result = 7.
\`\`\`

If outer parentheses are omitted, standard assignment operator (\`=\`) takes precedence over the comma:
\`\`\`cpp
int result = a = 3, b = 4, a + b; // Assigns 3 directly to result because of precedence. The rest are evaluated but discarded.
\`\`\`
`,
        checkpointQuestions: [
          {
            id: "chk_prog_2_1",
            questionText: "Given the C++ line 'int x = 3; int y = (x++, ++x, x * 10);', what is the final value of variable 'y'?",
            options: [
              "30",
              "40",
              "50",
              "60"
            ],
            correctAnswer: "C",
            explanation: "Let's trace: 1. x starts at 3. 2. x++ returns 3, but increments x to 4. 3. ++x increments x to 5, returning 5. 4. x * 10 evaluates to 5 * 10 = 50. The comma operator returns the final expression, so y gets 50."
          }
        ]
      },
      {
        chapterId: "prog_ch3",
        chapterNumber: 3,
        title: "Short-Circuit Logical Evaluation and Complex Selection Scopes",
        summary: "Understand short-circuiting in && and ||, nested conditionals, and the layout of selection statements.",
        contentMarkdown: `
# 1. Short-Circuiting Evaluators (Lazy Evaluation)

In logical statements, compilers use short-circuit evaluation to optimize execution speed.

* **AND Gate Short-Circuit (\`A && B\`):** If \`A\` is \`false\`, there is no mathematical combination where the result could become true. The compiler **completely skips** evaluating statement \`B\`. If \`B\` contains an increment (\`++b\`), that write **never** executes.
* **OR Gate Short-Circuit (\`A || B\`):** If \`A\` is \`true\`, the outcome is guaranteed to be true. The compiler **completely skips** evaluating statement \`B\`.

### Crucial Exam Tracing Question:
\`\`\`cpp
int a = 0, b = 5;
if (a && ++b) {
    b += 10;
}
// What is the value of 'b'?
// Since a == 0 (which evaluates to false), 'a && ++b' short-circuits.
// ++b is completely skipped, meaning b remains 5, and the block is not entered. Final b = 5.
\`\`\`

---

# 2. Ternary Conditional Operator Structure
The ternary operator (\`? : \`) is a compact replacement for simple \`if-else\` statements. It has the following general form:
\`$$\\text{Condition} \\ ? \\ \\text{Expression1} \\ : \\ \\text{Expression2}$$\`

Only **one** of the two target expressions is evaluated at runtime (the expression that matches the conditional outcome). This is critical for tracing questions where either branch side-effects are skipped.
`,
        checkpointQuestions: [
          {
            id: "chk_prog_3_1",
            questionText: "What is the final value of 'k' after: 'int j = 4, k = 10; if (j > 2 || ++k > 5) { j += 1; }'?",
            options: [
              "10",
              "11",
              "12",
              "9"
            ],
            correctAnswer: "A",
            explanation: "Because 'j > 2' is true (4 > 2), the logical || short-circuits. The expression '++k > 5' is skipped, and k is not incremented. The block executes, making j = 5, but k remains unchanged at 10."
          }
        ]
      },
      {
        chapterId: "prog_ch4",
        chapterNumber: 4,
        title: "Procedural Scopes, Function Calls, and Parameter Passing Modes",
        summary: "Analyze the active difference between pass-by-value, pass-by-reference, and pass-by-pointer frames.",
        contentMarkdown: `
# 1. Scope Rules and Storage Class Lifetimes

Computer systems isolate variables by visibility ranges (Scopes).

* **Local Scope:** Variables exist only within their enclosing brackets \`{}\`. They are allocated on the stack when the block is parsed, and popped off the stack when the execution scope exits.
* **Static Storage Class (Lifetime Extension):**
  When keyword \`static\` is paired with a local variable, its memory is not allocated on the stack. Instead, it resides in the **Data Segment**, preserving its value even after the function exits. It is initialized exactly **once** during program startup.

---

# 2. Parameter Passing Modalities
When calling funcs, parameters can be passed in different ways, changing how modifications affect the caller:

* **Pass-by-Value:** The compiler creates a duplicate copy of the argument. Any edits made inside the function apply *only* to the local duplicate, and the original variable in the calling scope remains unaltered.
* **Pass-by-Reference (\`&\` in C++):** The function parameter is a direct alias for the original argument. Modifications made to the parameter immediately affect the caller's variable.
* **Pass-by-Pointer (\`*\`):** Passes the memory address of the variable. The function dereferences the address (\`*param\`) to modify the value stored at that location.

\`\`\`cpp
void compute(int val, int &ref) {
    val += 10; // Affects copy only
    ref += 10; // Affects caller reference directly
}
// If caller holds x = 5, y = 5; after compute(x, y):
// x is still 5, y becomes 15!
\`\`\`
`,
        checkpointQuestions: [
          {
            id: "chk_prog_4_1",
            questionText: "In C++, how is a parameter designated to use Pass-by-Reference in a function signature?",
            options: [
              "By preceding the parameter variable name with '*'",
              "By preceding the parameter variable name with '&'",
              "By enclosing the parameter in square brackets",
              "By declaring the function return type as static"
            ],
            correctAnswer: "B",
            explanation: "The ampersand symbol '&' denotes a reference parameter in a C++ function signature, creating an alias for the actual argument."
          }
        ]
      },
      {
        chapterId: "prog_ch5",
        chapterNumber: 5,
        title: "Dynamic Arrays, Multi-dimensional Offsets & Pointer Memory Tracing",
        summary: "Understand pointer math, multi-dimensional array row-major/col-major memory mapping, and heap allocations.",
        contentMarkdown: `
# 1. Row-Major and Column-Major Mapping in Memory

Computers flatten multidimensional arrays into linear memory strings.

* **Row-Major Order (Default in C/C++/Java):** Element addresses are laid out horizontally, row-by-row. To locate element \`A[i][j]\` in a 2D array of dimensions \`[Rows][Cols]\` with starting base address \`Base\`:
  $$\\text{Address}(A[i][j]) = \\text{Base} + (i \\times \\text{Cols} + j) \\times \\text{SizeOf(Type)}$$

* **Column-Major Order (Default in Fortran):** Element addresses are laid out vertically, column-by-column:
  $$\\text{Address}(A[i][j]) = \\text{Base} + (j \\times \\text{Rows} + i) \\times \\text{SizeOf(Type)}$$

---

# 2. Pointer Arithmetic Calculations
A pointer variable stores the virtual memory address of another variable. Incrementing pointers shifts their target address based on the size of the underlying data type:

\`\`\`cpp
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr; // p points to arr[0] (address, e.g., 1000)
p = p + 2;    // Multiplies 2 by sizeof(int)=4, shifts address to 1008. Points to arr[2] (value 30)
int diff = *(p + 1) - *p; // Evaluates value at (p+1) which is arr[3] (40) minus value at p (30) -> 10.
\`\`\`
`,
        checkpointQuestions: [
          {
            id: "chk_prog_5_1",
            questionText: "What is the memory address of A[2][3] in a Row-Major sorted 2D integer array A[5][6], if integer size is 4 bytes and Base address starts at 1000?",
            options: [
              "1060",
              "1015",
              "1056",
              "1120"
            ],
            correctAnswer: "A",
            explanation: "Formula: Address = Base + (i * Cols + j) * size = 1000 + (2 * 6 + 3) * 4 = 1000 + (15) * 4 = 1000 + 60 = 1060."
          }
        ]
      }
    ]
  },
  {
    category: "Data Structures & Algorithms",
    chapters: [
      {
        chapterId: "dsa_ch1",
        chapterNumber: 1,
        title: "Asymptotic Complexity Bounds and Arrays vs. Linked Lists",
        summary: "Big-O, Omega, and Theta metrics, storage constraints, and traversal overheads.",
        contentMarkdown: `
# 1. Asymptotic Complexity Frameworks
Asymptotic analysis measures algorithm efficiency as input size grows, ignoring hardware differences.

* **Big-O Notation ($O$):** Defines the mathematical **upper bound** (worst-case scenario).
* **Big-Omega Notation ($\\Omega$):** Defines the mathematical **lower bound** (best-case scenario).
* **Big-Theta Notation ($\\Theta$):** Defines the **tight bound** (exact growth rate, when $O$ and $\\Omega$ match).

\`\`\`
  Running Time (f(n))
       |
       |                   f(n) = O(g(n))  [Upper limit]
       |                  /
       |                .--- h(n) [Our algorithm]
       |               /
       |             .--- f(n) = Omega(g(n))  [Lower limit]
       +--------------------------------------------- Input Size (n)
\`\`\`

---

# 2. Linear Data Structures: Stacks, Queues, and Linked Lists
* **Arrays:** Contiguous memory slots. O(1) random access, but searching takes O(n) (if unsorted) and insertion/deletion is O(n) due to shifting elements.
* **Linked Lists:** Nodes linked by pointers. Dynamic size, but O(n) access since nodes must be traversed sequentially from the head.
* **Stack:** LIFO (Last-In, First-Out). Push/Pop take O(1).
* **Queue:** FIFO (First-In, First-Out). Enqueue/Dequeue take O(1).
`,
        checkpointQuestions: [
          {
            id: "chk_dsa_1_1",
            questionText: "What is the worst-case time complexity of inserting a new element into the middle of an array of size n?",
            options: [
              "O(1)",
              "O(log n)",
              "O(n)",
              "O(n^2)"
            ],
            correctAnswer: "C",
            explanation: "Inserting into the middle of an array requires shifting on average n/2 elements, resulting in a worst-case time complexity of O(n)."
          }
        ]
      },
      {
        chapterId: "dsa_ch2",
        chapterNumber: 2,
        title: "Priority Queues, Heaps, and Sorting Mechanics",
        summary: "Deep dive into binary heaps, bubble sort, selection sort, merge sort, quicksort, and runtime thresholds.",
        contentMarkdown: `
# 1. Heap Structures (Min and Max Heaps)
A **Binary Heap** is a complete binary tree that satisfies the heap property:
* **Max-Heap:** The value of each node is $\\ge$ the values of its children. The root stores the maximum element.
* **Min-Heap:** The value of each node is $\\le$ the values of its children. The root stores the minimum element.

### Height of a Complete Binary Tree:
For $N$ elements, the height is guaranteed to be $\\lfloor \\log_2 N \\rfloor$. Inserting or deleting (extracting min/max) are performed in $O(\\log N)$ time.

---

# 2. Sorting Algorithms Comparison Matrix
For the exit exam, memorize this matrix:

| Algorithm | Best-Case Time | Average-Case Time | Worst-Case Time | Space Complexity | Stable? |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Bubble/Selection** | $O(n^2)$ or $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Bubble: Yes; Selection: No |
| **Insertion Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| **Merge Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(n)$ | Yes |
| **Quicksort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n^2)$ | $O(\\log n)$ | No |
`,
        checkpointQuestions: [
          {
            id: "chk_dsa_2_1",
            questionText: "Which sorting algorithm maintains a stable sort, guarantees O(n log n) runtime in the absolute worst-case, but requires auxiliary O(n) memory allocation?",
            options: [
              "Quicksort",
              "Heapsort",
              "Selection Sort",
              "Merge Sort"
            ],
            correctAnswer: "D",
            explanation: "Merge Sort uses a divide-and-conquer approach that guarantees O(n log n) time in all cases, is highly stable, but requires O(n) extra space to merge sub-arrays."
          }
        ]
      }
    ]
  },
  {
    category: "Database Systems",
    chapters: [
      {
        chapterId: "db_ch1",
        chapterNumber: 1,
        title: "Relational Modeling, Constraints, and Entity Relations (ERD)",
        summary: "Understand conceptual database designs, cardinality bounds, and entity check constraints.",
        contentMarkdown: `
# 1. Relational Integrity Rules
Relational databases enforce strict integrity rules to keep data consistent across tables:

* **Entity Integrity Rule:** The primary key uniquely identifies rows. No attribute of a primary key can be **null**.
* **Referential Integrity Rule:** If a table contains a foreign key, its value must either **match** an active primary key in the parent table, or be set to **null**.
* **Domain Integrity Rule:** All values in a column must fall within a pre-defined set of valid values (e.g., age must be $\\ge 0$).

---

# 2. Key Terms in Entity-Relation Modeling (ERD)
* **Weak Entity:** An entity that cannot be uniquely identified by its own attributes alone. It depends on a strong parenting entity via an identifying relationship (drawn with a double-lined rectangle).
* **Cardinality Constraints:** Define the maximum number of entity instances that can participate in a relationship (e.g., 1:1, 1:N, or M:N).
`,
        checkpointQuestions: [
          {
            id: "chk_db_1_1",
            questionText: "Which database integrity rule states that no primary key attribute can contain a null value?",
            options: [
              "Referential Integrity",
              "Domain Integrity",
              "Entity Integrity",
              "User-Defined Integrity"
            ],
            correctAnswer: "C",
            explanation: "Entity Integrity ensures that primary keys contain unique, non-null values to reliably identify each row."
          }
        ]
      },
      {
        chapterId: "db_ch2",
        chapterNumber: 2,
        title: "Database Normalization, Functional Dependencies, and Normal Forms (1NF-3NF)",
        summary: "Learn to eliminate anomalies by structuring tables into 1NF, 2NF, and 3NF, resolving partial and transitive dependencies.",
        contentMarkdown: `
# 1. Normalization & Database Anomalies
Normalization reduces data redundancy to prevent insertion, deletion, and update anomalies.

* **Insertion Anomaly:** Unable to insert data because other, unrelated data is missing (e.g., cannot add a new course until a student enrolls).
* **Deletion Anomaly:** Deleting a row accidentally deletes unrelated, essential information (e.g., deleting the last student enrolled in a course deletes the course details).
* **Update Anomaly:** Modifying a value requires updating multiple redundant rows. If any are missed, the database becomes inconsistent.

---

# 2. Understanding Normal Forms (1NF, 2NF, 3NF)
* **First Normal Form (1NF):** Every cell must contain only **atomic (single) values**. No repeating groups or multi-valued lists.
* **Second Normal Form (2NF):** Must satisfy **1NF** AND have **no partial dependencies**. A partial dependency exists when a non-key column depends on only *part* of a composite primary key (e.g., in a table with composite key (StudentID, CourseID), CourseTitle depends only on CourseID, which violates 2NF).
* **Third Normal Form (3NF):** Must satisfy **2NF** AND have **no transitive dependencies**. A transitive dependency exists when a non-key column depends on another non-key column (e.g., Student -> DepartmentID -> DepartmentName).
`,
        checkpointQuestions: [
          {
            id: "chk_db_2_1",
            questionText: "If a database table satisfying 1NF has a composite primary key (Key_A, Key_B), and an attribute Key_B -> NonKey_C exists, which normal form is violated?",
            options: [
              "First Normal Form",
              "Second Normal Form",
              "Third Normal Form",
              "Boyce-Codd Normal Form"
            ],
            correctAnswer: "B",
            explanation: "Because NonKey_C depends on Key_B (which is only part of the composite primary key), this is a partial dependency, violating 2NF."
          }
        ]
      }
    ]
  },
  {
    category: "Operating Systems",
    chapters: [
      {
        chapterId: "os_ch1",
        chapterNumber: 1,
        title: "Process Scheduling, Thread Contexts, and CPU Schedulers",
        summary: "Understand CPU scheduling algorithms, thread states, and performance metrics.",
        contentMarkdown: `
# 1. CPU Scheduling Algorithms
The OS uses CPU scheduling to decide which ready process runs next:

* **First-Come, First-Served (FCFS):** Non-preemptive scheduling. Prone to the **Convoy Effect**, where long processes delay shorter ones, increasing average wait times.
* **Shortest Job First (SJF):** Optimal average wait times. However, it can cause **starvation** for long processes if shorter tasks keep arriving.
* **Round Robin (RR):** Preemptive scheduling using a time slice (Quantum). Good for interactive systems. Prone to high context-switch overhead if the quantum is set too small.

---

# 2. Process State Transition Graph
Processes cycle through several states managed by the operating system scheduler:

\`\`\`
      Admitted         Scheduler Dispatch
   [New] -------> [Ready] ---------------> [Running] ------> [Terminated]
                    ^                       |
                    |      Event Wait       |  Time Slice Expired (Preemption)
                    +-----------------------+
                    |                       |
                    |      Event Occurred   v
                    +------------------- [Blocked]
\`\`\`
`,
        checkpointQuestions: [
          {
            id: "chk_os_1_1",
            questionText: "Which scheduling algorithm can result in starvation of longer processes?",
            options: [
              "Round Robin",
              "First-Come, First-Served",
              "Shortest Job First",
              "Priority-driven with Aging"
            ],
            correctAnswer: "C",
            explanation: "SJF selects the shortest job. If a steady stream of short processes arrives, longer processes will be repeatedly deferred, causing starvation."
          }
        ]
      }
    ]
  },
  {
    category: "Object-Oriented Programming",
    chapters: [
      {
        chapterId: "oop_ch1",
        chapterNumber: 1,
        title: "Dynamic Polymorphism, Inheritance Limits, and Runtime Dispatch",
        summary: "Trace how compilers resolve overridden methods vs overloaded signatures at runtime under dynamic referencing.",
        contentMarkdown: `
# 1. Method Overriding vs Method Overloading

For the national exit exam, you must distinguish between these two core OOP concepts:

* **Method Overriding (Dynamic/Runtime Polymorphism):** Occurs when a subclass provides a specific implementation of a method that is already defined in its parent superclass.
  * **Rules:** Same method name, same parameter list, same return type.
  * **Mechanism:** Resolved dynamically at runtime based on the actual instantiated object type.
* **Method Overloading (Static/Compile-time Polymorphism):** Occurs when multiple methods in the same class share the same name but have different parameter lists (signatures).
  * **Rules:** Must differ in the number, types, or order of parameters. Return type alone is *not* sufficient to distinguish overloaded methods.
  * **Mechanism:** Resolved at compile-time by the compiler matching local argument types.

---

# 2. Polymorphic Variables & Child Instantiation
In Java and C++, a reference variable of a parent class type can point to a child subclass object:
\`\`\`java
Base obj = new Derived();
obj.display(); // Invokes the subclass overridden display method!
\`\`\`
This dynamic selection of overridden methods based on the object's original instantiated class type is called **Dynamic Method Dispatch**.
`,
        checkpointQuestions: [
          {
            id: "chk_oop_1_1",
            questionText: "Which concept refers to an object of a subclass being utilized wherever its parent superclass object is expected?",
            options: [
              "Method Overloading",
              "Encapsulation",
              "Polymorphism",
              "Method Obsolescence"
            ],
            correctAnswer: "C",
            explanation: "Polymorphism (specifically subtype polymorphism) allows subclass instances to be bound to parent variables and handled interchangeably at runtime."
          }
        ]
      },
      {
        chapterId: "oop_ch2",
        chapterNumber: 2,
        title: "Access Control Specifications, Package Boundaries, and Class Visibility",
        summary: "Analyze the Java/C++ visibility scopes of private, protected, public, and default keywords.",
        contentMarkdown: `
# 1. Access Modifiers Grid

Access control guarantees **information hiding**. The standard access modifiers govern which scopes can read or write attributes and methods:

1. **private:** Visible *only* within the declaring class. Absolute strongest level of encapsulation.
2. **default (no modifier specified):** Visible only within the declaring class's *package*. Also referred to as package-private scope.
3. **protected:** Visible to all classes inside the same package, *and* subclasses residing in external packages.
4. **public:** Visible globally to all active classes in the program directory.

---

# 2. Inheritance Access Scopes Checklist
For the exit exam, check this access eligibility matrix when tracing subclass attributes:
* Subclasses *always* inherit fields of the superclass, but they cannot directly reference members declared as \`private\`.
* Subclasses residing in *external* packages can reference \`protected\` fields directly, but they cannot reference \`default\` package-private fields.
`,
        checkpointQuestions: [
          {
            id: "chk_oop_2_1",
            questionText: "If you want to allow subclasses to access data fields defined in the superclass, but deny access to non-subclasses, which access modifier is appropriate?",
            options: [
              "public",
              "protected",
              "private",
              "default"
            ],
            correctAnswer: "B",
            explanation: "The 'protected' access modifier is designed for this exact inheritance scenario, permitting access strictly to subclasses while blocking random external packages."
          }
        ]
      }
    ]
  },
  {
    category: "Computer Networks",
    chapters: [
      {
        chapterId: "net_ch1",
        chapterNumber: 1,
        title: "OSI Reference Model Layers, Protocol Sockets, and Hardware Routing",
        summary: "Examine Layer 1 to Layer 7 protocols, port routing, and bridges/switches/gateways operations.",
        contentMarkdown: `
# 1. The 7-Layer OSI Reference Model

The Open Systems Interconnection (OSI) model standardizes network communication protocols:

* **Layer 4 - Transport Layer:** Responsible for process-to-process delivery, flow control, and error recovery. Uses **port numbers** (e.g. HTTP on port 80) to multiplex/demultiplex segment streams to target socket processes.
* **Layer 3 - Network Layer:** Formulates packets and manages logical addressing using IP. Handles end-to-end multi-hop routing of data.
* **Layer 2 - Data Link Layer:** Organizes bits into frames and guarantees point-to-point connection integrity on a local segment. Handles MAC addressing, error detection (FCS), and flow control (local).

---

# 2. Local Network Hardware Devices
* **Repeater/Hub (Physical Layer):** Regenerates weak signals, blindly broadcasting bit streams to all connected lines.
* **Bridge/Switch (Data Link Layer):** Filter frames selectively by reading target **MAC physical addresses** inside a local segment.
* **Router (Network Layer):** Forwards packet datagrams across different networks or subnets by reading target logical **IP addresses**.
`,
        checkpointQuestions: [
          {
            id: "chk_net_1_1",
            questionText: "At which layer of the OSI model do network devices like bridges, switches, and Network Interface Cards (NIC) primarily operate?",
            options: [
              "Physical layer",
              "Data link layer",
              "Network layer",
              "Transport layer"
            ],
            correctAnswer: "B",
            explanation: "Bridges, switches, and NIC layers process MAC physical addresses to forward frames locally, placing them squarely in the Data Link Layer (Layer 2)."
          }
        ]
      },
      {
        chapterId: "net_ch2",
        chapterNumber: 2,
        title: "Switching Architectures: Circuit Switching vs. Packet Switching",
        summary: "Compare resource reservation, dedicated pipelines, scalability limits, and bandwidth sharing.",
        contentMarkdown: `
# 1. Circuit Switching: Dedicated Pipelines

In **Circuit Switching**, a physical, dedicated end-to-end pipeline is established between the sender and receiver before any data transmission begins:

* **Guaranteed Bandwidth:** Once the circuit is set up, the entire line's bandwidth is reserved for the duration of the active session.
* **Low Latency:** Data flows through a constant, predetermined path, meaning zero routing delays once active.
* **High Cost & Poor Scalability:** Bandwidth is wasted during silent periods because other devices cannot reuse the reserved line. It cannot easily scale to thousands of users.

---

# 2. Packet Switching: Dynamic Resource Sharing
In **Packet Switching**, messages are broken down into smaller units called **packets** and sent dynamically over the network:
* Packers are routed independently (possibly taking different paths) and are reassembled in the correct order at the destination.
* **Shared Bandwidth:** Resources are allocated on-demand, sharing link bandwidth among multiple connections.
* No end-to-end connection needs to be pre-established, making it highly efficient but prone to varied latency (jitter) and buffer losses under heavy load.
`,
        checkpointQuestions: [
          {
            id: "chk_net_2_1",
            questionText: "Which statement is correct about packet switching and circuit switching?",
            options: [
              "In packet switching, a dedicated end-to-end physical connection is established beforehand.",
              "In circuit switching, link bandwidth is shared dynamically on-demand.",
              "Packet switching is generally more efficient for bursty data traffic compared to circuit switching.",
              "Circuit switching experiences higher packet reordering delays at the receiver."
            ],
            correctAnswer: "C",
            explanation: "Packet switching uses statistical multiplexing to allocate bandwidth on-demand, making it highly efficient for bursty data streams compared to rigid circuit switching."
          }
        ]
      }
    ]
  },
  {
    category: "Software Engineering",
    chapters: [
      {
        chapterId: "se_ch1",
        chapterNumber: 1,
        title: "SDLC Process Models and Requirement Categories",
        summary: "Waterfall rigidity, Agile Scrum sprint cycles, and Business vs. Non-Functional requirements.",
        contentMarkdown: `
# 1. Waterfall vs. Agile Scrum

Selecting an appropriate Software Development Life Cycle (SDLC) model determines project success:

* **Waterfall Model:** A traditional sequential approach (requirements, design, coding, testing, maintenance). Phase-gates prevent advancing until current stages are signed off. This makes it structurally **rigid** and difficult to adapt to changes once code compilation begins.
* **Agile Scrum:** An iterative framework focusing on collaborative, adaptive project management. Delivered in small, incremental releases called Sprints (usually 2-4 weeks), welcoming requirements changes at any stage.

---

# 2. Requirement Classifications
* **Business Requirements:** Document high-level organizational goals and why the software project is needed.
* **Functional Requirements:** Define active system capabilities (exactly what the system must do).
* **Non-Functional Requirements:** Specify criteria used to judge the operation of a system (quality attributes, such as performance, security, and scalability) rather than specific behaviors.
`,
        checkpointQuestions: [
          {
            id: "chk_se_1_1",
            questionText: "Which software process model expects sequential completion of phases and is least suitable for projects with rapidly changing requirements?",
            options: [
              "Rational Unified Process (RUP)",
              "Waterfall model",
              "Agile Scrum",
              "Incremental prototyping"
            ],
            correctAnswer: "B",
            explanation: "The Waterfall model is notoriously rigid, requiring requirements to be finalized at the absolute start, making changing requests highly difficult to accommodate."
          }
        ]
      },
      {
        chapterId: "se_ch2",
        chapterNumber: 2,
        title: "Software Verification, Validation, and Maintenance Types",
        summary: "Verify vs validate, testing scopes (integration, regression, acceptance), and the active categories of software changes.",
        contentMarkdown: `
# 1. Verification vs. Validation

For the national CS exam, memorize these definitions:
* **Verification ('Are we building the product right?'):** Reviews design documents, static checks, walkthroughs, and inspections to verify conformance to specification.
* **Validation ('Are we building the right product?'):** Active testing of compiled binaries against user/client expectations (requires running the software).

---

# 2. Classifying Software Testing Scopes
* **Unit Testing:** Validates isolated methods, modules, or code objects (usually written by developers).
* **Integration Testing:** Checks compatibility and correct data flow at interface boundaries of combined modules.
* **Regression Testing:** Re-running previous tests after an update to ensure modifications have not introduced new bugs into existing code.
* **User Acceptance Testing (UAT):** Client-led tests demonstrating that the system satisfies their actual business requirements.
`,
        checkpointQuestions: [
          {
            id: "chk_se_2_1",
            questionText: "Which type of testing should be performed after a major code hotfix to guarantee that the changes did not introduce regression anomalies in previously working areas?",
            options: [
              "Acceptance testing",
              "Beta testing",
              "Integration testing",
              "Regression testing"
            ],
            correctAnswer: "D",
            explanation: "Regression testing specifically confirms that code changes or updates have not inadvertently broken existing, stable functionalities."
          }
        ]
      }
    ]
  },
  {
    category: "Web Development",
    chapters: [
      {
        chapterId: "web_ch1",
        chapterNumber: 1,
        title: "Web Standards: HTML5, CSS Styling Rules, and JavaScript Core Scopes",
        summary: "Learn HTML5 doc declarations, CSS specificity, JavaScript loosely-typed characteristics, and DOM structures.",
        contentMarkdown: `
# 1. HTML5 and Document Type Declarations

Modern web pages require standardized structure frameworks:
* **DOCTYPE:** The declaration \`<!DOCTYPE html>\` is placed at the absolute top of HTML documents to notify browsers to parse pages in standard HTML5 mode.
* **Semantic Elements:** Standard layout items include \`<address>\`, \`<caption>\`, \`<aside>\`, and \`<section>\`.

---

# 2. JavaScript: Loosely Typed Execution
JavaScript is a **loosely-typed** (or dynamically typed) scripting language. Variables do not require compile-time type declarations:
\`\`\`javascript
var data = "CS prep"; // Starts as string
data = 42;           // Re-assignable to number dynamically
\`\`\`
While this provides massive speed and flexibility, it is prone to implicit casting traps like:
\`\`\`javascript
let x = 4 + "4"; // JavaScript implicitly casts the number 4 to string, yielding exactly "44"!
\`\`\`
`,
        checkpointQuestions: [
          {
            id: "chk_web_1_1",
            questionText: "What is the console output of the JavaScript statement 'Math.floor(5.9)'?",
            options: [
              "5",
              "6",
              "5.9",
              "1"
            ],
            correctAnswer: "A",
            explanation: "Math.floor() rounds a double/float down to the next lowest integer. For 5.9, it yields 5. If it were Math.ceil(5.9), it would yield 6."
          }
        ]
      }
    ]
  },
  {
    category: "Theory of Computation",
    chapters: [
      {
        chapterId: "toc_ch1",
        chapterNumber: 1,
        title: "Languages, Grammars, and Turing Decidability Limits",
        summary: "Chomsky hierarchy limits, regular expressions, and formal Computability theory.",
        contentMarkdown: `
# 1. Chomsky Hierarchy of Languages

The Chomsky hierarchy classifies formal grammars by their generative limits:

1. **Regular Languages (Type 3):** Recognized by **Finite Automata** (DFA/NFA). Have zero memory beyond the active state.
2. **Context-Free Languages (Type 2):** Recognized by **Pushdown Automata** (PDA), which use a single **Stack** for memory.
3. **Context-Sensitive Languages (Type 1):** Recognized by Linear Bounded Automata.
4. **Recursively Enumerable (Type 0):** Recognized by the highly versatile **Turing Machine**.

---

# 2. Computability vs. Complexity
* **Computability Theory:** Solves the core question of whether a problem is **decidable at all** by any computational model, regardless of infinite resources (e.g., the Halting Problem is proved to be undecidable).
* **Complexity Theory:** Explores decidable problems, evaluating the exact time and memory resources required for completion (e.g., classifies systems as P vs. NP).
`,
        checkpointQuestions: [
          {
            id: "chk_toc_1_1",
            questionText: "Which branch of theoretical computer science deals with whether a problem is decidable or undecidable on general Turing Machines?",
            options: [
              "Computability theory",
              "Complexity theory",
              "Automata parsing theory",
              "Set theory"
            ],
            correctAnswer: "A",
            explanation: "Computability theory evaluates the binary boundaries of decidability and solvability on formal computational machines."
          }
        ]
      }
    ]
  }
];

// Fallback dynamic generator to ensure every single category requested has at least 2 default chapters
export function getDetailedNotesForCategory(category: string): DetailedChapter[] {
  const match = DETAILED_NOTES.find(dn => dn.category === category);
  if (match) return match.chapters;

  // Otherwise return dynamically stylized 2 generic chapters
  return [
    {
      chapterId: `${category.toLowerCase().replace(/\s+/g, "_")}_ch1`,
      chapterNumber: 1,
      title: `${category}: Structural Foundations & Core Directives`,
      summary: `Review core architectural boundaries, theorems, and exam priorities for ${category}.`,
      contentMarkdown: `
# 1. Fundamental Theories of ${category}

Professional reviews in the exit exam target high-level terms and execution constraints for **${category}**.

* **Core Definition:** Understand how abstractions map to system levels.
* **Logical Bounds:** Analyze dependencies and operational steps.

---

# 2. Standardized Problem Landscapes
Review key systems models and terminology. Keep a systematic checklist of definitions and equations. Make sure to practice the assessment questions at the end of this study guide to solidify your understanding.
`,
      checkpointQuestions: [
        {
          id: `chk_gen_${category.toLowerCase().replace(/\s+/g, "_")}_1`,
          questionText: `Which of the following describes the primary objective of studying ${category}?`,
          options: [
            "Building modular, scalable representations",
            "Eliminating compile-time type boundaries only",
            "Writing inline static expressions",
            "Bypassing physical hardware limits completely"
          ],
          correctAnswer: "A",
          explanation: "In all computer science domains, abstraction allows us to model complex systems through modular and scalable representations."
        }
      ]
    },
    {
      chapterId: `${category.toLowerCase().replace(/\s+/g, "_")}_ch2`,
      chapterNumber: 2,
      title: `${category}: Advanced Systems Integration`,
      summary: `Deep dive into advanced models and practical exam strategies.`,
      contentMarkdown: `
# 1. Operational Frameworks

Integrating core patterns of **${category}** guarantees better scale and security constraints.

* **Abstraction Enforcement:** Isolates code from platform specifics.
* **Verification Loop:** Minimizes runtime anomalies.
`,
      checkpointQuestions: [
        {
          id: `chk_gen_${category.toLowerCase().replace(/\s+/g, "_")}_2`,
          questionText: "What is a main advantage of implementing automated verification systems?",
          options: [
            "Guarantees logical correctness under any runtime environments",
            "Reduces manual testing costs and discovers corner-case bugs early",
            "Speeds up local physical clock cycle times",
            "Replaces the need for compilers entirely"
          ],
          correctAnswer: "B",
          explanation: "Automated verification minimizes runtime errors and reduces cost by discovering logical edge cases early."
        }
      ]
    }
  ];
}
