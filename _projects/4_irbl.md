---
layout: page
title: IRBL
description: A system for Information-Retrieval-based Bug Localization
img: assets/projects/lua_memory/irbl/cover.jpg
importance: 4
category: project
related_publications: true
equation: true
featured: true
toc:
  sidebar: left
---

## 0. Project Overview

+ **Role:** Jenkins pipeline Building, Docker & k8s Building, and Unit Test Framework

+ **Team Size:** 4 Members (Unity)

+ **Timeline:** 2021.03 - 2021.06

+ **Tools:** Jenkins, SpringBoost, Vue.js, Docker

---
## 1. Project Introduction

### 1.1 Framework

+ The entire project is developed in Java and built with Maven.

+ After the IR model finishes computation, the results are presented through a web interface.

+ The backend is built with the Spring Boot + MyBatis-Plus framework. 

+ The frontend uses the Vue.js framework.

+ Unit and integration tests are written with JUnit, and coverage reports are generated with JaCoCo.

+ End-to-end (E2E) tests are implemented with Cypress.

+ Deployment uses Jenkins, whose pipeline deploys the project onto Docker.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/irbl/img/architecture.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">Project Architecture</div>

### 1.2 References

1. 郭肇强,周慧聪,刘释然,李言辉,陈林,周毓明,徐宝文.  基于信息检索的缺陷定位:问题、进展与挑战.软件学报.  http://www.jos.org.cn/1000-9825/6087.htm
2. R. K. Saha, M. Lease, S. Khurshid and D. E. Perry, "*Improving bug localization using structured information retrieval*," 2013 28th IEEE/ACM International Conference on Automated Software Engineering (ASE), Silicon Valley, CA, USA, 2013, pp. 345-355, doi: 10.1109/ASE.2013.6693093.
3. M. Rath and P. Mäder, "*Influence of Structured Information in Bug Report Descriptions on IR-Based Bug Localization*," 2018 44th Euromicro Conference on Software Engineering and Advanced Applications (SEAA), Prague, Czech Republic, 2018, pp. 26-32, doi: 10.1109/SEAA.2018.00014.
4. Jaime Arguello.  *Vector Space Model.*  INLS 509: Information Retrieval
5. 骆斌,刘嘉,张瑾玉,黄蕾.《软件工程与计算（卷三） 团队与软件开发实践》
6. IEEE标准

### 1.3 Result

#### 1.3.1 SWT - 3.1

| AmaLgam       | Our method     | AmaLgam+      |
| ------------- | -------------- | ------------- |
| Top@1: 62.2%  | Top@1: 64.29%  | Top@1: 63.3%  |
| Top@5: 81.6%  | Top@5: 85.72%  | Top@5: 80.6%  |
| Top@10: 89.8% | Top@10: 91.84% | Top@10: 89.8% |
| MRR: 0.71     | MRR: 0.74      | MRR: 0.71     |
| MAP: 0.62     | MAP: 0.64      | MAP: 0.62     |

