---

title: Wayora Master Context
document: Wayora Blueprint
file: docs/WAYORA_MASTER_CONTEXT.md
version: 1.0.0
status: Canonical
owner: Wayora

authors:

* Tolga B.
* OpenAI ChatGPT

created: 2026-06-29
last_updated: 2026-06-29

purpose:
This document is the primary context for AI coding assistants.
Every AI agent working on Wayora should read this document before generating code.

priority:
Highest

---

# WAYORA MASTER CONTEXT

## What is Wayora?

Wayora is an AI-native Personal Travel Intelligence Platform.

It does not compete with Google Maps, Apple Maps or Waze.

Those products optimize roads.

Wayora optimizes journeys.

The destination is only one part of the experience.

The journey itself is the product.

---

# Product Vision

Wayora helps travelers create better road trips using Artificial Intelligence.

The platform combines:

* AI Planning
* Route Optimization
* Live Context
* Personalized Recommendations
* Journey Memory
* Travel Timeline
* Journey DNA

into one continuous travel companion.

---

# Product Philosophy

Conversation comes first.

Maps come second.

AI is the operating system.

Journey is the primary domain.

Everything exists to improve the travel experience.

---

# North Star

Every completed journey should make the next journey better.

---

# Core Principles

Safety first.

User intent overrides assumptions.

Explicit preferences override learned behavior.

AI explains every important recommendation.

Learning happens after the journey.

Providers are replaceable.

Capabilities remain independent.

Journey is the primary aggregate.

---

# Primary Domain

The central object is:

Journey

Everything else exists because of a Journey.

Examples:

Route

Timeline

Recommendations

Events

Weather

Traffic

Vehicle Snapshot

Journey Summary

---

# Journey Lifecycle

Draft

↓

Planning

↓

Validated

↓

Scheduled

↓

Active

↓

Paused

↓

Completed

↓

Reviewed

↓

Archived

---

# Journey DNA

Journey DNA is Wayora's core innovation.

It is not a settings page.

It is a probabilistic behavioral model.

Journey DNA learns from:

Completed journeys

Accepted recommendations

Visited places

Driving habits

Stop duration

Travel companions

Repeated behavior

Journey DNA never replaces explicit preferences.

---

# AI Architecture

Conversation

↓

Context Builder

↓

Planning Engine

↓

Capability Orchestrator

↓

Capabilities

↓

MCP Tools

↓

External Providers

↓

Planner Validation

↓

Journey Update

Capabilities never communicate directly.

Planner owns orchestration.

---

# Capability Rules

Capabilities are:

Stateless

Independent

Replaceable

Observable

Explainable

They never:

Modify database records

Call providers directly

Update Journey DNA

Communicate with each other

Planner validates every capability output.

---

# MCP

External services are never called directly.

Every provider is wrapped by an MCP Server.

Examples:

Maps

Weather

Traffic

Fuel

Charging

Booking

Parking

Wikipedia

Restaurants

Hotels

Planner never knows which provider is used.

---

# Backend Architecture

Gateway

Journey Service

Planning Service

Conversation Service

Memory Service

Recommendation Service

Timeline Service

Notification Service

Search Service

Analytics Service

Vehicle Service

Organization Service

Services own domains.

Not database tables.

---

# Frontend Philosophy

Conversation First.

Timeline Second.

Map Third.

The map visualizes the journey.

The conversation creates the journey.

---

# Mobile Philosophy

Web is for planning.

Mobile is for traveling.

Mobile must support:

Offline

Realtime

GPS

Notifications

Voice

CarPlay

Android Auto

---

# Technology Stack

Language

TypeScript

Runtime

Bun

Frontend

Next.js

Backend

Hono

ORM

Drizzle

Database

PostgreSQL

Cache

Redis

Queue

BullMQ

Validation

Zod

Maps

Mapbox

AI

Vercel AI SDK

Observability

Grafana Stack

Container

Docker

Monorepo

TurboRepo

Package Manager

pnpm

---

# Coding Principles

Prefer readability over cleverness.

Prefer composition over inheritance.

Prefer explicit types.

Avoid unnecessary abstractions.

Keep services focused.

Avoid premature optimization.

No duplicated business logic.

Everything must be testable.

---

# TypeScript Rules

Strict mode enabled.

No `any`.

Prefer `type` for data contracts.

Use `interface` for extensible contracts only.

Shared types belong in `packages/types`.

Validate all external input with Zod.

Never trust client input.

---

# API Rules

GraphQL is the primary client API.

REST is used for infrastructure concerns.

WebSockets are used for realtime.

Internal communication may use gRPC.

Never expose database models directly.

Expose business capabilities.

---

# Database Rules

Journey is the primary aggregate.

Events are immutable.

Journey versions are immutable.

Every entity uses UUIDv7.

Soft delete where possible.

Never physically delete critical business data.

---

# AI Rules

AI reasons.

Planner decides.

Capabilities recommend.

Memory learns.

Users confirm important actions.

AI never invents provider data.

AI always explains important recommendations.

Learning is asynchronous.

---

# Security Rules

Every request is authenticated.

Every action is authorized.

Secrets never enter AI prompts.

Capabilities receive only sanitized context.

PII remains protected.

Every action is auditable.

---

# Performance Targets

Journey Planning

<5 seconds

Realtime Update

<300ms

Web Startup

<2 seconds

Streaming Start

<800ms

Planner Latency

<2 seconds

DNA Retrieval

<50ms

---

# Repository Structure

```text
apps/
    web/
    mobile/

services/
    gateway/
    planner/
    journey/
    conversation/
    recommendation/
    timeline/
    memory/
    notification/
    analytics/

packages/
    ui/
    types/
    sdk/
    config/
    database/
    utils/

mcp/
    maps/
    weather/
    traffic/
    fuel/
    charging/

docker/

infrastructure/

docs/
```

---

# Development Workflow

1. Read the relevant Blueprint document.

2. Design before coding.

3. Create shared types first.

4. Implement backend.

5. Implement frontend.

6. Write tests.

7. Add observability.

8. Review architecture.

9. Merge.

---

# Definition of Done

A feature is complete only if:

Business logic implemented.

Type-safe.

Validated.

Documented.

Tested.

Observable.

Secure.

Responsive.

Accessible.

No TODO comments remain.

No lint errors.

No type errors.

No failing tests.

---

# AI Coding Instructions

When generating code:

Preserve architecture.

Do not invent new patterns.

Reuse existing packages.

Keep business logic inside services.

Never bypass the Planning Engine.

Never bypass MCP.

Do not duplicate types.

Do not hardcode providers.

Prefer reusable components.

Follow established naming conventions.

If architectural uncertainty exists, stop and request clarification instead of making assumptions.

---

# Final Reminder

Wayora is **not a navigation application**.

It is an **AI-native Travel Intelligence Platform**.

Every architectural, product, and engineering decision must answer one question:

> **"Does this make the user's journey meaningfully better?"**

If the answer is **no**, the feature should be redesigned or removed.
