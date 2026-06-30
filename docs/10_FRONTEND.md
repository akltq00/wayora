---

title: Frontend Architecture
document: Wayora Blueprint
file: docs/10_FRONTEND.md
version: 1.0.0
status: Draft
owner: Wayora

authors:

* Tolga B.
* OpenAI ChatGPT

created: 2026-06-29
last_updated: 2026-06-29

dependencies:

* 01_PRODUCT_VISION.md
* 04_SYSTEM_ARCHITECTURE.md
* 09_API.md

---

# Frontend Architecture

## Purpose

This document defines the frontend architecture of Wayora.

Unlike traditional navigation applications where maps are the primary interface, Wayora is designed as a Conversation-First application where the map supports the conversation instead of replacing it.

---

# Frontend Philosophy

Traditional Navigation

```
Map

↓

Search

↓

Navigation
```

Wayora

```
Conversation

↓

Journey

↓

Timeline

↓

Map
```

The map is a visualization tool.

The conversation is the product.

---

# Design Principles

Conversation First

AI Native

Minimal Cognitive Load

Responsive

Realtime

Offline Friendly

Accessibility First

Progressive Disclosure

Motion with Purpose

Explainable UI

---

# Supported Platforms

Web

iOS

Android

CarPlay

Android Auto

Desktop (Future)

Tablet

Wearables (Future)

---

# Technology Stack

Framework

Next.js

Language

TypeScript

State

Zustand

Data Fetching

TanStack Query

Realtime

WebSocket

Maps

Mapbox GL

MapLibre (Future)

Animations

Framer Motion

Forms

React Hook Form

Validation

Zod

Charts

Recharts

Icons

Lucide

Styling

TailwindCSS

Component Library

shadcn/ui

---

# UI Architecture

```
App

↓

Layout

↓

Feature Modules

↓

Shared Components

↓

Hooks

↓

State

↓

API

↓

GraphQL/WebSocket
```

---

# Folder Structure

```
app/

components/

features/

hooks/

stores/

services/

providers/

lib/

types/

styles/

assets/

public/
```

Everything is feature-oriented.

---

# Feature Modules

Conversation

Journey

Timeline

Maps

Recommendations

Notifications

Settings

Vehicles

Journey DNA

Authentication

Profile

Billing

---

# Primary Navigation

Bottom Navigation (Mobile)

Sidebar (Desktop)

Tabs only where appropriate.

Navigation is task-oriented.

---

# Primary Screens

Welcome

Conversation

Journey

Timeline

Recommendations

Journey Details

Journey History

Journey DNA

Profile

Settings

Subscription

---

# Home Screen

The home screen is conversation.

Example

```
Good morning, Tolga.

Where are we going today?

_____________________

Type your journey...
```

Maps are not visible initially.

---

# Conversation Screen

Contains:

Streaming AI

Suggested Prompts

Journey Cards

Tool Results

Timeline Preview

Quick Actions

Context Chips

Conversation is persistent.

---

# Journey Screen

Displays

Journey Score

Timeline

Estimated Cost

Travel Time

Weather

Traffic

Companions

Vehicle

Recommendations

Interactive Map

---

# Timeline Screen

Primary visualization.

Example

```
08:00 Leave

↓

09:15 Coffee

↓

11:20 Scenic Stop

↓

13:10 Lunch

↓

16:00 Museum

↓

18:30 Hotel
```

Every item is interactive.

---

# Map Screen

Displays

Current Route

Alternative Routes

Traffic

Weather

POIs

Journey Stops

Recommendations

Map never replaces Timeline.

---

# Recommendation Panel

Each recommendation includes:

Reason

Confidence

Category

Estimated Benefit

Estimated Cost

Accept

Dismiss

Explain

---

# Journey DNA Screen

Displays:

Driving Style

Travel Personality

Favorite Stops

Preferred Departure Time

Travel Budget

Photography Interest

Camping Interest

Confidence Scores

Learning History

Recent Improvements

Users can inspect why AI learned something.

---

# State Management

Global State

Authentication

Journey

Conversation

Vehicle

Realtime

Theme

Settings

Local Component State remains local.

---

# Data Synchronization

Realtime synchronization uses:

WebSocket

↓

Optimistic Updates

↓

GraphQL Refresh

↓

Conflict Resolution

Offline changes synchronize automatically.

---

# Offline Mode

Available Features

Journey History

Saved Routes

Offline Maps

Journey Timeline

Notes

Vehicle Information

Pending Messages

Unavailable Features

Live Traffic

Weather

Fuel Prices

Realtime Recommendations

---

# Notifications

Journey Started

Weather Alert

Traffic Alert

Recommendation

Rest Reminder

Fuel Reminder

Charging Reminder

Trip Complete

Notifications remain actionable.

---

# Accessibility

WCAG AA

Keyboard Navigation

Voice Navigation

High Contrast

Reduced Motion

Large Fonts

Screen Reader

Color-blind Support

---

# Performance Targets

Initial Load

<2 seconds

Navigation

<100ms

Realtime Update

<300ms

Conversation Streaming

<500ms

Map Rendering

<1 second

Offline Startup

<2 seconds

---

# Error Handling

Connection Lost

↓

Offline Mode

↓

Retry

↓

Background Sync

↓

Recovery

No blank screens.

---

# Design Tokens

Colors

Spacing

Radius

Typography

Elevation

Animation

Shadows

Icons

Motion

Everything derives from a single design system.

---

# Responsive Breakpoints

Mobile

Tablet

Laptop

Desktop

Ultra-wide

No separate mobile application UI logic.

---

# Feature Flags

Every major feature supports flags.

Examples

Journey DNA

Community

Offline AI

Beta Maps

Voice Companion

Experimental Planner

---

# Analytics

Anonymous Usage

Journey Completion

Recommendation Acceptance

Conversation Length

Screen Flow

Feature Adoption

Crash Reports

Opt-in behavioral analytics only.

---

# Security

Secure Storage

Encrypted Tokens

No Secrets

Biometric Login

Certificate Pinning (Mobile)

Session Expiration

Device Trust

---

# Future UI Features

Voice-first UI

AR Navigation

Apple Vision Pro

Widgets

Lock Screen Activities

Smartwatch Companion

Collaborative Journey Editing

AI Avatar

---

# Acceptance Criteria

Conversation is the primary interface.

Timeline is the primary visualization.

Maps remain supporting components.

Frontend is fully responsive.

Offline mode is supported.

Realtime synchronization exists.

Accessibility is built in.

Design system remains consistent.

---

# Open Questions

Should Timeline completely replace traditional turn-by-turn navigation during planning?

Should Journey DNA become interactive?

Should AI responses include inline map previews?

Should widgets support one-tap journey generation?

Should Wayora eventually support a fully voice-only interface?
