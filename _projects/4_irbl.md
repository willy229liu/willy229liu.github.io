---
layout: page
title: System for Information-Retrieval-based Bug Localization
description: The Software Engineering and Computing III course project
img: assets/projects/irbl/img/cover.jpg
importance: 4
category: Academic
related_publications: false
equation: true
featured: true
toc:
  sidebar: left
---

## 0. Overview

+ **Role:** Jenkins pipeline Building, Docker & k8s Building, design documents, and Unit Test Framework

+ **Team Size:** 4 Members (Unity)

+ **Timeline:** 2021.03 - 2021.06

+ **Tools:** Jenkins, SpringBoost, Vue.js, Docker

This project is based on the industry software development workflows. We finished many requirement documents and meeting periodically.

---
## 1. Project Introduction

The Information Retrieval Based Bug Localization (IRBL) system aims to intelligently analyze defect (bug) reports and source code files, filter out the source files that are most relevant to a given bug, and help programmers locate bugs more quickly and accurately.

The system uses the commonly adopted IR model VSM (Vector Space Model) for indexing and modeling. It first preprocesses the source files, then computes the similarity between the preprocessed bug reports and each source file, and finally sorts the source files in descending order of similarity scores and outputs the similarity scores.

The system also provides the ability to display the similarity information between a specific bug report and a specific source file.

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
        {% include figure.liquid loading="eager" path="assets/projects/irbl/img/architecture.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">Project Architecture</div>

### 1.2 References

1. 郭肇强, 周慧聪, 刘释然, 李言辉, 陈林, 周毓明, 徐宝文. 基于信息检索的缺陷定位: 问题、进展与挑战. 软件学报.
    http://www.jos.org.cn/1000-9825/6087.htm
2. R. K. Saha, M. Lease, S. Khurshid and D. E. Perry, *“Improving bug localization using structured information retrieval”*, 2013 28th IEEE/ACM International Conference on Automated Software Engineering (ASE), Silicon Valley, CA, USA, 2013, pp. 345–355, doi: 10.1109/ASE.2013.6693093.
3. M. Rath and P. Mäder, *“Influence of Structured Information in Bug Report Descriptions on IR-Based Bug Localization”*, 2018 44th Euromicro Conference on Software Engineering and Advanced Applications (SEAA), Prague, Czech Republic, 2018, pp. 26–32, doi: 10.1109/SEAA.2018.00014.
4. Jaime Arguello. *Vector Space Model.* INLS 509: Information Retrieval
5. 骆斌, 刘嘉, 张瑾玉, 黄蕾. 《软件工程与计算（卷三） 团队与软件开发实践》
6. IEEE Standards

### 1.3 Result

#### 1.3.1 SWT - 3.1

| Metric | AmaLgam | Our method | AmaLgam+ |
| ------ | ------- | ---------- | -------- |
| Top@1  | 62.2%   | 64.29%     | 63.3%    |
| Top@5  | 81.6%   | 85.72%     | 80.6%    |
| Top@10 | 89.8%   | 91.84%     | 89.8%    |
| MRR    | 0.71    | 0.74       | 0.71     |
| MAP    | 0.62    | 0.64       | 0.62     |
{: .table .table-bordered .table-striped}

#### 1.3.2 AspectJ

| Metric | AmaLgam | Our method | AmaLgam+ |
| ------ | ------- | ---------- | -------- |
| Top@1  | 44.4%   | 45.46%     | 49.4%    |
| Top@5  | 65.4%   | 70.98%     | 72.7%    |
| Top@10 | 73.1%   | 78.68%     | 80.3%    |
| MRR    | 0.54    | 0.57       | 0.60     |
| MAP    | 0.33    | 0.35       | 0.40     |
{: .table .table-bordered .table-striped}

#### 1.3.3 Eclipse - 3.1

| Metric | AmaLgam | Our method | AmaLgam+ |
| ------ | ------- | ---------- | -------- |
| Top@1  | 34.5%   | 35.13%     | 35.7%    |
| Top@5  | 57.7%   | 58.22%     | 60.3%    |
| Top@10 | 67.0%   | 66.64%     | 69.1%    |
| MRR    | 0.45    | 0.47       | 0.47     |
| MAP    | 0.35    | 0.36       | 0.36     |
{: .table .table-bordered .table-striped}

### 1.4 Front-End Show

<div class="column">
    <div class="col-sm mt-3 mt-md-0">
        <div>
            {% include figure.liquid loading="eager" path="assets/projects/irbl/img/show_evaluation.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        </div>
        <div class="caption">evaluation</div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <div>
            {% include figure.liquid loading="eager" path="assets/projects/irbl/img/show_ranking.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        </div>
        <div class="caption">ranking</div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <div>
            {% include figure.liquid loading="eager" path="assets/projects/irbl/img/detail.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        </div>
        <div class="caption">detail</div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <div>
            {% include figure.liquid loading="eager" path="assets/projects/irbl/img/show_list.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
        </div>
        <div class="caption">list</div>
    </div>
</div>

### 1.5  Team & Work Distribution

| Role          | Member         | Responsibilities                                                              |
| :------------ |:---------------|:------------------------------------------------------------------------------|
| **Team Lead** | Chen, junjie   | Bug Localization Algorithm                                                    |
| **Member**    | Chen, ganchun  | Back-end architecture                                                         |
| **Member**    | **Liu, Yulin** | **Jenkins pipeline Building, Docker & k8s Building, and Unit Test Framework** |
| **Member**    | Feng, Xinze    | Front-end architecture                                                        |
{: .table .table-bordered .table-striped}

---
## 2. Design

### 2.1 Logic View

#### 2.1.1 Layered Architecture Diagram

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/irbl/img/layered_architecture_diagram.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

#### 2.1.2 Logical Package Diagram

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/irbl/img/logical_package_diagram.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

### 2.2 Development View (Component View)

#### 2.2.1 Partitioning of Physical Packages

| Development Package | Dependent Packages               |
| ------------------- | -------------------------------- |
| config              |                                  |
| core                | util, mapper, domain             |
| view                | controller                       |
| dto                 |                                  |
| controller          | service, dto                     |
| service             | util, mapper, enums, domain, dto |
| mapper              | domain                           |
| util                |                                  |
| enums               |                                  |
| domain              |                                  |
| sql                 | domain, mapper                   |
| jenkins             |                                  |
{: .table .table-bordered .table-striped}

#### 2.2.2 Physical Package Diagram

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/irbl/img/physical_package_diagram.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

### 2.3 Interface View

#### 2.3.1 Responsibilities of Modules

**UI Module**

| Module | Responsibility                                                                   |
| ------ | -------------------------------------------------------------------------------- |
| view   | Frame for the UI; responsible for displaying pages and navigation between pages. |
{: .table .table-bordered .table-striped}

**Service Layer Modules**

| Module          | Responsibility                  |
| --------------- | ------------------------------- |
| CodeFileService | Services related to code files  |
| ProjectService  | Services related to projects    |
| ReportService   | Services related to bug reports |
{: .table .table-bordered .table-striped}

**Mapper (Data Access) Modules**

| Module         | Responsibility               |
| -------------- | ---------------------------- |
| CodeFileMapper | Handles data for code files  |
| ProjectMapper  | Handles data for projects    |
| ReportMapper   | Handles data for bug reports |
{: .table .table-bordered .table-striped}

#### 2.3.2 Interface Specifications of Modules

**Decomposition of User Interface Module - Required Services (Called Interfaces)**

| Service Name                                | Service Description                                                                      |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `CodeFileService.readFile`                  | Read file content                                                                        |
| `CodeFileService.getSortedFiles`            | Get list of files under a specified bug report, sorted by similarity in descending order |
| `ProjectService.getIndicatorEvaluation`     | Get evaluation metrics for a specified project                                           |
| `ReportService.getAllReportsByProjectIndex` | Get list of all bug reports under a specified project                                    |
| `ProjectService.getAllProjects`             | Get list of all projects                                                                 |
{: .table .table-bordered .table-striped}

**Decomposition of Business Logic Modules - Provided Services (Exposed Interfaces)**

| Service Name                                | Signature                                                | Precondition                | Postcondition                                                                                                                                                           |
| ------------------------------------------- | -------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CodeFileService.readFile`                  | `FileContent readFile(Integer fileIndex)`                | Input parameter is not null | If the network connection is normal and data exists in the database, returns the file content.                                                                          |
| `CodeFileService.getSortedFiles`            | `List<File> getSortedFiles(Integer reportIndex)`         | Input parameter is not null | If the network connection is normal and data exists in the database, returns the list of files under the specified bug report sorted by similarity in descending order. |
| `ProjectService.getIndicatorEvaluation`     | `Indicator getIndicatorEvaluation(Integer projectIndex)` | Input parameter is not null | If the network connection is normal and data exists in the database, returns the evaluation metrics of the specified project.                                           |
| `ReportService.getAllReportsByProjectIndex` | `List<Report> getAllReportsByProjectIndex`               | Input parameter is not null | If the network connection is normal and data exists in the database, returns the list of all bug reports under the specified project.                                   |
| `ProjectService.getAllProjects`             | `List<ProjectInfo> getAllProjects()`                     | None                        | If the network connection is normal and data exists in the database, returns the list of all projects.                                                                  |
{: .table .table-bordered .table-striped}

**Decomposition of Business Logic Modules - Required Services (Called Interfaces)**

| Service Name      | Service Description      |
| ----------------- | ------------------------ |
| BugReportMapper   | Retrieve bug reports     |
| CodeFileMapper    | Retrieve code files      |
| FileWordMapper    | Retrieve file words      |
| FixedFileMapper   | Retrieve fixed files     |
| ProjectMapper     | Retrieve project info    |
| ProjectWordMapper | Retrieve project words   |
| RankRecordMapper  | Retrieve ranking records |
{: .table .table-bordered .table-striped}

**Decomposition of Data Access Modules - Provided Services (Exposed Interfaces)**

| Service Name      | Signature / Description                                                                | Precondition                                                                                                                               | Postcondition                                                                                                                         |
| ----------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| BugReportMapper   | Inherits `BaseMapper` provided by MyBatis-Plus and includes basic database operations. | A `BugReport` entity class exists corresponding to the table in the database, and correct query conditions or entity lists are provided.   | If the network connection is normal and the `bug_report` table exists in the database, returns the results of the CRUD operations.    |
| CodeFileMapper    | Inherits `BaseMapper` provided by MyBatis-Plus and includes basic database operations. | A `CodeFile` entity class exists corresponding to the table in the database, and correct query conditions or entity lists are provided.    | If the network connection is normal and the `code_file` table exists in the database, returns the results of the CRUD operations.     |
| FileWordMapper    | Inherits `BaseMapper` provided by MyBatis-Plus and includes basic database operations. | A `FileWord` entity class exists corresponding to the table in the database, and correct query conditions or entity lists are provided.    | If the network connection is normal and the `file_word` table exists in the database, returns the results of the CRUD operations.     |
| FixedFileMapper   | Inherits `BaseMapper` provided by MyBatis-Plus and includes basic database operations. | A `FixedFile` entity class exists corresponding to the table in the database, and correct query conditions or entity lists are provided.   | If the network connection is normal and the `fixed_file` table exists in the database, returns the results of the CRUD operations.    |
| ProjectMapper     | Inherits `BaseMapper` provided by MyBatis-Plus and includes basic database operations. | A `Project` entity class exists corresponding to the table in the database, and correct query conditions or entity lists are provided.     | If the network connection is normal and the `project` table exists in the database, returns the results of the CRUD operations.       |
| ProjectWordMapper | Inherits `BaseMapper` provided by MyBatis-Plus and includes basic database operations. | A `ProjectWord` entity class exists corresponding to the table in the database, and correct query conditions or entity lists are provided. | If the network connection is normal and the `project_world` table exists in the database, returns the results of the CRUD operations. |
| RankRecordMapper  | Inherits `BaseMapper` provided by MyBatis-Plus and includes basic database operations. | A `RankRecord` entity class exists corresponding to the table in the database, and correct query conditions or entity lists are provided.  | If the network connection is normal and the `rank_record` table exists in the database, returns the results of the CRUD operations.   |
{: .table .table-bordered .table-striped}

### 2.4 Information View

#### 2.4.1 Domain Definitions

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/irbl/img/domain_definitions.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
