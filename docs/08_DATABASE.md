---

title: Database Architecture & Data Model
document: Wayora Blueprint
file: docs/08_DATABASE.md
version: 1.0.0
status: Draft
owner: Wayora

authors:

* Tolga B.
* OpenAI ChatGPT

created: 2026-06-29
last_updated: 2026-06-29

dependencies:

* 03_DOMAIN_MODEL.md
* 04_SYSTEM_ARCHITECTURE.md
* 05_AI_ARCHITECTURE.md
* 06_AGENT_ORCHESTRATION.md
* 07_MCP.md

---

# Database Architecture

## Purpose

This document defines the persistence architecture of Wayora.

The database is designed around the Journey Domain rather than traditional user-centric applications.

Every important user interaction is represented as a Journey, Event, or Memory.

---

# Database Philosophy

Wayora does not store conversations.

Wayora stores travel intelligence.

Raw conversations are temporary.

Behavior is permanent.

Events become memories.

Memories become Journey DNA.

Journey DNA improves future planning.

---

# Database Technologies

| Purpose         | Technology                   |
| --------------- | ---------------------------- |
| Relational Data | PostgreSQL                   |
| Cache           | Redis                        |
| Semantic Search | Vector Database              |
| Blob Storage    | S3 Compatible Storage        |
| Search          | OpenSearch                   |
| Event Store     | PostgreSQL Event Tables (v1) |
| Analytics       | ClickHouse (Future)          |

---

# Storage Responsibilities

## PostgreSQL

Stores:

Users

Journeys

Routes

Timeline

Recommendations

Preferences

Vehicles

Events

Notifications

Organizations

Billing

Authentication Metadata

---

## Redis

Stores:

Sessions

Realtime Presence

Temporary Planning Context

Rate Limits

Streaming State

Active Journey Cache

---

## Vector Database

Stores embeddings for:

Conversation Context

Journey Summary

Recommendations

Places

POI Similarity

Travel Preferences

Future RAG Features

---

## Object Storage

Stores:

Journey Images

Documents

Voice Notes

Offline Maps

Exports

Attachments

User Uploads

---

## Search Engine

Indexes:

Places

Journeys

Recommendations

Hotels

Restaurants

Travel Guides

---

# Primary Aggregates

The database contains five primary aggregates.

User

Journey

Vehicle

Organization

Provider

Everything else belongs to one of these aggregates.

---

# User Aggregate

User

↓

Journey DNA

↓

Preferences

↓

Travel Profiles

↓

Saved Journeys

↓

Favorite Places

↓

Vehicles

↓

Notification Settings

↓

Privacy Settings

↓

Subscription

User never directly owns routes.

---

# Journey Aggregate

Journey

↓

Route Versions

↓

Waypoints

↓

Timeline

↓

Recommendations

↓

Events

↓

Weather Snapshots

↓

Traffic Snapshots

↓

Fuel Snapshots

↓

Companions

↓

Media

↓

Analytics

Journey is immutable after completion.

Future changes create new Journey Versions.

---

# Journey Versioning

Planning creates Version 1.

Replanning creates Version 2.

Weather changes create Version 3.

Traffic changes create Version 4.

Every version remains queryable.

No history is lost.

---

# Route Model

Route

↓

Segments

↓

Road Metadata

↓

Restrictions

↓

Estimated Cost

↓

Estimated Fuel

↓

Estimated Battery

↓

Travel Time

↓

Distance

↓

Polyline

↓

Alternative Routes

---

# Waypoint Model

Waypoint

↓

Location

↓

Arrival

↓

Departure

↓

Category

↓

Priority

↓

Duration

↓

Reason

↓

Coordinates

↓

Provider Metadata

↓

Recommendation Source

---

# Recommendation Model

Recommendation

↓

Category

↓

Priority

↓

Confidence

↓

Explanation

↓

Capability

↓

Accepted

↓

Rejected

↓

Ignored

↓

Expiration

↓

Evidence

Recommendations are immutable.

Status changes generate events.

---

# Event Model

Events represent facts.

Examples

JourneyCreated

JourneyStarted

JourneyPaused

JourneyCompleted

RouteChanged

WaypointAdded

WaypointRemoved

FuelStopAccepted

CoffeeStopSkipped

RecommendationAccepted

RecommendationRejected

JourneyRated

WeatherChanged

TrafficChanged

Events never change.

---

# Memory Model

Memory is inferred.

Example

User stopped at:

Coffee

↓

12 journeys

↓

Average stay

28 minutes

↓

Memory Created

Preferred Coffee Stop

Confidence

0.94

Memory is derived.

Not entered manually.

---

# Journey DNA Model

Journey DNA contains probabilistic traits.

Example

Driving Style

↓

Relaxed

↓

Confidence

0.82

↓

Evidence

31 journeys

Each trait stores:

Current Value

Confidence

Evidence Count

Decay Score

Last Updated

Origin

Supporting Events

---

# Preference Model

Preferences are explicit.

Examples

Avoid Highways

Use Toll Roads

Pet Friendly

Wheelchair Accessible

Eco Route

Avoid Ferries

Scenic Route

Preferences always override Journey DNA.

---

# Vehicle Model

Vehicle

↓

Brand

↓

Model

↓

Year

↓

Fuel Type

↓

Battery Capacity

↓

Range

↓

Dimensions

↓

Driving Profile

↓

Capabilities

↓

Restrictions

Multiple vehicles are supported.

---

# Companion Model

Companion

↓

Adults

↓

Children

↓

Pets

↓

Accessibility

↓

Luggage

↓

Special Needs

Companions affect planning.

---

# Provider Metadata

Every external object stores metadata.

Example

Google Place ID

Mapbox Place ID

Booking ID

Charging Provider

Fuel Provider

Wikipedia ID

Internal AI never depends on provider IDs.

---

# Search Model

Search indexes:

Cities

Countries

POIs

Restaurants

Journeys

Recommendations

Timeline

Travel Guides

Search remains eventually consistent.

---

# Event Sourcing Strategy

Business state is reconstructed from events.

Current Journey

=

Journey Snapshot

*

Events

Snapshots improve performance.

Events remain authoritative.

---

# Soft Delete Strategy

Critical entities are never physically deleted.

Deletion means:

Archived

Anonymized

Detached

Encrypted

GDPR deletion removes personally identifiable information while preserving aggregate analytics where legally permitted.

---

# Multi-Tenancy

Supported from day one.

Tenant

↓

Organizations

↓

Users

↓

Journeys

↓

Billing

↓

Policies

Enterprise deployments require complete tenant isolation.

---

# Data Retention

Conversation Context

24 hours

Planning Context

Journey duration

Telemetry

90 days

Journey Events

Unlimited

Journey DNA

Until deleted

Audit Logs

7 years

Retention is configurable.

---

# Encryption

Encryption at Rest

AES-256

Encryption in Transit

TLS 1.3

Secret Storage

Vault / Cloud Secret Manager

Field-level encryption for:

Email

Phone

Location History

Billing Metadata

---

# Backup Strategy

Continuous WAL Backup

↓

Hourly Incremental

↓

Daily Snapshot

↓

Weekly Archive

↓

Monthly Cold Storage

Recovery Point Objective

<5 minutes

Recovery Time Objective

<30 minutes

---

# Database Scaling

Read Replicas

↓

Partitioning

↓

Connection Pooling

↓

Logical Replication

↓

Sharding (Future)

Journey tables partition by creation date.

---

# Naming Conventions

Primary Keys

UUIDv7

Foreign Keys

<entity>_id

Timestamps

created_at

updated_at

deleted_at

Version fields

version

Optimistic locking

revision

---

# Auditability

Every write operation records:

Actor

Timestamp

Request ID

Journey ID

Trace ID

Source

Capability

Provider

Reason

No silent mutations are allowed.

---

# Future Database Extensions

Graph Database

Travel Knowledge Graph

Recommendation Graph

Road Network Graph

Time-Series Database

Vehicle Telemetry

IoT Sensors

Real-time Fleet Tracking

Federated Journey DNA

Offline Sync Engine

---

# Acceptance Criteria

* Journey remains the primary aggregate.
* Event sourcing is supported.
* Journey versioning is built-in.
* Multi-tenancy is supported.
* Provider metadata is isolated.
* Search remains independent.
* Future scaling is possible.
* AI memory remains probabilistic.

---

# Open Questions

Should Journey DNA use a graph representation instead of relational traits?

Should Event Store migrate to Kafka + EventStoreDB in future versions?

Should vector embeddings remain provider-specific or provider-neutral?

Should enterprise customers control their own data retention policies?

Should offline devices maintain independent local databases synchronized after reconnect?
