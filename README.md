# Eversports Interview: backend
used for interviews for backend positions

## Description


## Tasks

### 1. Seperation of concerns
The controllers in our applications include a lot of bad practices from earlier days. 

Take a look at the **app/controllers/membership.controller.js** which represents an endpoint to assign a membership to a customer.

#### Tasks
- [ ] Think about the bad practices in the controller and implement a refactored version of the action. Hint: Use the **libs-legacy/memberships** folder to split concerns

### 2. Typescript
We are using Typescript at our modern core libs and our goal is to refactor as much code from javascript to typescript.

Your task is to refactor the function **libs-legacy/memberships/calculate-validity-end.js** to Typescript. 
The Code should be refactored to **libs/membership/membership.service.ts**

- Think about which Typescript you can use here (Interfaces, Types, Enums,..)
- Think about how to define the incoming function Options-Interface and the function Return-Interface.
- Think about how you can improve this function.
- Extra: Refator the function to use Javascript Date instead of moment.



