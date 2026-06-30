---

title: Model Context Protocol (MCP) Architecture
document: Wayora Blueprint
file: docs/07_MCP.md
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

---

# MCP Architecture

## Purpose

This document defines how Wayora integrates external systems through the Model Context Protocol (MCP).

Wayora never allows AI models to communicate directly with third-party services.

Every external dependency is exposed through standardized MCP Servers.

This ensures:

* Provider independence
* Security
* Testability
* Replaceability
* Observability
* Cost control

---

# Why MCP

Without MCP:

```text
LLM
 │
 ├── Google Maps API
 ├── Weather API
 ├── Fuel API
 ├── Booking API
 └── ...
```

The AI becomes tightly coupled to providers.

With MCP:

```text
LLM

↓

Planning Engine

↓

MCP Tool Registry

↓

MCP Servers

↓

External Providers
```

AI understands capabilities.

Not vendors.

---

# MCP Design Principles

Every provider is replaceable.

Every tool has one responsibility.

Tools never contain business logic.

Authentication is isolated.

AI never owns credentials.

Tool outputs are deterministic.

All tools are observable.

---

# MCP Layers

```text
Planning Engine

↓

Tool Registry

↓

MCP Router

↓

MCP Server

↓

Provider Adapter

↓

External Service
```

---

# MCP Categories

## Maps

Responsibilities

Route calculation

Distance matrix

Reverse geocoding

Forward geocoding

Place lookup

Road restrictions

Elevation

---

## Traffic

Responsibilities

Traffic density

Accidents

Road closures

Construction

Estimated delays

---

## Weather

Responsibilities

Forecast

Radar

Wind

Visibility

Storm alerts

Temperature

Humidity

UV

---

## Fuel

Responsibilities

Fuel prices

Nearby stations

Brand lookup

Fuel availability

Fuel type compatibility

---

## EV

Responsibilities

Charging stations

Connector types

Availability

Charging speed

Estimated charging duration

Battery compatibility

---

## Discovery

Responsibilities

Museums

Beaches

National parks

Scenic roads

Coffee shops

Restaurants

Camping

Hotels

Tourist attractions

---

## Parking

Responsibilities

Parking availability

Parking prices

Parking restrictions

EV parking

Covered parking

---

## Calendar

Responsibilities

Trip schedule

Reservations

Events

Departure reminders

Holiday lookup

---

## Booking

Responsibilities

Hotels

Camping

Accommodation

Reservation status

Cancellation policy

---

## Knowledge

Responsibilities

Historical places

Local information

Regional culture

Travel tips

Tourism information

---

# MCP Tool Structure

Every MCP tool follows the same contract.

Input

↓

Validation

↓

Provider Adapter

↓

Normalization

↓

Response

↓

Planner

No provider-specific data reaches AI.

---

# Standard Tool Interface

Every tool implements:

```typescript
Tool {

name

description

version

inputSchema

outputSchema

timeout

retryPolicy

cachePolicy

permissions

}
```

No custom interfaces.

---

# Tool Registry

Planning Engine never references tools directly.

Instead it asks the Tool Registry.

Example

```text
Need:

Route Calculation

↓

Registry

↓

Available Providers

↓

Select Best Tool

↓

Execute
```

---

# Tool Discovery

Each MCP Server registers itself.

Example

```yaml
server:

Maps

version:

2.1

tools:

GetRoute

GetDistanceMatrix

SearchPlaces

ReverseGeocode

Health:

Healthy
```

Planner automatically discovers capabilities.

---

# Provider Adapter

Each provider has its own adapter.

Example

Google Maps

↓

Google Adapter

Mapbox

↓

Mapbox Adapter

TomTom

↓

TomTom Adapter

OpenRouteService

↓

ORS Adapter

Planner remains unchanged.

---

# Tool Selection

Planner selects tools based on:

Availability

Latency

Pricing

Region

Rate Limits

Reliability

Policy

Fallback Rules

Selection is policy-driven.

---

# Authentication

Authentication never reaches AI.

Credentials remain inside MCP Servers.

Possible methods:

OAuth

API Keys

Service Accounts

JWT

mTLS

Secret Manager

---

# Authorization

Each capability declares permissions.

Example

Weather Capability

Allowed:

Weather Tools

Denied:

Booking

Payments

Analytics

Least privilege is enforced.

---

# Caching

Each tool defines cache policy.

Example

Weather

5 minutes

Fuel Prices

30 minutes

Geocoding

30 days

Place Details

7 days

Traffic

60 seconds

Planner never manages caching.

---

# Retry Policy

Each tool defines:

Retry Count

Retry Delay

Circuit Breaker

Timeout

Fallback Strategy

Policies remain independent.

---

# Rate Limiting

Each provider has independent quotas.

MCP Server enforces:

Requests per minute

Requests per day

Burst protection

Priority requests

Queue management

Planner never manages quotas.

---

# Tool Response

Every tool returns:

```json
{
  "status": "success",
  "provider": "",
  "version": "",
  "data": {},
  "latency": 132,
  "cache": true,
  "traceId": ""
}
```

Every response is normalized.

---

# Error Model

Possible errors:

Validation Error

Authentication Error

Authorization Error

Provider Error

Timeout

Rate Limit

Unavailable

Malformed Response

Errors never propagate directly.

They are normalized.

---

# Fallback Strategy

Maps

↓

Mapbox

↓

Google

↓

TomTom

↓

OpenRouteService

↓

Cached Route

↓

Planner Approximation

↓

User Notification

Every tool defines its own fallback chain.

---

# Observability

Every tool execution records:

Tool Name

Provider

Latency

Retries

Cache Hit

Failure Reason

Cost

Trace ID

Journey ID

Capability

Token Correlation

---

# Security

MCP Servers are isolated.

Only the Planning Engine may invoke them.

Clients never communicate directly.

AI never accesses secrets.

Provider credentials remain encrypted.

Every request is audited.

---

# Deployment

Each MCP Server is independently deployable.

Benefits:

Independent scaling

Independent maintenance

Provider isolation

Technology independence

Regional deployment

---

# Future MCP Servers

Traffic Cameras

Border Crossings

Toll Systems

Insurance

Air Quality

Emergency Services

Public Transport

Ferry Services

Smart Cities

Vehicle Telemetry

OBD-II

Dashcam AI

Drone Services

---

# Acceptance Criteria

* AI remains provider-independent.
* Providers are abstracted.
* Tools expose standardized contracts.
* Authentication remains isolated.
* Tool outputs are normalized.
* Fallback strategies exist.
* Every tool is observable.
* Every tool is independently deployable.

---

# Open Questions

Should MCP Servers communicate over HTTP, gRPC, or both?

Should providers be selected dynamically using performance metrics?

Should organizations be allowed to install custom MCP Servers?

Should local MCP Servers be supported for offline journeys?

Should Wayora publish an SDK for third-party MCP development?
