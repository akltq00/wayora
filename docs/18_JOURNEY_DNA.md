---

title: Journey DNA Specification
document: Wayora Blueprint
file: docs/18_JOURNEY_DNA.md
version: 1.0.0
status: Approved
owner: Wayora

authors:

* Tolga B.
* OpenAI ChatGPT

created: 2026-06-29
last_updated: 2026-06-29

dependencies:

* 03_DOMAIN_MODEL.md
* 05_AI_ARCHITECTURE.md
* 08_DATABASE.md
* 17_BACKEND_SERVICES.md

---

# Journey DNA

## Purpose

Journey DNA is Wayora's core personalization engine.

It transforms travel history into a probabilistic behavioral profile that continuously improves future journeys.

Unlike traditional preference systems, Journey DNA does not rely solely on explicit settings.

It learns from real behavior.

---

# Philosophy

Preferences are what users say.

Journey DNA is what users actually do.

Both are valuable.

Explicit preferences always override inferred behavior.

---

# Data Sources

Journey DNA is generated from:

Completed journeys

Accepted recommendations

Rejected recommendations

Ignored recommendations

Visited locations

Stop duration

Driving duration

Departure times

Arrival times

Vehicle usage

Travel companions

Conversation signals

Manual preferences

Ratings

Feedback

No single interaction creates a permanent behavior.

---

# DNA Structure

Journey DNA consists of independent traits.

Each trait contains:

Current Value

Confidence

Evidence Count

Last Updated

Decay Score

Origin

Supporting Events

Traits evolve independently.

---

# Core Trait Categories

## Driving

Preferred driving duration

Preferred departure time

Night driving tolerance

Highway preference

Scenic preference

Risk tolerance

Driving pace

Rest frequency

---

## Budget

Fuel sensitivity

Accommodation budget

Food budget

Activity budget

Average trip spending

Premium willingness

---

## Food

Breakfast habits

Coffee preference

Restaurant type

Cuisine preference

Meal schedule

Fast food tolerance

Local food interest

---

## Travel Style

Adventure

Relaxation

Family

Business

Photography

Camping

Road trip

Luxury

Minimalist

Multiple styles may coexist.

---

## Discovery

Historical places

Nature

Museums

Hidden gems

Beaches

National parks

Scenic roads

Local businesses

---

## Accommodation

Hotel

Camping

Caravan

Resort

Boutique hotel

Apartment

Hostel

---

## Vehicle Behavior

Fuel brand

Charging preference

Driving range

Charging strategy

Rest strategy

Preferred road type

---

# Trait Model

Example

```yaml
trait: ScenicPreference

value: High

confidence: 0.86

evidence: 42

lastUpdated: 2026-06-28

decay: 0.02
```

Traits are probabilistic.

They are never absolute.

---

# Confidence Model

Confidence increases through repeated behavior.

Example

1 accepted recommendation

↓

0.15

5 accepted

↓

0.47

20 accepted

↓

0.81

50 accepted

↓

0.95

Confidence grows asymptotically.

It never reaches 1.0.

---

# Decay Model

Behavior changes over time.

Old evidence gradually loses influence.

Recent journeys have higher weight.

Example

Yesterday

Weight 1.0

Last Month

0.8

Six Months

0.4

One Year

0.2

Decay is configurable.

---

# Contradiction Resolution

Example

User historically avoids highways.

Today:

"Use the fastest route."

Planner follows:

Explicit request.

Journey DNA remains unchanged.

Repeated contradictions reduce confidence.

One contradiction does not.

---

# Learning Pipeline

Journey Completed

↓

Journey Events

↓

Behavior Analysis

↓

Memory Candidates

↓

Confidence Update

↓

DNA Merge

↓

Trait Recalculation

↓

Planner Ready

Learning never blocks planning.

---

# Memory Candidates

Not every event becomes memory.

Example

Visited coffee shop once

↓

Ignored

Visited coffee shop 15 times

↓

Memory Candidate

Memory creation requires evidence.

---

# DNA Update Rules

Update only after completed journeys.

Ignore cancelled journeys.

Ignore incomplete telemetry.

Ignore low-confidence observations.

Prefer repeated patterns over isolated events.

---

# Explicit Preferences

Explicit settings always win.

Example

DNA

Avoid Highways

Confidence 0.91

User Preference

Use Highways

Planner chooses

Highways

Journey DNA is not deleted.

It is temporarily overridden.

---

# Multiple Profiles

Supported profiles

Default

Business

Family

Adventure

Camping

Motorcycle

EV

Users may switch profiles manually.

Future versions may switch automatically.

---

# Explainability

Users can inspect every trait.

Example

Scenic Preference

High

Confidence

82%

Reason

Observed during 27 completed journeys.

Accepted 18 scenic route recommendations.

Average stop duration at viewpoints: 19 minutes.

---

# DNA Privacy

Users may:

Disable learning

Export DNA

Delete DNA

Reset DNA

Delete individual traits

Disable specific learning categories

Learning is always optional.

---

# Journey DNA API

Read

Internal

Planner

Memory

Analytics

Write

Memory Service only.

No other service modifies DNA.

---

# AI Usage

Planner receives a read-only DNA snapshot.

Capabilities never modify DNA.

Memory updates occur asynchronously after journey completion.

---

# Performance Targets

DNA Retrieval

<50ms

DNA Merge

<200ms

Trait Update

<100ms

Snapshot Generation

<100ms

Planner Access

Cached

---

# Future Extensions

Seasonal preferences

Regional preferences

International travel profiles

Driving stress model

Weather preference model

Group Journey DNA

Family DNA

Shared Journey DNA

Federated Learning

On-device DNA

---

# Acceptance Criteria

Journey DNA is probabilistic.

Learning is evidence-based.

Confidence evolves gradually.

Decay prevents stale behavior.

Explicit preferences override inferred behavior.

Users control learning.

Planner receives immutable snapshots.

---

# Open Questions

Should Journey DNA synchronize across organizations?

Should users share Journey DNA with family members?

Should AI generate temporary journey-specific DNA?

Should DNA support context-specific traits (summer vs winter)?

Should enterprise fleets maintain organization-level Journey DNA?
