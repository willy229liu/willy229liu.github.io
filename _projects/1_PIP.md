---
layout: page
title: "PIP: The Black-hearted Traffic-Chasing Promo Machine"
description: A RogueLite strategy game combining slot machine mechanics with entertainment industry satire.
img: assets/projects/edison/img/cover.png
importance: 1
category: Indie Game
related_publications: false
toc:
  sidebar: left
---

## 0. Project Overview

+ **Role:** Gameplay architecture, Game Architecture, and Character Effect Development

+ **Team Size:** 5 Members (Unity)

+ **Timeline:** 2025.03 - 2025.04

+ **Tools:** Unity 2021.3.37f1, C#

---
## 1. Project Introduction

### 1.1 Core Concept

A "demonic" and satirical RogueLite strategy Character game based on slot machine mechanics.

* **Pillar 1:** Turn-based strategy operations, slot machine-style **random Character positioning**, and **dynamic resource gambling**. Builds a core gameplay experience that is easy to operate but offers high strategic depth and replayability.

* **Pillar 2:** A unique world view wrapped in "demonic" entertainment industry satire. It integrates "Unhinged Literature" (发疯文学), fandom culture, easter eggs, and viral memes. It emphasizes differentiation in the game setting and experience on top of the strategic gameplay.

### 1.2 Play Video & Package & Picture

Available package: 
<a href="https://drive.google.com/file/d/1xAMCZBB1teItJSyrbRVMX9LdHtGv6cqR">
https://drive.google.com/file/d/1tdtT67HkCtn7_hxDyICFnA4sbbsDsTUr
</a>

<div class="column">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="https://www.youtube.com/embed/1iWmEbmpfgA" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="caption">Video</div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/seasoning_shop.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/field1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/field2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">Code & Clip</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/character1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/character2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/character3.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">Character Show</div>

### 1.3  Team & Work Distribution

| Role          | Member       | Responsibilities                                                              |
| :------------ |:-------------|:------------------------------------------------------------------------------|
| **Team Lead** | Li, Yuda     | Project Concept, Character Design, Narrative Packaging, Business Plan         |
| **Member**    | Yu, Ning     | Gameplay Design, Level Design, Character & Spice Mechanics Design                  |
| **Member**    | **Liu, Yulin**   | **Gameplay architecture, Game Architecture, and Character Effect Development** |
| **Member**    | Su, Yuhui    | Overall Art Direction & Development                                           |
| **Member**    | Chang, Haobo | Audio & Spice Effect Development                                              |

### 1.4 Core Gameplay Mechanisms

**Basic Gameplay:**

+ RogueLite + "Luck be a Landlord"-like strategy Character gameplay. Clear the stage by reaching the target number of Likes.

* Each game consists of multiple **Rounds**. Round goals serve as stage-based combat validation.

* Each Round consists of multiple **Turns**. A Turn is the minimum unit for player action and settlement.

* **Victory Condition:** Reach the target number of Likes in all Rounds.

* **Player Strategy:** In each turn, within the limit of character points, players can deploy or replace characters before starting the turn settlement.

* **Settlement Method:** Settlement occurs sequentially according to the order on the field. Character effects are triggered first, followed by the calculation of Likes based on Character Appeal.

<div class="column">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/round_phase.svg" title="Round Phase" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="caption">Round Phase</div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/player_phase.svg" title="Player Phase" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="caption">Player Phase</div>
</div>

**In-Game RogueLite Build System:**

* **Families (Tribes):** Characters are divided into multiple **Families** based on similar Character effects. There are effect linkages between families and within a single family.

* **Seasoning (Relics):** Purchase Seasoning with special currency at fixed turns. These significantly increase the upper limit of character effects or bring qualitative changes to the build experience.

* **Positions:** The position of characters on the field is random each turn, and position affects the performance of character effects.

**Post-Process Player Operation: A More Controllable Strategic Slot Experience:**

* Adopt the gameplay of "Random positions at the start of the turn -> Strategically adjust positions -> Settlement". This increases the controllability of the genre build during settlement.

---
## 2. My Programming Design

### 2.1 Perform System

To implement a complex settle system, and the game has given settle sequence, I designed a task queue that allows every task in a queue to be run correctly.

+ The system has a global queue, and every action could be pushed back or inserted to head.

+ I defined an interface 'ITask', every task should implement the interface.

+ Character instances is a class that could belong to hand grids or field grids.

+ When settlement starts, I pushed all grid (not character instance) actions into queue. When the queue pops an action out, the grid belonging the action judges that whether or not the character instance in the grid. This machinism is to prevent some character effects kill other characters, so the later character has been killed should not use its effect.

+ Because actions may happen simultaneously or conditionally, so I designed many task sets that allow programmers to organize their tasks logic by setting tasks in a task sets and pushing task sets into the queue.

<div class="column">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/settle_sequence.png" title="Settle Sequence" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="caption">Settle Sequence</div>
</div>

<div class="column">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/action_system.svg" title="Action System" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="caption">Action System</div>
</div>

### 2.2 Character System & Seasoning System

Character system is as same as seasoning system, so I just talked about character system. I designed them with Factory and Abstract **design patterns**. To prevent Character instances from creating by everyone, I designed a factory that creates characters.

+ Send an identification number to factory, and the factory returns a class that implements the character logic.

+ Every character class based on their parent classes "FamilyClass", and every "FamilyClass" based on their parent classes "BaseClass".

+ For outside system, they only care the interface "ICharacterLogic" that "BaseClass" implements.

+ The system allows every character implement their effect actions, and they have their unique appeals.

<div class="column">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/character_classes_diagram.svg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="caption">Class Diagram</div>
</div>

### 2.3 Cooperation with artists and designers

Because I want to reduce the effect implements with codes, I required our **artists** to designed animations, and I just set triggers to control effects.

+ The biggest advantage is that the **artist** could design what he wanted without changing codes. He set all properties in clips such as setting active for game object. I only need to set trigger to start play the clip he designed.

+ In my code, I see an clip play as an action, and I push it into my task system, allowing every animation to play consequently.

+ I designed many types of text parsing rules, allowing **designers** to write many format texts in the configuration, and the special texts would be shown on different types.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/anim_clip.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/anim_code.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">Code & Clip</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/config.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/edison/img/config_show.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">Configuration & Show</div>