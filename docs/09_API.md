---

title: API Specification
document: Wayora Blueprint
file: docs/09_API.md
version: 1.0.0
status: Draft
owner: Wayora

authors:

* Tolga B.
* OpenAI ChatGPT

created: 2026-06-29
last_updated: 2026-06-29

dependencies:

* 04_SYSTEM_ARCHITECTURE.md
* 05_AI_ARCHITECTURE.md
* 06_AGENT_ORCHESTRATION.md
* 08_DATABASE.md

---

# API Specification

## Purpose

This document defines the public and internal API architecture of Wayora.

The API is designed around Journeys instead of CRUD resources.

Clients ask the platform to perform travel operations rather than manipulate database entities.

---

# API Philosophy

Traditional API

```
POST /users

GET /users

PUT /users

DELETE /users
```

Wayora API

```
Create Journey

Optimize Journey

Continue Conversation

Accept Recommendation

Generate Timeline

Replan Journey
```

The API exposes business capabilities.

Not tables.

---

# API Architecture

```text
Client

↓

API Gateway

↓

Application Layer

↓

Planning Engine

↓

Capabilities

↓

Platform Services

↓

Database
```

No client communicates directly with capabilities.

---

# API Styles

Wayora uses multiple API styles.

REST

GraphQL

WebSocket

Server-Sent Events

Internal gRPC

Each protocol has a specific responsibility.

---

# REST

REST is used for:

Authentication

Uploads

Downloads

Billing

Organizations

Configuration

Static Resources

Health Checks

---

# GraphQL

GraphQL is the primary client API.

Reasons:

Single endpoint

Flexible queries

Nested data

Reduced over-fetching

Strong typing

Frontend efficiency

---

# WebSocket

Used for:

Conversation Streaming

Journey Progress

Realtime Planning

Notifications

Traffic Updates

Weather Updates

ETA Updates

Collaborative Planning (Future)

---

# Internal gRPC

Internal communication only.

Services:

Planner

Memory

Recommendation

Analytics

Notification

Search

Provider Gateway

---

# API Versioning

Public APIs

```
/v1
```

Breaking changes require:

```
/v2
```

Internal services use semantic versioning.

---

# Authentication

Supported methods:

OAuth2

OpenID Connect

JWT

API Keys (Enterprise)

Service Tokens

Device Tokens

---

# Authorization

Role-Based Access Control

Roles

Guest

User

Premium

Admin

Support

Organization Owner

Fleet Manager

Developer

Each endpoint declares required permissions.

---

# Primary Resources

Journey

Conversation

Timeline

Recommendation

Vehicle

Preference

Journey DNA

Notification

Organization

Subscription

---

# Journey Endpoints

## Create Journey

```
POST /v1/journeys
```

Creates a new planning session.

---

## Retrieve Journey

```
GET /v1/journeys/{id}
```

---

## Update Journey

```
PATCH /v1/journeys/{id}
```

Only mutable fields.

---

## Archive Journey

```
DELETE /v1/journeys/{id}
```

Soft delete only.

---

## Duplicate Journey

```
POST /v1/journeys/{id}/duplicate
```

---

# Conversation API

Primary AI interface.

```
POST /v1/chat
```

Request

```json
{
    "journeyId": "...",
    "message": "Plan a scenic road trip to Antalya."
}
```

Streaming response is supported.

---

# Planning API

```
POST /v1/planning/generate
```

Produces:

Journey

Timeline

Recommendations

Route

Estimated Cost

Journey Score

---

# Replanning API

```
POST /v1/planning/replan
```

Triggers:

Traffic

Weather

Road Closure

User Request

Vehicle Change

---

# Recommendation API

Accept

```
POST /v1/recommendations/{id}/accept
```

Reject

```
POST /v1/recommendations/{id}/reject
```

Ignore

```
POST /v1/recommendations/{id}/ignore
```

Every action generates a Journey Event.

---

# Journey Timeline API

```
GET /v1/journeys/{id}/timeline
```

Returns:

Chronological itinerary

Stops

Travel time

Recommendations

Events

---

# Journey DNA API

Retrieve

```
GET /v1/users/me/dna
```

Update

AI only.

Manual editing is restricted.

Export

```
GET /v1/users/me/dna/export
```

Delete

```
DELETE /v1/users/me/dna
```

---

# Vehicle API

Create

Retrieve

Update

Archive

Set Active Vehicle

Vehicle validation occurs during planning.

---

# Preferences API

Retrieve

Update

Reset

Preference Profiles

Business

Family

Camping

Motorcycle

Road Trip

---

# Notification API

Push

Email

SMS

In-App

CarPlay

Android Auto

---

# GraphQL Schema

Primary root types

Query

Mutation

Subscription

Example

```graphql
type Query {
    journey(id: ID!): Journey
    journeys: [Journey]
    me: User
}
```

---

# WebSocket Events

Client →

Conversation Message

Typing

Journey Update

Reconnect

Heartbeat

Server →

AI Token Stream

Recommendation

Timeline Updated

Journey Updated

Traffic Changed

Weather Changed

Notification

---

# Error Model

Every response uses:

```json
{
    "success": false,
    "error": {
        "code": "",
        "message": "",
        "traceId": ""
    }
}
```

No provider-specific errors leak.

---

# Idempotency

Supported for:

Journey Creation

Planning

Recommendation Acceptance

Payments

Uploads

Clients send:

```
Idempotency-Key
```

Duplicate requests never duplicate work.

---

# Pagination

Cursor-based pagination only.

```
after

before

first

last
```

Offset pagination is prohibited.

---

# Filtering

Supports:

Date

Journey State

Vehicle

Tags

Recommendation Type

Capability

Status

---

# Rate Limits

Guest

60/hour

User

600/hour

Premium

3000/hour

Enterprise

Configurable

AI endpoints have independent quotas.

---

# Request Validation

Every endpoint validates:

Schema

Authentication

Authorization

Business Rules

Journey State

Provider Constraints

---

# Response Standards

Every successful response includes:

Request ID

Trace ID

Timestamp

API Version

Latency

Optional Cost Metadata

---

# API Security

HTTPS only

JWT Validation

CSRF Protection

Rate Limiting

Input Validation

Output Encoding

Audit Logging

PII Filtering

---

# API Observability

Every request records:

Request ID

Journey ID

User ID

Trace ID

Capability

Latency

Model Used

Token Count

Cost

Provider

Status

---

# API Lifecycle

Experimental

↓

Preview

↓

Stable

↓

Deprecated

↓

Removed

Every endpoint declares lifecycle status.

---

# Future APIs

Voice Planning

CarPlay API

Android Auto API

Vehicle Telemetry

Fleet Management

Offline Synchronization

Third-party Plugin API

Developer SDK

Public Marketplace API

---

# Acceptance Criteria

Business capabilities are exposed instead of CRUD tables.

GraphQL is the primary client API.

Streaming is supported.

Versioning is defined.

Errors are standardized.

Idempotency is supported.

Observability is built in.

API remains provider-independent.

---

# Open Questions

Should GraphQL become the only public API?

Should enterprise customers receive dedicated API namespaces?

Should AI planning expose synchronous and asynchronous modes?

Should plugins be able to register their own GraphQL schema?

Should Wayora eventually publish a public developer platform?
