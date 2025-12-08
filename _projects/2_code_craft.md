---
layout: page
title: Huawei CodeCraft Contest Solution
description: I won an award in a national algorithm contest
img: assets/projects/code_craft/img/cover.jpg
importance: 2
category: Contest
related_publications: false
equation: true
featured: true
toc:
  sidebar: left
---

## 0. Contest Overview

+ **Award:** The National Third Prize 

+ **Role:** Optimize Speed

+ **Team Size:** 3 Members (C++)

+ **Timeline:** 2020.03 - 2020.05

+ **Source Code Link:** <a href="https://github.com/willy229liu/HuaweiCodeCraft2020">https://github.com/willy229liu/HuaweiCodeCraft2020</a>

+ **Tools:** C++, WSL, Linux

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/code_craft/img/certificate.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/code_craft/img/certificate_en.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">Chinese Certificate of Achievement and Translation by AI</div>

---
## 1. Contest Introduction

We should run our codes on given platforms, a Linux server.
+ **Contest Link:** <a href="https://competition.huaweicloud.com/codecraft2020">https://competition.huaweicloud.com/codecraft2020</a>

### 1.1 Preliminary Contest

**Task:** Given a set of transaction records, detect all circular transfer paths that satisfy certain constraints and output them.
Among solutions that are 100% correct, shorter runtime ranks higher.

Constraints:
+ IDs and amounts: 32-bit unsigned integers, all < 2³¹
+ All cycles of length 3 first, then length 4, and so on up to length 7.
+ Total valid cycles in the test data are guaranteed to be < 3,000,000.

Example Input: `source_account_id, target_account_id, amount`
{% highlight c++ linenos %}
1,2,100
1,3,100
2,4,90
3,4,50
4,1,95
2,5,95
5,4,90
4,6,30
6,7,29
7,4,28
{% endhighlight %}

Example Output: `Cycles`
{% highlight c++ linenos %}
4
1,2,4
1,3,4
4,6,7
1,2,5,4
{% endhighlight %}

---
### 1.2 Intermediary Contest

The contest separates into two phases, the first phase is Training Contest, and the second phase is Formal Contest on the contest day.

#### 1.2.1 Training Contest 

Based on Preliminary Contest, the contest added some new rules:
+ For any adjacent pair of transfers along a candidate cycle, say:
  + Account A → B with amount X 
  + Account B → C with amount Y 
  They must satisfy:
    
  $$
  0.2 \le \frac{Y}{X} \le 3
  $$

  + In other words, for every step along the cycle, the next transfer amount cannot be less than 0.2× the previous amount and cannot be more than 3× the previous amount.

#### 1.2.2 Formal Contest

**Change 1:** The minimum length of a circular transfer path is 3 (inclusive), and the maximum length is 8 (inclusive).

**Change 2:** The transfer amount is changed to a floating-point number:

+ The integer part is > 0 and < 2³¹.
+ The fractional part has at most 2 digits.

All of the following formats are valid examples:
+ integer_part.YY e.g. 1000.53, 1000.50, 1000.00
+ integer_part.Y e.g. 1000.5, 1000.0
+ integer_part e.g. 1000

---
### 1.3 Final Contest

The contest separates into two phases, the first phase is Training Contest, and the second phase is Formal Contest on the contest day.

#### 1.3.1 Training Contest

**Task:** Based on the given transaction records, compute the positional key centrality for every account, and output the TOP 100 accounts with the highest centrality.
Among solutions that are 100% correct, shorter runtime ranks higher.

For each account $$i$$, its **positional key centrality** is defined using **shortest weighted directed paths** in the graph.

- Let $$\sigma_{st}$$ be the **number of shortest weighted directed paths** from node $$s$$ to node $$t$$.
- Let $$\sigma_{st}(i)$$ be the **number of these shortest paths that pass through node $$i$$** (excluding $$s$$ and $$t$$ themselves).

Then, the positional key centrality of node $$i$$ is:

$$
C(i) = \sum_{s \ne i \ne t,\; s \ne t} \frac{\sigma_{st}(i)}{\sigma_{st}}
$$

In words:

+ For every ordered pair of distinct nodes $$(s, t)$$, look at all shortest paths from $$s$$ to $$t$$.
+ For each such pair, take
+ $$\text{(number of shortest paths passing through } i\text{)}$$ ÷ $$\text{(total number of shortest paths)}$$.
+ Sum this fraction over all possible $$(s, t)$$.

This is essentially a **betweenness-centrality-style** measure based on **shortest weighted paths** in a directed graph.

Example Input: `source_account_id, target_account_id, amount`
{% highlight c++ linenos %}
1,2,100
1,3,100
2,4,90
3,4,50
4,1,95
2,5,95
5,4,90
4,6,30
6,7,29
7,4,28
{% endhighlight %}

Example Output: `account_id, centrality_value`
{% highlight c++ linenos %}
4,25.000
1,14.000
2,5.000
6,5.000
7,5.000
3,3.000
5,0.000
{% endhighlight %}

#### 1.3.2 Formal Contest

+ **Additional Rule 1: Data Upgrade**
   Besides the dataset used in the final-round practice phase, an **extra dataset** is added. A training dataset with **similar characteristics** is provided at the same time for local programming and debugging practice.
   Download link:
   `https://developer.huaweicloud.com/hero/forum.php?mod=viewthread&tid=55849`

  **Additional Rule 2: Resource Upgrade**
   The judging system’s resources and the resources allocated to contestants are upgraded to **12U24G**:

  - Each team is given a **12U24G virtual machine**. In this VM, **NUMA node 0** contains CPUs **0–5**, and **NUMA node 1** contains CPUs **6–11**.
  - The judging system uses a **12U24G container**. In this container, **NUMA node 0** contains CPUs **0–5**, and **NUMA node 1** contains CPUs **8–13**.

---
## 2. Preliminary Contest & Intermediary Contest Solution

The question is to find a cycle (3 to 7 lengths), and we do not consider memory usage. We designed a algorithm that searches front for 4 layers and searches back for 3 layers by deep first searching (DFS). In intermediary formal contest, the question become finding a cycle (3 to 8 lengths), so we changed to 4 front layers and 4 later layers. 

To deeply optimize our code, we used C++ as a programming language.

### 2.1 Optimization

+ We wrote many multithread  codes. We implemented multithread IO and multithread DFS searching algorithms. (We ever tried BFS, but the result did not improve)
+ We used memory copy and memory map to reduce IO time.

+ We remove all STL containers, and use basic array to store all data. We simulated vector of STL and designed a customed struct.
{% highlight c++ linenos %}
typedef struct Edge {
    ui vertice;
    ui weight;
    bool operator<(const Edge &a) const { return vertice < a.vertice; }
    bool operator>(const Edge &a) const { return vertice > a.vertice; }
    Edge() {
    }
    Edge(ui v, ui w) {
        vertice = v;
        weight = w;
    }
} Edge;

#define NODENEXTLISTLISTSIZE 2046
typedef struct NodeNextList {
    int num;
    struct NodeNextList *next;
    Edge node[NODENEXTLISTLISTSIZE];
    
    inline void add(struct NodeNextList **s, const Edge &num){
        if(unlikely(this->num == NODENEXTLISTLISTSIZE)){
            *s = next = (struct NodeNextList*)malloc(sizeof(struct NodeNextList));
            *next = {.num=1, .next=nullptr, .node={num,}};
        }
        else{
            node[this->num++] = num;
        }
    }
} NodeNextList;
{% endhighlight %}

+ Define a number to char array to optimize writing result process.
{% highlight c++ linenos %}
uint32_t const NUMTOSTR1[] = {
        0x30303030, 0x30303031, 0x30303032, 0x30303033, 0x30303034, 0x30303035, 0x30303036, 0x30303037, 0x30303038,
        0x30303039,
};
{% endhighlight %}

---
## 3. Final Contest Solution

We mainly used **Dijkstra’s algorithm**, built a forward graph using our own hand-written **8-ary Heap**, then traversed the constructed forward graph to obtain the final centrality values.

For the heap, we implemented **two versions**:

1. One where the **elements are edges**.
2. One where the **elements are distances**.

The first version works better when there are **few edges with the same distance** (typically when edge weights are large and mostly distinct).
The second version works better when **edge weights are small** (so edges with the same weight can be stored together in an array, reducing how often the heap structure needs to change).
{% highlight c++ linenos %}
#define DARYHEAPNUMOFFSET 3u
#define DARYHEAPNUM (1u<<(DARYHEAPNUMOFFSET))
typedef struct DaryHeap {
    QueueNode heap[MAXDATANUM];
    int size;

    inline void init() {
        memset(heap, -1, sizeof(heap));
        size = 0;
    }
    ......
}
{% endhighlight %}

### 3.1 Optimization

+ We designed a tool was written during the final so we could automatically test large batches of data. For different paths and test datasets, you need to specify them in the variables defined inside the script.
+ The layout of our `struct`s had a huge impact on performance. At first we had a very large struct, and the runtime was over 1000 (units). After we split it up, the performance improved and we got under 1000.
+ For the **first dataset**, we processed all nodes with **in-degree 0 and out-degree 1** together with their successor nodes.
+ We changed `#pragma pack(2)` to make structures in memory become terse. And it worked.
