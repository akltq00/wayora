---

title: Domain Model
document: Wayora Blueprint
file: docs/03_DOMAIN_MODEL.md
version: 1.0.0
status: Approved
owner: Wayora

authors:

* Tolga B.
* OpenAI ChatGPT

created: 2026-06-29
last_updated: 2026-06-29

dependencies:

* 00_EXECUTIVE_SUMMARY.md
* 01_PRODUCT_VISION.md
* 02_PRODUCT_PRINCIPLES.md

---

# Domain Model

## Purpose

This document defines the core business domain of Wayora.

It establishes the business entities, relationships, aggregates, ownership boundaries, lifecycle rules, and ubiquitous language used throughout the platform.

This document is the foundation for:

* Database Design
* API Design
* AI Architecture
* Agent Orchestration
* Event System
* Journey Memory
* Frontend Models

---

# Ubiquitous Language

Every engineer should use the following terminology consistently.

| Term           | Definition                                                   |
| -------------- | ------------------------------------------------------------ |
| Journey        | A complete travel experience from planning until completion. |
| Route          | A navigable path between waypoints.                          |
| Waypoint       | A planned location within a journey.                         |
| Stop           | A waypoint where the traveler intentionally spends time.     |
| Timeline       | Chronological representation of a journey.                   |
| Recommendation | AI-generated suggestion.                                     |
| Preference     | Explicit user configuration.                                 |
| Memory         | Long-term learned behavior.                                  |
| Journey DNA    | AI-generated behavioral profile.                             |
| Event          | Something that happened during a journey.                    |
| Capability     | Independent AI intelligence module.                          |
| Tool           | External system accessible through MCP.                      |

---

# Core Philosophy

Wayora is not User-centric.

Wayora is Journey-centric.

Everything revolves around the Journey.

Instead of asking:

"What belongs to a user?"

We ask:

"What happened during a journey?"

---

# Primary Aggregate

Journey

The Journey Aggregate represents one travel experience.

It owns:

* Route
* Timeline
* Events
* Stops
* Recommendations
* Context
* Decisions

Nothing modifies these objects directly.

All changes occur through Journey.

---

# Domain Hierarchy

Journey

├── Route

├── Timeline

├── Waypoints

├── Stops

├── Recommendations

├── Journey Context

├── Journey Events

├── Travel Companions

├── Vehicle Snapshot

├── Weather Snapshot

├── Traffic Snapshot

└── Journey Summary

---

# User Aggregate

A User owns:

Preferences

Journey DNA

Vehicles

Travel Profiles

Completed Journeys

Favorite Places

Saved Journeys

The User does NOT own Routes.

Routes belong to Journeys.

---

# Vehicle Aggregate

Vehicle

↓

Fuel Type

↓

Consumption Model

↓

Dimensions

↓

Driving Constraints

↓

Capabilities

Examples

ICE

Hybrid

EV

Motorcycle

Caravan

Truck

---

# Travel Companion Aggregate

Represents everyone joining the journey.

Examples

Adults

Children

Pets

Friends

Family

Groups

Accessibility Needs

Every recommendation should consider companions.

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

Replanned

↓

Completed

↓

Reviewed

↓

Archived

Journey state transitions must be explicit.

---

# Route Aggregate

A Route contains

Origin

Destination

Segments

Waypoints

Estimated Time

Estimated Distance

Road Types

Elevation

Scenic Score

Safety Score

Fuel Estimate

Battery Estimate

Cost Estimate

Alternative Routes

Routes are immutable after generation.

Changes create Route Versions.

---

# Waypoint

Waypoint represents a location in the journey.

Examples

Coffee Shop

Museum

Fuel Station

Hotel

Viewpoint

Beach

Parking

Charging Station

Camping Area

Restaurant

Each Waypoint has:

Arrival

Departure

Duration

Reason

Priority

Confidence Score

---

# Recommendation

Recommendation is produced by AI.

Attributes

Category

Reason

Confidence

Importance

Source Capability

Accepted

Rejected

Ignored

Recommendations are never permanent.

They expire when context changes.

---

# Timeline

Timeline is the chronological representation of the journey.

Example

08:00 Leave Home

↓

09:30 Breakfast

↓

11:00 Museum

↓

13:00 Lunch

↓

15:30 Scenic Stop

↓

18:00 Hotel

Timeline is continuously updated.

---

# Journey Context

Context represents live environmental information.

Includes

Weather

Traffic

Road Closures

Fuel Prices

Charging Availability

Time

Sunrise

Sunset

Local Events

Construction

Emergency Alerts

Context is transient.

It is never treated as permanent memory.

---

# Journey Event

Events are immutable.

Every important action creates an event.

Examples

Journey Created

Route Generated

Coffee Stop Accepted

Fuel Stop Ignored

Weather Changed

Traffic Increased

Route Replanned

Destination Changed

Journey Completed

Events become learning signals.

---

# Journey Memory

Memory stores interpreted behavior.

Memory never stores raw conversations.

Example

Raw Conversation

"I like coffee."

↓

Memory

Preferred Stop Type

Coffee Shop

Confidence

0.81

---

# Journey DNA

Journey DNA is generated from memories.

Journey DNA includes:

Driving Style

Planning Style

Travel Budget

Risk Tolerance

Scenic Preference

Average Stop Duration

Preferred Departure Time

Food Preferences

Coffee Preferences

Hotel Preferences

Fuel Brand Preferences

Photography Interest

Camping Interest

Family Travel Patterns

Night Driving Tolerance

DNA is probabilistic.

Nothing is permanently assumed.

Every trait has:

Confidence

Evidence Count

Last Updated

Decay Score

---

# Preferences

Preferences are explicit.

Examples

Avoid Highways

Avoid Ferries

Scenic Roads

Fastest Route

Cheapest Fuel

Pet Friendly

Wheelchair Accessible

Preferences override Journey DNA.

Explicit intent always wins.

---

# Capability Output

Every AI Capability produces structured output.

Example

Recommendation

↓

Reason

↓

Confidence

↓

Affected Journey Objects

↓

Supporting Context

↓

Trace Identifier

No capability directly modifies domain objects.

Planner validates every change.

---

# Ownership Rules

Journey owns:

Routes

Timeline

Events

Recommendations

Waypoints

Context

User owns:

Journey DNA

Preferences

Vehicles

Saved Journeys

Favorites

Capabilities own nothing.

Capabilities propose.

Planner decides.

---

# Invariants

Every Journey has exactly one active Route Version.

Every Recommendation belongs to one Journey.

Every Event belongs to one Journey.

Every Timeline belongs to one Journey.

Every Memory belongs to one User.

Every Journey DNA belongs to one User.

Every Waypoint belongs to one Route Version.

---

# Domain Events

Core events include:

JourneyCreated

JourneyStarted

JourneyPaused

JourneyCompleted

JourneyCancelled

RouteGenerated

RouteUpdated

WaypointAdded

WaypointRemoved

RecommendationCreated

RecommendationAccepted

RecommendationRejected

WeatherUpdated

TrafficUpdated

FuelPriceUpdated

JourneyDNAModified

MemoryCreated

PreferenceChanged

VehicleChanged

---

# Domain Boundaries

Journey Domain

Planning Domain

Recommendation Domain

Memory Domain

Vehicle Domain

User Domain

Notification Domain

Analytics Domain

Provider Integration Domain

These domains communicate through events.

Direct coupling is prohibited.

---

# Future Domains

Fleet Management

Ride Sharing

Autonomous Driving

Tourism Marketplace

Insurance

Travel Rewards

Smart City Integration

Wearable Devices

---

# Acceptance Criteria

The domain model is independent from implementation details.

Core entities are clearly defined.

Ownership rules are established.

Business language is standardized.

Future scalability is supported.

Database design can be derived directly from this model.

---

# Open Questions

Should Journey Versions remain indefinitely?

Should Journey DNA be globally shared across all devices?

Should memories decay automatically over time?

Should recommendations become reusable templates?

Should users maintain multiple Journey DNA profiles (Business, Family, Adventure)?
