---

title: Backend Services Specification
document: Wayora Blueprint
file: docs/17_BACKEND_SERVICES.md
version: 1.0.0
status: Approved
owner: Wayora

authors:

* Tolga B.
* OpenAI ChatGPT

created: 2026-06-29
last_updated: 2026-06-29

dependencies:

* 04_SYSTEM_ARCHITECTURE.md
* 05_AI_ARCHITECTURE.md
* 08_DATABASE.md
* 09_API.md
* 16_TECH_STACK.md

---

# Backend Services

## Purpose

This document defines the backend service boundaries of Wayora.

Each service has a single responsibility.

Services communicate through well-defined APIs and domain events.

Business logic must never be duplicated between services.

---

# Service Philosophy

Services own domains.

Not database tables.

Every service should be independently deployable, testable, and replaceable.

---

# Service Categories

Core Services

AI Services

Platform Services

Infrastructure Services

Integration Services

---

# Core Services

## Gateway Service

### Responsibilities

* Public API entrypoint
* GraphQL
* REST
* WebSocket
* Authentication
* Rate limiting
* Request validation
* Response normalization

### Owns

Nothing

Acts only as a router.

---

## Journey Service

### Responsibilities

Create journeys

Update journeys

Journey lifecycle

Timeline storage

Journey versions

Journey events

Journey media

Journey export

### Owns

Journey Aggregate

---

## Recommendation Service

### Responsibilities

Store recommendations

Recommendation history

Recommendation ranking

Recommendation acceptance

Recommendation analytics

Recommendation explanations

### Owns

Recommendation Aggregate

---

## Timeline Service

### Responsibilities

Timeline generation

Timeline updates

Timeline ordering

Stop scheduling

ETA updates

Timeline visualization data

### Owns

Timeline Aggregate

---

# AI Services

## Planning Service

The heart of Wayora.

### Responsibilities

Journey planning

Capability orchestration

Decision validation

Conflict resolution

Constraint solving

Journey optimization

Replanning

### Owns

Nothing

Produces plans.

Planner never stores data.

---

## Conversation Service

### Responsibilities

Conversation lifecycle

Streaming

Intent detection

Context loading

Prompt execution

Tool invocation

Clarification

Conversation history

### Owns

Conversation Sessions

---

## Memory Service

### Responsibilities

Journey DNA

Behavior learning

Memory retrieval

Memory decay

Memory confidence

Preference inference

DNA generation

### Owns

Journey DNA

Memory Aggregate

---

## Capability Runtime

### Responsibilities

Capability execution

Capability lifecycle

Capability registry

Capability isolation

Capability metrics

Capability versioning

### Owns

Capability metadata

---

# Platform Services

## User Service

Responsibilities

Profiles

Preferences

Settings

Travel profiles

Privacy

Subscriptions

Authentication metadata

---

## Vehicle Service

Responsibilities

Vehicle management

Vehicle profiles

Consumption models

Charging profiles

Vehicle constraints

Supported modes

---

## Notification Service

Responsibilities

Push

Email

SMS

Realtime notifications

Journey reminders

Weather alerts

Traffic alerts

Rest reminders

---

## Media Service

Responsibilities

Images

Voice notes

Journey photos

Uploads

Downloads

Storage abstraction

---

## Search Service

Responsibilities

Journey search

POI search

Global search

Autocomplete

Recent searches

Search indexing

---

## Analytics Service

Responsibilities

Business metrics

Journey metrics

Capability metrics

Product analytics

Operational analytics

---

## Organization Service

Responsibilities

Teams

Organizations

Fleet

Permissions

Billing relationships

Enterprise policies

---

# Integration Services

## MCP Gateway

Responsibilities

Tool discovery

Provider routing

Authentication

Caching

Retry

Fallback

Normalization

Planner only communicates with MCP Gateway.

---

## AI Provider Service

Responsibilities

Model selection

Streaming

Token accounting

Provider abstraction

Fallback models

Prompt execution

AI models remain replaceable.

---

# Infrastructure Services

## Event Bus

Responsibilities

Publish

Subscribe

Retry

Dead-letter queue

Event replay

---

## Scheduler

Responsibilities

Delayed jobs

Background jobs

Notifications

DNA updates

Cleanup

Learning pipeline

---

## Cache Service

Responsibilities

Redis abstraction

Cache invalidation

Distributed locks

Rate limits

Temporary planning state

---

# Service Communication

## Synchronous

GraphQL

REST

gRPC

WebSocket

---

## Asynchronous

Domain Events

Queues

Background Jobs

Scheduler

Notifications

---

# Service Ownership Matrix

| Service        | Owns Data   | Writes Data | Reads Data |
| -------------- | ----------- | ----------- | ---------- |
| Gateway        | No          | No          | Yes        |
| Journey        | Yes         | Yes         | Yes        |
| Planner        | No          | No          | Yes        |
| Conversation   | Partial     | Partial     | Yes        |
| Memory         | Yes         | Yes         | Yes        |
| Recommendation | Yes         | Yes         | Yes        |
| Timeline       | Yes         | Yes         | Yes        |
| Search         | Yes (Index) | Yes         | Yes        |
| Analytics      | Yes         | Yes         | Yes        |
| Notification   | Yes         | Yes         | Yes        |
| MCP Gateway    | No          | No          | Yes        |

---

# Domain Ownership

Journey Service

↓

Journey Aggregate

Memory Service

↓

Journey DNA

Vehicle Service

↓

Vehicle Aggregate

Recommendation Service

↓

Recommendation Aggregate

Timeline Service

↓

Timeline Aggregate

No aggregate has multiple owners.

---

# Background Jobs

Journey Learning

Recommendation Refresh

Weather Refresh

Traffic Refresh

Journey Score Update

DNA Update

Search Index

Analytics Aggregation

Media Optimization

Cleanup

---

# Service Scaling

Highest scaling priority:

Conversation

Planning

Gateway

Notification

MCP Gateway

Search

Analytics

Journey Service

Memory Service

---

# Failure Strategy

Journey unavailable

↓

Retry

↓

Cached Snapshot

↓

Reduced Functionality

↓

User Notification

No cascading failures.

---

# Service Observability

Every service exposes:

Health

Readiness

Metrics

Tracing

Structured Logs

Version

Dependencies

---

# Future Services

Community Service

Social Sharing

Marketplace

Offline Sync

Voice Companion

Vehicle Telemetry

Smartwatch Sync

Travel Rewards

Insurance

Emergency Services

---

# Acceptance Criteria

Every domain has a single owner.

Planner remains stateless.

Services communicate through contracts.

Background jobs are isolated.

Scaling remains independent.

Failures are contained.

Service responsibilities do not overlap.

---

# Open Questions

Should Timeline remain a dedicated service or become part of Journey Service?

Should Recommendation Service perform ranking or should Planning Service own ranking?

Should Search become event-driven only?

Should AI Provider Service support multiple models within a single planning cycle?

Should Memory Service expose public APIs or remain internal only?
